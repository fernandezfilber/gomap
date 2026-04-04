const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');
// Quitamos el import de cajaController si ya movimos la lógica a mufa.controller
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// 1. Obtener todas
router.get('/', mufaController.getMufas);

// 2. Obtener UNA (Elimina el "||", debe ser directo)
router.get('/:id', mufaController.getMufaById); 

// 3. Obtener ocupados (Usa el del mufaController que ya incluimos)
router.get('/hilos-ocupados/:mufaId', mufaController.getHilosOcupados);

// 4. Crear, Actualizar y Eliminar
router.post('/', mufaController.crearMufa);
router.put('/:id', mufaController.actualizarMufa);
router.delete('/:id', mufaController.eliminarMufa);

module.exports = router;