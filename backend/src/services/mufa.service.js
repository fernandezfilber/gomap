const { prisma } = require('../config/db');

/**
 * Servicio de Mufas
 */

exports.getMufas = async (empresaId, proyectoId) => {
    return prisma.mufa.findMany({
        where: {
            troncal: {
                proyecto: {
                    empresaId,
                    ...(proyectoId && { id: proyectoId })
                }
            }
        },
        include: {
            poste: { select: { codigo: true, latitud: true, longitud: true } },
            troncal: { select: { nombre: true, cantHilos: true, hilosLibres: true } },
            cajas: {
                select: {
                    id: true,
                    codigo: true,
                    puertosLibres: true,
                    capacidadTotal: true,
                    _count: { select: { clientes: true } }
                }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.createMufa = async (empresaId, data) => {
    const { 
        codigo, troncalId, posteId, latitud, longitud, ratioSplitteo 
    } = data;

    if (!troncalId || !posteId || !latitud || !longitud) {
        throw { status: 400, message: "troncalId, posteId, latitud y longitud son obligatorios" };
    }

    return prisma.$transaction(async (tx) => {
        // 1. Verificar troncal y acceso de empresa
        const troncal = await tx.troncal.findUnique({
            where: { id: troncalId },
            include: { proyecto: { select: { empresaId: true } } }
        });

        if (!troncal) throw { status: 404, message: "Troncal no encontrada" };
        if (troncal.proyecto.empresaId !== empresaId) {
            throw { status: 403, message: "No tienes acceso a esta troncal" };
        }

        // 2. Verificar que el poste no tenga ya una mufa
        const poste = await tx.poste.findUnique({
            where: { id: posteId },
            include: { mufa: true }
        });

        if (!poste) throw { status: 404, message: "Poste no encontrado" };
        if (poste.mufa) {
            throw { status: 400, message: `El poste ${poste.codigo} ya tiene una mufa asignada (${poste.mufa.codigo})` };
        }

        // 3. Crear Mufa
        return await tx.mufa.create({
            data: {
                codigo: codigo || `MUF-${Date.now().toString().slice(-6)}`,
                latitud: parseFloat(latitud),
                longitud: parseFloat(longitud),
                ratioSplitteo: ratioSplitteo || "1:16",
                estado: "ACTIVO",
                troncalId,
                posteId
            },
            include: {
                poste: true,
                troncal: true
            }
        });
    });
};

exports.getMufaById = async (id, empresaId) => {
    const mufa = await prisma.mufa.findUnique({
        where: { id },
        include: {
            poste: true,
            troncal: {
                include: {
                    proyecto: { select: { nombre: true, empresaId: true } }
                }
            },
            cajas: {
                include: {
                    _count: { select: { clientes: true } },
                    clientes: { select: { id: true, nombre: true, dni: true, estadoServicio: true } }
                }
            }
        }
    });

    if (!mufa) {
        throw { status: 404, message: "Mufa no encontrada" };
    }

    if (mufa.troncal.proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "No tienes acceso a esta mufa" };
    }

    // Cálculos de capacidad basados en el ratio
    const capacidad = parseInt(mufa.ratioSplitteo.split(':')[1]) || 16;
    const cajasOcupadas = mufa.cajas.length;

    return {
        ...mufa,
        capacidadSplitter: capacidad,
        cajasOcupadas,
        cajasLibres: capacidad - cajasOcupadas
    };
};

exports.updateMufa = async (id, empresaId, data) => {
    return prisma.$transaction(async (tx) => {
        const mufa = await tx.mufa.findUnique({
            where: { id },
            include: { troncal: { select: { proyecto: { select: { empresaId: true } } } } }
        });

        if (!mufa || mufa.troncal.proyecto.empresaId !== empresaId) {
            throw { status: 403, message: "Mufa no encontrada o sin acceso" };
        }

        const dataUpdate = {};
        if (data.codigo) dataUpdate.codigo = data.codigo;
        if (data.ratioSplitteo) dataUpdate.ratioSplitteo = data.ratioSplitteo;
        if (data.latitud) dataUpdate.latitud = parseFloat(data.latitud);
        if (data.longitud) dataUpdate.longitud = parseFloat(data.longitud);
        if (data.troncalId) dataUpdate.troncalId = data.troncalId;
        if (data.posteId) dataUpdate.posteId = data.posteId;
        if (data.estado) dataUpdate.estado = data.estado;

        return await tx.mufa.update({
            where: { id },
            data: dataUpdate
        });
    });
};

exports.deleteMufa = async (id, empresaId) => {
    return prisma.$transaction(async (tx) => {
        const mufa = await tx.mufa.findUnique({
            where: { id },
            include: { 
                troncal: { select: { proyecto: { select: { empresaId: true } } } },
                cajas: true 
            }
        });

        if (!mufa || mufa.troncal.proyecto.empresaId !== empresaId) {
            throw { status: 404, message: "Mufa no encontrada o sin acceso" };
        }

        // Integridad: No permitir borrar si tiene cajas NAP conectadas
        if (mufa.cajas.length > 0) {
            throw { status: 400, message: `No se puede eliminar. La mufa tiene ${mufa.cajas.length} cajas NAP conectadas.` };
        }

        await tx.mufa.delete({ where: { id } });
    });
};
