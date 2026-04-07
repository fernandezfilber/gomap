const { PrismaClient } = require('@prisma/client');

// 1. FORZADO DE MOTOR Y URL (Antes de crear la instancia)
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
process.env.DATABASE_URL = "mysql://u882418259_vision:ForwardVision2026@193.203.175.194:3306/u882418259_forward";

console.log("🛠️ Nodo Chosica: Inyectando DATABASE_URL directamente al proceso...");

// 2. CONSTRUCTOR VACÍO 
// Al estar vacío, Prisma 7 no tiene nada que "validar" y no lanzará el error.
// Buscará automáticamente la variable process.env.DATABASE_URL que pusimos arriba.
const prisma = new PrismaClient();

module.exports = prisma;