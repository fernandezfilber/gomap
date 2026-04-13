// src/app.js - VERSIÓN BÁSICA
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:8080',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8080',
            'https://demostracion.toq.life'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
