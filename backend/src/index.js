const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const Redis = require("redis");

// 1. Configuración de variables de entorno
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// 2. Configuración del Cliente de Redis
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL || "redis://fv_redis:6379",
});

redisClient.on("error", (err) => console.log("❌ Error en Redis:", err));

// 3. Middlewares Globales
// ✅ LIMPIEZA: Se eliminaron las líneas repetidas de app.use(cors) y app.use(express.json)
app.use(cors({
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// 4. Registro de Rutas de la API
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));

// 5. Ruta de Bienvenida
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.2rem;">Servidor Operacional - Nodo Chosica</p>
            <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 350px;">
                <p style="margin: 10px 0;">✅ Base de Datos: Conectada</p>
                <p style="margin: 10px 0;">✅ Redis: Activo</p>
                <p style="margin: 10px 0;">✅ CORS: Configurado</p>
                <hr style="border-color: #30363d; margin: 20px 0;">
                <p style="color: #58a6ff; font-weight: bold;">Desarrollado por: Filber</p>
            </div>
        </div>
    `);
});

// 6. Función de Inicio del Servidor
async function startServer() {
    try {
        await prisma.$connect();
        console.log("✅ Conexión a Base de Datos exitosa vía Prisma");

        await redisClient.connect();
        console.log("✅ Conexión a Redis exitosa");

        // ✅ MODIFICACIÓN: Cambiamos el log para que no diga "localhost" en la nube
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 Forward Vision API escuchando en el puerto: ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error crítico al iniciar el servidor:", error);
        process.exit(1);
    }
}

startServer();