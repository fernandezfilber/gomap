const { prisma } = require('../config/db');

/**
 * Servicio de Administración Global
 */

exports.listarEmpresas = async () => {
    return prisma.empresa.findMany({
        include: {
            _count: {
                select: { usuarios: true }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.toggleBloqueoEmpresa = async (id, data) => {
    const { bloqueado, motivoBloqueo } = data;

    return prisma.empresa.update({
        where: { id },
        data: { 
            bloqueado,
            motivoBloqueo: bloqueado ? motivoBloqueo : null
        }
    });
};

exports.actualizarSuscripcion = async (id, data) => {
    const { plan, finSuscripcion } = data;

    return prisma.empresa.update({
        where: { id },
        data: { 
            plan,
            finSuscripcion: finSuscripcion ? new Date(finSuscripcion) : null,
            bloqueado: false // Desbloquear automáticamente al renovar
        }
    });
};

exports.eliminarEmpresaTotal = async (id) => {
    // 1. Obtener todos los IDs de proyectos de esta empresa para limpiar su red
    const proyectos = await prisma.proyecto.findMany({
        where: { empresaId: id },
        select: { id: true }
    });
    const proyectoIds = proyectos.map(p => p.id);

    // 2. Ejecutar borrado en orden de dependencia en una transacción
    return prisma.$transaction(async (tx) => {
        // A. Borrar Tramos de Cable
        await tx.tramoCable.deleteMany({ where: { proyectoId: { in: proyectoIds } } });

        // B. Borrar Cajas (Clientes se borran por cascada en el schema)
        await tx.caja.deleteMany({ where: { poste: { proyectoId: { in: proyectoIds } } } });

        // C. Borrar Mufas
        await tx.mufa.deleteMany({ where: { troncal: { proyectoId: { in: proyectoIds } } } });

        // D. Borrar Troncales
        await tx.troncal.deleteMany({ where: { proyectoId: { in: proyectoIds } } });

        // E. Borrar Postes
        await tx.poste.deleteMany({ where: { proyectoId: { in: proyectoIds } } });

        // F. Borrar Proyectos
        await tx.proyecto.deleteMany({ where: { empresaId: id } });

        // G. Borrar Averías e Inventario
        await tx.averia.deleteMany({ where: { empresaId: id } });
        await tx.inventarioItem.deleteMany({ where: { empresaId: id } });

        // H. Borrar Usuarios
        await tx.usuario.deleteMany({ where: { empresaId: id } });

        // I. Finalmente, borrar la Empresa
        await tx.empresa.delete({ where: { id } });
    });
};
