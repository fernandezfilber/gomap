// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();

// ==================== MIDDLEWARES ====================
app.use(cors({
    origin: ['https://demostracion.toq.life', 'http://localhost:5173', 'https://toq.life'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== RUTAS ====================
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/red', require('./routes/red.routes'));
app.use('/api/troncales', require('./routes/troncal.routes'));
app.use('/api/mufas', require('./routes/mufa.routes'));
app.use('/api/cajas', require('./routes/caja.routes'));
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/postes', require('./routes/postes.routes'));
app.use('/api/tramos', require('./routes/tramoCables.routes'));
app.use('/api/proyectos', require('./routes/proyecto.routes'));

// Ruta principal (Dashboard)
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <h1 style="font-size: 3.5rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.3rem;">Sistema GIS Activo - Nodo Chosica</p>
            <div style="margin-top: 30px; border: 1px solid #30363d; padding: 25px; border-radius: 12px; background-color: #161b22;">
                <p style="color: #7ee787; font-weight: bold;">● Base de Datos: Conectada</p>
                <p style="color: #58a6ff;">● Prisma v6.19.3</p>
                <p style="color: #ffffff; margin-top: 15px;">Líder de Proyecto: <b>Filber</b></p>
            </div>
        </div>
    `);
});

module.exports = app;