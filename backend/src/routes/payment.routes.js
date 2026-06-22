const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// No requieren verifyToken para el proceso de captura si vienen de la página de bloqueado,
// pero pasamos el empresaId en el body para saber a quién activar.

router.post('/create-order', paymentController.createOrder);
router.post('/capture-order', paymentController.captureOrder);

module.exports = router;
