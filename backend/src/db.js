// src/db.js
const { PrismaClient } = require('./generated/client');

// No le pasamos NADA al constructor aquí para evitar errores de validación
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Forzamos la URL directamente en el objeto de configuración interna
// Esto sobreescribe cualquier configuración previa y es muy efectivo
if (process.env.DATABASE_URL) {
  prisma._engineConfig.datasources = [
    {
      name: 'db',
      url: process.env.DATABASE_URL,
    },
  ];
}

module.exports = prisma;