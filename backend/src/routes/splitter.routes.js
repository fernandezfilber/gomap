const express = require('express');
const router = express.Router();
const splitterController = require('../controllers/splitter.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

router.get('/', splitterController.getAll);
router.post('/', splitterController.create);
router.get('/:id', splitterController.getById);
router.get('/:id/salidas', splitterController.getSalidas);
router.put('/:id', splitterController.update);
router.delete('/:id', splitterController.delete);
router.post('/:id/conectar', splitterController.conectarSalida);
router.post('/:id/desconectar', splitterController.desconectarSalida);
router.patch('/:id/salida/:numeroSalida/estado', splitterController.cambiarEstadoSalida);
router.get('/:id/salidas-disponibles', splitterController.getSalidasDisponibles);

module.exports = router;
