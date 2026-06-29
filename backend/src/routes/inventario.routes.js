const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const { protect, isAdmin } = require('../Middleware/auth.middleware');

// Todas las rutas de inventario requieren autenticación y rol de ADMIN/SUPERADMIN
router.use(protect, isAdmin);

router.get('/items', inventarioController.getItems);
router.post('/items', inventarioController.createItem);
router.put('/items/:id', inventarioController.updateItem);

router.post('/movimientos', inventarioController.registrarMovimiento);
router.get('/historial', inventarioController.getHistorial);

module.exports = router;
