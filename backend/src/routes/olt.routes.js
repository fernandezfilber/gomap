const express = require('express');
const router = express.Router();
const oltController = require('../controllers/olt.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

router.get('/', oltController.getAll);
router.post('/', oltController.create);
router.get('/proyecto/:proyectoId', oltController.getByProyecto);
router.get('/:id', oltController.getById);
router.put('/:id', oltController.update);
router.delete('/:id', oltController.delete);
router.post('/:id/troncal', oltController.asignarTroncal);
router.delete('/:id/troncal/:troncalId', oltController.desasignarTroncal);

module.exports = router;
