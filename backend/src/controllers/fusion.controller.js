const fusionService = require('../services/fusion.service');

exports.getConexionesByNodo = async (req, res) => {
    try {
        const { nodoId, tipoNodo } = req.query;
        const conexiones = await fusionService.getConexionesByNodo(nodoId, tipoNodo);
        const splitters = await fusionService.getSplittersByNodo(nodoId, tipoNodo);
        res.json({ success: true, conexiones, splitters });
    } catch (error) {
        console.error("Error al obtener conexiones:", error);
        res.status(500).json({ success: false, message: "Error al obtener fusiones del nodo." });
    }
};

exports.createSplitter = async (req, res) => {
    try {
        const splitter = await fusionService.createSplitter(req.body);
        res.status(201).json({ success: true, splitter });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear splitter." });
    }
};

exports.createConexion = async (req, res) => {
    try {
        const conexion = await fusionService.createConexion(req.body);
        res.status(201).json({ success: true, conexion });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear fusión." });
    }
};

exports.deleteConexion = async (req, res) => {
    try {
        await fusionService.deleteConexion(req.params.id);
        res.json({ success: true, message: "Fusión eliminada." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar fusión." });
    }
};

exports.deleteSplitter = async (req, res) => {
    try {
        await fusionService.deleteSplitter(req.params.id);
        res.json({ success: true, message: "Splitter eliminado." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar splitter." });
    }
};
