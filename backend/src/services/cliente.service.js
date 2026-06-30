const { Prisma } = require('@prisma/client');
const { prisma } = require('../config/db');

/**
 * Servicio de Clientes
 */

exports.createCliente = async (empresaId, usuarioId, data) => {
    const { 
        nombre, dni, telefono, direccion, 
        snMac, latitud, longitud, estadoServicio,
        cajaId, puerto, materiales, plan, ticketId
    } = data;

    if (!nombre || !dni || !cajaId) {
        throw { status: 400, message: "Nombre, DNI y cajaId son obligatorios" };
    }

    return prisma.$transaction(async (tx) => {
        // 1. Verificar existencia de la caja y permisos
        const caja = await tx.caja.findUnique({
            where: { id: cajaId },
            include: {
                poste: {
                    include: {
                        proyecto: true
                    }
                }
            }
        });

        if (!caja) throw { status: 404, message: "Caja no encontrada" };
        
        // Verificación de multi-tenencia
        const empresaCaja = caja.poste?.proyecto?.empresaId;
        if (empresaCaja !== empresaId) {
            throw { status: 403, message: "No tienes acceso a esta infraestructura" };
        }

        // 2. Validaciones de capacidad de la NAP
        if (caja.puertosLibres <= 0) {
            throw { status: 400, message: "La caja NAP ya no tiene puertos disponibles" };
        }

        // 3. Crear cliente
        const nuevoCliente = await tx.cliente.create({
            data: {
                nombre,
                dni,
                telefono,
                direccion,
                snMac,
                latitud: latitud ? new Prisma.Decimal(latitud) : caja.latitud,
                longitud: longitud ? new Prisma.Decimal(longitud) : caja.longitud,
                estadoServicio: estadoServicio || "ACTIVO",
                puerto: puerto || null,
                plan: plan || null,
                cajaId
            }
        });

        // 4. Actualizar puertos libres
        await tx.caja.update({
            where: { id: cajaId },
            data: { 
                puertosLibres: { decrement: 1 } 
            }
        });

        // 5. Descuento Automático de Inventario (Materiales de Instalación)
        if (materiales) {
            const { dropMetros, router, patchcord, micronodo } = materiales;
            const consumos = [];

            if (dropMetros && dropMetros > 0) consumos.push({ tipo: 'FIBRA_DROP', cantidad: dropMetros });
            if (router && router > 0) consumos.push({ tipo: 'ROUTER', cantidad: router });
            if (patchcord && patchcord > 0) consumos.push({ tipo: 'PATCHCORD', cantidad: patchcord });
            if (micronodo && micronodo > 0) consumos.push({ tipo: 'MICRONODO', cantidad: micronodo });

            for (const consumo of consumos) {
                // Buscar item genérico de este tipo
                const item = await tx.inventarioItem.findFirst({
                    where: { empresaId, tipo: consumo.tipo }
                });

                if (item) {
                    await tx.inventarioItem.update({
                        where: { id: item.id },
                        data: { stockTotal: { decrement: consumo.cantidad } }
                    });
                    
                    await tx.inventarioMovimiento.create({
                        data: {
                            itemId: item.id,
                            usuarioId,
                            tipo: 'CONSUMO_INSTALACION',
                            cantidad: consumo.cantidad,
                            motivo: `Instalación Cliente: ${nombre}`,
                            clienteId: nuevoCliente.id
                        }
                    });
                }
            }
        }
        // 6. Si viene con un ticketId (Instalación), lo marcamos como resuelto y le asociamos el cliente
        if (ticketId) {
            await tx.averia.update({
                where: { id: ticketId },
                data: {
                    estado: 'RESUELTA',
                    resueltoEn: new Date(),
                    clienteId: nuevoCliente.id
                }
            });
        }

        return nuevoCliente;
    });
};

exports.getClientes = async (empresaId, proyectoId) => {
    return prisma.cliente.findMany({
        where: {
            caja: {
                poste: {
                    proyecto: {
                        empresaId: empresaId,
                        ...(proyectoId && { id: proyectoId })
                    }
                }
            }
        },
        include: {
            caja: {
                select: {
                    codigo: true,
                    puertosLibres: true,
                    poste: { select: { codigo: true } }
                }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.updateCliente = async (id, empresaId, data) => {
    const { nombre, telefono, direccion, snMac, estadoServicio, puerto, plan } = data;

    return prisma.$transaction(async (tx) => {
        const cliente = await tx.cliente.findUnique({
            where: { id },
            include: { 
                caja: { 
                    include: { 
                        poste: { 
                            include: { 
                                proyecto: true
                            } 
                        } 
                    } 
                } 
            }
        });

        if (!cliente || cliente.caja?.poste?.proyecto?.empresaId !== empresaId) {
            throw { status: 403, message: "Cliente no encontrado o sin acceso" };
        }

        return await tx.cliente.update({
            where: { id },
            data: {
                nombre,
                telefono,
                direccion,
                snMac,
                estadoServicio,
                puerto,
                plan
            }
        });
    });
};

exports.deleteCliente = async (id, empresaId) => {
    return prisma.$transaction(async (tx) => {
        const cliente = await tx.cliente.findUnique({
            where: { id },
            include: {
                caja: {
                    include: {
                        poste: {
                            include: { proyecto: true }
                        }
                    }
                }
            }
        });

        if (!cliente) throw { status: 404, message: "Cliente no encontrado" };
        
        if (cliente.caja?.poste?.proyecto?.empresaId !== empresaId) {
            throw { status: 403, message: "Acceso denegado a este cliente" };
        }

        // Liberar puerto automáticamente al eliminar
        await tx.caja.update({
            where: { id: cliente.cajaId },
            data: { puertosLibres: { increment: 1 } }
        });

        await tx.cliente.delete({ where: { id } });
    });
};

exports.getHistorial = async (id, empresaId) => {
    const cliente = await prisma.cliente.findUnique({
        where: { id },
        include: {
            caja: { include: { poste: { include: { proyecto: true } } } }
        }
    });

    if (!cliente || cliente.caja?.poste?.proyecto?.empresaId !== empresaId) {
        throw { status: 403, message: "Cliente no encontrado o sin acceso" };
    }

    // Instalación: buscar movimientos de inventario asociados al cliente
    const movimientos = await prisma.inventarioMovimiento.findMany({
        where: { clienteId: id },
        include: {
            usuario: { select: { nombre: true, rol: true } },
            item: { select: { nombre: true, tipo: true } }
        },
        orderBy: { fecha: 'asc' }
    });

    // Averías: buscar averías asociadas al cliente
    const averias = await prisma.averia.findMany({
        where: { clienteId: id },
        include: {
            tecnico: { select: { nombre: true, rol: true } }
        },
        orderBy: { creadoEn: 'desc' }
    });

    return {
        instalacion: movimientos,
        averias: averias
    };
};
