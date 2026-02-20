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
  url: process.env.REDIS_URL || "redis://fv_redis:6379", // Usamos el nombre del servicio definido en docker-compose
});

redisClient.on("error", (err) => console.log("❌ Error en Redis:", err));

// 3. Middlewares Globales
app.use(cors()); // Permite que tu frontend en el puerto 5173 acceda sin bloqueos
app.use(express.json()); // Permite recibir el Body en formato JSON

// 4. Registro de Rutas de la API
// Asegúrate de que los archivos existan en la carpeta /src/routes/
// 4. Registro de Rutas de la API
// ... tus otros imports

// 4. Registro de Rutas de la API
app.use('/api/auth', require('./routes/auth.routes')); // <--- AGREGA ESTA LÍNEA PRIMERO
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));

// ... resto del código

// 5. Ruta de Bienvenida para verificar estado en el navegador
app.get("/", (req, res) => {
  res.status(200).send(`
    <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; text-align: center;">
      <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
      <p style="color: #8b949e; font-size: 1.2rem;">Servidor Operacional - Nodo Chosica</p>
      <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 350px;">
        <p style="margin: 10px 0;">✅ MySQL: Conectado (Prisma)</p>
        <p style="margin: 10px 0;">✅ Redis: Activo</p>
        <p style="margin: 10px 0;">✅ CORS: Configurado</p>
        <hr style="border-color: #30363d; margin: 20px 0;">
        <p style="color: #58a6ff; font-weight: bold;">Desarrollado por: Filber</p>
      </div>
    </div>
  `);
});

// 6. Función de Inicio del Servidor con Conexiones
async function startServer() {
  try {
    // Intentamos conectar a la base de datos MySQL
    await prisma.$connect();
    console.log("✅ Conexión a MySQL exitosa vía Prisma");

    // Intentamos conectar a Redis
    await redisClient.connect();
    console.log("✅ Conexión a Redis exitosa");

    // Escuchamos en 0.0.0.0 para compatibilidad total con Docker
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`📡 Forward Vision API corriendo en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error crítico al iniciar el servidor:", error);
    process.exit(1); // Cerramos el proceso si no hay conexión a DB
  }
}

startServer();