// src/start.js
require('dotenv').config();   // ← PRIMERO de todo

console.log("🚀 Iniciando servidor Forward Vision...");

const { init } = require('./server');

init().catch(err => {
    console.error("❌ Error fatal al iniciar:", err);
    process.exit(1);
});