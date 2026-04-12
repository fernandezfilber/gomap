const { prisma } = require('../config/db');

exports.getItems = async (req, res) => {
  try {
    const { empresaId } = req.user;
    const { tipo, almacen } = req.query;
    const where = { empresaId };

    if (tipo) where.tipo = tipo;
    if (almacen) where.almacen = almacen;

    const items = await prisma.inventarioItem.findMany({
      where,
      include: {
        asignaciones: true
      },
      orderBy: { creadoEn: 'desc' }
    });

    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('❌ Error obteniendo inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener inventario' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresaId } = req.user;

    const item = await prisma.inventarioItem.findUnique({
      where: { id },
      include: { asignaciones: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item de inventario no encontrado' });
    }

    if (item.empresaId !== empresaId) {
      return res.status(403).json({ success: false, message: 'No tienes acceso a este ítem de inventario' });
    }

    res.json({ success: true, item });
  } catch (error) {
    console.error('❌ Error obteniendo item de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { tipo, codigo, descripcion, stockTotal, stockMinimo, ubicacion, almacen, proveedor, costoUnitario, moneda } = req.body;
    const { empresaId } = req.user;

    const nuevoItem = await prisma.inventarioItem.create({
      data: {
        tipo,
        codigo,
        descripcion,
        stockTotal: stockTotal ? parseInt(stockTotal, 10) : 0,
        stockMinimo: stockMinimo ? parseInt(stockMinimo, 10) : 5,
        ubicacion,
        almacen,
        proveedor,
        costoUnitario: costoUnitario ? parseFloat(costoUnitario) : undefined,
        moneda: moneda || 'PEN',
        empresaId
      }
    });

    res.status(201).json({ success: true, item: nuevoItem });
  } catch (error) {
    console.error('❌ Error creando item de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al crear item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, codigo, descripcion, stockTotal, stockMinimo, ubicacion, almacen, proveedor, costoUnitario, moneda } = req.body;
    const { empresaId } = req.user;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, message: 'Item no encontrado' });
    if (item.empresaId !== empresaId) return res.status(403).json({ success: false, message: 'No tienes acceso a este item' });

    const actualizado = await prisma.inventarioItem.update({
      where: { id },
      data: {
        tipo,
        codigo,
        descripcion,
        stockTotal: stockTotal !== undefined ? parseInt(stockTotal, 10) : undefined,
        stockMinimo: stockMinimo !== undefined ? parseInt(stockMinimo, 10) : undefined,
        ubicacion,
        almacen,
        proveedor,
        costoUnitario: costoUnitario !== undefined ? parseFloat(costoUnitario) : undefined,
        moneda
      }
    });

    res.json({ success: true, item: actualizado });
  } catch (error) {
    console.error('❌ Error actualizando item de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al actualizar item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresaId } = req.user;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, message: 'Item no encontrado' });
    if (item.empresaId !== empresaId) return res.status(403).json({ success: false, message: 'No tienes acceso a este item' });

    await prisma.inventarioItem.delete({ where: { id } });
    res.json({ success: true, message: 'Item eliminado' });
  } catch (error) {
    console.error('❌ Error eliminando item de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al eliminar item' });
  }
};

exports.asignarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoDestino, destinoId, cantidad, instaladoPor, serialNumber } = req.body;
    const { empresaId } = req.user;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, message: 'Item no encontrado' });
    if (item.empresaId !== empresaId) return res.status(403).json({ success: false, message: 'No tienes acceso a este item' });

    const cantidadAsignar = parseInt(cantidad, 10);
    if (!cantidadAsignar || cantidadAsignar <= 0) {
      return res.status(400).json({ success: false, message: 'Cantidad inválida' });
    }

    const disponible = item.stockTotal - item.stockReservado;
    if (disponible < cantidadAsignar) {
      return res.status(400).json({ success: false, message: 'No hay suficiente stock disponible' });
    }

    const asignacion = await prisma.$transaction(async (tx) => {
      await tx.inventarioItem.update({
        where: { id },
        data: { stockReservado: { increment: cantidadAsignar } }
      });

      return tx.inventarioAsignacion.create({
        data: {
          itemId: id,
          tipoDestino,
          destinoId,
          cantidad: cantidadAsignar,
          instaladoPor,
          serialNumber
        }
      });
    });

    res.status(201).json({ success: true, asignacion });
  } catch (error) {
    console.error('❌ Error asignando inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al asignar inventario' });
  }
};

exports.getAsignaciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresaId } = req.user;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, message: 'Item no encontrado' });
    if (item.empresaId !== empresaId) return res.status(403).json({ success: false, message: 'No tienes acceso a este item' });

    const asignaciones = await prisma.inventarioAsignacion.findMany({
      where: { itemId: id },
      orderBy: { fechaInstalacion: 'desc' }
    });

    res.json({ success: true, asignaciones });
  } catch (error) {
    console.error('❌ Error obteniendo asignaciones de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener asignaciones' });
  }
};

exports.getAllAsignaciones = async (req, res) => {
  try {
    const { empresaId } = req.user;
    const asignaciones = await prisma.inventarioAsignacion.findMany({
      where: {
        item: { empresaId }
      },
      include: {
        item: true
      },
      orderBy: { fechaInstalacion: 'desc' }
    });

    res.json({ success: true, count: asignaciones.length, asignaciones });
  } catch (error) {
    console.error('❌ Error obteniendo asignaciones generales de inventario:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener asignaciones' });
  }
};
