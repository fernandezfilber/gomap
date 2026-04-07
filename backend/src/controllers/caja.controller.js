
const prisma = require('../db');

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
        const { mufaId, posteId, codigo, colorHiloCaja, puertosLibres } = req.body;

        // 1. Validaciones básicas según tu esquema
        if (!mufaId || !posteId) {
            return res.status(400).json({ error: "mufaId y posteId son obligatorios." });
        }

        // 2. Verificar que el Poste existe para traer las coordenadas
        const poste = await prisma.poste.findUnique({ where: { id: posteId } });
        if (!poste) return res.status(404).json({ error: "El poste seleccionado no existe." });

        // 3. Verificar que la Mufa existe para el código jerárquico (opcional)
        const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
        if (!mufa) return res.status(404).json({ error: "Mufa no encontrada." });

        // 4. Crear la Caja con los campos que SÍ están en tu modelo
        const nuevaCaja = await prisma.caja.create({
            data: {
                // Si no envías código, generamos uno basado en la mufa
                codigo: codigo || `${mufa.codigo}-NAP-${Date.now().toString().slice(-4)}`,
                latitud: poste.latitud,
                longitud: poste.longitud,
                colorHiloCaja: colorHiloCaja || "Azul",
                puertosLibres: parseInt(puertosLibres) || 16,
                mufaId: mufaId,
                posteId: posteId
            }
        });

        res.status(201).json(nuevaCaja);
    } catch (error) {
        console.error("❌ ERROR CREAR CAJA:", error.message);
        res.status(500).json({ 
            error: "Error al registrar la caja", 
            detalle: "Asegúrate de no enviar campos como 'puertoMufa' que no están en el schema.prisma" 
        });
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