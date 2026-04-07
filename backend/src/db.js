// src/db.js
const { PrismaClient } = require('./generated/client');

// No pasamos parámetros, Prisma buscará DATABASE_URL en el entorno automáticamente
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;