const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// 1. Configuración de variables de entorno
dotenv.config();
console.log("🔍 Nodo Chosica - URL DB:", process.env.DATABASE_URL ? "Detectada ✅" : "Faltante ❌");

const app = express();

// --- CORRECCIÓN CRÍTICA PARA PRISMA 7 ---
// Inyectamos la URL manualmente en el constructor para evitar el error de "PrismaClientOptions"
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

const PORT = process.env.PORT || 5000;

// 2. Middlewares Globales
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// 3. Registro de Rutas
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/postes", require("./routes/postes.routes"));
app.use("/api/tramos", require("./routes/tramoCables.routes"));

// 4. Manejo de Errores
app.use((err, req, res, next) => {
    console.error("🔥 Error en el Servidor:", err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message
    });
});

// 5. Dashboard
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <h1>🚀 Forward Vision API</h1>
            <p>Sistema GIS Activo - Chosica (v7.6)</p>
            <div style="border: 1px solid #30363d; padding: 20px; border-radius: 8px; background-color: #161b22; margin-top: 20px;">
                <p style="color: #7ee787;">● Base de Datos MySQL: Conectada</p>
                <p style="color: #58a6ff;">Líder: Filber</p>
            </div>
        </div>
    `);
});

// 6. Arranque Condicional (Docker/Local vs Producción)
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma: DB conectada correctamente.");
    } catch (error) {
        console.error("❌ Error en conexión a DB:", error.message);
    }
};

// IMPORTANTE: Solo escuchamos el puerto si NO estamos en producción (Vercel/Hostinger manejan esto)
if (process.env.NODE_ENV !== 'production') {
    startServer().then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 Forward Vision API operativa en puerto: ${PORT}`);
        });
    });
}

// EXPORTACIÓN OBLIGATORIA
module.exports = app;