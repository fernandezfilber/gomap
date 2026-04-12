// src/app.js - VERSIÓN SEGURA PARA DEBUG
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: 'https://demostracion.toq.life', // Tu URL de Hostinger
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("📦 Cargando rutas...");

// Ruta de prueba
app.get("/api/test", (req, res) => res.json({ ok: true, message: "API viva" }));

// Carga segura de rutas (con try-catch)
const loadRoute = (path, name) => {
    try {
        app.use(path, require(name));
        console.log(`✅ Ruta cargada: ${path}`);
    } catch (err) {
        console.error(`❌ ERROR al cargar ${path} →`, err.message);
    }
};

// Carga una por una
loadRoute('/api/empresas', './routes/empresa.routes');
loadRoute('/api/auth', './routes/auth.routes');
loadRoute('/api/red', './routes/red.routes');
loadRoute('/api/troncales', './routes/troncal.routes');
loadRoute('/api/mufas', './routes/mufa.routes');
loadRoute('/api/cajas', './routes/caja.routes');
loadRoute('/api/clientes', './routes/cliente.routes');
loadRoute('/api/postes', './routes/postes.routes');
loadRoute('/api/tramos', './routes/tramoCables.routes');
loadRoute('/api/proyectos', './routes/proyecto.routes');
loadRoute('/api/estadisticas', './routes/estadisticas.routes');
loadRoute('/api/hilos', './routes/hiloFibra.routes');
loadRoute('/api/splitters', './routes/splitter.routes');
loadRoute('/api/olts', './routes/olt.routes');
loadRoute('/api/averias', './routes/averia.routes');
loadRoute('/api/circuitos', './routes/circuito.routes');
loadRoute('/api/inventario', './routes/inventario.routes');

app.get("/", (req, res) => {
    res.send("<h1>✅ API Running (Modo Debug)</h1>");
});

console.log("📦 App Express cargada (modo seguro)");

module.exports = app;