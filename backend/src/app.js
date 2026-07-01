// src/app.js - CORS Mejorado
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==================== CORS CONFIGURACION RECOMENDADA ====================
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || 
    'http://localhost,https://localhost,capacitor://localhost,http://localhost:80,http://localhost:8080,http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1,http://127.0.0.1:80,http://127.0.0.1:8080,http://127.0.0.1:5173,https://demostracion.toq.life,https://www.demostracion.toq.life,https://api-demostracion.toq.life,https://www.api-demostracion.toq.life'
).split(',').map(origin => origin.trim()).filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`CORS bloqueado para origen: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// =====================================================================

console.log("Cargando rutas...");

const loadRoute = (path, name) => {
    try {
        app.use(path, require(name));
        console.log(`Ruta cargada: ${path}`);
    } catch (err) {
        console.error(`ERROR al cargar ${path}`, err.message);
    }
};

loadRoute('/api/auth', './routes/auth.routes');
loadRoute('/api/empresas', './routes/empresa.routes');
loadRoute('/api/proyectos', './routes/proyecto.routes');
loadRoute('/api/postes', './routes/postes.routes');
loadRoute('/api/troncales', './routes/troncal.routes');
loadRoute('/api/tramos', './routes/tramoCables.routes');
loadRoute('/api/mufas', './routes/mufa.routes');
loadRoute('/api/cajas', './routes/caja.routes');
loadRoute('/api/clientes', './routes/cliente.routes');
loadRoute('/api/redes', './routes/red.routes');
loadRoute('/api/admin', './routes/admin.routes');
loadRoute('/api/payments', './routes/payment.routes');
loadRoute('/api/fusiones', './routes/fusion.routes');
loadRoute('/api/croquis', './routes/croquis.routes');
loadRoute('/api/inventario', './routes/inventario.routes');
loadRoute('/api/averias', './routes/averia.routes');

app.get("/", (req, res) => {
    res.send(`
        <h1>Forward Vision API</h1>
        <p>Endpoints disponibles:</p>
        <ul>
            <li>/api/proyectos</li>
            <li>/api/postes</li>
            <li>/api/tramos</li>
            <li>/api/mufas</li>
            <li>/api/cajas</li>
            <li>/api/clientes</li>
            <li>/api/redes</li>
            <li>/api/admin</li>
        </ul>
    `);
});

console.log("App Express cargada correctamente");

module.exports = app;
