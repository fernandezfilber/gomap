const { prisma } = require('../config/db');

/**
 * Servicio de Troncales
 */

exports.createTroncal = async (empresaId, data) => {
    const { nombre, bufferColor, cantHilos, descripcion, ruta, proyectoId } = data;

    if (!nombre || !bufferColor || !cantHilos || !proyectoId) {
        throw { status: 400, message: "Nombre, bufferColor, cantHilos y proyectoId son obligatorios" };
    }

    // Verificar propiedad del proyecto
    const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId },
        select: { empresaId: true }
    });

    if (!proyecto || proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "No tienes acceso a este proyecto" };
    }

    return prisma.troncal.create({
        data: {
            nombre,
            bufferColor,
            cantHilos: parseInt(cantHilos),
            hilosLibres: parseInt(cantHilos),
            descripcion: descripcion || null,
            ruta: ruta || null,
            proyectoId
        },
        include: {
            proyecto: { select: { nombre: true, estado: true } }
        }
    });
};

exports.getTroncales = async (empresaId, proyectoId) => {
    return prisma.troncal.findMany({
        where: {
            proyecto: {
                empresaId,
                ...(proyectoId && { id: proyectoId })
            }
        },
        include: {
            proyecto: { select: { nombre: true, estado: true } },
            _count: { select: { mufas: true } }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.getTroncalById = async (id, empresaId) => {
    const troncal = await prisma.troncal.findFirst({
        where: {
            id,
            proyecto: { empresaId }
        },
        include: {
            proyecto: true,
            mufas: {
                include: {
                    poste: { 
                        select: { 
                            codigo: true, 
                            latitud: true, 
                            longitud: true 
                        } 
                    },
                    cajas: {
                        select: {
                            id: true,
                            codigo: true,
                            puertosLibres: true,
                            capacidadTotal: true
                        }
                    }
                }
            }
        }
    });

    if (!troncal) {
        throw { status: 404, message: "Troncal no encontrada o sin acceso" };
    }

    return troncal;
};

exports.updateTroncal = async (id, empresaId, data) => {
    const { nombre, bufferColor, cantHilos, descripcion, ruta } = data;

    // Verificar propiedad
    const troncalActual = await prisma.troncal.findUnique({
        where: { id },
        select: { proyecto: { select: { empresaId: true } }, cantHilos: true, hilosLibres: true }
    });

    if (!troncalActual || troncalActual.proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "Troncal no encontrada o sin acceso" };
    }

    let nuevosHilosLibres = undefined;

    // Solo ajustar hilosLibres si se está modificando la capacidad
    if (cantHilos) {
        const nuevoCant = parseInt(cantHilos);
        if (nuevoCant > troncalActual.cantHilos) {
            const diferencia = nuevoCant - troncalActual.cantHilos;
            nuevosHilosLibres = troncalActual.hilosLibres + diferencia;
        } else if (nuevoCant < troncalActual.cantHilos) {
            // No permitimos reducir capacidad si ya hay hilos usados
            if (troncalActual.hilosLibres < troncalActual.cantHilos) {
                throw { status: 400, message: "No se puede reducir la cantidad de hilos porque ya hay hilos en uso" };
            }
            nuevosHilosLibres = nuevoCant;
        }
    }

    return prisma.troncal.update({
        where: { id },
        data: {
            ...(nombre && { nombre }),
            ...(bufferColor && { bufferColor }),
            ...(cantHilos && { cantHilos: parseInt(cantHilos) }),
            ...(nuevosHilosLibres !== undefined && { hilosLibres: nuevosHilosLibres }),
            ...(descripcion !== undefined && { descripcion }),
            ...(ruta !== undefined && { ruta })
        }
    });
};

exports.deleteTroncal = async (id, empresaId) => {
    return prisma.$transaction(async (tx) => {
        const troncal = await tx.troncal.findUnique({
            where: { id },
            include: { 
                proyecto: { select: { empresaId: true } },
                mufas: { select: { id: true } }
            }
        });

        if (!troncal || troncal.proyecto.empresaId !== empresaId) {
            throw { status: 404, message: "Troncal no encontrada o sin acceso" };
        }

        if (troncal.mufas.length > 0) {
            throw { status: 400, message: `No se puede eliminar. La troncal tiene ${troncal.mufas.length} mufas asociadas.` };
        }

        // Eliminación de tramos y mufas asociados (opcional según lógica de negocio, aquí se mantiene lo del controlador)
        await tx.tramoCable.deleteMany({
            where: { mufaOrigen: { troncalId: id } }
        });

        await tx.mufa.deleteMany({
            where: { troncalId: id }
        });

        await tx.troncal.delete({ where: { id } });
    });
};
