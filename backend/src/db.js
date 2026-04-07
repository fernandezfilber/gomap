const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

// Forzamos la carga del .env usando una ruta absoluta
dotenv.config({ path: path.join(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error("❌ ERROR CRÍTICO: DATABASE_URL no detectada en process.env");
}

const prisma = global.prisma || new PrismaClient({
    datasourceUrl: dbUrl, // Formato correcto para Prisma 7
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;