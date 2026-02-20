const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// --- RUTAS DE CAJAS NAP ---

// Obtener todas las cajas (Lectura pública o protegida según prefieras)
router.get('/', cajaController.getCajas);

// NUEVA RUTA: Obtener qué hilos/salidas están ocupadas en una mufa específica
// Se usa en el frontend al seleccionar una mufa para limpiar el selector
router.get('/mufas/:mufaId/ocupados', verifyToken, cajaController.getHilosOcupados);

// Crear caja (Protegido: Solo Admin)
router.post('/', [verifyToken, isAdmin], cajaController.createCaja);

// Actualizar caja (Protegido: Solo Admin)
router.put('/:id', [verifyToken, isAdmin], cajaController.actualizarCaja);

// Eliminar caja (Protegido: Solo Admin)
router.delete('/:id', [verifyToken, isAdmin], cajaController.deleteCaja);

module.exports = router;