const { prisma } = require('../config/db');

// 1. CREAR AVERÍA: Apertura de ticket de soporte
exports.crearAveria = async (req, res) => {
  try {
    const { clienteId, descripcion, tipo, prioridad, tecnicoId } = req.body;
    const empresaId = req.user?.empresaId;

    const nuevaAveria = await prisma.averia.create({
      data: {
        clienteId,
        descripcion,
        tipo: tipo || 'OTRO',
        prioridad: prioridad || 'MEDIA',
        estado: 'REPORTADA',
        tecnicoId: tecnicoId || null,
        empresaId
      },
      include: {
        cliente: {
          select: { nombre: true, direccion: true, telefono: true }
        }
      }
    });

    res.status(201).json({
      mensaje: "Ticket de avería generado con éxito",
      averia: nuevaAveria
    });
  } catch (error) {
    console.error("❌ Error al crear avería:", error.message);
    res.status(500).json({ error: "No se pudo crear el ticket de soporte" });
  }
};

// 2. LISTAR PENDIENTES: Con trazabilidad de red para diagnóstico rápido
exports.listarAveriasPendientes = async (req, res) => {
  try {
    const empresaId = req.user?.empresaId;
    const averias = await prisma.averia.findMany({
      where: {
        empresaId,
        estado: { in: ["PENDIENTE", "EN_REPARACION"] }
      },
      include: {
        cliente: {
          include: {
            caja: {
              select: {
                codigo: true,
                poste: { select: { codigo: true, latitud: true, longitud: true } }
              }
            }
          }
        },
        tecnico: { select: { nombre: true } },
        notas: {
          orderBy: { creadoEn: 'asc' },
          include: { usuario: { select: { id: true, nombre: true } } }
        }
      },
      orderBy: [
        { prioridad: 'desc' },
        { creadoEn: 'asc' }
      ]
    });
    res.json({ success: true, count: averias.length, averias });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lista de soporte" });
  }
};

// 3. ACTUALIZAR ESTADO (Manejo del flujo de trabajo del técnico)
exports.actualizarEstadoAveria = async (req, res) => {
  const { id } = req.params;
  const { estado, tecnicoId } = req.body;

  try {
    const empresaId = req.user?.empresaId;
    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a esta avería' });
    }

    const actualizada = await prisma.averia.update({
      where: { id },
      data: { estado, tecnicoId }
    });
    res.json({ success: true, message: `Ticket actualizado a: ${estado}`, data: actualizada });
  } catch (error) {
    console.error('❌ Error actualizando avería:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar el ticket' });
  }
};

exports.agregarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;
    const usuarioId = req.user?.id;
    const empresaId = req.user?.empresaId;

    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a esta avería' });
    }

    const nota = await prisma.averiaNota.create({
      data: {
        averiaId: id,
        usuarioId,
        contenido
      }
    });

    res.status(201).json({ success: true, nota });
  } catch (error) {
    console.error('❌ Error agregando nota de avería:', error);
    res.status(500).json({ success: false, message: 'Error al agregar nota' });
  }
};

exports.getNotas = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaId = req.user?.empresaId;

    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a esta avería' });
    }

    const notas = await prisma.averiaNota.findMany({
      where: { averiaId: id },
      orderBy: { creadoEn: 'asc' },
      include: { usuario: { select: { id: true, nombre: true } } }
    });

    res.json({ success: true, notas });
  } catch (error) {
    console.error('❌ Error obteniendo notas de avería:', error);
    res.status(500).json({ success: false, message: 'Error al obtener notas' });
  }
};