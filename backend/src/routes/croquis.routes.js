const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../Middleware/auth.middleware');
const croquisController = require('../controllers/croquis.controller');

router.get('/', protect, croquisController.getCroquisByEmpresa);
router.get('/cajas-cercanas', protect, croquisController.getCajasCercanasEnCroquis);
router.get('/:id', protect, croquisController.getCroquisById);
router.post('/', protect, croquisController.createCroquis);
router.post('/:id/importar', protect, isAdmin, croquisController.importarCroquis);
router.put('/:id', protect, croquisController.updateCroquis);
router.delete('/:id', protect, isAdmin, croquisController.deleteCroquis);

module.exports = router;
