const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// Todas las rutas de administración requieren Token y ser ADMIN
router.use(verifyToken);
router.use(isAdmin);

router.get('/empresas', adminController.listarEmpresas);
router.patch('/empresas/:id/bloqueo', adminController.toggleBloqueoEmpresa);
router.patch('/empresas/:id/suscripcion', adminController.actualizarSuscripcion);
router.delete('/empresas/:id', adminController.eliminarEmpresaTotal);

module.exports = router;
