const { prisma } = require('../config/db');

exports.getItems = async (req, res) => {
    try {
        const items = await prisma.inventarioItem.findMany({
            where: { empresaId: req.user.empresaId },
            orderBy: { actualizadoEn: 'desc' },
            include: {
                movimientos: {
                    orderBy: { fecha: 'desc' },
                    take: 10,
                    include: { usuario: { select: { nombre: true, email: true } } }
                }
            }
        });
        res.json({ success: true, data: items });
    } catch (error) {
        console.error('Error getItems:', error);
        res.status(500).json({ success: false, message: 'Error al obtener inventario' });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { tipo, nombre, codigo, descripcion, stockTotal, unidadMedida, ubicacion, capacidadHilos } = req.body;
        
        // Verificar si el código ya existe
        const existe = await prisma.inventarioItem.findUnique({ where: { codigo } });
        if (existe) {
            return res.status(400).json({ success: false, message: 'El código ya está en uso' });
        }

        const nuevoItem = await prisma.inventarioItem.create({
            data: {
                tipo,
                nombre,
                codigo,
                descripcion,
                stockTotal: parseFloat(stockTotal) || 0,
                unidadMedida: unidadMedida || 'UNIDADES',
                ubicacion,
                capacidadHilos: (tipo === 'CABLE_FIBRA' || tipo === 'FIBRA_DROP') && capacidadHilos ? parseInt(capacidadHilos) : null,
                empresaId: req.user.empresaId
            }
        });

        res.status(201).json({ success: true, data: nuevoItem });
    } catch (error) {
        console.error('Error createItem:', error);
        res.status(500).json({ success: false, message: 'Error al crear item de inventario' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, nombre, codigo, descripcion, unidadMedida, ubicacion, capacidadHilos } = req.body;
        
        // Verificar si el código ya existe en OTRO item
        if (codigo) {
            const existe = await prisma.inventarioItem.findFirst({
                where: { 
                    codigo,
                    empresaId: req.user.empresaId,
                    id: { not: id }
                }
            });
            if (existe) {
                return res.status(400).json({ success: false, message: 'El código ya está en uso por otro ítem' });
            }
        }

        const itemActualizado = await prisma.inventarioItem.update({
            where: { id },
            data: {
                tipo,
                nombre,
                codigo,
                descripcion,
                unidadMedida,
                ubicacion,
                capacidadHilos: (tipo === 'CABLE_FIBRA' || tipo === 'FIBRA_DROP') && capacidadHilos ? parseInt(capacidadHilos) : null,
            }
        });

        res.json({ success: true, data: itemActualizado });
    } catch (error) {
        console.error('Error updateItem:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar item de inventario' });
    }
};

exports.registrarMovimiento = async (req, res) => {
    try {
        const { itemId, tipo, cantidad, motivo } = req.body;
        const cant = parseFloat(cantidad);

        if (!cant || cant <= 0) {
            return res.status(400).json({ success: false, message: 'Cantidad inválida' });
        }

        const item = await prisma.inventarioItem.findUnique({
            where: { id: itemId }
        });

        if (!item || item.empresaId !== req.user.empresaId) {
            return res.status(404).json({ success: false, message: 'Item no encontrado' });
        }

        let nuevoStock = item.stockTotal;
        
        if (tipo === 'INGRESO') {
            nuevoStock += cant;
        } else if (tipo === 'SALIDA' || tipo === 'AJUSTE' || tipo === 'CONSUMO_TRAMO' || tipo === 'CONSUMO_INSTALACION') {
            if (item.stockTotal < cant && tipo !== 'AJUSTE') {
                return res.status(400).json({ success: false, message: 'Stock insuficiente' });
            }
            nuevoStock -= cant;
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const mov = await tx.inventarioMovimiento.create({
                data: {
                    itemId,
                    tipo,
                    cantidad: cant,
                    motivo,
                    usuarioId: req.user.id
                }
            });

            const act = await tx.inventarioItem.update({
                where: { id: itemId },
                data: { stockTotal: nuevoStock }
            });

            return { movimiento: mov, itemActualizado: act };
        });

        res.json({ success: true, data: resultado });
    } catch (error) {
        console.error('Error registrarMovimiento:', error);
        res.status(500).json({ success: false, message: 'Error al registrar movimiento' });
    }
};

exports.getHistorial = async (req, res) => {
    try {
        const movimientos = await prisma.inventarioMovimiento.findMany({
            where: { item: { empresaId: req.user.empresaId } },
            orderBy: { fecha: 'desc' },
            include: {
                item: { select: { nombre: true, codigo: true, tipo: true, unidadMedida: true } },
                usuario: { select: { nombre: true, rol: true } }
            },
            take: 100 // Limitar últimos 100 para no saturar
        });
        res.json({ success: true, data: movimientos });
    } catch (error) {
        console.error('Error getHistorial:', error);
        res.status(500).json({ success: false, message: 'Error al obtener historial' });
    }
};

exports.consumoTicket = async (req, res) => {
    try {
        const { averiaId, clienteId, items } = req.body;
        // items: [{ itemId: string, cantidad: number }]

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No hay items para descontar' });
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const movimientos = [];
            
            for (const reqItem of items) {
                const itemDb = await tx.inventarioItem.findUnique({ where: { id: reqItem.itemId } });
                if (!itemDb || itemDb.empresaId !== req.user.empresaId) {
                    throw new Error(`Item no encontrado: ${reqItem.itemId}`);
                }
                
                const cant = parseFloat(reqItem.cantidad);
                if (cant <= 0) throw new Error(`Cantidad inválida para ${itemDb.nombre}`);
                if (itemDb.stockTotal < cant) {
                    throw new Error(`Stock insuficiente de ${itemDb.nombre}. Disponible: ${itemDb.stockTotal}`);
                }

                const nuevoStock = itemDb.stockTotal - cant;
                
                await tx.inventarioItem.update({
                    where: { id: itemDb.id },
                    data: { stockTotal: nuevoStock }
                });

                const mov = await tx.inventarioMovimiento.create({
                    data: {
                        itemId: itemDb.id,
                        tipo: 'CONSUMO_INSTALACION',
                        cantidad: cant,
                        motivo: `Ticket #${averiaId || 'N/A'}`,
                        usuarioId: req.user.id,
                        averiaId: averiaId || null,
                        clienteId: clienteId || null
                    }
                });
                movimientos.push(mov);
            }
            return movimientos;
        });

        res.json({ success: true, data: resultado });
    } catch (error) {
        console.error('Error consumoTicket:', error);
        res.status(400).json({ success: false, message: error.message || 'Error al descontar materiales' });
    }
};
