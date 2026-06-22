const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');

// ====================== VERIFICAR TOKEN ======================
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('🔐 [Auth] Token recibido:', token ? 'SÍ' : 'NO');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No se proporcionó token de autenticación"
        });
    }

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'secret_key_gomap_2026'
        );

        // Adjuntamos la información del usuario al request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            rol: decoded.rol,
            empresaId: decoded.empresaId,
            nombre: decoded.nombre
        };

        next();
    } catch (error) {
        console.error("❌ [Auth] Token inválido:", error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expirado, por favor inicia sesión nuevamente"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Token inválido o mal formado"
        });
    }
};

// ====================== VERIFICAR ROL ADMIN ======================
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: Se requiere rol de Administrador"
        });
    }
    next();
};

// ====================== VERIFICAR ROL TÉCNICO O SUPERIOR ======================
const isTecnicoOrHigher = (req, res, next) => {
    if (!req.user || (req.user.rol !== 'ADMIN' && req.user.rol !== 'TECNICO')) {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: Se requiere rol de Técnico o Administrador"
        });
    }
    next();
};

// ====================== MIDDLEWARE MULTI-TENANT (CHECK EMPRESA) ======================
const checkTenant = async (req, res, next) => {
    try {
        const { empresaId } = req.user;

        if (!empresaId) {
            console.error("❌ [Tenant] empresaId no encontrado en el token");
            return res.status(401).json({
                success: false,
                message: "Token inválido - falta información de empresa"
            });
        }

        const empresa = await prisma.empresa.findUnique({
            where: { id: empresaId },
            select: { id: true, nombre: true, activo: true, bloqueado: true, motivoBloqueo: true }
        });

        if (!empresa) {
            return res.status(403).json({
                success: false,
                message: "Empresa no encontrada"
            });
        }

        if (!empresa.activo || empresa.bloqueado) {
            return res.status(403).json({
                success: false,
                empresaId: empresa.id,
                message: empresa.bloqueado 
                    ? `Acceso bloqueado: ${empresa.motivoBloqueo || 'Consulte con administración'}`
                    : "La empresa está desactivada"
            });
        }

        // --- VERIFICAR SI EL USUARIO ESTÁ ACTIVO ---
        const usuarioActual = await prisma.usuario.findUnique({
            where: { id: req.user.id },
            select: { activo: true }
        });

        if (!usuarioActual || !usuarioActual.activo) {
            return res.status(403).json({
                success: false,
                message: "Tu cuenta de usuario ha sido desactivada"
            });
        }

        // Opcional: adjuntar más info de la empresa
        req.empresa = empresa;

        next();
    } catch (error) {
        console.error("🔥 [Tenant] Error crítico:", error);
        res.status(500).json({
            success: false,
            message: "Error interno al validar la empresa"
        });
    }
};

// ====================== MIDDLEWARE COMBINADO (Recomendado) ======================
const protect = (req, res, next) => {
    verifyToken(req, res, () => {
        checkTenant(req, res, next);
    });
};

module.exports = {
    verifyToken,
    isAdmin,
    isTecnicoOrHigher,
    checkTenant,
    protect   // ← Este es el más útil
};