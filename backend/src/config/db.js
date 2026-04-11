// src/db.js (Versión mejorada)
const { PrismaClient } = require('@prisma/client');

let prisma;

if (!prisma) {
    prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'], // útil para debug
    });
}

module.exports = { prisma };