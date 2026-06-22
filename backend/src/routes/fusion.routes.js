const express = require('express');
const router = express.Router();
const { auth } = require('../Middleware/auth');
const fusionController = require('../controllers/fusion.controller');

router.get('/', auth, fusionController.getConexionesByNodo);
router.post('/conexion', auth, fusionController.createConexion);
router.delete('/conexion/:id', auth, fusionController.deleteConexion);

router.post('/splitter', auth, fusionController.createSplitter);
router.delete('/splitter/:id', auth, fusionController.deleteSplitter);

module.exports = router;
