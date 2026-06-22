const { prisma } = require('../config/db');

/**
 * Servicio de Estadísticas
 */

exports.getEstadisticas = async (empresaId) => {
    // 1. Estadísticas Globales (Base)
    const [totalPostes, totalTramos, totalClientes, totalMufas, totalCajas, totalTroncales, totalEmpresas] = await Promise.all([
        prisma.poste.count(),
        prisma.tramoCable.count(),
        prisma.cliente.count(),
        prisma.mufa.count(),
        prisma.caja.count(),
        prisma.troncal.count(),
        prisma.empresa.count()
    ]);

    let statsFiltradas = {
        totalPostes,
        totalTramos,
        totalClientes,
        totalMufas,
        totalCajas,
        totalTroncales,
        totalEmpresas
    };

    // 2. Si hay empresaId, filtrar estadísticas por esa empresa
    if (empresaId) {
        const proyectosEmpresa = await prisma.proyecto.findMany({
            where: { empresaId },
            select: { id: true }
        });
        const proyectoIds = proyectosEmpresa.map(p => p.id);

        const [postesEmpresa, tramosEmpresa, clientesEmpresa, mufasEmpresa, cajasEmpresa, troncalesEmpresa] = await Promise.all([
            prisma.poste.count({
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

    // 3. Obtener distribución temporal y por tipos (Filtrando por empresa si corresponde)
    const commonWhere = empresaId ? {
        caja: {
            mufa: {
                troncal: { proyecto: { empresaId } }
            }
        }
    } : {};

    const [clientesPorMes, postesPorTipo, clientesPorEstado] = await Promise.all([
        prisma.cliente.findMany({
            where: commonWhere,
            select: { creadoEn: true }
        }),
        prisma.poste.groupBy({
            by: ['tipo'],
            _count: { id: true },
            where: empresaId ? {
                OR: [
                    { tramosInicio: { some: { proyecto: { empresaId } } } },
                    { tramosFin: { some: { proyecto: { empresaId } } } }
                ]
            } : {}
        }),
        prisma.cliente.groupBy({
            by: ['estadoServicio'],
            _count: { id: true },
            where: commonWhere
        })
    ]);

    // Procesar clientes por mes
    const clientesMensuales = {};
    clientesPorMes.forEach(item => {
        const date = new Date(item.creadoEn);
        const mes = date.getMonth();
        const year = date.getFullYear();
        const key = `${year}-${mes}`;
        clientesMensuales[key] = (clientesMensuales[key] || 0) + 1;
    });

    return {
        ...statsFiltradas,
        clientesPorMes: Object.entries(clientesMensuales).map(([key, count]) => {
            const [year, month] = key.split('-');
            return {
                mes: `${year}-${String(parseInt(month) + 1).padStart(2, '0')}`,
                clientes: count
            };
        }).sort((a, b) => a.mes.localeCompare(b.mes)),
        postesPorTipo: postesPorTipo.map(item => ({
            tipo: item.tipo || 'Sin tipo',
            count: item._count.id
        })),
        clientesPorEstado: clientesPorEstado.map(item => ({
            estado: item.estadoServicio || 'Sin estado',
            count: item._count.id
        }))
    };
};
