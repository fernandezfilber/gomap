const express = require('express');
const router = express.Router();

// Middlewares de seguridad
const { verifyToken, checkTenant, isAdmin } = require('../Middleware/auth.middleware');
const clienteController = require('../controllers/cliente.controller');

// ==================== APLICAR MIDDLEWARES GLOBALES ====================
// Todas las rutas de clientes requieren autenticación y validación de empresa
router.use(verifyToken);
router.use(checkTenant);

// ====================== RUTAS ======================

// Crear cliente
router.post('/', clienteController.createCliente);

// Obtener todos los clientes (de su empresa)
router.get('/', clienteController.getClientes);

// Actualizar cliente (opcional, puedes activarlo)
router.put('/:id', clienteController.updateCliente);

// Eliminar cliente (libera puerto)
router.delete('/:id', isAdmin, clienteController.deleteCliente);

// Obtener historial del cliente (instalación, averías)
router.get('/:id/historial', clienteController.getHistorial);

// Opcional: Obtener un cliente específico
// router.get('/:id', clienteController.getClienteById);

module.exports = router;