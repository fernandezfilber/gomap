const inventarioService = require('../services/inventario.service');

exports.getItems = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const items = await inventarioService.getItems(empresaId, req.query);
        res.json({ success: true, count: items.length, items });
    } catch (error) {
        console.error('❌ Error obteniendo inventario:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener inventario' });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresaId } = req.user;
        const item = await inventarioService.getItemById(id, empresaId);
        res.json({ success: true, item });
    } catch (error) {
        console.error('❌ Error obteniendo item de inventario:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error interno al obtener item' });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const nuevoItem = await inventarioService.createItem(empresaId, req.body);
        res.status(201).json({ success: true, item: nuevoItem });
    } catch (error) {
        console.error('❌ Error creando item de inventario:', error);
        res.status(500).json({ success: false, message: 'Error interno al crear item' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresaId } = req.user;
        const actualizado = await inventarioService.updateItem(id, empresaId, req.body);
        res.json({ success: true, item: actualizado });
    } catch (error) {
        console.error('❌ Error actualizando item de inventario:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error interno al actualizar item' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresaId } = req.user;
        await inventarioService.deleteItem(id, empresaId);
        res.json({ success: true, message: 'Item eliminado' });
    } catch (error) {
        console.error('❌ Error eliminando item de inventario:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error interno al eliminar item' });
    }
};

exports.asignarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresaId } = req.user;
        const asignacion = await inventarioService.asignarItem(id, empresaId, req.body);
        res.status(201).json({ success: true, asignacion });
    } catch (error) {
        console.error('❌ Error asignando inventario:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error interno al asignar inventario' });
    }
};

exports.getAsignaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresaId } = req.user;
        const asignaciones = await inventarioService.getAsignaciones(id, empresaId);
        res.json({ success: true, asignaciones });
    } catch (error) {
        console.error('❌ Error obteniendo asignaciones de inventario:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error interno al obtener asignaciones' });
    }
};

exports.getAllAsignaciones = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const asignaciones = await inventarioService.getAllAsignaciones(empresaId);
        res.json({ success: true, count: asignaciones.length, asignaciones });
    } catch (error) {
        console.error('❌ Error obteniendo asignaciones generales de inventario:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener asignaciones' });
    }
};
