const app = require("./app");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    console.log("--- Iniciando SupportComputer Backend ---");

    console.log("Intentando conectar a la base de datos MySQL...");
    await connectDB();
    console.log("✅ Conexión a la DB exitosa.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo oficialmente en el puerto: ${PORT}`);
      console.log(`🔗 Acceso: https://toq.life`);
    });
  } catch (error) {
    console.error("❌ ERROR CRÍTICO AL INICIAR EL SERVIDOR:");
    console.error(error.message);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `⚠️ Servidor levantado en modo emergencia (Sin DB) en puerto ${PORT}`,
      );
    });
  }
};

process.on("unhandledRejection", (err) => {
  console.log("Fallo no controlado (Promise Rejection):", err.message);
});

startServer();
