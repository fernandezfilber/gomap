const { prisma } = require('../db');

// ====================== CREAR CLIENTE ======================
exports.createCliente = async (req, res) => {
    try {
        const { 
            nombre, dni, telefono, direccion, 
            snMac, latitud, longitud, estadoServicio,
            cajaId 
        } = req.body;

        const { empresaId } = req.user;

        if (!nombre || !dni || !cajaId) {
            return res.status(400).json({
                success: false,
                message: "Nombre, DNI y cajaId son obligatorios"
            });
        }

        const resultado = await prisma.$transaction(async (tx) => {

            // 1. Verificar que la caja pertenezca a la empresa del usuario
            const caja = await tx.caja.findUnique({
                where: { id: cajaId },
                include: {
                    mufa: {
                        include: {
                            troncal: {
                                include: {
                                    proyecto: { select: { empresaId: true } }
                                }
                            }
                        }
                    }
                }
            });

            if (!caja) throw new Error("Caja no encontrada");
            if (caja.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a esta caja");
            }

            if (caja.puertosLibres <= 0) {
                throw new Error("La caja NAP seleccionada no tiene puertos libres");
            }

            // 2. Crear el cliente
            const nuevoCliente = await tx.cliente.create({
                data: {
                    nombre,
                    dni,
                    telefono,
                    direccion,
                    snMac,
                    latitud: latitud ? parseFloat(latitud) : caja.latitud,
                    longitud: longitud ? parseFloat(longitud) : caja.longitud,
                    estadoServicio: estadoServicio || "ACTIVO",
                    cajaId
                }
            });

            // 3. Descontar un puerto de la caja
            await tx.caja.update({
                where: { id: cajaId },
                data: { puertosLibres: { decrement: 1 } }
            });

            return nuevoCliente;
        });

        res.status(201).json({
            success: true,
            message: "Cliente registrado correctamente",
            cliente: resultado
        });

    } catch (error) {
        console.error("❌ Error al crear cliente:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al registrar el cliente"
        });
    }
};

// ====================== OBTENER TODOS LOS CLIENTES (Solo de su empresa) ======================
exports.getClientes = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const clientes = await prisma.cliente.findMany({
            where: {
                caja: {
                    mufa: {
                        troncal: {
                            proyecto: { empresaId }
                        }
                    }
                }
            },
            include: {
                caja: {
                    include: {
                        poste: { select: { codigo: true } },
                        mufa: {
                            include: {
                                troncal: { select: { nombre: true, bufferColor: true } }
                            }
                        }
                    }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: clientes.length,
            clientes
        });

    } catch (error) {
        console.error("❌ Error al obtener clientes:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de clientes"
        });
    }
};

// ====================== ACTUALIZAR CLIENTE ======================
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, snMac, estadoServicio } = req.body;
    const { empresaId } = req.user;

    try {
        const clienteActualizado = await prisma.cliente.update({
            where: { 
                id,
                caja: {
                    mufa: {
                        troncal: { proyecto: { empresaId } }
                    }
                }
            },
            data: {
                nombre,
                telefono,
                direccion,
                snMac,
                estadoServicio
            }
        });

        res.json({
            success: true,
            message: "Cliente actualizado correctamente",
            cliente: clienteActualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Cliente no encontrado o sin acceso"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al actualizar el cliente"
        });
    }
};

// ====================== ELIMINAR CLIENTE (Libera puerto) ======================
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.$transaction(async (tx) => {
            const cliente = await tx.cliente.findUnique({
                where: { id },
                include: {
                    caja: {
                        include: {
                            mufa: {
                                include: {
                                    troncal: { select: { proyecto: { empresaId: true } } }
                                }
                            }
                        }
                    }
                }
            });

            if (!cliente || cliente.caja.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("Cliente no encontrado o sin acceso");
            }

            // Liberar puerto en la caja
            await tx.caja.update({
                where: { id: cliente.cajaId },
                data: { puertosLibres: { increment: 1 } }
            });

            // Eliminar cliente
            await tx.cliente.delete({ where: { id } });
        });

        res.json({
            success: true,
            message: "Cliente eliminado y puerto liberado correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar cliente:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error al eliminar el cliente"
        });
    }
};