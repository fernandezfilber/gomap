const authService = require('../services/auth.service');

// ====================== LOGIN ======================
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.login(email, password);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("❌ Error en Login:", error);
        res.status(error.status || 500).json({ 
            success: false, 
            message: error.message || "Error interno del servidor",
            empresaId: error.empresaId
        });
    }
};

// ====================== REGISTER ======================
exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            user: result
        });
    } catch (error) {
        console.error("❌ Error en Register:", error);
        res.status(error.status || 500).json({ 
            success: false, 
            message: error.message || "Error al registrar usuario" 
        });
    }
};

// ====================== REGISTRAR TECNICO (SOLO ADMIN) ======================
exports.registerTecnico = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        // El empresaId viene del token del Admin (req.user)
        const empresaId = req.user.empresaId;
        
        const result = await authService.registerTecnico({ nombre, email, password, empresaId });
        res.status(201).json({
            success: true,
            message: "Técnico registrado exitosamente",
            user: result
        });
    } catch (error) {
        console.error("❌ Error en Register Técnico:", error);
        res.status(error.status || 500).json({ 
            success: false, 
            message: error.message || "Error al registrar técnico" 
        });
    }
};

// ====================== OBTENER EQUIPO (SOLO ADMIN) ======================
exports.getTeam = async (req, res) => {
    try {
        const empresaId = req.user.empresaId;
        const { prisma } = require('../config/db');
        const team = await prisma.usuario.findMany({
            where: { empresaId },
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true,
                activo: true,
                ultimoLogin: true,
                creadoEn: true
            },
            orderBy: { creadoEn: 'desc' }
        });
        res.status(200).json({ success: true, team });
    } catch (error) {
        console.error("❌ Error en getTeam:", error);
        res.status(500).json({ success: false, message: "Error al obtener equipo" });
    }
};

// ====================== REGISTRO TOTAL ======================
exports.registroTotal = async (req, res) => {
    try {
        const result = await authService.registroTotal(req.body);
        res.status(201).json({
            success: true,
            message: "¡Empresa e Administrador creados exitosamente!",
            empresaId: result.empresaId
        });
    } catch (error) {
        console.error("❌ Error en registroTotal:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: "El RUC o el correo ya están registrados"
            });
        }
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al crear la empresa y administrador"
        });
    }
};

// ====================== VERIFY EMAIL ======================
exports.verifyEmail = async (req, res) => {
    const { email, token, code } = { ...req.query, ...req.body };
    const finalToken = token || code;
    try {
        const result = await authService.verifyEmail(email, finalToken);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("❌ Error en verifyEmail:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al verificar el correo"
        });
    }
};

// ====================== RESEND CODE ======================
exports.resendCode = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await authService.resendCode(email);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("❌ Error en resendCode:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al reenviar el código" });
    }
};

// ====================== LOGOUT ======================
exports.logout = async (req, res) => {
    res.json({ 
        success: true, 
        message: 'Sesión cerrada correctamente' 
    });
};

// ====================== FORGOT PASSWORD ======================
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await authService.forgotPassword(email);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("Error en forgotPassword:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al procesar la solicitud." });
    }
};

// ====================== RESET PASSWORD ======================
exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    try {
        const result = await authService.resetPassword(email, code, newPassword);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("Error en resetPassword:", error);
        res.status(error.status || 500).json({ success: false, message: error.message || "Error al cambiar la contraseña." });
    }
};

exports.getPerfilTecnico = async (req, res) => {
    try {
        const id = req.params.id || req.user.id;
        
        // Verificar si el usuario que solicita es el mismo, o es admin de su empresa
        const requester = await prisma.usuario.findUnique({ where: { id: req.user.id } });
        const target = await prisma.usuario.findUnique({ where: { id } });

        if (!target) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        
        // Restricción de seguridad
        if (id !== req.user.id && requester.rol !== 'ADMIN' && requester.rol !== 'SUPERADMIN') {
            return res.status(403).json({ success: false, message: 'No autorizado' });
        }
        if (target.empresaId !== requester.empresaId && requester.rol !== 'SUPERADMIN') {
            return res.status(403).json({ success: false, message: 'No pertenece a tu empresa' });
        }

        // Obtener historial
        const ticketsResueltos = await prisma.averia.findMany({
            where: { tecnicoId: id, estado: 'RESUELTA' },
            orderBy: { resueltoEn: 'desc' },
            take: 50,
            include: { cliente: { select: { nombre: true, direccion: true } } }
        });

        const materialesUsados = await prisma.inventarioMovimiento.findMany({
            where: { usuarioId: id, tipo: 'CONSUMO_INSTALACION' },
            orderBy: { fecha: 'desc' },
            take: 50,
            include: { 
                item: { select: { nombre: true, codigo: true, unidadMedida: true } },
                cliente: { select: { nombre: true } }
            }
        });

        res.json({
            success: true,
            perfil: {
                id: target.id,
                nombre: target.nombre,
                email: target.email,
                rol: target.rol,
                fotoPerfil: target.fotoPerfil,
                fechaRegistro: target.creadoEn,
                historial: {
                    tickets: ticketsResueltos,
                    materiales: materialesUsados
                }
            }
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ success: false, message: 'Error interno' });
    }
};

exports.actualizarFotoPerfil = async (req, res) => {
    try {
        const id = req.user.id;
        const { fotoBase64 } = req.body;

        if (!fotoBase64) return res.status(400).json({ success: false, message: 'Falta la imagen' });

        await prisma.usuario.update({
            where: { id },
            data: { fotoPerfil: fotoBase64 }
        });

        res.json({ success: true, message: 'Foto actualizada' });
    } catch (error) {
        console.error('Error al actualizar foto:', error);
        res.status(500).json({ success: false, message: 'Error interno' });
    }
};