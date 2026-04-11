const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');
// const { validateToken, checkRole } = require('../middleware/auth.middleware'); 
// ↑ Descomenta esto cuando quieras proteger la creación de empresas

// =============================================================
// RUTAS PARA GESTIÓN DE EMPRESAS (TENANTS)
// URL Base: /api/empresas
// =============================================================

// Crear una nueva empresa (Punto de partida del sistema)
router.post('/', empresaController.crearEmpresa);

// Obtener lista de empresas
router.get('/', empresaController.obtenerEmpresas);

// Nota: Puedes agregar rutas para obtener una sola, actualizar o eliminar después
// router.get('/:id', empresaController.obtenerEmpresaPorId);
// router.put('/:id', empresaController.actualizarEmpresa);

module.exports = router;