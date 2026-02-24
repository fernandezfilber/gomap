const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// --- 1. UTILIDADES DE EXTRACCIÓN MEJORADAS ---
const extraerCoordenadas = (input) => {
    if (!input || typeof input !== "string") return null;

    // Regex potenciado para detectar:
    // 1. Patrón @lat,lng (URLs de Maps)
    // 2. Patrón lat,lng (Texto directo)
    // 3. Patrón !3dLat!4dLng (URLs internas de Google Maps)
    const regex = /@?(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)|!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
    const match = input.match(regex);

    if (match) {
        // Extrae de los grupos correspondientes según el patrón detectado
        const lat = parseFloat(match[1] || match[3]);
        const lng = parseFloat(match[2] || match[4]);
        
        if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            return { lat, lng };
        }
    }
    return null;
};

// --- 2. CONTROLADORES ---

// VERIFICAR FACTIBILIDAD (POST)
exports.verificarFactibilidad = async (req, res) => {
    try {
        let { googleMapsUrl } = req.body;
        if (!googleMapsUrl) return res.status(400).json({ error: "Entrada vacía" });

        console.log("📍 Procesando entrada de factibilidad:", googleMapsUrl);

        const coords = extraerCoordenadas(googleMapsUrl);

        if (!coords) {
            return res.status(400).json({ 
                error: "No se pudieron extraer coordenadas. Use el formato: latitud, longitud o un link de Maps." 
            });
        }

        const { lat, lng } = coords;

        // Búsqueda Espacial (Radio 300m)
        // Corrección de tipos con ::numeric y uso de comillas dobles para la tabla "Caja"
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

        return res.json({
            tipo: cajas.length > 0 ? "CONEXION_DIRECTA" : "REQUIERE_EXPANSION",
            cajas,
            clienteCoords: { lat, lng },
        });
        
    } catch (error) {
        console.error("🔥 Error en Factibilidad:", error.message);
        return res.status(500).json({ 
            error: "Error interno del servidor", 
            detalle: error.message 
        });
    }
};

// OBTENER MAPA RED (GET - Jerarquía Eficiente)
// OBTENER MAPA RED (GET - Jerarquía con Rutas de Calles)
exports.obtenerMapaRed = async (req, res) => {
    try {
        console.log("📍 Generando mapa con trazado de calles para Forward Vision...");

        const redTotal = await prisma.troncal.findMany({
            select: {
                id: true,
                nombre: true,
                ruta: true, // NUEVO: Trazado de la fibra principal (avenidas)
                mufas: {
                    select: {
                        id: true,
                        codigo: true,
                        latitud: true,
                        longitud: true,
                        ruta: true, // NUEVO: Trazado de la fibra desde la troncal a la mufa
                        bufferColor: true,
                        hiloColor: true,
                        detalles: true, // Info adicional que agregamos al esquema
                        cajas: {
                            select: {
                                id: true,
                                codigo: true,
                                latitud: true,
                                longitud: true,
                                ruta: true, // NUEVO: Trazado de la fibra desde la mufa a la caja NAP
                                puertoOlt: true,
                                puertosTotales: true,
                                detalles: true
                            },
                        },
                    },
                },
            },
        });

        // Retornamos la estructura completa para que el frontend dibuje las Polylines
        return res.json(redTotal || []);
    } catch (error) {
        console.error("🔥 Error al cargar jerarquía lineal:", error);
        return res.status(500).json({ error: "No se pudo cargar el mapa con rutas" });
    }
};