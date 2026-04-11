const { prisma } = require('../db');

// ====================== CREAR TRONCAL ======================
exports.createTroncal = async (req, res) => {
    try {
        const { nombre, bufferColor, cantHilos, descripcion, ruta, proyectoId } = req.body;
        const { empresaId } = req.user;

        if (!nombre || !bufferColor || !cantHilos || !proyectoId) {
            return res.status(400).json({
                success: false,
                message: "Nombre, bufferColor, cantHilos y proyectoId son obligatorios"
            });
        }

        // Verificar que el proyecto pertenezca a la empresa del usuario
        const proyecto = await prisma.proyecto.findUnique({
            where: { id: proyectoId }
        });

        if (!proyecto || proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este proyecto"
            });
        }

        const nuevaTroncal = await prisma.troncal.create({
            data: {
                nombre,
                bufferColor,
                cantHilos: parseInt(cantHilos),
                hilosLibres: parseInt(cantHilos), // Inicialmente todos libres
                descripcion: descripcion || "",
                ruta: ruta || "",
                proyectoId
            },
            include: {
                proyecto: { select: { nombre: true } }
            }
        });

        res.status(201).json({
            success: true,
            message: "Troncal creada correctamente",
            troncal: nuevaTroncal
        });

    } catch (error) {
        console.error("❌ Error al crear troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear la troncal",
            error: error.message
        });
    }
};

// ====================== OBTENER TODAS LAS TRONCALES (Solo de su empresa) ======================
exports.getTroncales = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const troncales = await prisma.troncal.findMany({
            where: {
                proyecto: { empresaId }
            },
            include: {
                proyecto: { select: { nombre: true, estado: true } },
                _count: { select: { mufas: true } }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: troncales.length,
            troncales
        });

    } catch (error) {
        console.error("❌ Error al obtener troncales:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener las troncales"
        });
    }
};

// ====================== OBTENER DETALLE DE UNA TRONCAL ======================
exports.getTroncalById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const troncal = await prisma.troncal.findUnique({
            where: { 
                id,
                proyecto: { empresaId }   // Seguridad multi-empresa
            },
            include: {
                proyecto: true,
                mufas: {
                    include: {
                        poste: { select: { codigo: true } },
                        _count: { select: { cajas: true } }
                    }
                }
            }
        });

        if (!troncal) {
            return res.status(404).json({
                success: false,
                message: "Troncal no encontrada o sin acceso"
            });
        }

        res.json({
            success: true,
            troncal
        });

    } catch (error) {
        console.error("❌ Error al obtener troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener detalle de la troncal"
        });
    }
};

// ====================== ACTUALIZAR TRONCAL ======================
exports.updateTroncal = async (req, res) => {
    const { id } = req.params;
    const { nombre, bufferColor, cantHilos, descripcion, ruta, proyectoId } = req.body;
    const { empresaId } = req.user;

    try {
        // Verificar que la troncal exista y pertenezca a la empresa
        const troncalActual = await prisma.troncal.findUnique({
            where: { id }
        });

        if (!troncalActual || troncalActual.proyectoId !== proyectoId && proyectoId) {
            // Si cambian de proyecto, verificar el nuevo
            if (proyectoId) {
                const nuevoProyecto = await prisma.proyecto.findUnique({ where: { id: proyectoId } });
                if (!nuevoProyecto || nuevoProyecto.empresaId !== empresaId) {
                    return res.status(403).json({ success: false, message: "No tienes acceso al proyecto destino" });
                }
            }
        }

        const troncalActualizada = await prisma.troncal.update({
            where: { id },
            data: {
                nombre,
                bufferColor,
                cantHilos: cantHilos ? parseInt(cantHilos) : undefined,
                hilosLibres: cantHilos ? parseInt(cantHilos) : undefined, // Ajustar según lógica de negocio
                descripcion,
                ruta,
                proyectoId
            }
        });

        res.json({
            success: true,
            message: "Troncal actualizada correctamente",
            troncal: troncalActualizada
        });

    } catch (error) {
        console.error("❌ Error al actualizar troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar la troncal"
        });
    }
};

// ====================== ELIMINAR TRONCAL (Con transacción segura) ======================
exports.deleteTroncal = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.$transaction(async (tx) => {
            // Verificar propiedad
            const troncal = await tx.troncal.findUnique({
                where: { id },
                include: { proyecto: { select: { empresaId: true } } }
            });

            if (!troncal || troncal.proyecto.empresaId !== empresaId) {
                throw new Error("Troncal no encontrada o sin acceso");
            }

            // Eliminar en orden: cables → cajas → mufas → troncal
            await tx.tramoCable.deleteMany({
                where: {
                    OR: [
                        { mufaOrigen: { troncalId: id } },
                        { proyectoId: troncal.proyectoId }
                    ]
                }
            });

            await tx.caja.deleteMany({
                where: { mufa: { troncalId: id } }
            });

            await tx.mufa.deleteMany({
                where: { troncalId: id }
            });

            await tx.troncal.delete({ where: { id } });
        });

        res.json({
            success: true,
            message: "Troncal y toda su infraestructura eliminada correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar troncal:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error al eliminar la troncal"
        });
    }
};