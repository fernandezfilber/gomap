const empresaService = require('../services/empresa.service');

// ====================== CREAR EMPRESA ======================
exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = await empresaService.crearEmpresa(req.body);
        res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            empresa: nuevaEmpresa
        });
    } catch (error) {
        console.error("❌ Error al crear empresa:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: "Ya existe una empresa con ese RUC"
            });
        }
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error interno al crear la empresa"
        });
    }
};

// ====================== OBTENER TODAS LAS EMPRESAS ======================
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await empresaService.obtenerEmpresas();
        res.json({
            success: true,
            count: empresas.length,
            empresas
        });
    } catch (error) {
        console.error("❌ Error al obtener empresas:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas"
        });
    }
};

// ====================== OBTENER EMPRESA POR ID ======================
exports.getEmpresaById = async (req, res) => {
    const { id } = req.params;
    try {
        const empresa = await empresaService.getEmpresaById(id);
        res.json({ success: true, empresa });
    } catch (error) {
        console.error("❌ Error al obtener empresa:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al obtener la empresa"
        });
    }
};

// ====================== ACTUALIZAR EMPRESA ======================
exports.actualizarEmpresa = async (req, res) => {
    const { id } = req.params;
    try {
        const empresaActualizada = await empresaService.actualizarEmpresa(id, req.body);
        res.json({
            success: true,
            message: "Empresa actualizada correctamente",
            empresa: empresaActualizada
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Empresa no encontrada" });
        }
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: "El RUC ya está registrado en otra empresa" });
        }
        console.error("❌ Error al actualizar empresa:", error);
        res.status(500).json({ success: false, message: "Error al actualizar la empresa" });
    }
};

// ====================== ELIMINAR / DESACTIVAR EMPRESA ======================
exports.eliminarEmpresa = async (req, res) => {
    const { id } = req.params;
    try {
        await empresaService.eliminarEmpresa(id);
        res.json({
            success: true,
            message: "Empresa desactivada correctamente (soft delete)"
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Empresa no encontrada" });
        }
        console.error("❌ Error al desactivar empresa:", error);
        res.status(500).json({ success: false, message: "Error al desactivar la empresa" });
    }
};