const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. CREAR TRAMO DE CABLE (Une dos puntos en el mapa)
exports.createTramo = async (req, res) => {
  try {
    const { 
      nombre, 
      tipoCable, 
      metraje, 
      path,        // Array de coordenadas [{lat, lng}, ...]
      origenId,    // ID de Mufa o Caja de donde sale
      destinoId    // ID de Mufa o Caja a donde llega
    } = req.body;

    const nuevoTramo = await prisma.tramoCable.create({
      data: {
        nombre: nombre || `Enlace-${tipoCable}-${Date.now()}`,
        tipoCable,
        metraje: metraje ? parseFloat(metraje) : 0,
        path: path || [], 
        origenId,
        destinoId
      }
    });

    res.status(201).json(nuevoTramo);
  } catch (error) {
    console.error("ERROR TRAMO:", error.message);
    res.status(500).json({ error: "Error al registrar el tramo de cable" });
  }
};

// 2. OBTENER TODOS LOS TRAMOS (Para dibujar la red completa en Leaflet)
exports.getTramos = async (req, res) => {
  try {
    const tramos = await prisma.tramoCable.findMany();
    res.json(tramos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cables" });
  }
};

// 🛰️ 3. OBTENER UN TRAMO ESPECÍFICO (Esta es la que faltaba y causaba el crash)
exports.getTramoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tramo = await prisma.tramoCable.findUnique({
      where: { id }
    });
    
    if (!tramo) {
      return res.status(404).json({ error: "Tramo no encontrado" });
    }
    
    res.json(tramo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalles del cable" });
  }
};

// 4. ACTUALIZAR TRAMO (Cuando mueves los puntos de la línea en el mapa)
exports.updateTramo = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await prisma.tramoCable.update({
      where: { id },
      data: {
        ...req.body,
        metraje: req.body.metraje ? parseFloat(req.body.metraje) : undefined
      }
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tramo" });
  }
};

// 5. ELIMINAR TRAMO
exports.deleteTramo = async (req, res) => {
  try {
    await prisma.tramoCable.delete({ where: { id: req.params.id } });
    res.json({ message: "Tramo de cable eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tramo" });
  }
};