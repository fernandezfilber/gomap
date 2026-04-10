const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
    origin: ['https://demostracion.toq.life', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.use(express.json()); 

// Rutas
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/postes", require("./routes/postes.routes"));
app.use("/api/tramos", require("./routes/tramoCables.routes"));
app.use("/api/proyectos", require("./routes/proyecto.routes"));

// Dashboard Visual (Nodo Chosica)
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.2rem;">Sistema GIS Activo - Nodo Chosica</p>
            <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 450px;">
                <p style="margin: 10px 0; color: #7ee787; font-weight: bold;">● Base de Datos MySQL: Conectada</p>
                <p style="margin: 10px 0; color: #58a6ff;">● Motor: Prisma v6.19.3</p> 
                <hr style="border-color: #30363d; margin: 20px 0;">
                <p style="color: #ffffff;">Líder de Proyecto: <b>Filber</b></p>
            </div>
        </div>
    `);
});

module.exports = app; // <--- Exportación esencial