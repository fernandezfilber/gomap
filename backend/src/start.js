// start.js - El puente para Vercel
const app = require('./src/index'); // Importa tu app de Express

// Vercel maneja el puerto automáticamente, pero esto ayuda en local
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; // IMPORTANTÍSIMO: Vercel necesita exportar la app