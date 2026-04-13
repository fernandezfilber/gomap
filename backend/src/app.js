// src/app.js - CORS Mejorado
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== CORS CONFIGURACIÓN RECOMENDADA ====================
const allowedOrigins = [
    'http://localhost:5173',      // Vite dev
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://demostracion.toq.life',     // ← Tu frontend real
    'https://www.demostracion.toq.life'  // por si acaso
];

// Para mayor flexibilidad en el futuro (subdominios)
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requests sin Origin (como Postman, mobile apps, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️ CORS bloqueado para origen: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,                    // si usas cookies o auth con credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// =====================================================================

console.log("📦 Cargando rutas...");

// Carga segura de rutas
const loadRoute = (path, name) => {
    try {
        app.use(path, require(name));
        console.log(`✅ Ruta cargada: ${path}`);
    } catch (err) {
        console.error(`❌ ERROR al cargar ${path} →`, err.message);
    }
};

loadRoute('/api/auth', './routes/auth.routes');
loadRoute('/api/empresas', './routes/empresa.routes');
loadRoute('/api/proyectos', './routes/proyecto.routes');
loadRoute('/api/postes', './routes/postes.routes');
loadRoute('/api/tramos', './routes/tramoCables.routes');
loadRoute('/api/mufas', './routes/mufa.routes');
loadRoute('/api/cajas', './routes/caja.routes');
loadRoute('/api/clientes', './routes/cliente.routes');

app.get("/", (req, res) => {
    res.send(`
        <h1>✅ Forward Vision API</h1>
        <p>Endpoints disponibles:</p>
        <ul>
            <li>/api/proyectos</li>
            <li>/api/postes</li>
            <li>/api/tramos</li>
            <li>/api/mufas</li>
            <li>/api/cajas</li>
        </ul>
    `);
});

console.log("🚀 App Express cargada correctamente");

module.exports = app;