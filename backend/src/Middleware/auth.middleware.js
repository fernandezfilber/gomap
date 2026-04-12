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
    console.log("🔍 [DEBUG] Entrando a checkTenant");
    try {
        const { empresaId } = req.user;
        console.log("🆔 [DEBUG] Intentando validar empresaId:", empresaId);

        const empresa = await prisma.empresa.findUnique({
            where: { id: empresaId },
            select: { id: true, activo: true }
        });

        if (!empresa) {
            console.error("❌ [DEBUG] Empresa no existe en DB");
            return res.status(403).json({ message: "Empresa no encontrada" });
        }

        console.log("✅ [DEBUG] Empresa validada correctamente");
        next();
    } catch (error) {
        console.error("🔥 [DEBUG] CRASH en checkTenant:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    checkTenant
};