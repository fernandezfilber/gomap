const cajaService = require('../services/caja.service');
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
        const { latitud, longitud, radio } = req.query;
        
        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);
        const radioMetros = parseInt(radio) || 500;
        
        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ success: false, message: 'Coordenadas inválidas' });
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

        res.json({ success: true, cajas: cajas.map(c => ({ ...c, distancia_metros: Math.round(Number(c.distancia_metros) * 100) / 100 })) });
    } catch (error) {
        console.error('Error getCajasCercanas:', error);
        res.status(500).json({ success: false, message: 'Error buscando cajas cercanas' });
    }
};