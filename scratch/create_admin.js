const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Creando empresa...");
  const empresa = await prisma.empresa.create({
    data: {
      nombre: 'Empresa Prueba',
      razonSocial: 'Empresa Prueba S.A.C.',
      ruc: '20123456789',
      plan: 'MENSUAL'
    }
  });
  console.log("Empresa creada:", empresa.id);

  console.log("Creando usuario admin...");
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Administrador',
      email: 'admin@gomap.local',
      password: hashedPassword,
      rol: 'ADMIN',
      empresaId: empresa.id,
      emailVerified: true
    }
  });
  console.log("Usuario admin creado:", admin.email, " / admin123");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
