const { prisma } = require('../config/db');
const { sendBackupEmail } = require('../config/email');
const fs = require('fs');
const path = require('path');

const BACKUP_EMAIL = 'fernandezbendezu@hotmail.com';
const TIMESTAMP_FILE = path.join(__dirname, '../../last_backup.json');

const generarYEnviarBackup = async (destinatario = BACKUP_EMAIL) => {
    try {
        console.log(`📦 [BACKUP] Iniciando extracción de base de datos para respaldo...`);
        
        const [
            empresas,
            usuarios,
            proyectos,
            postes,
            cajas,
            mufas,
            tramos,
            splitters,
            conexiones,
            clientes,
            croquis,
            averias,
            inventario
        ] = await Promise.all([
            prisma.empresa.findMany().catch(() => []),
            prisma.usuario.findMany({
                select: {
                    id: true,
                    email: true,
                    nombre: true,
                    rol: true,
                    empresaId: true,
                    activo: true,
                    createdAt: true
                }
            }).catch(() => []),
            prisma.proyecto.findMany().catch(() => []),
            prisma.poste.findMany().catch(() => []),
            prisma.caja.findMany().catch(() => []),
            prisma.mufa.findMany().catch(() => []),
            prisma.tramoCable.findMany().catch(() => []),
            prisma.splitter.findMany().catch(() => []),
            prisma.conexionHilo.findMany().catch(() => []),
            prisma.cliente.findMany().catch(() => []),
            prisma.croquis.findMany().catch(() => []),
            prisma.averia.findMany().catch(() => []),
            prisma.inventarioItem.findMany().catch(() => [])
        ]);

        const backupData = {
            metadata: {
                app: "GoMap Digital",
                tipo: "Respaldo Completo Semanal",
                generadoEn: new Date().toISOString(),
                destinatario
            },
            resumen: {
                empresas: empresas.length,
                usuarios: usuarios.length,
                proyectos: proyectos.length,
                postes: postes.length,
                cajas: cajas.length,
                mufas: mufas.length,
                tramos: tramos.length,
                splitters: splitters.length,
                conexiones: conexiones.length,
                clientes: clientes.length,
                croquis: croquis.length,
                averias: averias.length,
                inventario: inventario.length
            },
            datos: {
                empresas,
                usuarios,
                proyectos,
                postes,
                cajas,
                mufas,
                tramos,
                splitters,
                conexiones,
                clientes,
                croquis,
                averias,
                inventario
            }
        };

        const jsonString = JSON.stringify(backupData, null, 2);
        const fechaStr = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `gomap_backup_${fechaStr}.json`;

        console.log(`📧 [BACKUP] Enviando archivo (${(jsonString.length / 1024).toFixed(2)} KB) a ${destinatario}...`);
        await sendBackupEmail(destinatario, jsonString, filename);

        // Guardar marca de tiempo
        fs.writeFileSync(TIMESTAMP_FILE, JSON.stringify({ ultimoBackup: Date.now() }), 'utf-8');
        console.log(`✅ [BACKUP] Respaldo enviado exitosamente a ${destinatario}.`);
        return { success: true, resumen: backupData.resumen, filename };
    } catch (error) {
        console.error('❌ [BACKUP] Error al generar o enviar respaldo:', error);
        throw error;
    }
};

// Scheduler semanal
const iniciarSchedulerBackup = () => {
    console.log('⏰ [BACKUP SCHEDULER] Iniciado. Verificando respaldo semanal cada hora...');

    const verificarYEjecutar = async () => {
        try {
            let ultimo = 0;
            if (fs.existsSync(TIMESTAMP_FILE)) {
                try {
                    const data = JSON.parse(fs.readFileSync(TIMESTAMP_FILE, 'utf-8'));
                    ultimo = data.ultimoBackup || 0;
                } catch {
                    ultimo = 0;
                }
            }

            const ahora = Date.now();
            const SIETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

            if (ahora - ultimo >= SIETE_DIAS_MS) {
                console.log('📅 [BACKUP SCHEDULER] Han transcurrido 7 días desde el último respaldo. Ejecutando...');
                await generarYEnviarBackup();
            }
        } catch (err) {
            console.error('⚠️ [BACKUP SCHEDULER] Error en ciclo:', err.message);
        }
    };

    // Ejecutar verificación inicial después de 30 segundos
    setTimeout(verificarYEjecutar, 30000);

    // Revisar cada 1 hora
    setInterval(verificarYEjecutar, 60 * 60 * 1000);
};

module.exports = {
    generarYEnviarBackup,
    iniciarSchedulerBackup
};
