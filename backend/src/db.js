// src/db.js
const { PrismaClient } = require('./generated/client');
const path = require('path');
// Forzamos la carga del .env desde la raíz del proyecto
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("❌ ERROR: DATABASE_URL no encontrada en el entorno.");
}

const prisma = global.prisma || new PrismaClient({
  datasourceUrl: dbUrl, // Propiedad oficial de Prisma 7
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;