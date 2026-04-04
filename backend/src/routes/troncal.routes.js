const express = require('express');
const router = express.Router();
const troncalController = require('../controllers/troncal.controller');
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// Rutas para gestionar las zonas de Forward Vision
router.post('/', troncalController.createTroncal);
router.get('/', troncalController.getTroncales);
router.put('/:id', troncalController.updateTroncal);
router.delete('/:id', troncalController.deleteTroncal);

module.exports = router;