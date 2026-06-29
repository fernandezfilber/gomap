const { prisma } = require('../config/db');

/**
 * Servicio de Cajas (NAP)
 */

exports.getCajas = async (empresaId, proyectoId) => {
    return prisma.caja.findMany({
        where: {
            poste: {
                proyecto: {
                    empresaId,
                    ...(proyectoId && { id: proyectoId })
                }
            }
        },
        include: {
            poste: { 
                include: { 
                    proyecto: { 
                        include: { 
                            empresa: { select: { nombre: true } } 
                        } 
                    } 
                } 
            },
            mufa: { select: { codigo: true } },
            _count: { select: { clientes: true } }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.createCaja = async (empresaId, data) => {
    const { 
        codigo, capacidadTotal, posteId, mufaId, estado, colorHiloCaja 
    } = data;

    if (!posteId) {
        throw { status: 400, message: "El posteId es obligatorio" };
    }

    return prisma.$transaction(async (tx) => {
        // Buscamos el poste para obtener su latitud y longitud
        const poste = await tx.poste.findUnique({
            where: { id: posteId },
            include: { proyecto: { select: { empresaId: true } } }
        });

        // Validamos que el poste exista y sea de la empresa
        if (!poste || poste.proyecto.empresaId !== empresaId) {
            throw { status: 403, message: "No tienes acceso a este poste o no existe" };
        }

        // Validar capacidad del splitter si se conecta a una mufa
        if (mufaId) {
            const mufa = await tx.mufa.findUnique({
                where: { id: mufaId },
                include: { _count: { select: { cajas: true } } }
            });

            if (mufa) {
                const capacidadSplitter = parseInt(mufa.ratioSplitteo.split(':')[1]) || 16;
                const cajasActuales = mufa._count.cajas;

                if (cajasActuales >= capacidadSplitter) {
                    throw { 
                        status: 400, 
                        message: `Splitter lleno (${cajasActuales}/${capacidadSplitter}). No se pueden agregar más cajas a esta mufa.` 
                    };
                }
            }
        }

        // Creamos la caja usando las coordenadas del poste obtenido
        return tx.caja.create({
            data: {
                codigo: codigo || `NAP-${Date.now().toString().slice(-6)}`,
                latitud: poste.latitud,
                longitud: poste.longitud,
                capacidadTotal: parseInt(capacidadTotal) || 16,
                puertosLibres: parseInt(capacidadTotal) || 16,
                estado: estado || 'ACTIVO',
                colorHiloCaja: colorHiloCaja || 'Azul',
                posteId,
                mufaId: mufaId || null
            }
        });
    });
};

exports.getHilosOcupados = async (mufaId) => {
    return prisma.caja.count({
        where: { mufaId: mufaId }
    });
};

exports.getCajaById = async (id, empresaId) => {
    const caja = await prisma.caja.findUnique({
        where: { id },
        include: {
            poste: { include: { proyecto: true } },
            mufa: true,
            clientes: true
        }
    });

    if (!caja || caja.poste.proyecto.empresaId !== empresaId) {
        throw { status: 404, message: "Caja no encontrada" };
    }

    return caja;
};

exports.updateCaja = async (id, empresaId, data) => {
    const cajaExistente = await prisma.caja.findUnique({
        where: { id },
        include: { poste: { include: { proyecto: { select: { empresaId: true } } } } }
    });

    if (!cajaExistente || cajaExistente.poste.proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "Sin acceso a esta caja" };
    }

    const dataUpdate = {};
    if (data.codigo) dataUpdate.codigo = data.codigo;
    if (data.capacidadTotal !== undefined) {
        dataUpdate.capacidadTotal = parseInt(data.capacidadTotal);
    }
    if (data.posteId) dataUpdate.posteId = data.posteId;
    if (data.mufaId) dataUpdate.mufaId = data.mufaId;
    if (data.estado) dataUpdate.estado = data.estado;
    if (data.latitud !== undefined) dataUpdate.latitud = parseFloat(data.latitud);
    if (data.longitud !== undefined) dataUpdate.longitud = parseFloat(data.longitud);
    if (data.colorHiloCaja) dataUpdate.colorHiloCaja = data.colorHiloCaja;

    return prisma.caja.update({
        where: { id },
        data: dataUpdate
    });
};

exports.deleteCaja = async (id, empresaId) => {
    const caja = await prisma.caja.findUnique({
        where: { id },
        include: { 
            _count: { select: { clientes: true } },
            poste: { include: { proyecto: true } }
        }
    });

    if (!caja || caja.poste.proyecto.empresaId !== empresaId) {
        throw { status: 404, message: "Caja no encontrada" };
    }

    if (caja._count.clientes > 0) {
        throw { status: 400, message: "No se puede eliminar una caja con clientes activos" };
    }

    return prisma.caja.delete({ where: { id } });
};
