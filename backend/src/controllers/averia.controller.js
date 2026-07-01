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

exports.buscarInstalacionPorDni = async (req, res) => {
    try {
        const { dni } = req.params;
        const empresaId = req.user?.empresaId;
        const instalacion = await averiaService.buscarInstalacionPorDni(dni, empresaId);
        res.json({ success: true, instalacion });
    } catch (error) {
        console.error('❌ Error buscando instalación por DNI:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error buscando instalación' });
    }
};

// GUARDAR FIRMAS DIGITALES
exports.guardarFirmas = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaId = req.user?.empresaId;
        const resultado = await averiaService.guardarFirmas(id, empresaId, req.body);
        res.json({ success: true, message: 'Firmas guardadas correctamente', data: resultado });
    } catch (error) {
        console.error('❌ Error guardando firmas:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al guardar firmas' });
    }
};

// GUARDAR FOTOS DEL TICKET
exports.guardarFotos = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaId = req.user?.empresaId;
        const { fotos } = req.body; // Array of base64 images
        const resultado = await averiaService.guardarFotos(id, empresaId, fotos);
        res.json({ success: true, message: 'Fotos guardadas', data: resultado });
    } catch (error) {
        console.error('❌ Error guardando fotos:', error);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al guardar fotos' });
    }
};

// GPS: GUARDAR UBICACIÓN DEL TÉCNICO
exports.guardarUbicacion = async (req, res) => {
    try {
        const usuarioId = req.user?.id;
        const resultado = await averiaService.guardarUbicacion(usuarioId, req.body);
        res.json({ success: true, data: resultado });
    } catch (error) {
        console.error('❌ Error guardando ubicación:', error);
        res.status(500).json({ success: false, message: 'Error al guardar ubicación' });
    }
};

// GPS: OBTENER UBICACIONES DE TÉCNICOS
exports.obtenerUbicaciones = async (req, res) => {
    try {
        const empresaId = req.user?.empresaId;
        const ubicaciones = await averiaService.obtenerUbicacionesTecnicos(empresaId);
        res.json({ success: true, ubicaciones });
    } catch (error) {
        console.error('❌ Error obteniendo ubicaciones:', error);
        res.status(500).json({ success: false, message: 'Error al obtener ubicaciones' });
    }
};