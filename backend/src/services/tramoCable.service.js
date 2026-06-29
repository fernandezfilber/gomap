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

exports.createTramo = async (empresaId, usuarioId, data) => {
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

    const capacidad = capacidadHilos ? parseInt(capacidadHilos) : 48;
    const longitud = longitudMetros ? parseFloat(longitudMetros) : null;

    const resultado = await prisma.$transaction(async (tx) => {
        const nuevoTramo = await tx.tramoCable.create({
            data: {
                nombre: nombre || `Tramo-${Date.now().toString().slice(-6)}`,
                tipoCable: tipoCable || "FIBRA",
                subtipo,
                path: typeof path === 'string' ? path : JSON.stringify(path || []),
                colorVisual: colorVisual || "#8b5cf6",
                longitudMetros: longitud,
                atenuacion: atenuacion ? parseFloat(atenuacion) : null,
                capacidadHilos: capacidad,
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

        // DESCUENTO AUTOMÁTICO DE INVENTARIO
        if (longitud && longitud > 0) {
            // Buscar items de fibra que coincidan con la capacidad (ej. 12 hilos)
            const itemsFibra = await tx.inventarioItem.findMany({
                where: {
                    empresaId,
                    tipo: { in: ['CABLE_FIBRA', 'FIBRA_DROP'] },
                    capacidadHilos: capacidad,
                    stockTotal: { gt: 0 }
                },
                orderBy: {
                    creadoEn: 'asc' // FIFO: Consumir las bobinas más antiguas primero
                }
            });

            // Convertir todo a metros para calcular si hay stock suficiente
            let totalDisponibleMetros = 0;
            for (const item of itemsFibra) {
                if (item.unidadMedida === 'KILOMETROS') totalDisponibleMetros += item.stockTotal * 1000;
                else totalDisponibleMetros += item.stockTotal;
            }

            if (totalDisponibleMetros < longitud) {
                throw { status: 400, message: `Stock insuficiente. Necesitas ${longitud.toFixed(2)}m de fibra de ${capacidad} hilos, pero solo hay ${totalDisponibleMetros.toFixed(2)}m disponibles.` };
            }

            let longitudRestante = longitud;

            for (const item of itemsFibra) {
                if (longitudRestante <= 0) break;

                const factor = item.unidadMedida === 'KILOMETROS' ? 1000 : 1;
                const stockEnMetros = item.stockTotal * factor;

                let cantidadAdescontarEnMetros = 0;
                if (stockEnMetros >= longitudRestante) {
                    cantidadAdescontarEnMetros = longitudRestante;
                    longitudRestante = 0;
                } else {
                    cantidadAdescontarEnMetros = stockEnMetros;
                    longitudRestante -= stockEnMetros;
                }

                const cantidadDescontarFinal = cantidadAdescontarEnMetros / factor;

                await tx.inventarioItem.update({
                    where: { id: item.id },
                    data: { stockTotal: { decrement: cantidadDescontarFinal } }
                });

                await tx.inventarioMovimiento.create({
                    data: {
                        itemId: item.id,
                        usuarioId,
                        tipo: 'CONSUMO_TRAMO',
                        cantidad: cantidadDescontarFinal,
                        motivo: `Tendido de ${cantidadAdescontarEnMetros.toFixed(2)}m (${capacidad} hilos) - Tramo ${nuevoTramo.nombre}`,
                        tramoId: nuevoTramo.id
                    }
                });
            }
        }

        return nuevoTramo;
    });

    return {
        ...resultado,
        path: typeof resultado.path === 'string' 
            ? JSON.parse(resultado.path) 
            : resultado.path
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
