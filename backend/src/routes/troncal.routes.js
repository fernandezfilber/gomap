const express = require('express');
const router = express.Router();
const troncalController = require('../controllers/troncal.controller');
const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');

// Rutas para gestionar las zonas de Forward Vision
router.post('/',[verifyToken, isAdmin], troncalController.createTroncal);
router.get('/', troncalController.getTroncales);
router.put('/:id',[verifyToken, isAdmin], troncalController.updateTroncal);
router.delete('/:id',[verifyToken, isAdmin], troncalController.deleteTroncal);

module.exports = router;