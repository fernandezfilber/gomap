const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');

// Sin middlewares por ahora para probar
router.get('/', mufaController.getMufas);
router.get('/:id', mufaController.getMufaById); 
router.get('/hilos-ocupados/:mufaId', mufaController.getHilosOcupados);
router.post('/', mufaController.crearMufa);
router.put('/:id', mufaController.actualizarMufa); // <--- LÍNEA 18
router.delete('/:id', mufaController.eliminarMufa);

module.exports = router;