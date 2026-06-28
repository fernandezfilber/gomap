const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed de usuarios...");

  // Buscar empresas existentes para asociar los usuarios. 
  // Opcional: podemos crear una empresa dummy si no existe.
  let empresa = await prisma.empresa.findFirst();
  
  if (!empresa) {
    empresa = await prisma.empresa.create({
      data: {
        nombre: 'Empresa Base',
        razonSocial: 'Empresa Base SAC',
        ruc: '20123456789'
      }
    });
    console.log("Creada empresa base:", empresa.id);
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('123456', salt);

  // 1. Crear Super Admin
  const superAdmin = await prisma.usuario.upsert({
    where: { email: 'superadmin@gomap.com' },
    update: {},
    create: {
      nombre: 'Super Admin General',
      email: 'superadmin@gomap.com',
      password,
      rol: 'SUPERADMIN',
      empresaId: empresa.id,
      emailVerified: true
    }
  });
  console.log("SuperAdmin:", superAdmin.email);

  // 2. Crear Admin
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@empresa.com' },
    update: {},
    create: {
      nombre: 'Admin Empresa',
      email: 'admin@empresa.com',
      password,
      rol: 'ADMIN',
      empresaId: empresa.id,
      emailVerified: true
    }
  });
  console.log("Admin:", admin.email);

  // 3. Crear Tecnico
  const tecnico = await prisma.usuario.upsert({
    where: { email: 'tecnico@empresa.com' },
    update: {},
    create: {
      nombre: 'Técnico Campo',
      email: 'tecnico@empresa.com',
      password,
      rol: 'TECNICO',
      empresaId: empresa.id,
      emailVerified: true
    }
  });
  console.log("Técnico:", tecnico.email);

  console.log("=========================================");
  console.log("Credenciales de acceso creadas exitosamente:");
  console.log("Contraseña para todos: 123456");
  console.log("=========================================");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
