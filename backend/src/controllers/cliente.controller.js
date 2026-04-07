const { PrismaClient } = require('@prisma/client');
const prisma = require('../db');
// 1. CREAR CLIENTE: Con validación de capacidad en la Caja NAP
exports.createCliente = async (req, res) => {
    try {
        const { 
            nombre, dni, telefono, direccion, 
            cajaId, snMac, onuExternalId, 
            latitud, longitud, estadoServicio 
        } = req.body;

        if (!cajaId || !dni) {
            return res.status(400).json({ error: "DNI y Caja NAP son obligatorios." });
        }

        const resultado = await prisma.$transaction(async (tx) => {
            // A. Verificar capacidad de la caja
            const caja = await tx.caja.findUnique({ where: { id: cajaId } });
            if (!caja || caja.puertosLibres <= 0) {
                throw new Error("La Caja NAP seleccionada está saturada (0 puertos libres).");
            }

            // B. Crear el cliente con todos los campos técnicos
            const nuevoCliente = await tx.cliente.create({
                data: {
                    nombre,
                    dni,
                    telefono,
                    direccion,
                    snMac,
                    onuExternalId,
                    latitud: latitud ? parseFloat(latitud) : caja.latitud,
                    longitud: longitud ? parseFloat(longitud) : caja.longitud,
                    estadoServicio: estadoServicio || "ACTIVO",
                    cajaId
                }
            });

            // C. Descontar puerto
            await tx.caja.update({
                where: { id: cajaId },
                data: { puertosLibres: { decrement: 1 } }
            });

            return nuevoCliente;
        });

        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error al registrar cliente:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// 2. OBTENER CLIENTES: Con trazabilidad completa hasta la Troncal
exports.getClientes = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: { 
                caja: { 
                    include: { 
                        mufa: { 
                            include: { troncal: { select: { nombre: true } } } 
                        },
                        poste: { select: { codigo: true } }
                    } 
                } 
            },
            orderBy: { creadoEn: 'desc' }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lista de abonados" });
    }
};

// 3. ACTUALIZAR CLIENTE (Cambio de estado o dirección)
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await prisma.cliente.update({
            where: { id },
            data: req.body
        });
        res.json({ mensaje: "Datos de abonado actualizados", cliente: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar cliente" });
    }
};

// 4. ELIMINAR CLIENTE: Repone el puerto a la Caja NAP
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            const cliente = await tx.cliente.findUnique({ where: { id } });
            if (!cliente) throw new Error("Cliente no encontrado");

            // A. Reponer el puerto en la caja para un nuevo abonado
            await tx.caja.update({
                where: { id: cliente.cajaId },
                data: { puertosLibres: { increment: 1 } }
            });

            // B. Borrar el registro del cliente
            await tx.cliente.delete({ where: { id } });
        });

        res.json({ mensaje: "Cliente retirado y puerto liberado en la NAP." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar cliente", detalle: error.message });
    }
};