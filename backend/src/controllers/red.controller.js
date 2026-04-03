const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- 1. UTILIDAD: EXTRACCIÓN DE COORDENADAS ---
const extraerCoordenadas = (input) => {
    if (!input || typeof input !== "string") return null;
    const regex = /@?(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)|!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
    const match = input.match(regex);
    if (match) {
        const lat = parseFloat(match[1] || match[3]);
        const lng = parseFloat(match[2] || match[4]);
        return (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) ? { lat, lng } : null;
    }
    return null;
};

// --- 2. CONTROLADORES DEL MAPA ---

// A. OBTENER TODA LA RED POR CAPAS (Para el Mapa Principal)
exports.obtenerMapaRed = async (req, res) => {
    try {
        console.log("🌐 Cargando infraestructura completa para Forward Vision...");

        // Ejecución en paralelo para no bloquear el hilo de Node.js
        const [postes, tramos, mufas, cajas, troncales] = await Promise.all([
            // Capa de Postes: Incluye conteo de equipos para iconos dinámicos
            prisma.poste.findMany({
                include: {
                    _count: { select: { mufas: true, cajas: true } }
                }
            }),
            // Capa de Cables: Las líneas que unen todo
            prisma.tramoCable.findMany(),
            // Capa de Mufas: Incluye info de ocupación
            prisma.mufa.findMany({
                include: {
                    _count: { select: { cajas: true } }
                }
            }),
            // Capa de Cajas NAP
            prisma.caja.findMany({
                include: {
                    _count: { select: { clientes: true } }
                }
            }),
            // Capa de Troncales (Backbone)
            prisma.troncal.findMany()
        ]);

        // Formateamos la respuesta como "Capas" para el Frontend
        res.json({
            postes,
            tramos,
            mufas: mufas.map(m => ({
                ...m,
                hilosLibres: m.capacidadHilos - m._count.cajas,
                estaLlena: m._count.cajas >= m.capacidadHilos
            })),
            cajas: cajas.map(c => ({
                ...c,
                puertosLibres: c.puertosTotales - m._count.clientes
            })),
            troncales
        });
    } catch (error) {
        console.error("🔥 Error al cargar capas:", error);
        res.status(500).json({ error: "No se pudo cargar la infraestructura" });
    }
};

// B. VERIFICAR FACTIBILIDAD (Búsqueda Espacial)
exports.verificarFactibilidad = async (req, res) => {
    try {
        const { googleMapsUrl } = req.body;
        const coords = extraerCoordenadas(googleMapsUrl);

        if (!coords) return res.status(400).json({ error: "Coordenadas inválidas" });

        const { lat, lng } = coords;

        // Búsqueda de cajas en radio de 300 metros usando SQL Raw (PostgreSQL)
        const cajasCercanas = await prisma.$queryRaw`
            SELECT id, codigo, latitud, longitud, "puertosTotales",
            ROUND((6371 * acos(LEAST(1.0, GREATEST(-1.0, 
                cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + 
                sin(radians(${lat})) * sin(radians(latitud))
            ))) * 1000)::numeric, 2) AS distancia_metros
            FROM "Caja"
            WHERE (6371 * acos(LEAST(1.0, GREATEST(-1.0, 
                cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + 
                sin(radians(${lat})) * sin(radians(latitud))
            ))) * 1000) <= 300
            ORDER BY distancia_metros ASC`;

        res.json({
            disponible: cajasCercanas.length > 0,
            clienteCoords: { lat, lng },
            cajas: cajasCercanas
        });
    } catch (error) {
        res.status(500).json({ error: "Error en cálculo de factibilidad" });
    }
};