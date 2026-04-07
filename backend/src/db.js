const { PrismaClient } = require('@prisma/client');

// 1. FORZADO DE MOTOR
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';

const DB_URL = "mysql://u882418259_vision:ForwardVision2026@193.203.175.194:3306/u882418259_forward";

console.log("🛠️ Nodo Chosica: Usando constructor de conexión directa Prisma 7...");

// 2. CONSTRUCTOR CON PROPIEDAD DIRECTA (datasourceUrl en minúsculas la 'd')
// En Prisma 7, esta es la propiedad oficial para pasar la URL fuera de datasources.
const prisma = new PrismaClient({
  datasourceUrl: DB_URL
});

module.exports = prisma;