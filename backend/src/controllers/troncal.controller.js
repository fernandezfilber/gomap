const troncalService = require('../services/troncal.service');

// ====================== CREAR TRONCAL ======================
exports.createTroncal = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const nuevaTroncal = await troncalService.createTroncal(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Troncal creada correctamente",
            troncal: nuevaTroncal
        });
    } catch (error) {
        console.error("❌ Error al crear troncal:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al crear la troncal"
        });
    }
};

// ====================== OBTENER TODAS LAS TRONCALES ======================
exports.getTroncales = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const troncales = await troncalService.getTroncales(empresaId, proyectoId);
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
        const troncal = await troncalService.getTroncalById(id, empresaId);
        res.json({
            success: true,
            troncal
        });
    } catch (error) {
        console.error("❌ Error al obtener troncal:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al obtener detalle de la troncal"
        });
    }
};

// ====================== ACTUALIZAR TRONCAL ======================
exports.updateTroncal = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const troncalActualizada = await troncalService.updateTroncal(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Troncal actualizada correctamente",
            troncal: troncalActualizada
        });
    } catch (error) {
        console.error("❌ Error al actualizar troncal:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al actualizar la troncal"
        });
    }
};

// ====================== ELIMINAR TRONCAL ======================
exports.deleteTroncal = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await troncalService.deleteTroncal(id, empresaId);
        res.json({
            success: true,
            message: "Troncal eliminada correctamente"
        });
    } catch (error) {
        console.error("❌ Error al eliminar troncal:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al eliminar la troncal"
        });
    }

};