const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

// GET /api/estadisticas - Obtener estadísticas generales del sistema
router.get('/', estadisticasController.getEstadisticas);

module.exports = router;