const mufaService = require('../services/mufa.service');

// ====================== OBTENER TODAS LAS MUFAS ======================
exports.getMufas = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const mufas = await mufaService.getMufas(empresaId, proyectoId);
        res.json({
            success: true,
            count: mufas.length,
            mufas
        });
    } catch (error) {
        console.error("❌ Error al obtener mufas:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de mufas"
        });
    }
};

// ====================== CREAR MUFA ======================
exports.createMufa = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const result = await mufaService.createMufa(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Mufa creada correctamente",
            mufa: result
        });
    } catch (error) {
        console.error("❌ Error al crear mufa:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al crear la mufa"
        });
    }
};

// ====================== OBTENER MUFA POR ID ======================
exports.getMufaById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const result = await mufaService.getMufaById(id, empresaId);
        res.json({ success: true, mufa: result });
    } catch (error) {
        console.error("❌ Error al obtener mufa:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al obtener detalle de la mufa" });
    }
};

// ====================== ACTUALIZAR MUFA ======================
exports.updateMufa = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const mufaActualizada = await mufaService.updateMufa(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Mufa actualizada correctamente",
            mufa: mufaActualizada
        });
    } catch (error) {
        console.error("❌ Error al actualizar mufa:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al actualizar la mufa"
        });
    }
};

// ====================== ELIMINAR MUFA ======================
exports.deleteMufa = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await mufaService.deleteMufa(id, empresaId);
        res.json({
            success: true,
            message: "Mufa eliminada correctamente"
        });
    } catch (error) {
        console.error("❌ Error al eliminar mufa:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al eliminar la mufa"
        });
    }

};