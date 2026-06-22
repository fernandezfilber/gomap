const { prisma } = require('../config/db');

/**
 * Servicio de Empresas
 */

exports.crearEmpresa = async (data) => {
    const { nombre, razonSocial, ruc, telefono, direccion } = data;

    if (!nombre) {
        throw { status: 400, message: "El nombre de la empresa es obligatorio" };
    }

    if (ruc) {
        const empresaExistente = await prisma.empresa.findUnique({
            where: { ruc }
        });
        if (empresaExistente) {
            throw { status: 400, message: "Ya existe una empresa registrada con ese RUC" };
        }
    }

    return prisma.empresa.create({
        data: {
            nombre: nombre.trim(),
            razonSocial: razonSocial ? razonSocial.trim() : null,
            ruc: ruc ? ruc.trim() : null,
            telefono: telefono ? telefono.trim() : null,
            direccion: direccion ? direccion.trim() : null,
            activo: true
        }
    });
};

exports.obtenerEmpresas = async () => {
    return prisma.empresa.findMany({
        where: { activo: true },
        include: {
            _count: {
                select: {
                    usuarios: true,
                    proyectos: true,
                    averias: true
                }
            }
        },
        orderBy: { creadoEn: 'desc' }
    });
};

exports.getEmpresaById = async (id) => {
    const empresa = await prisma.empresa.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    usuarios: true,
                    proyectos: true,
                    averias: true,
                    inventario: true
                }
            }
        }
    });

    if (!empresa) {
        throw { status: 404, message: "Empresa no encontrada" };
    }

    return empresa;
};

exports.actualizarEmpresa = async (id, data) => {
    const { nombre, razonSocial, ruc, telefono, direccion, activo } = data;

    return prisma.empresa.update({
        where: { id },
        data: {
            ...(nombre && { nombre: nombre.trim() }),
            ...(razonSocial !== undefined && { razonSocial: razonSocial ? razonSocial.trim() : null }),
            ...(ruc && { ruc: ruc.trim() }),
            ...(telefono !== undefined && { telefono: telefono ? telefono.trim() : null }),
            ...(direccion !== undefined && { direccion: direccion ? direccion.trim() : null }),
            ...(activo !== undefined && { activo })
        }
    });
};

exports.eliminarEmpresa = async (id) => {
    return prisma.empresa.update({
        where: { id },
        data: { activo: false }
    });
};
