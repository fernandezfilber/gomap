const { prisma } = require('../config/db');

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const { nombre, razonSocial, ruc, telefono, direccion } = req.body;

        if (!nombre) {
            return res.status(400).json({ success: false, message: "El nombre es obligatorio" });
        }

        const nuevaEmpresa = await prisma.empresa.create({
            // Usamos solo los campos que existen en el esquema para evitar errores de validación
            data: { 
                nombre, 
                razonSocial: razonSocial || null, 
                ruc: ruc || null, 
                telefono: telefono || null, 
                direccion: direccion || null 
            }
        });

        res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            empresa: nuevaEmpresa
        });
    } catch (error) {
        // IMPORTANTE: Cambia el log para ver el error real en los logs de Hostinger
        console.error("❌ Error Detallado:", error.message); 
        res.status(500).json({ 
            success: false, 
            message: "Error interno", 
            error: error.message // ← Agrégalo solo para esta prueba para ver qué pasa
        });
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