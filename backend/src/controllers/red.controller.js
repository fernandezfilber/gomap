const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// ===== FUNCIÓN EXTRAER COORDENADAS (para tu backend) =====
// ===== 1. FUNCIÓN EXTRAER COORDENADAS (mejorada con más logs) =====
const extraerCoordenadas = (input) => {
    console.log('🔍 [DEBUG] Recibido en extraerCoordenadas:', JSON.stringify(input));

    let texto = '';

    if (typeof input === 'object' && input !== null) {
        texto = input.googleMapsUrl || input.url || input.coordenadas || '';
    } else if (typeof input === 'string') {
        texto = input;
    }

    texto = texto.trim();
    console.log('📝 [DEBUG] Texto limpio:', texto);

    if (!texto) return null;

    const partes = texto.split(',').map(p => p.trim());
    
    if (partes.length === 2) {
        const lat = parseFloat(partes[0]);
        const lng = parseFloat(partes[1]);

        console.log('✅ [DEBUG] Coordenadas parseadas:', { lat, lng });

        if (!isNaN(lat) && !isNaN(lng) && 
            Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            return { lat, lng };
        }
    }

    console.log('❌ [DEBUG] No se pudieron extraer coordenadas');
    return null;
};

// --- 2. CONTROLADOR CORREGIDO ---
exports.verificarFactibilidad = async (req, res) => {
    try {
        console.log("📨 Body completo recibido:", JSON.stringify(req.body));

        // ✅ Ahora pasamos TODO el body (más robusto)
        const coords = extraerCoordenadas(req.body);

        if (!coords) {
            return res.json({
                tipo: "ERROR",
                mensaje: "No se pudieron extraer coordenadas",
                cajas: [],
                clienteCoords: []   // ← importante devolver array vacío
            });
        }

        const { lat, lng } = coords;
        console.log(`🎯 Coordenadas válidas → lat:${lat} lng:${lng}`);

        // Búsqueda de cajas (tu query ya estaba bien)
        const cajas = await prisma.$queryRaw`
            SELECT * FROM (
                SELECT id, codigo, latitud, longitud, "puertoOlt",
                ROUND(
                    (6371 * acos(
                        LEAST(1.0, GREATEST(-1.0, 
                            cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + 
                            sin(radians(${lat})) * sin(radians(latitud))
                        ))
                    ) * 1000)::numeric, 2
                ) AS distancia_metros
                FROM "Caja"
            ) AS distancias
            WHERE distancia_metros <= 300 
            ORDER BY distancia_metros ASC`;

        console.log(`📦 Cajas encontradas: ${cajas.length}`);

        return res.json({
            tipo: cajas.length > 0 ? "CONEXION_DIRECTA" : "REQUIERE_EXPANSION",
            cajas,
            clienteCoords: [ { lat, lng } ]   // ← AQUÍ ESTABA EL ERROR (ahora es ARRAY)
        });
        
    } catch (error) {
        console.error("🔥 Error en Factibilidad:", error);
        return res.status(500).json({ 
            tipo: "ERROR",
            mensaje: "Error interno del servidor",
            detalle: error.message,
            clienteCoords: [],
            cajas: []
        });
    }
};

// OBTENER MAPA RED (GET - Jerarquía Eficiente)
exports.obtenerMapaRed = async (req, res) => {
    try {
        console.log("📍 Generando mapa completo de infraestructura...");

        const redTotal = await prisma.troncal.findMany({
            select: {
                id: true,
                nombre: true,
                mufas: {
                    select: {
                        id: true,
                        codigo: true,
                        latitud: true,
                        longitud: true,
                        bufferColor: true,
                        hiloColor: true,
                        cajas: {
                            select: {
                                id: true,
                                codigo: true,
                                latitud: true,
                                longitud: true,
                                puertoOlt: true,
                                puertosTotales: true,
                            },
                        },
                    },
                },
            },
        });

        return res.json(redTotal || []);
    } catch (error) {
        console.error("🔥 Error en carga de mapa:", error);
        return res.status(500).json({ error: "No se pudo cargar la jerarquía de red" });
    }
};