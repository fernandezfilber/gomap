const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// --- 1. UTILIDADES DE EXTRACCIÓN MEJORADAS ---
const extraerCoordenadas = async (input) => {
    if (!input || typeof input !== "string") return null;

    let textoParaAnalizar = input.trim();

    // === 1. Resolver enlaces cortos de Google Maps ===
    if (/maps\.app\.goo\.gl|goo\.gl\//i.test(textoParaAnalizar)) {
        try {
            const respuesta = await fetch(textoParaAnalizar, {
                method: 'GET',
                redirect: 'follow'
            });
            textoParaAnalizar = respuesta.url;   // ← ¡Ahora tenemos la URL completa con las coordenadas!
            console.log('✅ Enlace expandido:', textoParaAnalizar);
        } catch (error) {
            console.warn('⚠️ No se pudo expandir el enlace corto (posible bloqueo CORS). Abre el link en el navegador, copia la URL completa de la barra de direcciones y pégala aquí.', error);
            return null; // o puedes quitar este return si quieres intentar con el regex de todos modos
        }
    }

    // === 2. Regex mejorado (soporta enteros, decimales, negativos, etc.) ===
    const regex = /@?(-?(?:\d+\.?\d*|\.\d+))\s*,\s*(-?(?:\d+\.?\d*|\.\d+))|!3d(-?(?:\d+\.?\d*|\.\d+))!4d(-?(?:\d+\.?\d+))/;

    const match = textoParaAnalizar.match(regex);

    if (match) {
        const lat = parseFloat(match[1] || match[3]);
        const lng = parseFloat(match[2] || match[4]);

        if (!isNaN(lat) && !isNaN(lng) &&
            Math.abs(lat) <= 90 &&
            Math.abs(lng) <= 180) {
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