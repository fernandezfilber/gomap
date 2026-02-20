const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Ajusta la ruta si es necesario

// Ruta: POST /api/auth/login
router.post('/login', authController.login);

// Opcional: Ruta para crear el primer usuario (puedes borrarla luego de usarla)
// router.post('/register', authController.register); 

module.exports = router;