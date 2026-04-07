// src/db.js
// Antes: const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('./generated/client'); // <--- Nueva ruta

const prisma = global.prisma || new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;