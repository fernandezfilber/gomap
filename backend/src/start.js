try {
    console.log("🚀 Iniciando SupportComputer directamente...");
    // Importamos tu server.js original
    require("./server"); 
} catch (error) {
    console.error("❌ Error al cargar server.js:", error.message);
}