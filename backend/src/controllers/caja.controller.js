const { prisma } = require('../config/db');

// ====================== OBTENER TODAS LAS CAJAS (Solo de su empresa) ======================
exports.getCajas = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const cajas = await prisma.caja.findMany({
            where: {
                mufa: {
                    troncal: {
                        proyecto: { empresaId }
                    }
                }
            },
            include: {
                mufa: {
                    select: { 
                        codigo: true, 
                        ratioSplitteo: true,
                        hilosDisponibles: true 
                    }
                },
                poste: {
                    select: { 
                        codigo: true, 
                        latitud: true, 
                        longitud: true 
                    }
                },
                _count: { 
                    select: { clientes: true } 
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: cajas.length,
            cajas
        });

    } catch (error) {
        console.error("❌ Error al obtener cajas:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el inventario de cajas"
        });
    }
};

// ====================== CREAR CAJA ======================
exports.createCaja = async (req, res) => {
    try {
        const { mufaId, posteId, codigo, colorHiloCaja, puertosLibres } = req.body;
        const { empresaId } = req.user;

        if (!mufaId || !posteId) {
            return res.status(400).json({
                success: false,
                message: "mufaId y posteId son obligatorios"
            });
        }

        // Verificar que la mufa y el poste pertenezcan a la empresa
        const mufa = await prisma.mufa.findUnique({
            where: { id: mufaId },
            include: { troncal: { select: { proyecto: { select: { empresaId: true } } } } }
        });

        if (!mufa || mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a esta mufa"
            });
        }

        const poste = await prisma.poste.findUnique({ where: { id: posteId } });
        if (!poste) {
            return res.status(404).json({
                success: false,
                message: "Poste no encontrado"
            });
        }

        const nuevaCaja = await prisma.caja.create({
            data: {
                codigo: codigo || `NAP-${Date.now().toString().slice(-6)}`,
                latitud: poste.latitud,
                longitud: poste.longitud,
                colorHiloCaja: colorHiloCaja || "Azul",
                puertosLibres: parseInt(puertosLibres) || 16,
                mufaId,
                posteId
            },
            include: {
                mufa: true,
                poste: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Caja NAP creada correctamente",
            caja: nuevaCaja
        });

    } catch (error) {
        console.error("❌ Error al crear caja:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear la caja"
        });
    }
};

// ====================== OBTENER CAJA POR ID ======================
exports.getCajaById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const caja = await prisma.caja.findUnique({
            where: { 
                id,
                mufa: { troncal: { proyecto: { empresaId } } }
            },
            include: {
                mufa: true,
                poste: true,
                clientes: true,
                tramosDestino: true
            }
        });

        if (!caja) {
            return res.status(404).json({
                success: false,
                message: "Caja no encontrada o sin acceso"
            });
        }

        res.json({
            success: true,
            caja
        });

    } catch (error) {
        console.error("❌ Error al obtener caja:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener detalle de la caja"
        });
    }
};

// ====================== ACTUALIZAR CAJA ======================
exports.actualizarCaja = async (req, res) => {
    const { id } = req.params;
    const { codigo, colorHiloCaja, puertosLibres } = req.body;
    const { empresaId } = req.user;

    try {
        const cajaActualizada = await prisma.caja.update({
            where: { 
                id,
                mufa: { troncal: { proyecto: { empresaId } } }
            },
            data: {
                codigo,
                colorHiloCaja,
                puertosLibres: puertosLibres ? parseInt(puertosLibres) : undefined
            }
        });

        res.json({
            success: true,
            message: "Caja actualizada correctamente",
            caja: cajaActualizada
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Caja no encontrada o sin acceso"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al actualizar la caja"
        });
    }
};

// ====================== ELIMINAR CAJA ======================
exports.deleteCaja = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.$transaction(async (tx) => {
            // Verificar que la caja existe y pertenece a la empresa
            const caja = await tx.caja.findUnique({
                where: { id },
                include: { 
                    mufa: { 
                        include: { 
                            troncal: { 
                                include: { proyecto: true }
                            }
                        }
                    }
                }
            });

            if (!caja) {
                throw new Error("Caja no encontrada");
            }

            if (!caja.mufa || caja.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a esta caja");
            }

            // Eliminar tramos que terminan en esta caja
            await tx.tramoCable.deleteMany({
                where: { cajaDestinoId: id }
            });

            // Eliminar clientes asociados (opcional, depende de tu lógica)
            await tx.cliente.deleteMany({
                where: { cajaId: id }
            });

            // Eliminar caja
            await tx.caja.delete({ where: { id } });
        });

        res.json({
            success: true,
            message: "Caja NAP eliminada correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar caja:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error al eliminar la caja"
        });
    }
};