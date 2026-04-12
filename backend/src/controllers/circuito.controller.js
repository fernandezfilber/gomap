const { prisma } = require('../config/db');

const buildEmpresaCircuitoFilter = (empresaId) => ({
  cliente: {
    caja: {
      mufa: {
        troncal: {
          proyecto: { empresaId }
        }
      }
    }
  }
});

exports.getCircuitos = async (req, res) => {
  try {
    const { empresaId } = req.user;
    const { estado, clienteId } = req.query;

    const where = {
      ...buildEmpresaCircuitoFilter(empresaId)
    };

    if (estado) where.estado = estado;
    if (clienteId) where.clienteId = clienteId;

    const circuitos = await prisma.circuito.findMany({
      where,
      include: {
        cliente: { select: { id: true, nombre: true, dni: true } },
        elementos: { orderBy: { orden: 'asc' } },
        historial: {
          orderBy: { creadoEn: 'desc' },
          include: { usuario: { select: { id: true, nombre: true } } }
        }
      },
      orderBy: { creadoEn: 'desc' }
    });

    res.json({ success: true, count: circuitos.length, circuitos });
  } catch (error) {
    console.error('❌ Error obteniendo circuitos:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener circuitos' });
  }
};

exports.getCircuitoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresaId } = req.user;

    const circuito = await prisma.circuito.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
            dni: true,
            caja: {
              select: {
                id: true,
                codigo: true,
                mufa: {
                  select: {
                    troncal: {
                      select: {
                        proyecto: { select: { empresaId: true } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        elementos: { orderBy: { orden: 'asc' } },
        historial: {
          orderBy: { creadoEn: 'desc' },
          include: { usuario: { select: { id: true, nombre: true } } }
        }
      }
    });

    if (!circuito) {
      return res.status(404).json({ success: false, message: 'Circuito no encontrado' });
    }

    if (circuito.cliente?.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este circuito' });
    }

    res.json({ success: true, circuito });
  } catch (error) {
    console.error('❌ Error obteniendo circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener circuito' });
  }
};

exports.crearCircuito = async (req, res) => {
  try {
    const { nombre, codigo, clienteId, estado, elementos, longitudTotal, atenuacionTotal } = req.body;
    const { empresaId, id: usuarioId } = req.user;

    const cliente = await prisma.cliente.findUnique({
      where: { id: clienteId },
      include: {
        caja: {
          include: {
            mufa: {
              include: {
                troncal: { include: { proyecto: true } }
              }
            }
          }
        }
      }
    });

    if (!cliente || cliente.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'Cliente no pertenece a tu empresa' });
    }

    const data = {
      nombre,
      codigo,
      clienteId,
      estado: estado || 'ACTIVO',
      longitudTotal: longitudTotal ? parseFloat(longitudTotal) : undefined,
      atenuacionTotal: atenuacionTotal ? parseFloat(atenuacionTotal) : undefined,
      historial: {
        create: {
          accion: 'CREAR',
          usuarioId,
          detalle: 'Circuito creado'
        }
      }
    };

    if (Array.isArray(elementos) && elementos.length > 0) {
      data.elementos = {
        create: elementos.map((elemento, index) => ({
          orden: elemento.orden || index + 1,
          tipo: elemento.tipo,
          troncalId: elemento.troncalId,
          hiloId: elemento.hiloId,
          splitterId: elemento.splitterId,
          splitterSalidaId: elemento.splitterSalidaId,
          cajaId: elemento.cajaId,
          mufaId: elemento.mufaId,
          conexion: elemento.conexion,
          atenuacion: elemento.atenuacion ? parseFloat(elemento.atenuacion) : undefined,
          longitud: elemento.longitud ? parseFloat(elemento.longitud) : undefined
        }))
      };
    }

    const circuito = await prisma.circuito.create({
      data,
      include: {
        cliente: true,
        elementos: true,
        historial: true
      }
    });

    res.status(201).json({ success: true, circuito });
  } catch (error) {
    console.error('❌ Error creando circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al crear circuito' });
  }
};

exports.actualizarCircuito = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, longitudTotal, atenuacionTotal } = req.body;
    const { empresaId } = req.user;

    const circuito = await prisma.circuito.findUnique({
      where: { id },
      include: {
        cliente: { select: { caja: { select: { mufa: { select: { troncal: { select: { proyecto: { select: { empresaId: true } } } } } } } } } }
      }
    });

    if (!circuito) {
      return res.status(404).json({ success: false, message: 'Circuito no encontrado' });
    }

    if (circuito.cliente?.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este circuito' });
    }

    const actualizado = await prisma.circuito.update({
      where: { id },
      data: {
        nombre,
        estado,
        longitudTotal: longitudTotal !== undefined ? parseFloat(longitudTotal) : undefined,
        atenuacionTotal: atenuacionTotal !== undefined ? parseFloat(atenuacionTotal) : undefined
      }
    });

    res.json({ success: true, circuito: actualizado });
  } catch (error) {
    console.error('❌ Error actualizando circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al actualizar circuito' });
  }
};

exports.agregarElemento = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, troncalId, hiloId, splitterId, splitterSalidaId, cajaId, mufaId, conexion, atenuacion, longitud, orden } = req.body;
    const { empresaId, id: usuarioId } = req.user;

    const circuito = await prisma.circuito.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            caja: {
              select: {
                mufa: {
                  select: {
                    troncal: { select: { proyecto: { select: { empresaId: true } } } }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!circuito) return res.status(404).json({ success: false, message: 'Circuito no encontrado' });
    if (circuito.cliente?.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este circuito' });
    }

    const ordenFinal = orden || (await prisma.circuitoElemento.aggregate({
      where: { circuitoId: id },
      _max: { orden: true }
    }))._max.orden + 1 || 1;

    const elemento = await prisma.circuitoElemento.create({
      data: {
        circuitoId: id,
        orden: ordenFinal,
        tipo,
        troncalId,
        hiloId,
        splitterId,
        splitterSalidaId,
        cajaId,
        mufaId,
        conexion,
        atenuacion: atenuacion ? parseFloat(atenuacion) : undefined,
        longitud: longitud ? parseFloat(longitud) : undefined
      }
    });

    await prisma.circuitoHistorial.create({
      data: {
        circuitoId: id,
        accion: 'MODIFICAR',
        usuarioId,
        detalle: `Elemento ${tipo} agregado al circuito` }
    });

    res.status(201).json({ success: true, elemento });
  } catch (error) {
    console.error('❌ Error agregando elemento de circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al agregar elemento' });
  }
};

exports.eliminarElemento = async (req, res) => {
  try {
    const { id, elementoId } = req.params;
    const { empresaId, id: usuarioId } = req.user;

    const circuito = await prisma.circuito.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            caja: {
              select: {
                mufa: {
                  select: {
                    troncal: { select: { proyecto: { select: { empresaId: true } } } } }
                }
              }
            }
          }
        }
      }
    });

    if (!circuito) return res.status(404).json({ success: false, message: 'Circuito no encontrado' });
    if (circuito.cliente?.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este circuito' });
    }

    await prisma.circuitoElemento.delete({ where: { id: elementoId } });
    await prisma.circuitoHistorial.create({
      data: {
        circuitoId: id,
        accion: 'ELIMINAR',
        usuarioId,
        detalle: `Elemento ${elementoId} eliminado` }
    });

    res.json({ success: true, message: 'Elemento eliminado' });
  } catch (error) {
    console.error('❌ Error eliminando elemento de circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al eliminar elemento' });
  }
};

exports.getHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresaId } = req.user;

    const circuito = await prisma.circuito.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            caja: {
              select: {
                mufa: {
                  select: {
                    troncal: { select: { proyecto: { select: { empresaId: true } } } } }
                }
              }
            }
          }
        }
      }
    });

    if (!circuito) return res.status(404).json({ success: false, message: 'Circuito no encontrado' });
    if (circuito.cliente?.caja?.mufa?.troncal?.proyecto?.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este circuito' });
    }

    const historial = await prisma.circuitoHistorial.findMany({
      where: { circuitoId: id },
      orderBy: { creadoEn: 'desc' },
      include: { usuario: { select: { id: true, nombre: true } } }
    });

    res.json({ success: true, historial });
  } catch (error) {
    console.error('❌ Error obteniendo historial de circuito:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener historial' });
  }
};
