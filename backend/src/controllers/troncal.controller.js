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
        // NUEVO: Guarda el array de puntos dibujados en el mapa
        ruta: ruta || null 
      }
    });
    
    res.status(201).json(nuevaTroncal);
  } catch (error) {
    console.error("Error Prisma Troncal:", error.message);
    res.status(500).json({ error: "Error al crear troncal", detalle: error.message });
  }
};

// 2. OBTENER TRONCALES (Incluyendo sus rutas)
exports.getTroncales = async (req, res) => {
  try {
    const troncales = await prisma.troncal.findMany({ 
      include: { 
        _count: { select: { mufas: true } } 
      } 
    });
    res.json(troncales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener troncales" });
  }
};

// 3. EDITAR TRONCAL (Permite corregir el trazado)
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
        // Permite actualizar el dibujo de la ruta principal
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
    // Prisma gestionará la eliminación en cascada si está en el schema
    await prisma.troncal.delete({ where: { id } });
    res.json({ mensaje: "Troncal y toda su infraestructura eliminada." });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al eliminar la troncal", 
      detalle: "Verifica que no existan mufas activas si no tienes activado el Cascade Delete." 
    });
  }
};