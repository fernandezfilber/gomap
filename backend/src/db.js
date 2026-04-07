const { PrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');

// 1. Forzamos la carga del .env con ruta absoluta
dotenv.config({ path: path.join(__dirname, '../.env') });

// 2. EMERGENCIA: Si Hostinger no inyectó la variable, la inyectamos nosotros al proceso
if (process.env.DATABASE_URL && !process.env.PRISMA_CLI_QUERY_ENGINE_TYPE) {
    process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'binary';
    process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
}

const dbUrl = process.env.DATABASE_URL;

// 3. Constructor con configuración de "Rescate"
const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  // Forzamos a que no intente usar aceleradores externos
  __internal: {
    engine: {
      endpoint: undefined,
    },
  },
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;