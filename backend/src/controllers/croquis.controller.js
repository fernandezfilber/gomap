const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const croquisController = {
  // Crear un nuevo croquis
  createCroquis: async (req, res) => {
    try {
      const { nombre, destinatario, lugar, datosGraficos } = req.body;
      const empresaId = req.user.empresaId;
      
      const croquis = await prisma.croquis.create({
        data: {
          nombre,
          destinatario,
          lugar,
          datosGraficos,
          empresaId,
          creadoPorId: req.user.id,
          actualizadoPorId: req.user.id
        }
      });
      
      res.status(201).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al crear croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
    }
  },

  // Obtener todos los croquis de una empresa
  getCroquisByEmpresa: async (req, res) => {
    try {
      const empresaId = req.user.empresaId;
      
      if (!empresaId) {
        return res.status(400).json({ success: false, message: 'Se requiere empresaId' });
      }

      const croquis = await prisma.croquis.findMany({
        where: { empresaId },
        orderBy: { creadoEn: 'desc' },
        include: {
          creadoPor: {
            select: { nombre: true, rol: true }
          }
        }
      });
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al obtener croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Obtener un croquis específico
  getCroquisById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const croquis = await prisma.croquis.findUnique({
        where: { id },
        include: {
          creadoPor: {
            select: { nombre: true, rol: true }
          }
        }
      });
      
      if (!croquis) {
        return res.status(404).json({ success: false, message: 'Croquis no encontrado' });
      }
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al obtener croquis por ID:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Actualizar un croquis (nombre, destinatario, o los gráficos)
  updateCroquis: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, destinatario, lugar, datosGraficos } = req.body;
      
      const croquis = await prisma.croquis.update({
        where: { id },
        data: {
          ...(nombre && { nombre }),
          ...(destinatario !== undefined && { destinatario }),
          ...(lugar !== undefined && { lugar }),
          ...(datosGraficos && { datosGraficos }),
          actualizadoPorId: req.user.id
        }
      });
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al actualizar croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Eliminar un croquis
  deleteCroquis: async (req, res) => {
    try {
      const { id } = req.params;
      
      await prisma.croquis.delete({
        where: { id }
      });
      
      res.status(200).json({ success: true, message: 'Croquis eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  }
};

module.exports = croquisController;
