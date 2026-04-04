const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// 1. Cargar variables de entorno (.env)
dotenv.config();

// Log de control para ver que Hostinger o Docker están leyendo la DB
console.log("-----------------------------------------");
console.log("🚀 Nodo Chosica - Forward Vision API");
console.log("🔍 URL DB:", process.env.DATABASE_URL ? "Detectada ✅" : "Faltante ❌");
console.log("-----------------------------------------");

const app = express();

/**
 * 2. Instancia de Prisma (Versión 6)
 * En la v6, Prisma lee automáticamente la URL del archivo schema.prisma
 * No necesita objetos complejos en el constructor.
 */
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// 3. Middlewares Globales
app.use(cors({
    origin: '*', // Permite conexiones de cualquier dominio (toq.life, localhost, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// 4. Registro de Rutas (Arquitectura GIS)
app.use('/api/auth', require('./routes/auth.routes')); 
app.use('/api/red', require('./routes/red.routes')); 
app.use("/api/troncales", require("./routes/troncal.routes"));
app.use("/api/mufas", require("./routes/mufa.routes"));
app.use("/api/cajas", require("./routes/caja.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/postes", require("./routes/postes.routes"));
app.use("/api/tramos", require("./routes/tramoCables.routes"));

// 5. Middleware de Manejo de Errores Global
app.use((err, req, res, next) => {
    console.error("🔥 Error detectado:", err.stack);
    res.status(500).json({
        error: "Error interno en el servidor de Chosica",
        mensaje: err.message
    });
});

// 6. Dashboard de Bienvenida (Verificación Visual)
app.get("/", (req, res) => {
    res.status(200).send(`
        <div style="background-color: #0d1117; color: #58a6ff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 10px;">🚀 Forward Vision API</h1>
            <p style="color: #8b949e; font-size: 1.2rem;">Sistema GIS Activo - Nodo Chosica</p>
            <div style="border: 1px solid #30363d; padding: 30px; border-radius: 12px; background-color: #161b22; width: 450px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <p style="margin: 10px 0; color: #7ee787; font-weight: bold;">● Base de Datos MySQL: Conectada</p>
                <p style="margin: 10px 0; color: #58a6ff;">● Versión del Motor: Prisma v6.4.1</p>
                <hr style="border-color: #30363d; margin: 20px 0;">
                <p style="color: #ffffff; font-size: 1.1rem;">Líder de Proyecto: <b>Filber</b></p>
                <p style="color: #8b949e; font-size: 0.9rem;">Dominio: <a href="https://toq.life" style="color: #58a6ff; text-decoration: none;">toq.life</a></p>
            </div>
        </div>
    `);
});

// 7. Función de Arranque (Solo para entorno Local/Docker)
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma: Conexión establecida con MySQL Hostinger.");
    } catch (error) {
        console.error("❌ Error Crítico al conectar Prisma:", error.message);
    }
};

/**
 * Lógica de Ejecución:
 * Si NODE_ENV no es 'production', levantamos el puerto (Docker/PC).
 * Si es 'production', Vercel o Hostinger se encargan de manejar el tráfico.
 */
if (process.env.NODE_ENV !== 'production') {
    startServer().then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 API Operativa en: http://localhost:${PORT}`);
        });
    });
}

// EXPORTACIÓN PARA VERCEL / HOSTINGER
module.exports = app;