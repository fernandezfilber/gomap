const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/auth.middleware');
const croquisController = require('../controllers/croquis.controller');

router.get('/', protect, croquisController.getCroquisByEmpresa);
router.get('/:id', protect, croquisController.getCroquisById);
router.post('/', protect, croquisController.createCroquis);
router.put('/:id', protect, croquisController.updateCroquis);
router.delete('/:id', protect, croquisController.deleteCroquis);

module.exports = router;
