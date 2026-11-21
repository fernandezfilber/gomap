const adminService = require('../services/admin.service');

// ====================== LISTAR EMPRESAS ======================
exports.listarEmpresas = async (req, res) => {
    try {
        const empresas = await adminService.listarEmpresas();
        res.json({ success: true, empresas });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al listar empresas" });
    }
};

// ====================== BLOQUEAR/DESBLOQUEAR EMPRESA ======================
exports.toggleBloqueoEmpresa = async (req, res) => {
    const { id } = req.params;
    try {
        const empresa = await adminService.toggleBloqueoEmpresa(id, req.body);
        const { bloqueado } = req.body;
        res.json({ 
            success: true, 
            message: bloqueado ? "Empresa bloqueada" : "Empresa desbloqueada",
            empresa 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar estado de la empresa" });
    }
};

// ====================== ACTUALIZAR PLAN Y SUSCRIPCIÓN ======================
exports.actualizarSuscripcion = async (req, res) => {
    const { id } = req.params;
    try {
        const empresa = await adminService.actualizarSuscripcion(id, req.body);
        res.json({ success: true, message: "Suscripción actualizada", empresa });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar suscripción" });
    }
};

// ====================== ELIMINAR EMPRESA (Total) ======================
exports.eliminarEmpresaTotal = async (req, res) => {
    const { id } = req.params;
    try {
        await adminService.eliminarEmpresaTotal(id);
        res.json({ success: true, message: "Empresa y todos sus datos asociados han sido eliminados" });
    } catch (error) {
        console.error("Error al eliminar empresa:", error);
        res.status(500).json({ 
            success: false, 
            message: "No se pudo eliminar la empresa. Verifique que no existan dependencias críticas.",
            error: error.message 
        });
    }
};

// ====================== ENVIAR BACKUP MANUAL ======================
exports.enviarBackupManual = async (req, res) => {
    try {
        const { generarYEnviarBackup } = require('../services/backup.service');
        const destinatario = req.body?.email || 'fernandezbendezu@hotmail.com';
        const resultado = await generarYEnviarBackup(destinatario);
        res.json({ success: true, message: `Respaldo enviado exitosamente a ${destinatario}`, resultado });
    } catch (error) {
        console.error("Error al enviar respaldo:", error);
        res.status(500).json({ success: false, message: "Error al generar o enviar respaldo", error: error.message });
    }
};
