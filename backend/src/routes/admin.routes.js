const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isSuperAdmin } = require('../Middleware/auth.middleware');

// Todas las rutas de administración requieren Token y ser SUPERADMIN
router.use(verifyToken);
router.use(isSuperAdmin);

router.get('/empresas', adminController.listarEmpresas);
router.patch('/empresas/:id/bloqueo', adminController.toggleBloqueoEmpresa);
router.patch('/empresas/:id/suscripcion', adminController.actualizarSuscripcion);
router.delete('/empresas/:id', adminController.eliminarEmpresaTotal);

module.exports = router;
