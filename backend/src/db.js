const path = require('path');
const dotenv = require('dotenv');

// 1. CARGA CRÍTICA: Cargamos el .env ANTES que cualquier otra cosa
const result = dotenv.config({ path: path.join(__dirname, '../.env') });

if (result.error) {
    console.error("❌ ERROR: No se pudo leer el archivo .env físico:", result.error);
}

// 2. FORZADO DE MOTOR: Le decimos a Node que Prisma es Binario
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';

// 3. IMPORTACIÓN: Recién ahora importamos Prisma
const { PrismaClient } = require('@prisma/client');

// 4. CONSTRUCTOR VACÍO: Prisma buscará process.env.DATABASE_URL por su cuenta
// Esto evita el error de "Unknown property" porque no le pasamos ninguna propiedad
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;