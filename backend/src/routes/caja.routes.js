const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');
// En src/routes/caja.routes.js

// --- RUTAS DE CAJAS NAP ---

// Obtener todas las cajas (Lectura pública o protegida según prefieras)
// ✅ CORREGIDO: Ahora inyecta req.user para que el controlador sepa qué empresa filtrar
router.get('/', verifyToken, cajaController.getCajas);

// ✅ CORREGIDO: También protegemos la consulta de hilos
router.get('/mufas/:mufaId/ocupados', verifyToken, mufaController.getHilosOcupados);

// Crear caja (Protegido: Solo Admin)
router.post('/', verifyToken, cajaController.createCaja);

// Actualizar caja (Protegido: Solo Admin)
router.put('/:id', verifyToken, cajaController.actualizarCaja);

// Eliminar caja (Protegido: Solo Admin)
router.delete('/:id', verifyToken, cajaController.deleteCaja);

module.exports = router;