const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS LAS CAJAS (Con infraestructura física y lógica)
exports.getCajas = async (req, res) => {
    try {
        const cajas = await prisma.caja.findMany({
            include: { 
                mufa: { select: { codigo: true, troncalId: true } },
                poste: true,
                _count: { select: { clientes: true } } // Para saber cuántos abonados tiene la NAP
            } 
        });
        res.json(cajas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener inventario de cajas" });
    }
};

// 2. CREAR CAJA NAP (Validando Splitter de Mufa)
exports.createCaja = async (req, res) => {
    try {
        const { 
            mufaId, posteId, puertoMufa, colorFibraCaja, 
            puertoOlt, latitud, longitud, puertosTotales,
            ruta, detalles, observaciones  
        } = req.body;

        if (!mufaId) return res.status(400).json({ error: "El mufaId es obligatorio para conectar la caja." });

        // 1. Validar existencia de la Mufa
        const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
        if (!mufa) return res.status(404).json({ error: "Mufa de origen no encontrada" });

        // 2. Lógica de Coordenadas (Prioridad al Poste)
        let latFinal = latitud ? parseFloat(latitud) : 0;
        let lngFinal = longitud ? parseFloat(longitud) : 0;

        if (posteId) {
            const poste = await prisma.poste.findUnique({ where: { id: posteId } });
            if (poste) {
                latFinal = poste.latitud;
                lngFinal = poste.longitud;
            }
        }

        // 3. Validar si el puerto del Splitter en la Mufa ya está ocupado
        const pMufa = parseInt(puertoMufa);
        const salidaOcupada = await prisma.caja.findFirst({
            where: { mufaId, puertoMufa: pMufa }
        });
        
        if (salidaOcupada) {
            return res.status(400).json({ 
                error: `Conflicto: El puerto ${pMufa} de la mufa ya está alimentando a la caja ${salidaOcupada.codigo}` 
            });
        }

        // 4. Generar Código Automático (Jerarquía: COD-MUFA-C01)
        const nPuerto = pMufa.toString().padStart(2, '0');
        const codigoAuto = `${mufa.codigo}-C${nPuerto}`;

        // 5. Crear Caja
        const nuevaCaja = await prisma.caja.create({
            data: {
                codigo: codigoAuto,
                puertoMufa: pMufa,
                colorFibraCaja,
                puertoOlt,
                puertosTotales: parseInt(puertosTotales) || 16,
                latitud: latFinal,
                longitud: lngFinal,
                mufaId,
                posteId: posteId || null,
                ruta: ruta || null,
                detalles: detalles || "",
                observaciones: observaciones || ""
            },
            include: { poste: true, mufa: true }
        });

        res.status(201).json(nuevaCaja);
    } catch (error) {
        console.error("❌ ERROR CAJA:", error.message);
        res.status(500).json({ error: "Error al registrar la caja", detalle: error.message });
    }
};

// 3. ELIMINAR CAJA (Limpieza de enlaces físicos)
exports.deleteCaja = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            // A. Borrar Tramos de Cable que lleguen a esta caja
            await tx.tramoCable.deleteMany({ where: { cajaDestinoId: id } });

            // B. Borrar la Caja (Los clientes se borran si el schema tiene Cascade)
            await tx.caja.delete({ where: { id } });
        });

        res.json({ message: "Caja eliminada y puerto de mufa liberado correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la caja", detalle: error.message });
    }
};

// 4. OBTENER SALIDAS OCUPADAS (Para el selector del frontend)
exports.getHilosOcupados = async (req, res) => {
    const { mufaId } = req.params;
    try {
        // Buscamos todas las cajas que dependen de esa mufa
        const cajasVinculadas = await prisma.caja.findMany({
            where: { mufaId: mufaId },
            select: { 
                puertoMufa: true,
                codigo: true 
            }
        });

        // Extraemos solo los números de puerto: [1, 3, 4...]
        const puertosUsados = cajasVinculadas.map(c => c.puertoMufa);

        res.json({
            mufaId,
            totalOcupados: puertosUsados.length,
            puertosUsados: puertosUsados, // Array para que el frontend bloquee los inputs
            detalle: cajasVinculadas
        });
    } catch (error) {
        console.error("Error en hilos-ocupados:", error);
        res.status(500).json({ error: "Error al consultar disponibilidad de hilos" });
    }
};
exports.actualizarCaja = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizada = await prisma.caja.update({
            where: { id },
            data: req.body
        });
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la caja" });
    }
};