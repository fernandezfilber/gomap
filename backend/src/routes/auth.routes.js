const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Ajusta la ruta si es necesario

// Ruta: POST /api/auth/login
router.post('/login', authController.login);

// Ruta: POST /api/auth/logout
router.post('/logout', authController.logout);

const { verifyToken, isAdmin } = require('../Middleware/auth.middleware');
// Ruta para registrar técnico (solo Admin)
router.post('/register-tecnico', verifyToken, isAdmin, authController.registerTecnico);
router.get('/team', verifyToken, isAdmin, authController.getTeam);

// Opcional: Ruta para crear el primer usuario (puedes borrarla luego de usarla)
router.post('/register', authController.register); 
router.post('/registro-total', authController.registroTotal);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-code', authController.resendCode);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;