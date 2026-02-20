const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// --- 1. UTILIDADES DE EXTRACCIÓN ---
const parsearCoords = (texto) => {
  if (!texto || typeof texto !== 'string') return null;
  // Regex para capturar lat,lng de URLs largas o cortas
  const match = texto.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/) || 
                texto.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    if (Math.abs(lat) <= 90) return { lat, lng };
  }
  return null;
};

// --- 2. CONTROLADORES ---
exports.verificarFactibilidad = async (req, res) => {
  try {
    let { googleMapsUrl } = req.body;
    if (!googleMapsUrl) return res.status(400).json({ error: "Entrada vacía" });

    console.log("📍 Procesando entrada:", googleMapsUrl);

    // 1. Limpieza y extracción robusta
    // Buscamos el patrón @lat,lng o lat,lng directo
    const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/;
    const match = googleMapsUrl.match(regex);

    if (!match) {
      return res.status(400).json({ error: "Formato no reconocido. Usa: latitud, longitud" });
    }

    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);

    // 2. Validación de rangos geográficos
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return res.status(400).json({ error: "Coordenadas geográficas inválidas" });
    }

    // 3. Búsqueda Espacial (Radio 300m)
    const cajas = await prisma.$queryRaw`
      SELECT id, codigo, latitud, longitud, puertoOlt,
      ROUND((6371 * acos(cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitud)))) * 1000, 2) AS distancia_metros
      FROM Caja 
      HAVING distancia_metros <= 300 
      ORDER BY distancia_metros ASC`;

    return res.json({ 
      tipo: cajas.length > 0 ? "CONEXION_DIRECTA" : "REQUIERE_EXPANSION", 
      cajas, 
      clienteCoords: { lat, lng } 
    });

  } catch (error) {
    console.error("🔥 Error 500 Detectado:", error.message);
    return res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};
exports.obtenerMapaRed = async (req, res) => {
  try {
    const red = await prisma.troncal.findMany({
      include: { mufas: { include: { cajas: true } } }
    });
    res.json(red);
  } catch (error) { res.status(500).json({ error: "Fallo al cargar red" }); }
};

// OBTENER MAPA RED (Solución al Socket Hang Up)
// OBTENER MAPA RED (Jerarquía Troncal -> Mufa -> Caja)
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
            // Agregamos la relación con cajas
            cajas: {
              select: {
                id: true,
                codigo: true,
                latitud: true,
                longitud: true,
                puertoOlt: true,
                puertosTotales: true
              }
            }
          }
        }
      }
    });

    return res.json(redTotal || []);
  } catch (error) {
    console.error("🔥 Error en mapa:", error);
    return res.status(500).json({ error: "No se pudo cargar la jerarquía de red" });
  }
};