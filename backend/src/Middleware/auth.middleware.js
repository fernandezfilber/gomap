const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_chosica_2026');
        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.userRol !== 'ADMIN') {
        return res.status(403).json({ message: "Acceso denegado: Se requiere rol Admin" });
    }
    next();
};

module.exports = { verifyToken, isAdmin };