// src/server.js
const app = require('./app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PORT = Number(process.env.PORT) || 8080;

const init = async () => {
    try {
        console.log("--- Conectando a la base de datos ---");
        await prisma.$connect();
        console.log("✅ Prisma conectado correctamente");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`📡 Servidor corriendo en puerto ${PORT}`);
            console.log(`🔗 https://toq.life`);
        });

    } catch (error) {
        console.error("❌ ERROR AL INICIAR:", error.message);
        
        // Modo emergencia
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`⚠️ Servidor en MODO EMERGENCIA en puerto ${PORT}`);
        });
    }
};

module.exports = { init };