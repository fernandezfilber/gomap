const { prisma } = require('../config/db');
const axios = require('axios');

/**
 * Servicio de Red e Infraestructura
 */

const obtenerCoordsDesdeDireccion = async (direccion) => {
    try {
        const query = `${direccion}, Lima, Peru`;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
        
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'ForwardVisionApp/1.0' }
        });

        if (response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            const distritos = ["Lurigancho", "Chosica", "Ate", "Santa Anita"];
            const esZonaValida = distritos.some(d => display_name.includes(d));

            if (!esZonaValida) return null;

            return { lat: parseFloat(lat), lng: parseFloat(lon) };
        }
        return null;
    } catch (error) {
        console.error("Error en Geocoding:", error);
        return null;
    }
};

const extraerCoordenadas = (input) => {
    if (!input || typeof input !== "string") return null;
    const regex = /@?(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)|!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
    const match = input.match(regex);
    if (match) {
        const lat = parseFloat(match[1] || match[3]);
        const lng = parseFloat(match[2] || match[4]);
        return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null;
    }
    return null;
};

exports.verificarFactibilidadPorDireccion = async (direccion) => {
    if (!direccion) throw { status: 400, message: "La dirección es obligatoria" };

    const coords = await obtenerCoordsDesdeDireccion(direccion);
    if (!coords) {
        throw { status: 404, message: "No se pudo encontrar la ubicación exacta en Chosica, Ate o Santa Anita." };
    }

    const { lat, lng } = coords;

    const cajasCercanas = await prisma.$queryRaw`
        SELECT id, codigo, latitud, longitud, capacidadTotal,
        (6371 * acos(
            cos(radians(${lat})) * cos(radians(latitud)) * cos(radians(longitud) - radians(${lng})) + 
            sin(radians(${lat})) * sin(radians(latitud))
        ) * 1000) AS distancia_metros
        FROM cajas
        HAVING distancia_metros <= 300
        ORDER BY distancia_metros ASC
    `;

    return {
        disponible: cajasCercanas.length > 0,
        direccionEncontrada: direccion,
        coords: coords,
        mensaje: cajasCercanas.length > 0 
            ? `¡Buenas noticias! Tenemos cobertura cerca a ${direccion}.` 
            : `Lo sentimos, por ahora no llegamos exactamente a esa zona de ${direccion}.`,
        cajaMasCercana: cajasCercanas[0] || null
    };
};

exports.obtenerMapaRed = async () => {
    const [postes, tramos, mufas, cajas, troncales] = await Promise.all([
        prisma.poste.findMany({
            include: {
                _count: { select: { mufas: true, cajas: true } },
            },
        }),
        prisma.tramoCable.findMany(),
        prisma.mufa.findMany({
            include: {
                troncal: { select: { nombre: true, bufferColor: true } },
                _count: { select: { cajas: true } },
            },
        }),
        prisma.caja.findMany({
            include: {
                _count: { select: { clientes: true } },
            },
        }),
        prisma.troncal.findMany(),
    ]);

    return {
        postes,
        tramos,
        mufas: mufas.map((m) => ({
            ...m,
            hilosUsados: m._count.cajas,
            hilosLibresParaCajas: (parseInt(m.ratioSplitteo?.split(":")[1]) || 16) - m._count.cajas,
        })),
        cajas: cajas.map((c) => ({
            ...c,
            puertosEnUso: c._count.clientes,
            estaSaturada: c._count.clientes >= c.puertosTotales,
        })),
        troncales,
    };
};

exports.verificarFactibilidad = async (data) => {
    let { latitud, longitud, googleMapsUrl } = data;

    if (latitud !== undefined && longitud !== undefined) {
        latitud = parseFloat(latitud);
        longitud = parseFloat(longitud);
    } else if (googleMapsUrl) {
        const coords = extraerCoordenadas(googleMapsUrl);
        if (!coords) throw { status: 400, message: "URL de Google Maps inválida o sin coordenadas." };
        latitud = coords.lat;
        longitud = coords.lng;
    } else {
        throw { status: 400, message: "Faltan latitud y longitud (o googleMapsUrl)" };
    }

    if (isNaN(latitud) || isNaN(longitud)) {
        throw { status: 400, message: "Coordenadas inválidas" };
    }

    const cajasCercanas = await prisma.$queryRaw`
        SELECT 
            id, 
            codigo, 
            latitud, 
            longitud, 
            capacidadTotal,
            (6371 * acos(
                cos(radians(${latitud})) * 
                cos(radians(latitud)) * 
                cos(radians(longitud) - radians(${longitud})) + 
                sin(radians(${latitud})) * 
                sin(radians(latitud))
            ) * 1000) AS distancia_metros
        FROM cajas
        HAVING distancia_metros <= 300
        ORDER BY distancia_metros ASC
    `;

    return {
        disponible: cajasCercanas.length > 0,
        clienteCoords: { lat: latitud, lng: longitud },
        cajas: cajasCercanas.map(c => ({
            ...c,
            distancia_metros: Math.round(c.distancia_metros * 100) / 100
        }))
    };
};
