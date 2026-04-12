const express = require('express');
const router = express.Router();
const hiloController = require('../controllers/hiloFibra.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

// Hilos de fibra óptica
router.get('/', hiloController.getAll);
router.get('/troncal/:troncalId', hiloController.getByTroncal);
router.get('/:id/historial', hiloController.getHistorial);
router.get('/:id', hiloController.getById);
router.post('/:id/conectar', hiloController.conectar);
router.post('/:id/desconectar', hiloController.desconectar);
router.patch('/:id/estado', hiloController.cambiarEstado);
router.get('/estadisticas/general', hiloController.getEstadisticas);

module.exports = router;
