const { prisma } = require('../config/db');

/**
 * Servicio de Postes
 */

exports.getPostes = async (empresaId, proyectoId) => {
    return prisma.poste.findMany({
        where: {
            proyecto: {
                empresaId: empresaId,
                ...(proyectoId && { id: proyectoId })
            }
        },
        include: {
            mufa: {
                select: { 
                    id: true, 
                    codigo: true,
                    ratioSplitteo: true,
                    estado: true
                }
            },
            cajas: {
                select: { 
                    id: true, 
                    codigo: true,
                    puertosLibres: true,
                    capacidadTotal: true,
                    estado: true
                }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.createPoste = async (empresaId, data) => {
    const { 
        codigo, latitud, longitud, tipo, altura, 
        direccion, referencia, estado, proyectoId 
    } = data;

    if (!latitud || !longitud || !proyectoId) {
        throw { status: 400, message: "Coordenadas y proyectoId son obligatorios" };
    }

    // Verificar que el proyecto pertenezca a la empresa del usuario
    const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId },
        select: { empresaId: true }
    });

    if (!proyecto || proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "No tienes acceso a este proyecto o el proyecto no existe" };
    }

    return prisma.poste.create({
        data: {
            codigo: codigo || `P-${Date.now()}`,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            tipo: tipo || 'CONCRETO',
            altura: altura || '8m',
            direccion,
            referencia,
            estado: estado || 'ACTIVO',
            proyectoId
        }
    });
};

exports.getPosteWithEquipos = async (id, empresaId) => {
    const poste = await prisma.poste.findUnique({
        where: { id },
        include: {
            mufa: {
                select: {
                    id: true,
                    codigo: true,
                    ratioSplitteo: true,
                    estado: true
                }
            },
            cajas: {
                include: {
                    _count: { select: { clientes: true } },
                    clientes: { 
                        select: { id: true, nombre: true, dni: true, estadoServicio: true } 
                    }
                }
            },
            tramosInicio: {
                select: { id: true, nombre: true, tipoCable: true, longitudMetros: true }
            },
            tramosFin: {
                select: { id: true, nombre: true, tipoCable: true, longitudMetros: true }
            },
            proyecto: { select: { empresaId: true } }
        }
    });

    if (!poste) {
        throw { status: 404, message: "Poste no encontrado" };
    }

    // Validación de multi-tenencia
    if (poste.proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "No tienes acceso a los datos de este poste" };
    }

    return poste;
};

exports.updatePoste = async (id, empresaId, data) => {
    // Verificar propiedad antes de actualizar
    const posteExistente = await prisma.poste.findUnique({
        where: { id },
        select: { proyecto: { select: { empresaId: true } } }
    });

    if (!posteExistente || posteExistente.proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "Poste no encontrado o sin permisos de edición" };
    }

    const dataUpdate = { ...data };
    if (dataUpdate.latitud) dataUpdate.latitud = parseFloat(dataUpdate.latitud);
    if (dataUpdate.longitud) dataUpdate.longitud = parseFloat(dataUpdate.longitud);

    return prisma.poste.update({
        where: { id },
        data: dataUpdate
    });
};

exports.deletePoste = async (id, empresaId) => {
    const poste = await prisma.poste.findUnique({
        where: { id },
        include: {
            mufa: true,
            cajas: true,
            _count: {
                select: { tramosInicio: true, tramosFin: true }
            },
            proyecto: { select: { empresaId: true } }
        }
    });

    if (!poste || poste.proyecto.empresaId !== empresaId) {
        throw { status: 404, message: "Poste no encontrado" };
    }

    // Lógica de integridad: No borrar si tiene equipos
    const hasMufa = !!poste.mufa;
    const hasCajas = poste.cajas.length > 0;
    const hasTramos = (poste._count.tramosInicio + poste._count.tramosFin) > 0;

    if (hasMufa || hasCajas || hasTramos) {
        throw { status: 400, message: `No se puede eliminar infraestructura activa: ${hasMufa ? '[Mufa] ' : ''}${hasCajas ? '[Cajas NAP] ' : ''}${hasTramos ? '[Cables] ' : ''}` };
    }

    return prisma.poste.delete({ where: { id } });
};
