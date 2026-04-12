const { prisma } = require('../config/db'); // 👈 Verifica que la carpeta sea 'config'

// ====================== OBTENER TODOS LOS TRAMOS (Solo de su empresa) ======================
exports.getTramos = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;

        const tramos = await prisma.tramoCable.findMany({
            where: {
                proyecto: { empresaId },           // Seguridad multi-empresa
                ...(proyectoId && { proyectoId })  // Filtro opcional por proyecto
            },
            include: {
                proyecto: { select: { nombre: true, estado: true } },
                posteInicio: { select: { codigo: true, latitud: true, longitud: true } },
                posteFin:    { select: { codigo: true, latitud: true, longitud: true } },
                mufaOrigen:  { select: { codigo: true } },
                cajaDestino: { select: { codigo: true } }
            },
            orderBy: { creadoEn: 'desc' }
        });

        // Convertir path de string a array para el mapa
        const tramosFormateados = tramos.map(tramo => ({
            ...tramo,
            path: typeof tramo.path === 'string' 
                ? JSON.parse(tramo.path || '[]') 
                : (tramo.path || [])
        }));

        res.json({
            success: true,
            count: tramosFormateados.length,
            tramos: tramosFormateados
        });

    } catch (error) {
        console.error("❌ Error al obtener tramos:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los tramos de fibra"
        });
    }
};

// ====================== CREAR TRAMO ======================
exports.createTramo = async (req, res) => {
    try {
        const { 
            nombre, tipoCable, path, 
            proyectoId, posteInicioId, posteFinId, 
            mufaOrigenId, cajaDestinoId 
        } = req.body;

        const { empresaId } = req.user;

        if (!proyectoId) {
            return res.status(400).json({
                success: false,
                message: "El ID del proyecto es obligatorio"
            });
        }

        // Verificar que el proyecto pertenezca a la empresa
        const proyecto = await prisma.proyecto.findUnique({
            where: { id: proyectoId }
        });

        if (!proyecto || proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este proyecto"
            });
        }

        const nuevoTramo = await prisma.tramoCable.create({
            data: {
                nombre: nombre || `Tramo-${Date.now().toString().slice(-6)}`,
                tipoCable: tipoCable || "FIBRA",
                path: typeof path === 'string' ? path : JSON.stringify(path || []),
                proyectoId,
                posteInicioId: posteInicioId || null,
                posteFinId: posteFinId || null,
                mufaOrigenId: mufaOrigenId || null,
                cajaDestinoId: cajaDestinoId || null
            },
            include: {
                posteInicio: true,
                posteFin: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Tramo de fibra creado correctamente",
            tramo: nuevoTramo
        });

    } catch (error) {
        console.error("❌ Error al crear tramo:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el tramo de fibra"
        });
    }
};

// ====================== OBTENER TRAMO POR ID ======================
exports.getTramoById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const tramo = await prisma.tramoCable.findUnique({
            where: { 
                id,
                proyecto: { empresaId }   // Seguridad
            },
            include: {
                proyecto: true,
                posteInicio: true,
                posteFin: true,
                mufaOrigen: true,
                cajaDestino: true
            }
        });

        if (!tramo) {
            return res.status(404).json({
                success: false,
                message: "Tramo no encontrado o sin acceso"
            });
        }

        // Formatear path para frontend
        const tramoFormateado = {
            ...tramo,
            path: typeof tramo.path === 'string' 
                ? JSON.parse(tramo.path || '[]') 
                : (tramo.path || [])
        };

        res.json({
            success: true,
            tramo: tramoFormateado
        });

    } catch (error) {
        console.error("❌ Error al obtener tramo:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el tramo"
        });
    }
};

// ====================== ACTUALIZAR TRAMO ======================
exports.updateTramo = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipoCable, path, posteInicioId, posteFinId, mufaOrigenId, cajaDestinoId } = req.body;
    const { empresaId } = req.user;

    try {
        const tramoActualizado = await prisma.tramoCable.update({
            where: { 
                id,
                proyecto: { empresaId }   // Seguridad
            },
            data: {
                nombre,
                tipoCable,
                path: path ? (typeof path === 'string' ? path : JSON.stringify(path)) : undefined,
                posteInicioId,
                posteFinId,
                mufaOrigenId,
                cajaDestinoId
            }
        });

        res.json({
            success: true,
            message: "Tramo actualizado correctamente",
            tramo: tramoActualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Tramo no encontrado o sin acceso"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al actualizar el tramo"
        });
    }
};

// ====================== ELIMINAR TRAMO ======================
exports.deleteTramo = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.tramoCable.delete({
            where: { 
                id,
                proyecto: { empresaId }
            }
        });

        res.json({
            success: true,
            message: "Tramo eliminado correctamente"
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Tramo no encontrado o sin acceso"
            });
        }
        console.error("❌ Error al eliminar tramo:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el tramo"
        });
    }
};