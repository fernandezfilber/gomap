const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, checkTenant, isAdmin } = require('../Middleware/auth.middleware');

// Aplicar middlewares de seguridad
router.use(verifyToken); 
router.use(checkTenant); 

// Definición de rutas corregida
router.get('/', mufaController.getMufas);
router.get('/:id', mufaController.getMufaById); 

// Cambiados para coincidir con el controlador estándar:
router.post('/', isAdmin, mufaController.createMufa);      // Antes decía crearMufa
router.put('/:id', isAdmin, mufaController.updateMufa);    // Antes decía actualizarMufa
router.delete('/:id', isAdmin, mufaController.deleteMufa); // Antes decía eliminarMufa

// Si necesitas esta ruta, asegúrate de que exista en el controlador
// router.get('/hilos-ocupados/:mufaId', mufaController.getHilosOcupados); 

module.exports = router;