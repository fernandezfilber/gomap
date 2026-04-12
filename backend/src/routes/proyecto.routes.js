const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');
const { verifyToken, checkTenant } = require('../Middleware/auth.middleware');

// --- RUTAS DE GESTIÓN DE PROYECTOS ---
// En src/routes/caja.routes.js
router.use(verifyToken); // 👈 Esto inyecta req.user
router.use(checkTenant); // 👈 Esto valida la empresa
// 1. Listar todos los proyectos (Útil para el selector del mapa)
router.get('/', proyectoController.listarProyectos);

// 2. Obtener un proyecto con toda su infraestructura (Troncales, Cables, Mufas)
router.get('/:id',  proyectoController.getProyectoDetalle);

// 3. Crear nuevo proyecto (Solo Admins: "Proyecto Jicamarca 2026")
router.post('/',  proyectoController.crearProyecto);

// 4. Actualizar nombre o estado del proyecto
router.put('/:id', proyectoController.actualizarProyecto);

// 5. Eliminar proyecto (¡Cuidado! Borrado en cascada)
router.delete('/:id',  proyectoController.eliminarProyecto);

module.exports = router;