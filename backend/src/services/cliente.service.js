const { Prisma } = require('@prisma/client');
const { prisma } = require('../config/db');

/**
 * Servicio de Clientes
 */

exports.createCliente = async (empresaId, data) => {
    const { 
        nombre, dni, telefono, direccion, 
        snMac, latitud, longitud, estadoServicio,
        cajaId, puerto 
    } = data;

    if (!nombre || !dni || !cajaId) {
        throw { status: 400, message: "Nombre, DNI y cajaId son obligatorios" };
    }

    return prisma.$transaction(async (tx) => {
        // 1. Verificar existencia de la caja y permisos
        const caja = await tx.caja.findUnique({
            where: { id: cajaId },
            include: {
                mufa: {
                    include: {
                        troncal: {
                            include: { proyecto: true }
                        }
                    }
                }
            }
        });

        if (!caja) throw { status: 404, message: "Caja no encontrada" };
        
        // Verificación de multi-tenencia
        const empresaCaja = caja.mufa?.troncal?.proyecto?.empresaId;
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

        return nuevoCliente;
    });
};

exports.getClientes = async (empresaId, proyectoId) => {
    return prisma.cliente.findMany({
        where: {
            caja: {
                mufa: {
                    troncal: {
                        proyecto: {
                            empresaId: empresaId,
                            ...(proyectoId && { id: proyectoId })
                        }
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
    const { nombre, telefono, direccion, snMac, estadoServicio, puerto } = data;

    return prisma.$transaction(async (tx) => {
        const cliente = await tx.cliente.findUnique({
            where: { id },
            include: { 
                caja: { 
                    include: { 
                        mufa: { 
                            include: { 
                                troncal: { 
                                    include: { proyecto: true } 
                                } 
                            } 
                        } 
                    } 
                } 
            }
        });

        if (!cliente || cliente.caja.mufa.troncal.proyecto.empresaId !== empresaId) {
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
                puerto
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
                        mufa: {
                            include: {
                                troncal: { include: { proyecto: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!cliente || cliente.caja.mufa.troncal.proyecto.empresaId !== empresaId) {
            throw { status: 403, message: "Cliente no encontrado o sin acceso" };
        }

        // Liberar puerto automáticamente al eliminar
        await tx.caja.update({
            where: { id: cliente.cajaId },
            data: { puertosLibres: { increment: 1 } }
        });

        await tx.cliente.delete({ where: { id } });
    });
};
