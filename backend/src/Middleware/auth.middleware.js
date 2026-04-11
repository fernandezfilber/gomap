const jwt = require('jsonwebtoken');
const { prisma } = require('../db');

// ====================== VERIFICAR TOKEN ======================
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "No se proporcionó token de autenticación" 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_gomap_2026');

        // Adjuntamos información importante del usuario
        req.user = {
            id: decoded.id,
            rol: decoded.rol,
            empresaId: decoded.empresaId,
            nombre: decoded.nombre,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error("❌ Token inválido:", error.message);
        return res.status(401).json({ 
            success: false,
            message: "Token inválido o expirado" 
        });
    }
};

// ====================== VERIFICAR ROL ADMIN ======================
const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: Se requiere rol de Administrador"
        });
    }
    next();
};

// ====================== MIDDLEWARE DE TENANT (Multi-Empresa) ======================
const checkTenant = async (req, res, next) => {
    try {
        const { empresaId } = req.user;

        // Verificar que la empresa siga activa
        const empresa = await prisma.empresa.findUnique({
            where: { id: empresaId },
            select: { id: true, nombre: true, activo: true }
        });

        if (!empresa) {
            return res.status(403).json({
                success: false,
                message: "Empresa no encontrada"
            });
        }

        if (!empresa.activo) {
            return res.status(403).json({
                success: false,
                message: "La empresa está desactivada"
            });
        }

        // Adjuntamos la empresa al request para usarla fácilmente
        req.empresa = empresa;
        next();

    } catch (error) {
        console.error("❌ Error en checkTenant:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno al validar empresa" 
        });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    checkTenant
};