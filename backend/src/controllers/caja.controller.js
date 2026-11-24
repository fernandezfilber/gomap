const cajaService = require('../services/caja.service');
const geoService = require('../services/geo.service');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ====================== OBTENER TODAS LAS CAJAS ======================
exports.getCajas = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const cajas = await cajaService.getCajas(empresaId, proyectoId);
        res.json({ success: true, count: cajas.length, cajas });
    } catch (error) {
        console.error("❌ Error al obtener cajas:", error);
        res.status(500).json({ success: false, message: "Error al obtener la lista de cajas" });
    }
};

// ====================== CREAR CAJA (NAP) ======================
exports.createCaja = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const nuevaCaja = await cajaService.createCaja(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Caja NAP creada con la ubicación del poste",
            caja: nuevaCaja
        });
    } catch (error) {
        console.error("❌ Error al crear caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al procesar el registro" });
    }
};

exports.getHilosOcupados = async (req, res) => {
    try {
        const { mufaId } = req.params;
        const ocupados = await cajaService.getHilosOcupados(mufaId);
        res.json({ success: true, hilosOcupados: ocupados });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al contar hilos" });
    }
};

// ====================== OBTENER DETALLE DE CAJA ======================
exports.getCajaById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const caja = await cajaService.getCajaById(id, empresaId);
        res.json({ success: true, caja });
    } catch (error) {
        console.error("❌ Error al obtener detalle del caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al obtener detalle" });
    }
};

// ====================== ACTUALIZAR CAJA ======================
exports.updateCaja = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const cajaActualizada = await cajaService.updateCaja(id, empresaId, req.body);
        res.json({ success: true, message: "Actualizado", caja: cajaActualizada });
    } catch (error) {
        console.error("❌ Error al actualizar caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al actualizar" });
    }
};

// ====================== ELIMINAR CAJA ======================
exports.deleteCaja = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await cajaService.deleteCaja(id, empresaId);
        res.json({ success: true, message: "Caja eliminada" });
    } catch (error) {
        console.error("❌ Error al eliminar caja:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al eliminar" });
    }};

// ====================== CAJAS CERCANAS ======================
exports.getCajasCercanas = async (req, res) => {
    try {
        const { empresaId } = req.user;
        let { latitud, longitud, radio, url } = req.query;
        
        let lat = parseFloat(latitud);
        let lng = parseFloat(longitud);

        // Si las coordenadas no vienen numéricas pero viene una URL o parámetro con link
        if (isNaN(lat) || isNaN(lng)) {
            const posibleUrl = url || (typeof latitud === 'string' && latitud.includes('http') ? latitud : null);
            if (posibleUrl) {
                const resuelto = await geoService.resolverCoordenadasDesdeUrl(posibleUrl);
                if (resuelto) {
                    lat = resuelto.lat;
                    lng = resuelto.lng;
                }
            }
        }
        
        const radioMetros = parseInt(radio) || 500;
        
        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ success: false, message: 'Coordenadas inválidas o no se pudo resolver el enlace de Google Maps' });
        }

        const cajas = await prisma.$queryRaw`
            SELECT c.id, c.codigo, c.latitud, c.longitud, c.capacidadTotal, c.puertosLibres, c.mufaId,
                p.codigo as posteCodigo, pr.nombre as proyectoNombre, pr.id as proyectoId,
                (6371 * acos(
                    cos(radians(${lat})) * cos(radians(c.latitud)) * cos(radians(c.longitud) - radians(${lng})) + 
                    sin(radians(${lat})) * sin(radians(c.latitud))
                ) * 1000) AS distancia_metros
            FROM cajas c
            JOIN postes p ON c.posteId = p.id
            JOIN proyectos pr ON p.proyectoId = pr.id
            WHERE pr.empresaId = ${empresaId}
            HAVING distancia_metros <= ${radioMetros}
            ORDER BY distancia_metros ASC
            LIMIT 20
        `;

        res.json({ 
            success: true, 
            coordenadasBuscadas: { lat, lng },
            cajas: cajas.map(c => ({ ...c, distancia_metros: Math.round(Number(c.distancia_metros) * 100) / 100 })) 
        });
    } catch (error) {
        console.error('Error getCajasCercanas:', error);
        res.status(500).json({ success: false, message: 'Error buscando cajas cercanas' });
    }
};

// ====================== RESOLVER LINK GOOGLE MAPS ======================
exports.resolverCoordenadasUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ success: false, message: 'La URL es requerida' });
        }

        const resuelto = await geoService.resolverCoordenadasDesdeUrl(url);
        if (!resuelto) {
            return res.status(404).json({ 
                success: false, 
                message: 'No se pudieron extraer coordenadas del enlace. Verifica que sea un enlace válido de Google Maps.' 
            });
        }

        res.json({
            success: true,
            lat: resuelto.lat,
            lng: resuelto.lng,
            urlResuelta: resuelto.urlResuelta
        });
    } catch (error) {
        console.error('Error al resolver coordenadas:', error);
        res.status(500).json({ success: false, message: 'Error interno al procesar enlace' });
    }
};