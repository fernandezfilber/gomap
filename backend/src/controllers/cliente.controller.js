

// Registrar un nuevo cliente conectado a una caja NAP
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCliente = async (req, res) => {
  try {
    const { nombre, dni, telefono, direccion, cajaId, estadoServicio } = req.body;

    const nuevo = await prisma.cliente.create({
      data: {
        nombre,
        dni,
        telefono,
        direccion,
        estadoServicio: estadoServicio || "ACTIVO",
        // Vinculación directa por el ID de la caja
        caja: {
          connect: { id: cajaId } 
        }
      }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error de relación", detalle: error.message });
  }
};

// Obtener todos los clientes con su información de red (Caja y Mufa)
exports.getClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { 
        caja: { 
          include: { mufa: true } 
        } 
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cliente.delete({ where: { id } });
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};