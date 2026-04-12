const express = require('express');
const router = express.Router();
const redCtrl = require('../controllers/red.controller'); 
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

// --- MÓDULO DE INTELIGENCIA DE RED ---

// Procesa links de Google Maps o coordenadas directas para factibilidad
router.post('/factibilidad', redCtrl.verificarFactibilidad);

// Trae todo el árbol: Troncales -> Mufas -> Cajas
router.get('/mapa', redCtrl.obtenerMapaRed);

module.exports = router;