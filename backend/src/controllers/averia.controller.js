
const prisma = require('../db');

// 1. CREAR AVERÍA: Apertura de ticket de soporte
exports.crearAveria = async (req, res) => {
  try {
    const { clienteId, descripcion, tipo, prioridad, tecnicoId } = req.body;

    // El esquema usa Enums, validamos que el tipo sea correcto (ej: SIN_INTERNET, LENTITUD)
    const nuevaAveria = await prisma.averia.create({
      data: { 
        clienteId, 
        descripcion, 
        tipo: tipo || "SIN_INTERNET", 
        prioridad: prioridad || "MEDIA",
        estado: "PENDIENTE",
        tecnicoId: tecnicoId || null // Se puede asignar un técnico desde el inicio
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
    const averias = await prisma.averia.findMany({
      where: { 
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
        tecnico: { select: { nombre: true } }
      },
      orderBy: [
        { prioridad: 'desc' }, // Atender primero las críticas
        { creadoEn: 'asc' }    // Y luego por orden de llegada
      ]
    });
    res.json(averias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lista de soporte" });
  }
};

// 3. ACTUALIZAR ESTADO (Manejo del flujo de trabajo del técnico)
exports.actualizarEstadoAveria = async (req, res) => {
  const { id } = req.params;
  const { estado, tecnicoId, descripcionTecnica } = req.body;

  try {
    const actualizada = await prisma.averia.update({
      where: { id },
      data: { 
        estado, 
        tecnicoId,
        // Si tienes un campo de notas técnicas podrías guardarlo aquí
      }
    });
    res.json({ mensaje: `Ticket actualizado a: ${estado}`, data: actualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el ticket" });
  }
};