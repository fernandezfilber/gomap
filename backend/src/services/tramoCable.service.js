const { prisma } = require('../config/db');

/**
 * Servicio de Tramos de Cable
 */

exports.getTramos = async (empresaId, proyectoId) => {
    const tramos = await prisma.tramoCable.findMany({
        where: {
            proyecto: { 
                empresaId 
            },
            ...(proyectoId && { proyectoId })
        },
        include: {
            proyecto: { select: { nombre: true, estado: true } },
            posteInicio: { select: { codigo: true, latitud: true, longitud: true } },
            posteFin:    { select: { codigo: true, latitud: true, longitud: true } },
            mufaOrigen:  { select: { codigo: true } },
            cajaDestino: { select: { codigo: true } }
        },
        orderBy: { creadoEn: 'desc' }
    });

    // Convertir path de string a array para el mapa
    return tramos.map(tramo => ({
        ...tramo,
        path: typeof tramo.path === 'string' 
            ? JSON.parse(tramo.path || '[]') 
            : (tramo.path || [])
    }));
};

exports.createTramo = async (empresaId, data) => {
    const { 
        nombre, 
        tipoCable, 
        subtipo,
        path, 
        colorVisual,
        longitudMetros,
        atenuacion,
        hilosUsados,
        hilosReservados,
        capacidadHilos,
        hilosRetorno,
        proyectoId, 
        posteInicioId, 
        posteFinId, 
        mufaOrigenId, 
        cajaDestinoId 
    } = data;

    if (!proyectoId) {
        throw { status: 400, message: "El ID del proyecto es obligatorio" };
    }

    // Verificar proyecto
    const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId },
        select: { empresaId: true }
    });

    if (!proyecto || proyecto.empresaId !== empresaId) {
        throw { status: 403, message: "No tienes acceso a este proyecto" };
    }

    // Validación de origen y destino
    if (!((posteInicioId && posteFinId) || (mufaOrigenId && cajaDestinoId))) {
        throw { status: 400, message: "El tramo debe tener (posteInicio + posteFin) O (mufaOrigen + cajaDestino)" };
    }

    const nuevoTramo = await prisma.tramoCable.create({
        data: {
            nombre: nombre || `Tramo-${Date.now().toString().slice(-6)}`,
            tipoCable: tipoCable || "FIBRA",
            subtipo,
            path: typeof path === 'string' ? path : JSON.stringify(path || []),
            colorVisual: colorVisual || "#8b5cf6",
            longitudMetros: longitudMetros ? parseFloat(longitudMetros) : null,
            atenuacion: atenuacion ? parseFloat(atenuacion) : null,
            capacidadHilos: capacidadHilos ? parseInt(capacidadHilos) : 48,
            hilosUsados: hilosUsados || 1,
            hilosReservados: hilosReservados || 0,
            hilosRetorno: hilosRetorno ? parseInt(hilosRetorno) : 0,
            proyectoId,
            posteInicioId: posteInicioId || null,
            posteFinId: posteFinId || null,
            mufaOrigenId: mufaOrigenId || null,
            cajaDestinoId: cajaDestinoId || null
        },
        include: {
            posteInicio: true,
            posteFin: true,
            mufaOrigen: true,
            cajaDestino: true
        }
    });

    return {
        ...nuevoTramo,
        path: typeof nuevoTramo.path === 'string' 
            ? JSON.parse(nuevoTramo.path) 
            : nuevoTramo.path
    };
};

exports.getTramoById = async (id, empresaId) => {
    const tramo = await prisma.tramoCable.findUnique({
        where: { id },
        include: {
            proyecto: true,
            posteInicio: true,
            posteFin: true,
            mufaOrigen: true,
            cajaDestino: true
        }
    });

    if (!tramo || tramo.proyecto.empresaId !== empresaId) {
        throw { status: 404, message: "Tramo no encontrado o sin acceso" };
    }

    return {
        ...tramo,
        path: typeof tramo.path === 'string' 
            ? JSON.parse(tramo.path || '[]') 
            : (tramo.path || [])
    };
};

exports.updateTramo = async (id, empresaId, data) => {
    return prisma.tramoCable.update({
        where: { 
            id,
            proyecto: { empresaId }   // Seguridad multi-tenant
        },
        data: {
            ...(data.nombre && { nombre: data.nombre }),
            ...(data.tipoCable && { tipoCable: data.tipoCable }),
            ...(data.subtipo !== undefined && { subtipo: data.subtipo }),
            ...(data.path && { path: typeof data.path === 'string' ? data.path : JSON.stringify(data.path) }),
            ...(data.colorVisual && { colorVisual: data.colorVisual }),
            ...(data.longitudMetros && { longitudMetros: parseFloat(data.longitudMetros) }),
            ...(data.atenuacion && { atenuacion: parseFloat(data.atenuacion) }),
            ...(data.capacidadHilos && { capacidadHilos: parseInt(data.capacidadHilos) }),
            ...(data.hilosUsados && { hilosUsados: data.hilosUsados }),
            ...(data.hilosReservados !== undefined && { hilosReservados: data.hilosReservados }),
            ...(data.hilosRetorno !== undefined && { hilosRetorno: parseInt(data.hilosRetorno) }),
            ...(data.posteInicioId !== undefined && { posteInicioId: data.posteInicioId }),
            ...(data.posteFinId !== undefined && { posteFinId: data.posteFinId }),
            ...(data.mufaOrigenId !== undefined && { mufaOrigenId: data.mufaOrigenId }),
            ...(data.cajaDestinoId !== undefined && { cajaDestinoId: data.cajaDestinoId })
        }
    });
};

exports.deleteTramo = async (id, empresaId) => {
    return prisma.tramoCable.delete({
        where: { 
            id,
            proyecto: { empresaId }
        }
    });
};
