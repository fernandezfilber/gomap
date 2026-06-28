const router = require("express").Router();
const posteController = require("../controllers/poste.controller");
// const { verifyToken, isAdmin } = require("../middlewares/auth.middleware"); // Descomenta cuando actives JWT
const { verifyToken, checkTenant, isAdmin } = require('../Middleware/auth.middleware');

// --- RUTAS DE POSTES ---

router.use((req, res, next) => {
    console.log('📍 [postes.routes] request:', req.method, req.originalUrl, 'auth:', Boolean(req.headers.authorization));
    next();
});

router.use(verifyToken); // 👈 Esto inyecta req.user
router.use(checkTenant); // 👈 Esto valida la empresa
// 1. Obtener todos los postes (para cargar la capa en el mapa)
router.get("/", posteController.getPostes);

// 2. Crear un nuevo poste (al hacer clic en un área vacía del mapa)
router.post("/", isAdmin, posteController.createPoste);

// 3. Obtener un poste específico con sus mufas y cajas (al hacer clic en un icono de poste)
router.get("/:id", posteController.getPosteWithEquipos);

// 4. Actualizar datos de un poste (mover ubicación o cambiar tipo/altura)
router.put("/:id", isAdmin, posteController.updatePoste);

// 5. Eliminar poste (Solo Admin - Cuidado: revisa si tiene equipos antes)
router.delete("/:id", isAdmin, posteController.deletePoste);

module.exports = router;