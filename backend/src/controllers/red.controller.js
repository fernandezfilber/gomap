
const prisma = require('../config/db');

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

        const [postes, tramos, mufas, cajas, troncales] = await Promise.all([
            // Capa de Postes: Conteo de equipos instalados
            prisma.poste.findMany({
                include: {
                    _count: { select: { mufas: true, cajas: true } }
                }
            }),
            // Capa de Cables
            prisma.tramoCable.findMany(),
            // Capa de Mufas: Detalle de ramificación y splitteo
            prisma.mufa.findMany({
                include: {
                    troncal: { select: { nombre: true, bufferColor: true } },
                    _count: { select: { cajas: true } }
                }
            }),
            // Capa de Cajas NAP: Detalle de abonados
            prisma.caja.findMany({
                include: {
                    _count: { select: { clientes: true } }
                }
            }),
            // Capa de Troncales (Backbone de 96 hilos)
            prisma.troncal.findMany()
        ]);

        // Formateamos la respuesta con lógica de negocio para el Frontend
        res.json({
            postes,
            tramos,
            mufas: mufas.map(m => ({
                ...m,
                hilosUsados: m._count.cajas,
                // Si ratio es 1:16, calculamos libres restando cajas
                hilosLibresParaCajas: (parseInt(m.ratioSplitteo?.split(':')[1]) || 16) - m._count.cajas
            })),
            cajas: cajas.map(c => ({
                ...c,
                puertosEnUso: c._count.clientes,
                estaSaturada: c._count.clientes >= c.puertosTotales
            })),
            troncales
        });
    } catch (error) {
        console.error("🔥 Error al cargar capas:", error);
        res.status(500).json({ error: "No se pudo cargar la infraestructura del servidor" });
    }
};

// B. VERIFICAR FACTIBILIDAD (Búsqueda Espacial en MySQL)
exports.verificarFactibilidad = async (req, res) => {
    try {
        const { googleMapsUrl } = req.body;
        const coords = extraerCoordenadas(googleMapsUrl);

        if (!coords) return res.status(400).json({ error: "URL de Google Maps inválida o sin coordenadas." });

        const { lat, lng } = coords;

        // Búsqueda de cajas en radio de 300 metros usando Haversine para MySQL (Hostinger)
        // 6371 es el radio de la tierra en KM. Multiplicamos por 1000 para obtener metros.
        const cajasCercanas = await prisma.$queryRawUnsafe(`
            SELECT id, codigo, latitud, longitud, puertosTotales,
            (6371 * acos(
                cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + 
                sin(radians(${lat})) * sin(radians(latitud))
            ) * 1000) AS distancia_metros
            FROM Caja
            HAVING distancia_metros <= 300
            ORDER BY distancia_metros ASC
        `);

        res.json({
            disponible: cajasCercanas.length > 0,
            clienteCoords: { lat, lng },
            cajas: cajasCercanas.map(c => ({
                ...c,
                distancia_metros: Math.round(c.distancia_metros * 100) / 100
            }))
        });
    } catch (error) {
        console.error("❌ Error en cálculo de factibilidad:", error);
        res.status(500).json({ error: "Error en el motor de búsqueda espacial" });
    }
};