const { PrismaClient } = require('@prisma/client');

// Esto evita que se creen múltiples instancias de Prisma en desarrollo
const prisma = global.prisma || new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;