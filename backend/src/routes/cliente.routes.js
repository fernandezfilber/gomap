const express = require('express');
const router = express.Router();
// Importante: El nombre del archivo en require debe ser idéntico al creado arriba
const clienteController = require('../controllers/cliente.controller');

router.post('/', clienteController.createCliente);
router.get('/', clienteController.getClientes);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;