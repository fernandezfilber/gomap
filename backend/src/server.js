// src/server.js
const app = require('./app');

const PORT = Number(process.env.PORT) || 8080;

const init = async () => {
    console.log("🔌 Intentando iniciar servidor en puerto:", PORT);

    try {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✅ SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
            console.log(`🔗 https://toq.life`);
        });
    } catch (error) {
        console.error("❌ Error al hacer listen:", error.message);
    }
};

module.exports = { init };