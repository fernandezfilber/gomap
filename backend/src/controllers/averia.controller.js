const averiaService = require('../services/averia.service');

// 1. CREAR AVERÍA: Apertura de ticket de soporte
exports.crearAveria = async (req, res) => {
    try {
        const empresaId = req.user?.empresaId;
        const nuevaAveria = await averiaService.crearAveria(empresaId, req.body);
        res.status(201).json({
            mensaje: "Ticket de avería generado con éxito",
            averia: nuevaAveria
        });
    } catch (error) {
        console.error("❌ Error al crear avería:", error.message);
        res.status(500).json({ error: "No se pudo crear el ticket de soporte" });
    }
};

// 2. LISTAR PENDIENTES: Con trazabilidad de red para diagnóstico rápido
exports.listarAveriasPendientes = async (req, res) => {
    try {
        const empresaId = req.user?.empresaId;
        const averias = await averiaService.listarAveriasPendientes(empresaId);
        res.json({ success: true, count: averias.length, averias });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lista de soporte" });
    }
};

// 3. ACTUALIZAR ESTADO (Manejo del flujo de trabajo del técnico)
exports.actualizarEstadoAveria = async (req, res) => {
    const { id } = req.params;
    try {
        const empresaId = req.user?.empresaId;
        const actualizada = await averiaService.actualizarEstadoAveria(id, empresaId, req.body);
        res.json({ success: true, message: `Ticket actualizado`, data: actualizada });
    } catch (error) {
        console.error('❌ Error actualizando avería:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al actualizar el ticket' });
    }
};

exports.agregarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user?.id;
        const empresaId = req.user?.empresaId;
        const nota = await averiaService.agregarNota(id, usuarioId, empresaId, req.body);
        res.status(201).json({ success: true, nota });
    } catch (error) {
        console.error('❌ Error agregando nota de avería:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al agregar nota' });
    }
};

exports.getNotas = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaId = req.user?.empresaId;
        const notas = await averiaService.getNotas(id, empresaId);
        res.json({ success: true, notas });
    } catch (error) {
        console.error('❌ Error obteniendo notas de avería:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al obtener notas' });
    }
};