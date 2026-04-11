const { prisma } = require('../config/db');

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const { nombre, razonSocial, ruc, telefono, direccion } = req.body;

        if (!nombre) {
            return res.status(400).json({ success: false, message: "El nombre es obligatorio" });
        }

        const nuevaEmpresa = await prisma.empresa.create({
            data: { nombre, razonSocial, ruc, telefono, direccion }
        });

        res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            empresa: nuevaEmpresa
        });
    } catch (error) {
        console.error("❌ Error al crear empresa:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

// Obtener todas las empresas (útil para administradores globales)
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await prisma.empresa.findMany({
            include: { _count: { select: { usuarios: true, proyectos: true } } }
        });
        res.json({ success: true, empresas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};