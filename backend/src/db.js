import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// Verificamos que la URL exista
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('❌ DATABASE_URL no está definida en el .env')
}

// Opción 1: La más simple y recomendada
const adapter = new PrismaMariaDb(databaseUrl)

// Si prefieres pasar los parámetros uno por uno (descomenta y borra la línea de arriba):
/*
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 10,
})
*/

const prisma = new PrismaClient({
  adapter,                    // ← Obligatorio en Prisma 7
  // log: ['query', 'info', 'warn', 'error'],   // descomenta si quieres ver las consultas
})

export default prisma