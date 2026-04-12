const { prisma } = require('../config/db'); // 👈 Verifica que la carpeta sea 'config'
// ====================== CREAR PROYECTO ======================
exports.crearProyecto = async (req, res) => {
    console.log("--- 🛰️ CREANDO PROYECTO ---");

    try {
        const { nombre, descripcion, estado } = req.body;
        const { empresaId } = req.user;   // ← Viene del middleware

        if (!nombre) {
            return res.status(400).json({ 
                success: false, 
                message: "El nombre del proyecto es obligatorio" 
            });
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const proyectoCreado = await tx.proyecto.create({
                data: {
                    nombre,
                    descripcion,
                    estado: estado || "PLANIFICACION",
                    empresaId   // ← Seguridad: siempre asignado a la empresa del usuario
                },
                include: {
                    empresa: {
                        select: { nombre: true }
                    }
                }
            });

            const troncalInicial = await tx.troncal.create({
                data: {
                    nombre: `Troncal Principal ${nombre} ${Date.now().toString().slice(-4)}`,
                    bufferColor: '#3b82f6',
                    cantHilos: 96,
                    hilosLibres: 96,
                    descripcion: `Troncal inicial del proyecto ${nombre}`,
                    ruta: '',
                    proyectoId: proyectoCreado.id
                }
            });

            return { proyecto: proyectoCreado, troncal: troncalInicial };
        });

        console.log(`✅ Proyecto creado: ${resultado.proyecto.nombre} (ID: ${resultado.proyecto.id})`);
        console.log(`✅ Troncal inicial creada: ${resultado.troncal.nombre} (ID: ${resultado.troncal.id})`);

        res.status(201).json({
            success: true,
            message: "Proyecto creado exitosamente",
            proyecto: resultado.proyecto,
            troncal: resultado.troncal
        });

    } catch (error) {
        console.error("❌ Error al crear proyecto:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el proyecto",
            error: error.message
        });
    }
};

// ====================== LISTAR PROYECTOS (Solo de su empresa) ======================
exports.listarProyectos = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const proyectos = await prisma.proyecto.findMany({
            where: { empresaId },   // ← Filtrado por empresa
            include: {
                _count: {
                    select: {
                        troncales: true,
                        tramos: true
                    }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: proyectos.length,
            proyectos
        });

    } catch (error) {
        console.error("❌ Error al listar proyectos:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de proyectos"
        });
    }
};

// ====================== OBTENER DETALLE DE UN PROYECTO ======================
exports.getProyectoDetalle = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const proyecto = await prisma.proyecto.findUnique({
            where: { 
                id,
                empresaId   // ← Seguridad: solo puede ver proyectos de su empresa
            },
            include: {
                troncales: {
                    include: {
                        _count: { select: { mufas: true } }
                    }
                },
                tramos: {
                    include: {
                        posteInicio: { select: { codigo: true, latitud: true, longitud: true } },
                        posteFin:    { select: { codigo: true, latitud: true, longitud: true } }
                    }
                }
            }
        });

        if (!proyecto) {
            return res.status(404).json({
                success: false,
                message: "Proyecto no encontrado o no tienes acceso"
            });
        }

        res.json({
            success: true,
            proyecto
        });

    } catch (error) {
        console.error("❌ Error al obtener detalle del proyecto:", error);
        res.status(500).json({
            success: false,
            message: "Error al cargar el detalle del proyecto"
        });
    }
};

// ====================== ACTUALIZAR PROYECTO ======================
exports.actualizarProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    const { empresaId } = req.user;

    try {
        const proyectoActualizado = await prisma.proyecto.update({
            where: { 
                id,
                empresaId   // ← Seguridad
            },
            data: { nombre, descripcion, estado }
        });

        res.json({
            success: true,
            message: "Proyecto actualizado correctamente",
            proyecto: proyectoActualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Proyecto no encontrado o sin acceso"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al actualizar el proyecto"
        });
    }
};

// ====================== ELIMINAR PROYECTO ======================
exports.eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.proyecto.delete({
            where: { 
                id,
                empresaId   // ← Seguridad
            }
        });

        res.json({
            success: true,
            message: "Proyecto y toda su infraestructura eliminados correctamente"
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Proyecto no encontrado o sin acceso"
            });
        }
        console.error("❌ Error al eliminar proyecto:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el proyecto"
        });
    }
};