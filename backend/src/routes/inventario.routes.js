const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

router.get('/asignaciones', inventarioController.getAllAsignaciones);
router.get('/', inventarioController.getItems);
router.get('/:id', inventarioController.getItemById);
router.post('/', inventarioController.createItem);
router.put('/:id', inventarioController.updateItem);
router.delete('/:id', inventarioController.deleteItem);
router.post('/:id/asignar', inventarioController.asignarItem);
router.get('/:id/asignaciones', inventarioController.getAsignaciones);

module.exports = router;
