const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');
const { sendVerificationEmail } = require('../config/email');

/**
 * Servicio de Autenticación
 */

exports.login = async (email, password) => {
    const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: {
            empresa: {
                select: { 
                    id: true, 
                    nombre: true, 
                    razonSocial: true, 
                    activo: true,
                    bloqueado: true,
                    motivoBloqueo: true
                }
            }
        }
    });

    if (!usuario) {
        throw { status: 401, message: "Credenciales incorrectas" };
    }

    // 1. Verificar correo primero (sin esto no tiene sentido pagar)
    if (!usuario.emailVerified) {
        throw { status: 403, message: "Por favor, verifica tu correo electrónico antes de continuar." };
    }

    if (!usuario.activo) {
        throw { status: 403, message: "Tu cuenta está desactivada" };
    }

    // 2. Verificar estado de empresa (bloqueada = pendiente de pago)
    if (!usuario.empresa.activo || usuario.empresa.bloqueado) {
        throw { 
            status: 403, 
            empresaId: usuario.empresa.id,
            message: usuario.empresa.bloqueado 
                ? `Tu acceso ha sido bloqueado: ${usuario.empresa.motivoBloqueo || 'Contáctanos al 930860641'}`
                : "La empresa está desactivada" 
        };
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        throw { status: 401, message: "Credenciales incorrectas" };
    }

    // Actualizar último login
    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { ultimoLogin: new Date() }
    });

    // Generar Token JWT
    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            empresaId: usuario.empresaId,
            nombre: usuario.nombre
        },
        process.env.JWT_SECRET || 'secret_key_gomap_2026',
        { expiresIn: '12h' }
    );

    // Obtener proyectos de la empresa
    const proyectos = await prisma.proyecto.findMany({
        where: { empresaId: usuario.empresaId },
        select: {
            id: true,
            nombre: true,
            estado: true,
            creadoEn: true
        },
        orderBy: { creadoEn: 'desc' }
    });

    return {
        token,
        user: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            empresaId: usuario.empresaId,
            empresaNombre: usuario.empresa.nombre
        },
        empresa: usuario.empresa,
        proyectos
    };
};

exports.register = async ({ nombre, email, password, rol, empresaId }) => {
    // Verificar email duplicado
    const existeUsuario = await prisma.usuario.findUnique({ where: { email } });
    if (existeUsuario) {
        throw { status: 400, message: "El correo ya está registrado" };
    }

    // Verificar empresa
    const empresa = await prisma.empresa.findUnique({ 
        where: { id: empresaId } 
    });
    if (!empresa) {
        throw { status: 404, message: "Empresa no encontrada" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.usuario.create({
        data: {
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            rol: 'TECNICO',
            activo: true,
            empresaId
        },
        include: {
            empresa: { select: { nombre: true } }
        }
    });

    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        empresaNombre: nuevoUsuario.empresa.nombre
    };
};

// ====================== REGISTRAR TECNICO (SOLO ADMIN) ======================
exports.registerTecnico = async ({ nombre, email, password, empresaId }) => {
    // Validar si ya existe
    const exists = await prisma.usuario.findUnique({ where: { email } });
    if (exists) {
        throw { status: 400, message: "El correo ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoTecnico = await prisma.usuario.create({
        data: {
            nombre,
            email,
            password: hashedPassword,
            rol: 'TECNICO',
            empresaId,
            emailVerified: true
        }
    });

    const { password: _, ...userWithoutPassword } = nuevoTecnico;
    return userWithoutPassword;
};

exports.registroTotal = async ({ nombreEmpresa, ruc, direccion, nombreAdmin, email, password }) => {
    const resultado = await prisma.$transaction(async (tx) => {
        // Crear Empresa (bloqueada hasta que pague o el SuperAdmin la active)
        const empresa = await tx.empresa.create({
            data: {
                nombre: nombreEmpresa.trim(),
                razonSocial: nombreEmpresa.trim(),
                ruc: ruc.trim(),
                direccion: direccion ? direccion.trim() : null,
                activo: true,
                bloqueado: true,
                motivoBloqueo: 'Pendiente de activación — Por favor realiza el pago de tu suscripción para acceder al sistema.'
            }
        });

        // Crear Usuario ADMIN de la empresa (no TECNICO)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const usuario = await tx.usuario.create({
            data: {
                nombre: nombreAdmin.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                rol: 'ADMIN',           // ← Admin de su propia empresa
                activo: true,
                emailVerified: false,
                verificationToken,
                empresaId: empresa.id
            }
        });

        return { empresa, usuario, verificationToken };
    });

    // Enviar Correo de Verificación
    try {
        await sendVerificationEmail(email, resultado.verificationToken);
    } catch (mailError) {
        console.error("⚠️ Error enviando correo:", mailError);
    }

    return { empresaId: resultado.empresa.id };
};

exports.verifyEmail = async (email, finalToken) => {
    const usuario = await prisma.usuario.findFirst({
        where: { 
            email: email?.toLowerCase().trim(),
            verificationToken: finalToken 
        }
    });

    if (!usuario) {
        throw { status: 400, message: "Código de verificación inválido o expirado" };
    }

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
            emailVerified: true,
            verificationToken: null
        }
    });

    return { message: "¡Correo verificado exitosamente! Ya puedes iniciar sesión." };
};

exports.resendCode = async (email) => {
    const usuario = await prisma.usuario.findUnique({
        where: { email: email.toLowerCase().trim() }
    });

    if (!usuario) {
        throw { status: 404, message: "Usuario no encontrado" };
    }

    if (usuario.emailVerified) {
        throw { status: 400, message: "Esta cuenta ya está verificada" };
    }

    const newToken = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { verificationToken: newToken }
    });

    await sendVerificationEmail(usuario.email, newToken);

    return { message: "Nuevo código enviado" };
};

exports.forgotPassword = async (email) => {
    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } });

    if (!usuario) {
        throw { status: 404, message: "No existe un usuario con ese correo." };
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { verificationToken: resetCode }
    });

    await sendVerificationEmail(usuario.email, resetCode, "Restablecer tu contraseña");

    return { message: "Código de recuperación enviado al correo." };
};

exports.resetPassword = async (email, code, newPassword) => {
    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } });

    if (!usuario || usuario.verificationToken !== code) {
        throw { status: 400, message: "Código incorrecto o correo inválido." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { 
            password: hashedPassword,
            verificationToken: null,
            activo: true,
            emailVerified: true 
        }
    });

    return { message: "Contraseña actualizada correctamente. Ya puedes iniciar sesión." };
};
