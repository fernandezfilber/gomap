const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.crearAveria = async (req, res) => {
  try {
    const { clienteId, descripcion, tipo, prioridad } = req.body;
    const nuevaAveria = await prisma.averia.create({
      data: { clienteId, descripcion, tipo, prioridad }
    });
    res.status(201).json(nuevaAveria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarAveriasPendientes = async (req, res) => {
  const averias = await prisma.averia.findMany({
    where: { estado: { not: "SOLUCIONADO" } },
    include: { cliente: true }
  });
  res.json(averias);
};