const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const Redis = require("redis");

// 1. Configuración de variables de entorno
dotenv.config();
console.log("🔍 Nodo Chosica - URL DB:", process.env.DATABASE_URL ? "Detectada ✅" : "Faltante ❌");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// 2. Configuración de Redis (Opcional en Vercel, Requerido en Docker)
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL || "redis://fv_redis:6379",
});

redisClient.on("error", (err) => {
    if (process.env.NODE_ENV !== 'production') console.log("⚠️ Redis inactivo:", err.message);
});

// 3. Middlewares Globales
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// 4. Registro de Rutas de la API (Arquitectura GIS Forward Vision)
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/postes", require("./routes/postes.routes"));
app.use("/api/tramos", require("./routes/tramoCables.routes"));

// 5. Middleware de Manejo de Errores
app.use((err, req, res, next) => {
    console.error("🔥 Error en el Servidor:", err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message
    });
});

// 6. Ruta de Bienvenida (Dashboard de Estado)
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <h1 style="font-size: 2.5rem;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e;">Sistema GIS Activo - toq.life</p>
            <div style="border: 1px solid #30363d; padding: 20px; border-radius: 8px; background-color: #161b22; margin-top: 20px;">
                <p style="color: #7ee787;">● API Operativa</p>
                <p style="color: #58a6ff;">Líder: Filber</p>
            </div>
        </div>
    `);
});

// 7. Lógica de Arranque Dual (Docker vs Vercel)
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma: DB conectada.");
        
        // Solo conectamos Redis si no estamos en Vercel o si la URL existe
        if (process.env.NODE_ENV !== 'production' || process.env.REDIS_URL) {
            await redisClient.connect().catch(() => {});
        }
    } catch (error) {
        console.error("❌ Error en pre-arranque:", error.message);
    }
};

// Si NO estamos en producción (Vercel), levantamos el puerto manualmente (Docker)
if (process.env.NODE_ENV !== 'production') {
    startServer().then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 Forward Vision API operativa en puerto: ${PORT}`);
        });
    });
}

// EXPORTACIÓN OBLIGATORIA PARA VERCEL
module.exports = app;