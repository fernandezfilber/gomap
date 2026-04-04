const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS LAS CAJAS (Inventario completo con capacidad de abonados)
exports.getCajas = async (req, res) => {
    try {
        const cajas = await prisma.caja.findMany({
            include: { 
                mufa: { select: { codigo: true, ratioSplitteo: true } },
                poste: { select: { codigo: true, latitud: true, longitud: true } },
                _count: { select: { clientes: true } } 
            } 
        });
        res.json(cajas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener inventario de cajas NAP" });
    }
};

// 2. CREAR CAJA NAP (Validando salida de Splitter y anclaje a Poste)
exports.createCaja = async (req, res) => {
    try {
        const { 
            mufaId, posteId, puertoMufa, colorFibraCaja, 
            puertoOlt, latitud, longitud, puertosTotales,
            ruta, detalles, observaciones  
        } = req.body;

        // Validaciones de esquema v6
        if (!mufaId || !posteId) {
            return res.status(400).json({ error: "mufaId y posteId son obligatorios para la instalación." });
        }

        // 1. Verificar Mufa y su capacidad de splitter
        const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
        if (!mufa) return res.status(404).json({ error: "Mufa de origen no encontrada." });

        // 2. Sincronizar coordenadas con el Poste seleccionado
        const poste = await prisma.poste.findUnique({ where: { id: posteId } });
        if (!poste) return res.status(404).json({ error: "El poste seleccionado no existe." });

        const latFinal = poste.latitud;
        const lngFinal = poste.longitud;

        // 3. Validar ocupación del puerto en el Splitter (1:8 o 1:16)
        const pMufa = parseInt(puertoMufa);
        const salidaOcupada = await prisma.caja.findFirst({
            where: { mufaId, puertoMufa: pMufa }
        });
        
        if (salidaOcupada) {
            return res.status(400).json({ 
                error: `El puerto ${pMufa} de la mufa ${mufa.codigo} ya está alimentando a otra NAP.` 
            });
        }

        // 4. Generar Código Jerárquico: COD-MUFA-NAP-XX
        const nPuerto = pMufa.toString().padStart(2, '0');
        const codigoAuto = `${mufa.codigo}-NAP${nPuerto}`;

        // 5. Crear Caja con conteo de puertos libres
        const nuevaCaja = await prisma.caja.create({
            data: {
                codigo: codigoAuto,
                puertoMufa: pMufa,
                colorFibraCaja: colorFibraCaja || "Blanco",
                puertoOlt: puertoOlt || "PON-1",
                puertosTotales: parseInt(puertosTotales) || 16,
                puertosLibres: parseInt(puertosTotales) || 16, // Inicia vacía
                latitud: latFinal,
                longitud: lngFinal,
                mufaId,
                posteId,
                ruta: ruta || null,
                detalles: detalles || "",
                observaciones: observaciones || ""
            }
        });

        res.status(201).json(nuevaCaja);
    } catch (error) {
        console.error("❌ ERROR CREAR CAJA:", error.message);
        res.status(500).json({ error: "Error en el servidor al registrar la caja NAP" });
    }
};

// 3. ACTUALIZAR CAJA
exports.actualizarCaja = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizada = await prisma.caja.update({
            where: { id },
            data: req.body
        });
        res.json({ mensaje: "Caja NAP actualizada", data: actualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la caja" });
    }
};

// 4. ELIMINAR CAJA (Limpieza de cables asociados)
exports.deleteCaja = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            // Borrar tramos de cable que terminan en esta caja (Drop cables)
            await tx.tramoCable.deleteMany({ where: { cajaDestinoId: id } });
            await tx.caja.delete({ where: { id } });
        });

        res.json({ message: "Caja NAP eliminada y puerto de splitter liberado." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la caja NAP" });
    }
};

// 5. CONSULTAR PUERTOS OCUPADOS (Para bloqueo de UI)
exports.getHilosOcupados = async (req, res) => {
    const { mufaId } = req.params;
    try {
        const cajas = await prisma.caja.findMany({
            where: { mufaId },
            select: { puertoMufa: true, codigo: true }
        });

        res.json({
            mufaId,
            puertosUsados: cajas.map(c => c.puertoMufa),
            detalle: cajas
        });
    } catch (error) {
        res.status(500).json({ error: "Error al consultar disponibilidad" });
    }
};