const router = require("express").Router();
const tramoController = require("../controllers/tramoCable.controller"); // Asegúrate del punto: .controller
const { verifyToken, checkTenant } = require('../middleware/auth.middleware');
// En src/routes/caja.routes.js
router.use(verifyToken); // 👈 Esto inyecta req.user
router.use(checkTenant); // 👈 Esto valida la empresa
// 1. Obtener todos (Carga inicial del mapa)
router.get("/", tramoController.getTramos);

// 2. Crear tramo
router.post("/", tramoController.createTramo);

// 3. Obtener por ID (Si esta línea falla, es porque en el controller no se llama getTramoById)
router.get("/:id", tramoController.getTramoById); 

// 4. Actualizar
router.put("/:id", tramoController.updateTramo);

// 5. Eliminar
router.delete("/:id", tramoController.deleteTramo);

module.exports = router;