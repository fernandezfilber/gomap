const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/estadisticas - Obtener estadísticas generales del sistema
router.get('/', async (req, res) => {
    try {
        // Obtener estadísticas de todos los modelos
        const [totalPostes, totalTramos, totalClientes, totalMufas, totalCajas, totalTroncales, totalEmpresas] = await Promise.all([
            prisma.postes.count(),
            prisma.tramoCable.count(),
            prisma.cliente.count(),
            prisma.mufa.count(),
            prisma.caja.count(),
            prisma.troncal.count(),
            prisma.empresa.count()
        ]);

        // Estadísticas por empresa (si hay empresa en el token)
        const empresaId = req.empresaId; // Asumiendo que viene del middleware de auth
        let statsFiltradas = {
            totalPostes,
            totalTramos,
            totalClientes,
            totalMufas,
            totalCajas,
            totalTroncales,
            totalEmpresas
        };

        if (empresaId) {
            // Filtrar por empresa si está disponible - contar elementos relacionados con proyectos de la empresa
            const proyectosEmpresa = await prisma.proyecto.findMany({
                where: { empresaId },
                select: { id: true }
            });
            const proyectoIds = proyectosEmpresa.map(p => p.id);

            const [postesEmpresa, tramosEmpresa, clientesEmpresa, mufasEmpresa, cajasEmpresa, troncalesEmpresa] = await Promise.all([
                prisma.postes.count({
                    where: {
                        OR: [
                            { tramosInicio: { some: { proyectoId: { in: proyectoIds } } } },
                            { tramosFin: { some: { proyectoId: { in: proyectoIds } } } },
                            { mufa: { troncal: { proyectoId: { in: proyectoIds } } } },
                            { caja: { mufa: { troncal: { proyectoId: { in: proyectoIds } } } } }
                        ]
                    }
                }),
                prisma.tramoCable.count({ where: { proyectoId: { in: proyectoIds } } }),
                prisma.cliente.count({
                    where: {
                        caja: {
                            mufa: {
                                troncal: { proyectoId: { in: proyectoIds } }
                            }
                        }
                    }
                }),
                prisma.mufa.count({ where: { troncal: { proyectoId: { in: proyectoIds } } } }),
                prisma.caja.count({ where: { mufa: { troncal: { proyectoId: { in: proyectoIds } } } } }),
                prisma.troncal.count({ where: { proyectoId: { in: proyectoIds } } })
            ]);

            statsFiltradas = {
                totalPostes: postesEmpresa,
                totalTramos: tramosEmpresa,
                totalClientes: clientesEmpresa,
                totalMufas: mufasEmpresa,
                totalCajas: cajasEmpresa,
                totalTroncales: troncalesEmpresa,
                totalEmpresas: 1
            };
        }

        // Estadísticas adicionales
        const clientesPorMes = await prisma.cliente.groupBy({
            by: ['creadoEn'],
            _count: { id: true },
            orderBy: { creadoEn: 'asc' }
        });

        // Procesar clientes por mes
        const clientesMensuales = {};
        clientesPorMes.forEach(item => {
            const mes = new Date(item.creadoEn).getMonth();
            const year = new Date(item.creadoEn).getFullYear();
            const key = `${year}-${mes}`;
            clientesMensuales[key] = (clientesMensuales[key] || 0) + item._count.id;
        });

        // Obtener distribución de postes por tipo
        const postesPorTipo = await prisma.postes.groupBy({
            by: ['tipo'],
            _count: { id: true }
        });

        // Obtener estado de clientes (no hay estado en tramos, pero sí en clientes)
        const clientesPorEstado = await prisma.cliente.groupBy({
            by: ['estadoServicio'],
            _count: { id: true }
        });

        res.json({
            success: true,
            data: {
                ...statsFiltradas,
                clientesPorMes: Object.entries(clientesMensuales).map(([key, count]) => {
                    const [year, month] = key.split('-');
                    return {
                        mes: `${year}-${String(parseInt(month) + 1).padStart(2, '0')}`,
                        clientes: count
                    };
                }),
                postesPorTipo: postesPorTipo.map(item => ({
                    tipo: item.tipo || 'Sin tipo',
                    count: item._count.id
                })),
                clientesPorEstado: clientesPorEstado.map(item => ({
                    estado: item.estadoServicio || 'Sin estado',
                    count: item._count.id
                }))
            }
        });

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;