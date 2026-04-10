const { PrismaClient } = require('@prisma/client');

// Instanciamos el cliente de Prisma
const prisma = new PrismaClient();

// Verificamos la conexión al iniciar
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos   exitosa');
  } catch (error) {
    console.error(' Error al conectar con la base de datos', error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };