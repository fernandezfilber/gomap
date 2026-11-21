// src/server.js
const app = require('./app');
const { iniciarSchedulerBackup } = require('./services/backup.service');

const PORT = Number(process.env.PORT) || 8080;

const init = async () => {
    console.log("🔌 Intentando iniciar servidor en puerto:", PORT);

    try {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✅ SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
            console.log(`🔗 https://toq.life`);

            // Iniciar scheduler de respaldo automático semanal
            iniciarSchedulerBackup();
        });
    } catch (error) {
        console.error("❌ Error al hacer listen:", error.message);
    }
};

module.exports = { init };