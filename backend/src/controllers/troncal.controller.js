const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. CREAR TRONCAL (Con soporte para trazado de ruta)
exports.createTroncal = async (req, res) => {
  try {
    const { nombre, prefijo, capacidad, descripcion, ruta } = req.body;
    
    const nuevaTroncal = await prisma.troncal.create({
      data: { 
        nombre, 
        prefijo: prefijo.toUpperCase(), 
        capacidad: parseInt(capacidad), 
        descripcion,
        // Ruta: Array de coordenadas [{lat, lng}, ...] para dibujar el backbone
        ruta: ruta || null 
      }
    });
    
    res.status(201).json(nuevaTroncal);
  } catch (error) {
    console.error("Error Prisma Troncal:", error.message);
    res.status(500).json({ error: "Error al crear troncal", detalle: error.message });
  }
};

// 2. OBTENER TRONCALES (Incluyendo mufas y sus postes)
exports.getTroncales = async (req, res) => {
  try {
    const troncales = await prisma.troncal.findMany({ 
      include: { 
        mufas: {
          include: {
            poste: true // Para saber en qué poste físico está cada mufa de la troncal
          }
        },
        _count: { select: { mufas: true } } 
      } 
    });
    res.json(troncales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener troncales" });
  }
};

// 3. EDITAR TRONCAL (Permite corregir el trazado o datos generales)
exports.updateTroncal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, prefijo, capacidad, descripcion, ruta } = req.body;

    const troncalActualizada = await prisma.troncal.update({
      where: { id },
      data: {
        nombre,
        prefijo: prefijo?.toUpperCase(),
        capacidad: capacidad ? parseInt(capacidad) : undefined,
        descripcion,
        ruta: ruta !== undefined ? ruta : undefined 
      }
    });

    res.json({ mensaje: "Troncal actualizada con éxito", troncal: troncalActualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar troncal", detalle: error.message });
  }
};

// 4. ELIMINAR TRONCAL
exports.deleteTroncal = async (req, res) => {
  try {
    const { id } = req.params;
    // IMPORTANTE: El schema debe tener onDelete: Cascade en Mufa para que esto funcione
    await prisma.troncal.delete({ where: { id } });
    res.json({ mensaje: "Troncal y toda su infraestructura (mufas/cajas) eliminada." });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al eliminar la troncal", 
      detalle: "Asegúrate de que el esquema de Prisma soporte borrado en cascada." 
    });
  }
};