const express = require('express');
const router = express.Router();
const circuitoController = require('../controllers/circuito.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

router.get('/', circuitoController.getCircuitos);
router.get('/:id', circuitoController.getCircuitoById);
router.get('/:id/historial', circuitoController.getHistorial);
router.post('/', circuitoController.crearCircuito);
router.put('/:id', circuitoController.actualizarCircuito);
router.post('/:id/elementos', circuitoController.agregarElemento);
router.delete('/:id/elementos/:elementoId', circuitoController.eliminarElemento);

module.exports = router;
