const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTroncal = async (req, res) => {
  try {
    const { nombre, prefijo, capacidad, descripcion } = req.body;
    const nuevaTroncal = await prisma.troncal.create({
      data: { 
        nombre, 
        prefijo: prefijo.toUpperCase(), 
        capacidad: parseInt(capacidad), 
        descripcion 
      }
    });
    res.status(201).json(nuevaTroncal);
  } catch (error) {
    res.status(500).json({ error: "Error al crear troncal", detalle: error.message });
  }
};

exports.getTroncales = async (req, res) => {
  const troncales = await prisma.troncal.findMany({ include: { _count: { select: { mufas: true } } } });
  res.json(troncales);
};
// EDITAR TRONCAL
exports.updateTroncal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, prefijo, capacidad, descripcion } = req.body;

    const troncalActualizada = await prisma.troncal.update({
      where: { id },
      data: {
        nombre,
        prefijo: prefijo?.toUpperCase(),
        capacidad: capacidad ? parseInt(capacidad) : undefined,
        descripcion
      }
    });

    res.json({ mensaje: "Troncal actualizada con éxito", troncal: troncalActualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar troncal", detalle: error.message });
  }
};

// ELIMINAR TRONCAL
exports.deleteTroncal = async (req, res) => {
  try {
    const { id } = req.params;
    // Prisma eliminará las mufas y cajas vinculadas si configuraste onDelete: Cascade
    await prisma.troncal.delete({ where: { id } });
    res.json({ mensaje: "Troncal y toda su infraestructura eliminada." });
  } catch (error) {
    res.status(500).json({ error: "No se puede eliminar la troncal si tiene mufas activas.", detalle: error.message });
  }
};