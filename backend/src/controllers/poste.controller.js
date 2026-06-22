const posteService = require('../services/poste.service');

// ====================== OBTENER TODOS LOS POSTES ======================
exports.getPostes = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const postes = await posteService.getPostes(empresaId, proyectoId);
        res.json({
            success: true,
            count: postes.length,
            postes
        });
    } catch (error) {
        console.error("❌ Error al obtener postes:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al obtener la lista de postes"
        });
    }
};

// ====================== CREAR POSTE ======================
exports.createPoste = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const nuevoPoste = await posteService.createPoste(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Poste creado correctamente",
            poste: nuevoPoste
        });
    } catch (error) {
        console.error("❌ Error al crear poste:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: "Ya existe un poste con ese código" });
        }
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al crear el poste"
        });
    }
};

// ====================== OBTENER DETALLE DE UN POSTE ======================
exports.getPosteWithEquipos = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const poste = await posteService.getPosteWithEquipos(id, empresaId);
        res.json({ success: true, poste });
    } catch (error) {
        console.error("❌ Error al obtener detalle del poste:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al obtener el detalle" });
    }
};

// ====================== ACTUALIZAR POSTE ======================
exports.updatePoste = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const posteActualizado = await posteService.updatePoste(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Poste actualizado correctamente",
            poste: posteActualizado
        });
    } catch (error) {
        console.error("❌ Error al actualizar poste:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al actualizar el poste" });
    }
};

// ====================== ELIMINAR POSTE ======================
exports.deletePoste = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await posteService.deletePoste(id, empresaId);
        res.json({ success: true, message: "Poste eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar poste:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error en el servidor al intentar eliminar" });
    }

};