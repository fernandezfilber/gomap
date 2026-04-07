const { PrismaClient } = require('@prisma/client');

// Forzamos el motor binario
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';

// Escribe tu URL aquí directamente (SOLO PARA ESTA PRUEBA)
const DB_URL_DIRECTA = "mysql://u882418259_vision:ForwardVision2026@193.203.175.194:3306/u882418259_forward";

console.log("🛠️ Intentando conectar con URL directa...");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DB_URL_DIRECTA,
    },
  },
});

module.exports = prisma;