import "dotenv/config";
import { PrismaClient } from "../generated/client";   // ← Importante: desde la carpeta generada
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL no está definida en el .env");
}

console.log("✅ DATABASE_URL cargada correctamente");

const adapter = new PrismaMariaDb(databaseUrl);

const prisma = new PrismaClient({
  adapter,
  // log: ['query', 'info', 'warn', 'error'], // descomenta para debug
});

// Test de conexión (temporal)
prisma.$connect()
  .then(() => console.log("✅ Prisma conectado correctamente con adapter"))
  .catch(err => console.error("❌ Error al conectar Prisma:", err.message));

export default prisma;