const cajaService = require('../services/caja.service');

// ====================== OBTENER TODAS LAS CAJAS ======================
exports.getCajas = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const cajas = await cajaService.getCajas(empresaId, proyectoId);
        res.json({ success: true, count: cajas.length, cajas });
    } catch (error) {
        console.error("❌ Error al obtener cajas:", error);
        res.status(500).json({ success: false, message: "Error al obtener la lista de cajas" });
    }
};

// ====================== CREAR CAJA (NAP) ======================
exports.createCaja = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const nuevaCaja = await cajaService.createCaja(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Caja NAP creada con la ubicación del poste",
            caja: nuevaCaja
        });
    } catch (error) {
        console.error("❌ Error al crear caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al procesar el registro" });
    }
};

exports.getHilosOcupados = async (req, res) => {
    try {
        const { mufaId } = req.params;
        const ocupados = await cajaService.getHilosOcupados(mufaId);
        res.json({ success: true, hilosOcupados: ocupados });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al contar hilos" });
    }
};

// ====================== OBTENER DETALLE DE CAJA ======================
exports.getCajaById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const caja = await cajaService.getCajaById(id, empresaId);
        res.json({ success: true, caja });
    } catch (error) {
        console.error("❌ Error al obtener detalle del caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al obtener detalle" });
    }
};

// ====================== ACTUALIZAR CAJA ======================
exports.updateCaja = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const cajaActualizada = await cajaService.updateCaja(id, empresaId, req.body);
        res.json({ success: true, message: "Actualizado", caja: cajaActualizada });
    } catch (error) {
        console.error("❌ Error al actualizar caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al actualizar" });
    }
};

// ====================== ELIMINAR CAJA ======================
exports.deleteCaja = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await cajaService.deleteCaja(id, empresaId);
        res.json({ success: true, message: "Caja eliminada" });
    } catch (error) {
        console.error("❌ Error al eliminar caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al eliminar" });
    }

};