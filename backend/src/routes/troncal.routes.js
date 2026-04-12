const express = require('express');
const router = express.Router();
const troncalController = require('../controllers/troncal.controller');
const { verifyToken, checkTenant } = require('../middleware/auth.middleware');
// En src/routes/caja.routes.js
router.use(verifyToken); // 👈 Esto inyecta req.user
router.use(checkTenant); // 👈 Esto valida la empresa
// Rutas para gestionar las zonas de Forward Vision
router.post('/', troncalController.createTroncal);
router.get('/', troncalController.getTroncales);
router.put('/:id', troncalController.updateTroncal);
router.delete('/:id', troncalController.deleteTroncal);

module.exports = router;