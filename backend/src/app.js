// src/app.js - VERSIÓN BÁSICA
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://demostracion.toq.life'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("📦 Cargando rutas básicas...");

// Carga segura de rutas
const loadRoute = (path, name) => {
    try {
        app.use(path, require(name));
        console.log(`✅ Ruta cargada: ${path}`);
    } catch (err) {
        console.error(`❌ ERROR al cargar ${path} →`, err.message);
    }
};

// RUTAS BÁSICAS
loadRoute('/api/auth', './routes/auth.routes');
loadRoute('/api/empresas', './routes/empresa.routes');
loadRoute('/api/proyectos', './routes/proyecto.routes');
loadRoute('/api/postes', './routes/postes.routes');
loadRoute('/api/tramos', './routes/tramoCables.routes');
loadRoute('/api/mufas', './routes/mufa.routes');
loadRoute('/api/cajas', './routes/caja.routes');
loadRoute('/api/clientes', './routes/cliente.routes');

app.get("/", (req, res) => {
    res.send("<h1>✅ Forward Vision API</h1><p>Endpoints: /api/postes, /api/tramos, /api/mufas, /api/cajas, /api/clientes</p>");
});

console.log("📦 App Express cargada (modo básico)");

module.exports = app;
