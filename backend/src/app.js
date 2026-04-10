// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');   // ← Agregado para ver logs de peticiones

const app = express();

// Middlewares
app.use(morgan('dev'));  // ← Muy útil para debugging
app.use(cors({
    origin: ['https://demostracion.toq.life', 'https://toq.life', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== RUTAS ====================

// Ruta de prueba para verificar que Express funciona
app.get("/api/test", (req, res) => {
    res.json({ message: "✅ API funcionando correctamente" });
});

// Tus rutas reales
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/red', require('./routes/red.routes'));
app.use('/api/troncales', require('./routes/troncal.routes'));
app.use('/api/mufas', require('./routes/mufa.routes'));
app.use('/api/cajas', require('./routes/caja.routes'));
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/postes', require('./routes/postes.routes'));
app.use('/api/tramos', require('./routes/tramoCables.routes'));   // ← Esta es la que estás probando
app.use('/api/proyectos', require('./routes/proyecto.routes'));

// Ruta principal
app.get("/", (req, res) => {
    res.send("<h1>✅ Forward Vision API - Running</h1>");
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        ruta: req.path
    });
});

console.log("📦 App Express cargada con todas las rutas");

module.exports = app;