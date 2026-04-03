const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');
const cajaController = require('../controllers/caja.controller'); // Necesario para hilos ocupados
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// --- RUTAS DE MUFAS (INFRAESTRUCTURA LÓGICA) ---

// 1. Obtener todas las mufas (Capa general del mapa)
router.get('/', mufaController.getMufas);

// 2. Obtener UNA mufa específica con sus cajas y poste (Detalle al hacer clic)
router.get('/:id', mufaController.getMufaById || mufaController.getMufas); 

// 3. NUEVA: Obtener qué puertos/hilos ya están usados en esta mufa
// Esto evita que el técnico elija un hilo que ya tiene una caja
router.get('/hilos-ocupados/:mufaId', cajaController.getHilosOcupados);

// 4. Crear mufa (Protegido)
router.post('/',  mufaController.crearMufa);

// 5. Actualizar mufa (Protegido)
router.put('/:id',  mufaController.actualizarMufa);

// 6. Eliminar mufa (Protegido)
router.delete('/:id', mufaController.eliminarMufa);

module.exports = router;