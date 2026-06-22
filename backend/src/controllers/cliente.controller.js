const clienteService = require('../services/cliente.service');

// ====================== CREAR CLIENTE ======================
exports.createCliente = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const result = await clienteService.createCliente(empresaId, req.body);
        res.status(201).json({
            success: true,
            message: "Cliente registrado y puerto ocupado en NAP",
            cliente: result
        });
    } catch (error) {
        console.error("❌ Error al crear cliente:", error);
        res.status(error.status || 400).json({
            success: false,
            message: error.message || "Error al registrar el cliente"
        });
    }
};

// ====================== OBTENER CLIENTES ======================
exports.getClientes = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { proyectoId } = req.query;
        const clientes = await clienteService.getClientes(empresaId, proyectoId);
        res.json({
            success: true,
            count: clientes.length,
            clientes
        });
    } catch (error) {
        console.error("❌ Error al obtener clientes:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los clientes"
        });
    }
};

// ====================== ACTUALIZAR CLIENTE ======================
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        const clienteActualizado = await clienteService.updateCliente(id, empresaId, req.body);
        res.json({
            success: true,
            message: "Datos del cliente actualizados",
            cliente: clienteActualizado
        });
    } catch (error) {
        res.status(error.status || 400).json({ success: false, message: error.message });
    }
};

// ====================== ELIMINAR CLIENTE ======================
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;
    try {
        await clienteService.deleteCliente(id, empresaId);
        res.json({
            success: true,
            message: "Cliente eliminado y puerto de caja NAP liberado"
        });
    } catch (error) {
        res.status(error.status || 400).json({ success: false, message: error.message });
    }

};