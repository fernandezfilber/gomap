const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS: Con detalles de a dónde pertenecen
exports.getTramos = async (req, res) => {
    try {
        const tramos = await prisma.tramoCable.findMany({
            include: {
                mufaOrigen: { select: { codigo: true, troncalId: true } },
                cajaDestino: { select: { codigo: true } }
            }
        });
        res.json(tramos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener cables" });
    }
};

// 2. CREAR: Validando que el origen/destino existan
exports.createTramo = async (req, res) => {
    try {
        const { nombre, tipoCable, metraje, path, mufaOrigenId, cajaDestinoId } = req.body;

        if (!mufaOrigenId && !cajaDestinoId) {
            return res.status(400).json({ error: "El tramo debe estar conectado a una Mufa o Caja." });
        }

        const nuevoTramo = await prisma.tramoCable.create({
            data: {
                nombre: nombre || `Link-${tipoCable}-${Date.now()}`,
                tipoCable,
                metraje: metraje ? parseFloat(metraje) : 0,
                path: path || [], 
                mufaOrigenId: mufaOrigenId || null,
                cajaDestinoId: cajaDestinoId || null
            }
        });

        res.status(201).json(nuevoTramo);
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el cable", detalle: error.message });
    }
};

// 3. OBTENER POR ID (La función que faltaba y hacía crashear el sistema)
exports.getTramoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tramo = await prisma.tramoCable.findUnique({
            where: { id },
            include: {
                mufaOrigen: true,
                cajaDestino: true
            }
        });
        if (!tramo) return res.status(404).json({ error: "Tramo no encontrado" });
        res.json(tramo);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el tramo específico" });
    }
};

// 4. ACTUALIZAR: Protegiendo datos numéricos
exports.updateTramo = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = { ...req.body };
        
        if (dataUpdate.metraje) dataUpdate.metraje = parseFloat(dataUpdate.metraje);

        const actualizada = await prisma.tramoCable.update({
            where: { id },
            data: dataUpdate
        });
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar tramo" });
    }
};

// 5. ELIMINAR
exports.deleteTramo = async (req, res) => {
    try {
        await prisma.tramoCable.delete({ where: { id: req.params.id } });
        res.json({ message: "Tramo de cable eliminado del GIS" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el tramo" });
    }
};