const tramoCableService = require('../services/tramoCable.service');

// ====================== OBTENER TODOS LOS TRAMOS ======================
exports.getTramos = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const tramos = await tramoCableService.getTramos(empresaId, proyectoId);
        res.json({
            success: true,
            count: tramos.length,
            tramos
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
        const { empresaId, id: usuarioId } = req.user;
        const tramo = await tramoCableService.createTramo(empresaId, usuarioId, req.body);
        res.status(201).json({
            success: true,
            message: "Tramo de fibra creado correctamente",
            tramo
        });
    } catch (error) {
        console.error("❌ Error al crear tramo:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al crear el tramo de fibra"
        });
    }
};

// ====================== OBTENER TRAMO POR ID ======================
exports.getTramoById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const tramo = await tramoCableService.getTramoById(id, empresaId);
        res.json({
            success: true,
            tramo
        });
    } catch (error) {
        console.error("❌ Error al obtener tramo:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al obtener el tramo"
        });
    }
};

// ====================== ACTUALIZAR TRAMO ======================
exports.updateTramo = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const tramoActualizado = await tramoCableService.updateTramo(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Tramo actualizado correctamente",
            tramo: tramoActualizado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Tramo no encontrado o sin acceso" });
        }
        console.error("❌ Error al actualizar tramo:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al actualizar el tramo" });
    }
};

// ====================== ELIMINAR TRAMO ======================
exports.deleteTramo = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await tramoCableService.deleteTramo(id, empresaId);
        res.json({
            success: true,
            message: "Tramo eliminado correctamente"
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Tramo no encontrado o sin acceso" });
        }
        console.error("❌ Error al eliminar tramo:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al eliminar el tramo" });
    }

};