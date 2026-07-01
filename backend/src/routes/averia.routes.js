const express = require('express');
const router = express.Router();
const averiaController = require('../controllers/averia.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

router.use(verifyToken);
router.use(checkTenant);

router.post('/', averiaController.crearAveria);
router.get('/', averiaController.listarAveriasPendientes);
router.put('/:id/estado', averiaController.actualizarEstadoAveria);
router.get('/buscar-instalacion/:dni', averiaController.buscarInstalacionPorDni);
router.post('/:id/notas', averiaController.agregarNota);
router.get('/:id/notas', averiaController.getNotas);
router.put('/:id/firmas', averiaController.guardarFirmas);
router.put('/:id/fotos', averiaController.guardarFotos);
router.post('/ubicacion', averiaController.guardarUbicacion);
router.get('/ubicaciones', averiaController.obtenerUbicaciones);

module.exports = router;
