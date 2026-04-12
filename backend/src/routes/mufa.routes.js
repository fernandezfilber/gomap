const express = require('express');
const router = express.Router();
const mufaController = require('../controllers/mufa.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');
// En src/routes/caja.routes.js
// En src/routes/caja.routes.js
router.use(verifyToken); // 👈 Esto inyecta req.user
router.use(checkTenant); // 👈 Esto valida la empresa
// Sin middlewares por ahora para probar
router.get('/', mufaController.getMufas);
router.get('/hilos-ocupados/:mufaId', mufaController.getHilosOcupados);
router.get('/:id', mufaController.getMufaById); 

router.post('/', mufaController.crearMufa);
router.put('/:id', mufaController.actualizarMufa); // <--- LÍNEA 18
router.delete('/:id', mufaController.eliminarMufa);

module.exports = router;