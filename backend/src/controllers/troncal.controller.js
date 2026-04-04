const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. CREAR: Con validación de capacidad estándar
exports.createTroncal = async (req, res) => {
    try {
        const { nombre, prefijo, capacidad, descripcion, ruta } = req.body;
        
        if (!nombre || !prefijo || !capacidad) {
            return res.status(400).json({ error: "Nombre, prefijo y capacidad son obligatorios." });
        }

        const nueva = await prisma.troncal.create({
            data: { 
                nombre, 
                prefijo: prefijo.toUpperCase(), 
                capacidad: parseInt(capacidad), 
                descripcion, 
                ruta: ruta || [] 
            }
        });
        res.status(201).json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear troncal", detalle: error.message });
    }
};

// 2. OBTENER TODAS: Con conteo de mufas
exports.getTroncales = async (req, res) => {
    try {
        const lista = await prisma.troncal.findMany({
            include: { 
                _count: { select: { mufas: true } } 
            },
            orderBy: { creadoEn: 'desc' }
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener troncales" });
    }
};

// 4. ACTUALIZAR: Modificar nombre, capacidad o la ruta (coordenadas) del cable
exports.updateTroncal = async (req, res) => {
    const { id } = req.params;
    const { nombre, prefijo, capacidad, descripcion, ruta } = req.body;

    try {
        // Verificamos primero si existe la troncal
        const existe = await prisma.troncal.findUnique({ where: { id } });
        if (!existe) {
            return res.status(404).json({ error: "La troncal que intentas editar no existe." });
        }

        const actualizada = await prisma.troncal.update({
            where: { id },
            data: {
                nombre: nombre !== undefined ? nombre : existe.nombre,
                prefijo: prefijo !== undefined ? prefijo.toUpperCase() : existe.prefijo,
                capacidad: capacidad !== undefined ? parseInt(capacidad) : existe.capacidad,
                descripcion: descripcion !== undefined ? descripcion : existe.descripcion,
                ruta: ruta !== undefined ? ruta : existe.ruta
            }
        });

        res.json({
            mensaje: "Troncal actualizada correctamente",
            data: actualizada
        });
    } catch (error) {
        console.error("❌ Error al actualizar troncal:", error);
        res.status(500).json({ 
            error: "No se pudo actualizar la troncal", 
            detalle: error.message 
        });
    }
};
// 3. ELIMINAR: LIMPIEZA TOTAL EN CASCADA (Transacción)
exports.deleteTroncal = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            // A. Buscar todas las mufas de esta troncal
            const mufas = await tx.mufa.findMany({ where: { troncalId: id } });
            const mufaIds = mufas.map(m => m.id);

            // B. Buscar todas las cajas de esas mufas
            const cajas = await tx.caja.findMany({ where: { mufaId: { in: mufaIds } } });
            const cajaIds = cajas.map(c => c.id);

            // C. Borrar Tramos de Cable vinculados a esas mufas o cajas
            await tx.tramoCable.deleteMany({
                where: {
                    OR: [
                        { mufaOrigenId: { in: mufaIds } },
                        { cajaDestinoId: { in: cajaIds } }
                    ]
                }
            });

            // D. Borrar Cajas, luego Mufas y finalmente la Troncal
            await tx.caja.deleteMany({ where: { id: { in: cajaIds } } });
            await tx.mufa.deleteMany({ where: { id: { in: mufaIds } } });
            await tx.troncal.delete({ where: { id } });
        });

        res.json({ mensaje: "Troncal y TODA su infraestructura asociada (Mufas/Cajas/Cables) eliminada correctamente." });
    } catch (error) {
        console.error("🔥 ERROR CRÍTICO EN BORRADO:", error);
        res.status(500).json({ error: "No se pudo eliminar la infraestructura", detalle: error.message });
    }
};