const { prisma } = require('../config/db');

/**
 * Servicio de Averías
 */

exports.crearAveria = async (empresaId, data) => {
    const { clienteId, descripcion, tipo, prioridad, tecnicoId } = data;

    return prisma.averia.create({
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
};

exports.listarAveriasPendientes = async (empresaId) => {
    return prisma.averia.findMany({
        where: {
            empresaId,
            estado: { in: ["REPORTADA", "ASIGNADA", "EN_REPARACION"] }
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
};

exports.actualizarEstadoAveria = async (id, empresaId, data) => {
    const { estado, tecnicoId } = data;

    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
        throw { status: 403, message: 'No tienes acceso a esta avería' };
    }

    return prisma.averia.update({
        where: { id },
        data: { estado, tecnicoId }
    });
};

exports.agregarNota = async (id, usuarioId, empresaId, data) => {
    const { contenido } = data;

    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
        throw { status: 403, message: 'No tienes acceso a esta avería' };
    }

    return prisma.averiaNota.create({
        data: {
            averiaId: id,
            usuarioId,
            contenido
        }
    });
};

exports.getNotas = async (id, empresaId) => {
    const averia = await prisma.averia.findUnique({ where: { id } });
    if (!averia || averia.empresaId !== empresaId) {
        throw { status: 403, message: 'No tienes acceso a esta avería' };
    }

    return prisma.averiaNota.findMany({
        where: { averiaId: id },
        orderBy: { creadoEn: 'asc' },
        include: { usuario: { select: { id: true, nombre: true } } }
    });
};
