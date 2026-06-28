const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../Middleware/auth.middleware');
const fusionController = require('../controllers/fusion.controller');

router.get('/', protect, fusionController.getConexionesByNodo);
router.post('/conexion', protect, isAdmin, fusionController.createConexion);
router.delete('/conexion/:id', protect, isAdmin, fusionController.deleteConexion);

router.post('/splitter', protect, isAdmin, fusionController.createSplitter);
router.delete('/splitter/:id', protect, isAdmin, fusionController.deleteSplitter);

module.exports = router;
