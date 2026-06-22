const { prisma } = require('../config/db');

/**
 * Servicio de Inventario
 */

exports.getItems = async (empresaId, query) => {
    const { tipo, almacen } = query;
    const where = { empresaId };

    if (tipo) where.tipo = tipo;
    if (almacen) where.almacen = almacen;

    return prisma.inventarioItem.findMany({
        where,
        include: {
            asignaciones: true
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.getItemById = async (id, empresaId) => {
    const item = await prisma.inventarioItem.findUnique({
        where: { id },
        include: { asignaciones: true }
    });

    if (!item) {
        throw { status: 404, message: 'Item de inventario no encontrado' };
    }

    if (item.empresaId !== empresaId) {
        throw { status: 403, message: 'No tienes acceso a este ítem de inventario' };
    }

    return item;
};

exports.createItem = async (empresaId, data) => {
    const { tipo, codigo, descripcion, stockTotal, stockMinimo, ubicacion, almacen, proveedor, costoUnitario, moneda } = data;

    return prisma.inventarioItem.create({
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
};

exports.updateItem = async (id, empresaId, data) => {
    const { tipo, codigo, descripcion, stockTotal, stockMinimo, ubicacion, almacen, proveedor, costoUnitario, moneda } = data;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) throw { status: 404, message: 'Item no encontrado' };
    if (item.empresaId !== empresaId) throw { status: 403, message: 'No tienes acceso a este item' };

    return prisma.inventarioItem.update({
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
};

exports.deleteItem = async (id, empresaId) => {
    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) throw { status: 404, message: 'Item no encontrado' };
    if (item.empresaId !== empresaId) throw { status: 403, message: 'No tienes acceso a este item' };

    return prisma.inventarioItem.delete({ where: { id } });
};

exports.asignarItem = async (id, empresaId, data) => {
    const { tipoDestino, destinoId, cantidad, instaladoPor, serialNumber } = data;

    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) throw { status: 404, message: 'Item no encontrado' };
    if (item.empresaId !== empresaId) throw { status: 403, message: 'No tienes acceso a este item' };

    const cantidadAsignar = parseInt(cantidad, 10);
    if (!cantidadAsignar || cantidadAsignar <= 0) {
        throw { status: 400, message: 'Cantidad inválida' };
    }

    const disponible = item.stockTotal - item.stockReservado;
    if (disponible < cantidadAsignar) {
        throw { status: 400, message: 'No hay suficiente stock disponible' };
    }

    return prisma.$transaction(async (tx) => {
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
};

exports.getAsignaciones = async (id, empresaId) => {
    const item = await prisma.inventarioItem.findUnique({ where: { id } });
    if (!item) throw { status: 404, message: 'Item no encontrado' };
    if (item.empresaId !== empresaId) throw { status: 403, message: 'No tienes acceso a este item' };

    return prisma.inventarioAsignacion.findMany({
        where: { itemId: id },
        orderBy: { fechaInstalacion: 'desc' }
    });
};

exports.getAllAsignaciones = async (empresaId) => {
    return prisma.inventarioAsignacion.findMany({
        where: {
            item: { empresaId }
        },
        include: {
            item: true
        },
        orderBy: { fechaInstalacion: 'desc' }
    });
};
