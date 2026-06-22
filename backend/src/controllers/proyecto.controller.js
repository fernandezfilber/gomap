const proyectoService = require('../services/proyecto.service');

// ====================== CREAR PROYECTO ======================
exports.crearProyecto = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const result = await proyectoService.crearProyecto(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Proyecto y troncal principal creados exitosamente",
            proyecto: result.proyecto,
            troncalInicial: result.troncal
        });
    } catch (error) {
        console.error("❌ Error al crear proyecto:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al crear el proyecto"
        });
    }
};

// ====================== LISTAR PROYECTOS ======================
exports.listarProyectos = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const proyectos = await proyectoService.listarProyectos(empresaId);
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

// ====================== OBTENER DETALLE DE PROYECTO ======================
exports.getProyectoDetalle = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const proyecto = await proyectoService.getProyectoDetalle(id, empresaId);
        res.json({ success: true, proyecto });
    } catch (error) {
        console.error("❌ Error al obtener detalle del proyecto:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al cargar el detalle del proyecto"
        });
    }
};

// ====================== ACTUALIZAR PROYECTO ======================
exports.actualizarProyecto = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const proyectoActualizado = await proyectoService.actualizarProyecto(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Proyecto actualizado correctamente",
            proyecto: proyectoActualizado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Proyecto no encontrado o sin acceso" });
        }
        console.error("❌ Error al actualizar proyecto:", error);
        res.status(500).json({ success: false, message: "Error al actualizar the proyecto" });
    }
};

// ====================== ELIMINAR PROYECTO ======================
exports.eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await proyectoService.eliminarProyecto(id, empresaId);
        res.json({
            success: true,
            message: "Proyecto eliminado correctamente"
        });
    } catch (error) {
        console.error("❌ Error al eliminar proyecto:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al eliminar el proyecto"
        });
    }

};