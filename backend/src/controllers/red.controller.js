const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// ===== FUNCIÓN EXTRAER COORDENADAS (para tu backend) =====
// ===== 1. FUNCIÓN EXTRAER COORDENADAS (mejorada con más logs) =====
// ===== 1. FUNCIÓN EXTRAER COORDENADAS (ASÍNCRONA + SHORT LINKS) =====
const extraerCoordenadas = async (input) => {
    console.log('🔍 [DEBUG] Recibido en extraerCoordenadas:', JSON.stringify(input));

    let texto = '';

    if (typeof input === 'object' && input !== null) {
        texto = input.googleMapsUrl || input.url || input.coordenadas || '';
    } else if (typeof input === 'string') {
        texto = input;
    }

    texto = texto.trim();
    console.log('📝 [DEBUG] Texto original:', texto);

    if (!texto) return null;

    // === EXPANDIR ENLACE CORTO ===
    if (texto.includes('maps.app.goo.gl') || texto.includes('goo.gl/')) {
        try {
            console.log('🔄 Expandiendo short link...');
            const respuesta = await fetch(texto, {
                method: 'GET',
                redirect: 'follow',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            texto = respuesta.url;
            console.log('✅ URL expandida correctamente:', texto);
        } catch (err) {
            console.error('❌ Error al expandir enlace:', err.message);
            // fallback: intentar con el texto original
        }
    }

    // === EXTRAER COORDENADAS (regex potente para URLs de Maps) ===
    // Busca @lat,lng o !3dlat!4dlng
    const regex = /@(-?\d+\.?\d+),(-?\d+\.?\d+)|!3d(-?\d+\.?\d+)!4d(-?\d+\.?\d+)/;
    const match = texto.match(regex);

    if (match) {
        const lat = parseFloat(match[1] || match[3]);
        const lng = parseFloat(match[2] || match[4]);

        console.log('✅ [DEBUG] Coordenadas extraídas:', { lat, lng });

        if (!isNaN(lat) && !isNaN(lng) &&
            Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            return { lat, lng };
        }
    }

    // Fallback: si son coordenadas directas sin URL
    const partes = texto.split(',').map(p => p.trim());
    if (partes.length === 2) {
        const lat = parseFloat(partes[0]);
        const lng = parseFloat(partes[1]);
        if (!isNaN(lat) && !isNaN(lng) &&
            Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            console.log('✅ [DEBUG] Coordenadas por split:', { lat, lng });
            return { lat, lng };
        }
    }

    console.log('❌ [DEBUG] No se encontraron coordenadas');
    return null;
};

// ===== 2. CONTROLADOR ACTUALIZADO =====
exports.verificarFactibilidad = async (req, res) => {
    try {
        console.log("📨 Body completo recibido:", JSON.stringify(req.body));

        const coords = await extraerCoordenadas(req.body);   // ← AQUÍ EL AWAIT

        if (!coords) {
            return res.json({
                tipo: "ERROR",
                mensaje: "No se pudieron extraer coordenadas",
                cajas: [],
                clienteCoords: []
            });
        }

        const { lat, lng } = coords;
        console.log(`🎯 Coordenadas válidas → lat:${lat} lng:${lng}`);

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
            clienteCoords: [{ lat, lng }]   // ← SIEMPRE ARRAY (arregla el error del mapa)
        });

    } catch (error) {
        console.error("🔥 Error en verificarFactibilidad:", error);
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