const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// --- RUTAS DE MUFAS (HILOS) ---

// Obtener todas las mufas
// Nota: Ahora el controlador devolverá automáticamente el conteo de hilos libres
router.get('/', mufaController.getMufas);

// Crear una nueva mufa (Protegido: Solo administradores)
// Generará el código automático tipo CHO-BAZ-HVE
router.post('/', [verifyToken], mufaController.crearMufa);

// Actualizar datos de la mufa (Protegido: Solo administradores)
router.put('/:id', [verifyToken], mufaController.actualizarMufa);

// Eliminar mufa (Protegido: Solo administradores)
router.delete('/:id', [verifyToken], mufaController.eliminarMufa);

module.exports = router;