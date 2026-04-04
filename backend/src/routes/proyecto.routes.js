const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');
const { verificarToken, esAdmin } = require('../Middleware/auth.middleware');

// --- RUTAS DE GESTIÓN DE PROYECTOS ---

// 1. Listar todos los proyectos (Útil para el selector del mapa)
router.get('/', verificarToken, proyectoController.listarProyectos);

// 2. Obtener un proyecto con toda su infraestructura (Troncales, Cables, Mufas)
router.get('/:id', verificarToken, proyectoController.getProyectoDetalle);

// 3. Crear nuevo proyecto (Solo Admins: "Proyecto Jicamarca 2026")
router.post('/', [verificarToken, esAdmin], proyectoController.crearProyecto);

// 4. Actualizar nombre o estado del proyecto
router.put('/:id', [verificarToken, esAdmin], proyectoController.actualizarProyecto);

// 5. Eliminar proyecto (¡Cuidado! Borrado en cascada)
router.delete('/:id', [verificarToken, esAdmin], proyectoController.eliminarProyecto);

module.exports = router;