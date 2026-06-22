const { prisma } = require('../config/db');

/**
 * Servicio de Proyectos
 */

exports.crearProyecto = async (empresaId, data) => {
    const { nombre, descripcion, estado } = data;

    if (!nombre) {
        throw { status: 400, message: "El nombre del proyecto es obligatorio" };
    }

    return prisma.$transaction(async (tx) => {
        const proyectoCreado = await tx.proyecto.create({
            data: {
                nombre: nombre.trim(),
                descripcion: descripcion ? descripcion.trim() : null,
                estado: estado || "PLANIFICACION",
                empresaId
            },
            include: {
                empresa: { select: { nombre: true } }
            }
        });

        // Crear troncal principal automática
        const troncalInicial = await tx.troncal.create({
            data: {
                nombre: `Troncal Principal - ${nombre}`,
                bufferColor: '#3b82f6',
                cantHilos: 96,
                hilosLibres: 96,
                descripcion: `Troncal principal del proyecto ${nombre}`,
                ruta: null,
                proyectoId: proyectoCreado.id
            }
        });

        return { proyecto: proyectoCreado, troncal: troncalInicial };
    });
};

exports.listarProyectos = async (empresaId) => {
    return prisma.proyecto.findMany({
        where: { empresaId },
        include: {
            _count: {
                select: {
                    troncales: true,
                    postes: true,
                    tramos: true
                }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.getProyectoDetalle = async (id, empresaId) => {
    const proyecto = await prisma.proyecto.findFirst({
        where: { 
            id, 
            empresaId 
        },
        include: {
            troncales: {
                include: {
                    _count: { select: { mufas: true } },
                    mufas: {
                        select: {
                            id: true,
                            codigo: true,
                            cajas: { select: { _count: { select: { clientes: true } } } }
                        }
                    }
                }
            },
            postes: {
                select: { id: true, codigo: true, estado: true }
            },
            tramos: {
                select: {
                    id: true,
                    nombre: true,
                    tipoCable: true,
                    longitudMetros: true
                }
            }
        }
    });

    if (!proyecto) {
        throw { status: 404, message: "Proyecto no encontrado o no tienes acceso" };
    }

    return proyecto;
};

exports.actualizarProyecto = async (id, empresaId, data) => {
    const { nombre, descripcion, estado } = data;

    return prisma.proyecto.update({
        where: { 
            id,
            empresaId
        },
        data: {
            ...(nombre && { nombre: nombre.trim() }),
            ...(descripcion !== undefined && { descripcion: descripcion ? descripcion.trim() : null }),
            ...(estado && { estado })
        }
    });
};

exports.eliminarProyecto = async (id, empresaId) => {
    return prisma.$transaction(async (tx) => {
        const proyecto = await tx.proyecto.findFirst({
            where: { id, empresaId },
            include: {
                _count: {
                    select: {
                        postes: true,
                        troncales: true,
                        tramos: true
                    }
                }
            }
        });

        if (!proyecto) {
            throw { status: 404, message: "Proyecto no encontrado o sin acceso" };
        }

        if (proyecto._count.postes > 0 || proyecto._count.troncales > 0) {
            throw { status: 400, message: `No se puede eliminar el proyecto. Tiene ${proyecto._count.postes} postes, ${proyecto._count.troncales} troncales y ${proyecto._count.tramos} tramos.` };
        }

        await tx.proyecto.delete({ where: { id } });
    });
};
