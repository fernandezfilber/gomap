const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

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