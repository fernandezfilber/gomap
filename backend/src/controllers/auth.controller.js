const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar si el usuario existe
        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        // 2. Verificar si está activo
        if (!usuario.activo) return res.status(403).json({ message: "Cuenta desactivada" });

        // 3. Comparar contraseña (la que viene del body vs la de la DB)
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // 4. Generar Token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET || 'secret_key_chosica_2026',
            { expiresIn: '8h' }
        );

        // 5. Responder
        res.json({
            token,
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error("❌ Error en Login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.register = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // 1. Verificar si el email ya existe en Chosica
        const existeUsuario = await prisma.usuario.findUnique({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // 2. Encriptar la contraseña (Clave para que coincida con el login)
        // Usamos 10 rondas de sal, que es el estándar seguro
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear el usuario en la base de datos de Hostinger
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                rol: rol || 'USER', // Por defecto USER si no se envía
                activo: true
            }
        });

        // 4. Responder con éxito (sin enviar la contraseña de vuelta)
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        console.error("❌ Error en Registro:", error);
        res.status(500).json({ message: "Error al crear el usuario en el servidor" });
    }
};