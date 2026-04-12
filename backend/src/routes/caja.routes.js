const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');
// En src/routes/caja.routes.js

router.use(verifyToken);
router.use(checkTenant);

// --- RUTAS DE CAJAS NAP ---

// Obtener todas las cajas (Lectura pública o protegida según prefieras)
router.get('/', cajaController.getCajas);

// Consulta de hilos ocupados en la mufa
router.get('/mufas/:mufaId/ocupados', mufaController.getHilosOcupados);

// Crear caja (Protegido: Solo Admin)
router.post('/', cajaController.createCaja);

// Actualizar caja (Protegido: Solo Admin)
router.put('/:id', verifyToken, cajaController.actualizarCaja);

// Eliminar caja (Protegido: Solo Admin)
router.delete('/:id', verifyToken, cajaController.deleteCaja);

module.exports = router;