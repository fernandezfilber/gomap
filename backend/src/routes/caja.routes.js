const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

// 🔍 DEPURACIÓN: Esto imprimirá en el log de Docker qué funciones cargaron
console.log("🛠️ Funciones Caja:", Object.keys(cajaController));
console.log("🛠️ Funciones Mufa:", Object.keys(mufaController));

router.use(verifyToken);
router.use(checkTenant);

// Función auxiliar para evitar el error "argument handler must be a function"
const safeHandler = (handler, name) => {
    if (typeof handler !== 'function') {
        console.error(`❌ ERROR: La función '${name}' es undefined en el controlador.`);
        return (req, res) => res.status(500).send(`Error interno: Handler ${name} no definido`);
    }
    return handler;
};

// --- RUTAS DE CAJAS NAP ---
router.get('/', safeHandler(cajaController.getCajas, 'getCajas'));
router.post('/', safeHandler(cajaController.createCaja, 'createCaja'));
router.get('/:id', safeHandler(cajaController.getCajaById, 'getCajaById'));
router.put('/:id', safeHandler(cajaController.updateCaja, 'updateCaja'));
router.delete('/:id', safeHandler(cajaController.deleteCaja, 'deleteCaja'));

// Rutas adicionales
if (cajaController.getCajasCercanas) {
    router.get('/cercanas', cajaController.getCajasCercanas);
}

// Verifica si esta función existe en mufaController
router.get('/mufas/:mufaId/ocupados', safeHandler(cajaController.getHilosOcupados, 'getHilosOcupados'));

module.exports = router;