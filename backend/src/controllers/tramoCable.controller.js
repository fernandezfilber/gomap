const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS: Con jerarquía completa (Postes, Proyecto y Equipos)
exports.getTramos = async (req, res) => {
    try {
        const tramos = await prisma.tramoCable.findMany({
            include: {
                proyecto: { select: { nombre: true } },
                posteInicio: { select: { codigo: true } },
                posteFin: { select: { codigo: true } },
                mufaOrigen: { select: { codigo: true } },
                cajaDestino: { select: { codigo: true } }
            },
            orderBy: { creadoEn: 'desc' }
        });
        res.json(tramos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener cables del GIS" });
    }
};

// 2. CREAR: Validando anclaje obligatorio a POSTES y PROYECTO
exports.createTramo = async (req, res) => {
    try {
        const { 
            nombre, tipoCable, metraje, path, 
            proyectoId, posteInicioId, posteFinId, 
            mufaOrigenId, cajaDestinoId 
        } = req.body;

        // Validación de Regla de Negocio: Anclaje físico obligatorio
        if (!proyectoId || !posteInicioId || !posteFinId) {
            return res.status(400).json({ 
                error: "Todo tramo debe tener un Proyecto, un Poste de Inicio y un Poste de Fin." 
            });
        }

        const nuevoTramo = await prisma.tramoCable.create({
            data: {
                nombre: nombre || `Link-${tipoCable}-${Date.now()}`,
                tipoCable,
                metraje: metraje ? parseFloat(metraje) : 0,
                path: path || [], 
                proyectoId,
                posteInicioId,
                posteFinId,
                mufaOrigenId: mufaOrigenId || null,
                cajaDestinoId: cajaDestinoId || null
            }
        });

        res.status(201).json(nuevoTramo);
    } catch (error) {
        console.error("❌ Error en registro de cable:", error);
        res.status(500).json({ error: "Error al registrar el cable", detalle: error.message });
    }
};

// 3. OBTENER POR ID: Detalle técnico completo para el técnico
exports.getTramoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tramo = await prisma.tramoCable.findUnique({
            where: { id },
            include: {
                proyecto: true,
                posteInicio: true,
                posteFin: true,
                mufaOrigen: true,
                cajaDestino: true
            }
        });
        if (!tramo) return res.status(404).json({ error: "Tramo no encontrado" });
        res.json(tramo);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el tramo específico" });
    }
};

// 4. ACTUALIZAR: Permite corregir la ruta o el anclaje a postes
exports.updateTramo = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = { ...req.body };
        
        if (dataUpdate.metraje) dataUpdate.metraje = parseFloat(dataUpdate.metraje);

        // Si se actualizan postes o proyecto, Prisma validará las relaciones automáticamente
        const actualizada = await prisma.tramoCable.update({
            where: { id },
            data: dataUpdate
        });
        
        res.json({ mensaje: "Tramo actualizado correctamente", data: actualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar tramo" });
    }
};

// 5. ELIMINAR: Simple, ya que no tiene "hijos" directos que rompan la base
exports.deleteTramo = async (req, res) => {
    try {
        await prisma.tramoCable.delete({ where: { id: req.params.id } });
        res.json({ message: "Tramo de cable eliminado del inventario GIS" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el tramo" });
    }
};