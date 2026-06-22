const express = require('express');
const router = express.Router();
const redCtrl = require('../controllers/red.controller'); 
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

// --- ZONA PÚBLICA (Sin Token) ---
// El bot de ventas usa estos para cerrar contratos rápido
router.post('/factibilidad', redCtrl.verificarFactibilidad);

// Aquí agregamos la nueva que creamos para direcciones de texto
router.post('/factibilidad-direccion', redCtrl.verificarFactibilidadPorDireccion); 


// --- ZONA PRIVADA (Protegida) ---
// Solo tú y tu equipo pueden ver el mapa completo de la red
router.use(verifyToken);
router.use(checkTenant);

// Trae todo el árbol: Troncales -> Mufas -> Cajas
router.get('/mapa', redCtrl.obtenerMapaRed);

module.exports = router;