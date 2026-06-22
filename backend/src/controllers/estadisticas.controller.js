const estadisticasService = require('../services/estadisticas.service');

exports.getEstadisticas = async (req, res) => {
    try {
        const empresaId = req.user?.empresaId;
        const data = await estadisticasService.getEstadisticas(empresaId);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};
