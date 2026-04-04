const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS: Con filtro por Proyecto y manejo de errores
exports.getTramos = async (req, res) => {
    try {
        const { proyectoId } = req.query;

        const tramos = await prisma.tramoCable.findMany({
            where: proyectoId ? { proyectoId: proyectoId } : {},
            include: {
                proyecto: { select: { nombre: true } },
                posteInicio: { select: { codigo: true } },
                posteFin: { select: { codigo: true } },
                mufaOrigen: { select: { codigo: true } },
                cajaDestino: { select: { codigo: true } }
            }
            // ❌ BORRAMOS LA LÍNEA DEL orderBy: { creadoEn: 'desc' }
        });

        const tramosValidados = tramos.map(t => ({
            ...t,
            path: typeof t.path === 'string' ? JSON.parse(t.path || '[]') : (t.path || [])
        }));

        res.json(tramosValidados);
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: "Error al obtener cables", detalle: error.message });
    }
};
// 2. CREAR: Con anclaje y valores por defecto
exports.createTramo = async (req, res) => {
    try {
        const { 
            nombre, tipoCable, path, 
            proyectoId, posteInicioId, posteFinId, 
            mufaOrigenId, cajaDestinoId 
        } = req.body;

        // Validación de Regla de Negocio: Para Forward Vision, el proyecto es ley
        if (!proyectoId) {
            return res.status(400).json({ error: "El ID del proyecto es obligatorio." });
        }

        const nuevoTramo = await prisma.tramoCable.create({
            data: {
                nombre: nombre || `Link-${Date.now().toString().slice(-4)}`,
                tipoCable: tipoCable || "FIBRA",
                // Guardamos como string si la DB es MySQL y el campo es String
                path: typeof path === 'string' ? path : JSON.stringify(path || []), 
                proyectoId,
                posteInicioId: posteInicioId || null, // Permitimos nulos si no hay anclaje aún
                posteFinId: posteFinId || null,
                mufaOrigenId: mufaOrigenId || null,
                cajaDestinoId: cajaDestinoId || null
            }
        });

        res.status(201).json(nuevoTramo);
    } catch (error) {
        console.error("❌ Error en registro de cable:", error.message);
        res.status(500).json({ 
            error: "Error al registrar el cable", 
            detalle: error.message 
        });
    }
};

// 3. OBTENER POR ID
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
        
        // Formatear path para el mapa
        if (tramo.path && typeof tramo.path === 'string') {
            tramo.path = JSON.parse(tramo.path);
        }

        res.json(tramo);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el tramo específico" });
    }
};

// 4. ACTUALIZAR
exports.updateTramo = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = { ...req.body };
        
        // Si el path viene como array, lo convertimos a string para Prisma/MySQL
        if (dataUpdate.path && typeof dataUpdate.path !== 'string') {
            dataUpdate.path = JSON.stringify(dataUpdate.path);
        }

        const actualizada = await prisma.tramoCable.update({
            where: { id },
            data: dataUpdate
        });
        
        res.json({ mensaje: "Tramo actualizado correctamente", data: actualizada });
    } catch (error) {
        console.error("Error update:", error.message);
        res.status(500).json({ error: "Error al actualizar tramo" });
    }
};

// 5. ELIMINAR
exports.deleteTramo = async (req, res) => {
    try {
        await prisma.tramoCable.delete({ where: { id: req.params.id } });
        res.json({ message: "Tramo de cable eliminado del inventario GIS" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el tramo" });
    }
};