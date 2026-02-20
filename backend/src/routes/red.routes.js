const express = require('express');
const router = express.Router();
const redCtrl = require('../controllers/red.controller'); 

// --- MÓDULO DE INTELIGENCIA DE RED ---

// Procesa links de Google Maps o coordenadas directas para factibilidad
router.post('/factibilidad', redCtrl.verificarFactibilidad);

// Trae todo el árbol: Troncales -> Mufas -> Cajas
router.get('/mapa', redCtrl.obtenerMapaRed);

module.exports = router;