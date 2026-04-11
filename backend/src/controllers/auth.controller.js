const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db'); // 👈 Esta es la ruta correcta según tu app.js
// ====================== LOGIN ======================
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar usuario con su empresa
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            include: {
                empresa: {
                    select: { id: true, nombre: true, razonSocial: true, activo: true }
                }
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // 2. Verificar que la empresa y el usuario estén activos
        if (!usuario.empresa.activo) {
            return res.status(403).json({ message: "La empresa está desactivada" });
        }
        if (!usuario.activo) {
            return res.status(403).json({ message: "Cuenta de usuario desactivada" });
        }

        // 3. Verificar contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // 4. Generar Token JWT con información importante
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol,
                empresaId: usuario.empresaId,
                nombre: usuario.nombre
            },
            process.env.JWT_SECRET || 'secret_key_gomap_2026',
            { expiresIn: '12h' }   // Puedes cambiar a 8h o 24h
        );

        // 5. Obtener proyectos de la empresa (para frontend)
        const proyectos = await prisma.proyecto.findMany({
            where: { empresaId: usuario.empresaId },
            select: {
                id: true,
                nombre: true,
                descripcion: true,
                estado: true,
                creadoEn: true
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            token,
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                empresaId: usuario.empresaId,
                empresaNombre: usuario.empresa.nombre
            },
            empresa: {
                id: usuario.empresa.id,
                nombre: usuario.empresa.nombre
            },
            proyectos   // ← Muy importante para el frontend
        });

    } catch (error) {
        console.error("❌ Error en Login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// ====================== REGISTER ======================
exports.register = async (req, res) => {
    const { nombre, email, password, rol, empresaId } = req.body;

    try {
        // Validaciones básicas
        if (!nombre || !email || !password || !empresaId) {
            return res.status(400).json({ message: "Faltan campos obligatorios (empresaId es requerido)" });
        }

        // Verificar si el email ya existe
        const existeUsuario = await prisma.usuario.findUnique({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Verificar que la empresa exista
        const empresaExiste = await prisma.empresa.findUnique({ where: { id: empresaId } });
        if (!empresaExiste) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                rol: rol || 'TECNICO',
                activo: true,
                empresaId
            },
            include: {
                empresa: {
                    select: { nombre: true }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            user: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                empresaNombre: nuevoUsuario.empresa.nombre
            }
        });

    } catch (error) {
        console.error("❌ Error en Register:", error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};