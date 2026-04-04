const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS: Vista general para el mapa con relaciones
exports.getMufas = async (req, res) => {
    try {
        const mufas = await prisma.mufa.findMany({
            include: { 
                troncal: { select: { nombre: true, bufferColor: true } },
                poste: { select: { codigo: true } },
                _count: { select: { cajas: true } }
            }
        });
        res.json(mufas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener mufas" });
    }
};

// 2. CREAR MUFA: Con Transacción y Descuento de Hilos en Troncal
exports.crearMufa = async (req, res) => {
    try {
        const { 
            codigo, troncalId, posteId, bufferEntrada, 
            hiloEntrada, latitud, longitud, ratioSplitteo 
        } = req.body;

        // Inicia transacción para asegurar integridad de hilos
        const resultado = await prisma.$transaction(async (tx) => {
            
            // A. Verificar disponibilidad en la Troncal
            const troncal = await tx.troncal.findUnique({ where: { id: troncalId } });
            if (!troncal || troncal.hilosLibres <= 0) {
                throw new Error("Troncal no encontrada o sin hilos disponibles.");
            }

            // B. Verificar que el hilo de entrada no esté ya ocupado en esa troncal
            const hiloOcupado = await tx.mufa.findFirst({
                where: { troncalId, bufferEntrada, hiloEntrada }
            });
            if (hiloOcupado) {
                throw new Error(`El hilo ${hiloEntrada} del buffer ${bufferEntrada} ya está en uso.`);
            }

            // C. Crear la Mufa
            const nueva = await tx.mufa.create({
                data: {
                    codigo: codigo || `MUF-${Date.now()}`,
                    bufferEntrada,
                    hiloEntrada: parseInt(hiloEntrada),
                    ratioSplitteo: ratioSplitteo || "1:16",
                    hilosDisponibles: 16, // Hilos que entrega el splitter
                    latitud: parseFloat(latitud),
                    longitud: parseFloat(longitud),
                    troncalId,
                    posteId
                }
            });

            // D. Descontar hilo de la Troncal principal
            await tx.troncal.update({
                where: { id: troncalId },
                data: { hilosLibres: { decrement: 1 } }
            });

            return nueva;
        });

        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error en Crear Mufa:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// 3. DETALLE DE MUFA: Con cálculo de disponibilidad para Cajas NAP
exports.getMufaById = async (req, res) => {
    const { id } = req.params;
    try {
        const mufa = await prisma.mufa.findUnique({
            where: { id },
            include: {
                troncal: true,
                poste: true,
                cajas: {
                    select: {
                        id: true,
                        codigo: true,
                        colorHiloCaja: true,
                        _count: { select: { clientes: true } }
                    }
                }
            }
        });

        if (!mufa) return res.status(404).json({ error: "Mufa no encontrada" });

        // Cálculo dinámico de capacidad del nodo
        const capacidadTotal = parseInt(mufa.ratioSplitteo.split(':')[1]) || 16;
        const ocupados = mufa.cajas.length;

        res.json({
            ...mufa,
            capacidadSplitter: capacidadTotal,
            hilosEnUso: ocupados,
            hilosLibresParaCajas: capacidadTotal - ocupados
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalle de la mufa" });
    }
};

// 4. ELIMINAR MUFA: Repone el hilo a la troncal (Cascarilla inversa)
exports.eliminarMufa = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            const mufa = await tx.mufa.findUnique({ where: { id } });
            if (!mufa) throw new Error("Mufa no existe");

            // A. Reponer el hilo a la troncal
            await tx.troncal.update({
                where: { id: mufa.troncalId },
                data: { hilosLibres: { increment: 1 } }
            });

            // B. Borrar la mufa (Prisma se encarga de las cajas por onDelete: Cascade si se configuró)
            await tx.mufa.delete({ where: { id } });
        });

        res.json({ mensaje: "Mufa eliminada y capacidad de troncal restaurada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar mufa", detalle: error.message });
    }
};

// 5. OBTENER HILOS OCUPADOS (Para el selector de hilos en el Frontend)
exports.getHilosOcupados = async (req, res) => {
    const { mufaId } = req.params;
    try {
        const cajas = await prisma.caja.findMany({
            where: { mufaId },
            select: { colorHiloCaja: true } 
        });
        
        // Devolvemos los colores/números de hilos que ya alimentan una Caja NAP
        const ocupados = cajas.map(c => c.colorHiloCaja);
        res.json(ocupados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener hilos ocupados" });
    }
};