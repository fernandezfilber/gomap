const redService = require('../services/red.service');

exports.verificarFactibilidadPorDireccion = async (req, res) => {
    try {
        const { direccion } = req.body;
        const result = await redService.verificarFactibilidadPorDireccion(direccion);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Error procesando la dirección" });
    }
};

// A. OBTENER TODA LA RED POR CAPAS (Para el Mapa Principal)
exports.obtenerMapaRed = async (req, res) => {
    try {
        console.log("🚀 Cargando infraestructura completa para Forward Vision...");
        const result = await redService.obtenerMapaRed();
        res.json(result);
    } catch (error) {
        console.error("❌ Error al cargar capas:", error);
        res.status(500).json({ error: "No se pudo cargar la infraestructura del servidor" });
    }
};

// B. VERIFICAR FACTIBILIDAD (Búsqueda Espacial en MySQL)
exports.verificarFactibilidad = async (req, res) => {
    try {
        const result = await redService.verificarFactibilidad(req.body);
        res.json(result);
    } catch (error) {
        console.error("❌ Error en factibilidad:", error);
        res.status(error.status || 500).json({ 
            error: error.message || "Error en el motor de búsqueda espacial"
        });
    }
};