const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

// Forzamos la carga del .env (ruta absoluta hacia la raíz de nodejs)
dotenv.config({ path: path.join(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;

const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;