const app = require("./app"); // <--- Importamos el app de arriba
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");

dotenv.config();

const PORT = Number(process.env.PORT) || 8080;

const init = async () => {
    try {
        console.log("--- Iniciando Capa de Datos ---");
        await prisma.$connect();
        console.log("✅ Prisma: Conexión establecida correctamente.");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 API Operativa en puerto: ${PORT}`);
            console.log(`🔗 Acceso: https://toq.life`);
        });
    } catch (error) {
        console.error("❌ ERROR CRÍTICO AL INICIAR SERVICIOS:", error.message);
        
        // Modo emergencia: El servidor levanta aunque falle la DB para dar señales de vida
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`⚠️ Servidor en MODO EMERGENCIA en puerto ${PORT}`);
        });
    }
};

module.exports = { init };