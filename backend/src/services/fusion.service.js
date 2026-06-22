const { prisma } = require('../config/db');

exports.getConexionesByNodo = async (nodoId, tipoNodo) => {
    return prisma.conexionHilo.findMany({
        where: { nodoId, tipoNodo },
        include: {
            tramoOrigen: true,
            tramoDestino: true,
            splitterOrigen: true,
            splitterDestino: true
        }
    });
};

exports.getSplittersByNodo = async (nodoId, tipoNodo) => {
    return prisma.splitter.findMany({
        where: { nodoId, tipoNodo },
        include: {
            conexionesEntrada: true,
            conexionesSalida: true
        }
    });
};

exports.createSplitter = async (data) => {
    const { nombre, ratio, tipo, nodoId, tipoNodo } = data;
    return prisma.splitter.create({
        data: { nombre, ratio, tipo, nodoId, tipoNodo }
    });
};

exports.createConexion = async (data) => {
    // Validar y crear conexion (fusión o drop)
    return prisma.conexionHilo.create({
        data
    });
};

exports.deleteConexion = async (id) => {
    return prisma.conexionHilo.delete({ where: { id } });
};

exports.deleteSplitter = async (id) => {
    return prisma.splitter.delete({ where: { id } });
};
