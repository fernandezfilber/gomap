const { init } = require("./server");

console.log("🚀 Iniciando SupportComputer directamente desde start.js...");

// Manejo de errores globales para que el VPS no se caiga sin avisar
process.on("unhandledRejection", (err) => {
    console.error("❌ Fallo no controlado (Promise):", err.message);
});

init();