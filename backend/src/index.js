const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const Redis = require("redis");

// 1. Configuración de variables de entorno
dotenv.config();
dotenv.config();
console.log("🔍 URL detectada:", process.env.DATABASE_URL); // Agrega esto

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// 2. Configuración del Cliente de Redis (fv_redis es el nombre del servicio en Docker)
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL || "redis://fv_redis:6379",
});

redisClient.on("error", (err) => console.log("❌ Error en Redis:", err));

// 3. Middlewares Globales
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// 4. Registro de Rutas de la API (Arquitectura GIS completa)
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));

// 🚀 RUTAS CRÍTICAS PARA INFRAESTRUCTURA TIPO OZMAP
// Busca estas líneas en tu index.js y cámbialas así:

// 1. Cambiar 'poste.routes' por 'postes.routes' (Plural como en tu imagen)
// Línea 43
app.use("/api/postes", require("./routes/postes.routes"));

// Línea 46
app.use("/api/tramos", require("./routes/tramoCables.routes"));

// 5. Middleware de Manejo de Errores (Evita caídas del contenedor)
app.use((err, req, res, next) => {
    console.error("🔥 Error en el Servidor:", err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message
    });
});

// 6. Ruta de Bienvenida y Estado del Sistema
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.2rem;">Nodo Chosica - Sistema GIS Activo</p>
            <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 400px;">
                <p style="margin: 10px 0; color: #7ee787;">✅ Base de Datos: Conectada</p>
                <p style="margin: 10px 0; color: #7ee787;">✅ Redis Cache: Activo</p>
                <p style="margin: 10px 0; color: #7ee787;">✅ Infraestructura Física: Cargada</p>
                <hr style="border-color: #30363d; margin: 20px 0;">
                <p style="color: #58a6ff; font-weight: bold;">Líder de Proyecto: Filber</p>
            </div>
        </div>
    `);
});

// 7. Función de Inicio del Servidor con Inyección de Dependencias
async function startServer() {
    try {
        // Conexión a Postgres vía Prisma
        await prisma.$connect();
        console.log("✅ DB conectada correctamente");

        // Conexión a Redis para Cache de Mapas
        await redisClient.connect();
        console.log("✅ Redis operacional en fv_redis:6379");

        // Escucha en 0.0.0.0 para ser visible dentro de la red de Docker
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 Forward Vision API operativa en puerto: ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error crítico al iniciar Forward Vision:", error);
        process.exit(1);
    }
}

startServer();