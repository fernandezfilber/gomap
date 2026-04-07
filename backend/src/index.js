const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// 1. Cargar variables de entorno primero
dotenv.config();

// 2. Importar la instancia central de Prisma (src/db.js)
const prisma = require('./db'); 

console.log("-----------------------------------------");
console.log("🚀 Nodo Chosica - Forward Vision API");
console.log("🔍 URL DB:", process.env.DATABASE_URL ? "Detectada ✅" : "Faltante ❌");
console.log("-----------------------------------------");

const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middlewares Globales
app.use(cors({
    origin: ['https://demostracion.toq.life', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.use(express.json()); 

// 4. Registro de Rutas
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/postes", require("./routes/postes.routes"));
app.use("/api/tramos", require("./routes/tramoCables.routes"));
app.use("/api/proyectos", require("./routes/proyecto.routes"));

// 5. Manejo de Errores
app.use((err, req, res, next) => {
    console.error("🔥 Error detectado:", err.stack);
    res.status(500).json({
        error: "Error interno en el servidor de Chosica",
        mensaje: err.message
    });
});

// 6. Dashboard Visual (Actualizado a v7)
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.2rem;">Sistema GIS Activo - Nodo Chosica</p>
            <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 450px;">
                <p style="margin: 10px 0; color: #7ee787; font-weight: bold;">● Base de Datos MySQL: Conectada</p>
                <p style="margin: 10px 0; color: #58a6ff;">● Motor: Prisma v7.6.0 (Custom Build)</p> 
                <hr style="border-color: #30363d; margin: 20px 0;">
                <p style="color: #ffffff;">Líder de Proyecto: <b>Filber</b></p>
            </div>
        </div>
    `);
});

// 7. Función de Arranque Única
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma: Conexión establecida correctamente.");
    } catch (error) {
        console.error("❌ Error Crítico al conectar Prisma:", error.message);
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`📡 API Operativa en puerto: ${PORT}`);
    });
};

startServer();

module.exports = app;