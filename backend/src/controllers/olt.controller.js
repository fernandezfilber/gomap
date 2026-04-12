const { prisma } = require('../config/db');

// ====================== OBTENER TODOS LOS OLTs (Solo de su empresa) ======================
exports.getAll = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const olts = await prisma.oLT.findMany({
            where: {
                proyecto: {
                    empresaId
                }
            },
            include: {
                proyecto: {
                    select: { id: true, nombre: true }
                },
                _count: {
                    select: { troncales: true }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: olts.length,
            olts
        });

    } catch (error) {
        console.error("❌ Error al obtener OLTs:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de OLTs"
        });
    }
};

// ====================== CREAR OLT ======================
exports.create = async (req, res) => {
    try {
        const {
            nombre,
            marca,
            modelo,
            ipGestion,
            ubicacion,
            puertos,
            latitud,
            longitud,
            proyectoId
        } = req.body;

        const { empresaId } = req.user;

        // Validaciones
        if (!nombre || !proyectoId) {
            return res.status(400).json({
                success: false,
                message: "Nombre y proyectoId son obligatorios"
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

        const nuevoOLT = await prisma.oLT.create({
            data: {
                nombre,
                marca: marca || null,
                modelo: modelo || null,
                ipGestion: ipGestion || null,
                ubicacion: ubicacion || null,
                puertos: puertos ? parseInt(puertos) : 16,
                latitud: latitud ? parseFloat(latitud) : null,
                longitud: longitud ? parseFloat(longitud) : null,
                proyectoId
            },
            include: {
                proyecto: { select: { nombre: true } }
            }
        });

        res.status(201).json({
            success: true,
            message: "OLT creado correctamente",
            olt: nuevoOLT
        });

    } catch (error) {
        console.error("❌ Error al crear OLT:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el OLT",
            error: error.message
        });
    }
};

// ====================== OBTENER OLT POR ID ======================
exports.getById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const olt = await prisma.oLT.findUnique({
            where: { id },
            include: {
                proyecto: {
                    select: { id: true, nombre: true, empresaId: true }
                },
                troncales: {
                    include: {
                        _count: {
                            select: { mufas: true, hilos: true }
                        }
                    },
                    orderBy: { creadoEn: 'desc' }
                }
            }
        });

        if (!olt) {
            return res.status(404).json({
                success: false,
                message: "OLT no encontrado"
            });
        }

        // Verificar que pertenezca a la empresa del usuario
        if (olt.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este OLT"
            });
        }

        res.json({
            success: true,
            olt
        });

    } catch (error) {
        console.error("❌ Error al obtener OLT:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el OLT"
        });
    }
};

// ====================== ACTUALIZAR OLT ======================
exports.update = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        marca,
        modelo,
        ipGestion,
        ubicacion,
        puertos,
        latitud,
        longitud,
        activo
    } = req.body;
    const { empresaId } = req.user;

    try {
        // Verificar que el OLT existe y pertenece a la empresa
        const oltExistente = await prisma.oLT.findUnique({
            where: { id },
            include: {
                proyecto: { select: { empresaId: true } }
            }
        });

        if (!oltExistente) {
            return res.status(404).json({
                success: false,
                message: "OLT no encontrado"
            });
        }

        if (oltExistente.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este OLT"
            });
        }

        const oltActualizado = await prisma.oLT.update({
            where: { id },
            data: {
                nombre: nombre || undefined,
                marca: marca !== undefined ? marca : undefined,
                modelo: modelo !== undefined ? modelo : undefined,
                ipGestion: ipGestion !== undefined ? ipGestion : undefined,
                ubicacion: ubicacion !== undefined ? ubicacion : undefined,
                puertos: puertos ? parseInt(puertos) : undefined,
                latitud: latitud !== undefined ? parseFloat(latitud) : undefined,
                longitud: longitud !== undefined ? parseFloat(longitud) : undefined,
                activo: activo !== undefined ? activo : undefined
            },
            include: {
                proyecto: { select: { nombre: true } }
            }
        });

        res.json({
            success: true,
            message: "OLT actualizado correctamente",
            olt: oltActualizado
        });

    } catch (error) {
        console.error("❌ Error al actualizar OLT:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el OLT"
        });
    }
};

// ====================== ELIMINAR OLT (Con validaciones) ======================
exports.delete = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        // Verificar que el OLT existe y pertenece a la empresa
        const olt = await prisma.oLT.findUnique({
            where: { id },
            include: {
                proyecto: { select: { empresaId: true } },
                _count: { select: { troncales: true } }
            }
        });

        if (!olt) {
            return res.status(404).json({
                success: false,
                message: "OLT no encontrado"
            });
        }

        if (olt.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este OLT"
            });
        }

        // Verificar que no tenga troncales conectadas
        if (olt._count.troncales > 0) {
            return res.status(400).json({
                success: false,
                message: `No se puede eliminar el OLT porque tiene ${olt._count.troncales} troncales conectadas. Elimina las troncales primero.`
            });
        }

        await prisma.oLT.delete({ where: { id } });

        res.json({
            success: true,
            message: "OLT eliminado correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar OLT:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el OLT"
        });
    }
};

// ====================== OBTENER OLTs POR PROYECTO ======================
exports.getByProyecto = async (req, res) => {
    const { proyectoId } = req.params;
    const { empresaId } = req.user;

    try {
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

        const olts = await prisma.oLT.findMany({
            where: { proyectoId },
            include: {
                _count: { select: { troncales: true } }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: olts.length,
            olts
        });

    } catch (error) {
        console.error("❌ Error al obtener OLTs del proyecto:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los OLTs del proyecto"
        });
    }
};

// ====================== ASIGNAR TRONCAL A OLT ======================
exports.asignarTroncal = async (req, res) => {
    const { id } = req.params; // OLT ID
    const { troncalId } = req.body;
    const { empresaId } = req.user;

    try {
        // Verificar OLT
        const olt = await prisma.oLT.findUnique({
            where: { id },
            include: {
                proyecto: { select: { empresaId: true } },
                _count: { select: { troncales: true } }
            }
        });

        if (!olt || olt.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este OLT"
            });
        }

        // Verificar capacidad del OLT
        if (olt._count.troncales >= olt.puertos) {
            return res.status(400).json({
                success: false,
                message: `El OLT ha alcanzado su capacidad máxima de ${olt.puertos} puertos`
            });
        }

        // Verificar troncal
        const troncal = await prisma.troncal.findUnique({
            where: { id: troncalId },
            include: {
                proyecto: { select: { empresaId: true } }
            }
        });

        if (!troncal || troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a esta troncal"
            });
        }

        // Asignar troncal al OLT
        const troncalActualizada = await prisma.troncal.update({
            where: { id: troncalId },
            data: { oltId: id }
        });

        res.json({
            success: true,
            message: "Troncal asignada al OLT correctamente",
            troncal: troncalActualizada
        });

    } catch (error) {
        console.error("❌ Error al asignar troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al asignar la troncal al OLT"
        });
    }
};

// ====================== DESASIGNAR TRONCAL DE OLT ======================
exports.desasignarTroncal = async (req, res) => {
    const { id } = req.params; // OLT ID
    const { troncalId } = req.body;
    const { empresaId } = req.user;

    try {
        // Verificar que la troncal pertenezca al OLT y a la empresa
        const troncal = await prisma.troncal.findUnique({
            where: { id: troncalId },
            include: {
                proyecto: { select: { empresaId: true } },
                olt: { select: { id: true } }
            }
        });

        if (!troncal || troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a esta troncal"
            });
        }

        if (!troncal.olt || troncal.olt.id !== id) {
            return res.status(400).json({
                success: false,
                message: "Esta troncal no está asignada a este OLT"
            });
        }

        // Desasignar
        await prisma.troncal.update({
            where: { id: troncalId },
            data: { oltId: null }
        });

        res.json({
            success: true,
            message: "Troncal desasignada del OLT correctamente"
        });

    } catch (error) {
        console.error("❌ Error al desasignar troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al desasignar la troncal del OLT"
        });
    }
};
