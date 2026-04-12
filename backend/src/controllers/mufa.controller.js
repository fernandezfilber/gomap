const { prisma } = require('../config/db'); // 👈 Verifica que la carpeta sea 'config'

// ====================== OBTENER TODAS LAS MUFAS (Solo de su empresa) ======================
exports.getMufas = async (req, res) => {
    try {
        const { empresaId } = req.user;

        const mufas = await prisma.mufa.findMany({
            where: {
                troncal: {
                    proyecto: {
                        empresaId
                    }
                }
            },
            include: {
                troncal: {
                    select: { 
                        nombre: true, 
                        bufferColor: true,
                        hilosLibres: true 
                    }
                },
                poste: {
                    select: { codigo: true, latitud: true, longitud: true }
                },
                _count: {
                    select: { cajas: true }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: mufas.length,
            mufas
        });

    } catch (error) {
        console.error("❌ Error al obtener mufas:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de mufas"
        });
    }
};

// ====================== CREAR MUFA (Con Transacción y Control de Hilos) ======================
exports.crearMufa = async (req, res) => {
    const { codigo, troncalId, posteId, bufferEntrada, hiloEntrada, latitud, longitud } = req.body;
    const { empresaId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {

            // 1. Verificar que la troncal pertenezca a la empresa del usuario
            const troncal = await tx.troncal.findUnique({
                where: { id: troncalId },
                include: {
                    proyecto: { select: { empresaId: true } }
                }
            });

            if (!troncal) throw new Error("La troncal no existe");
            if (troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a esta troncal");
            }

            if (troncal.hilosLibres <= 0) {
                throw new Error(`La troncal ${troncal.nombre} no tiene hilos disponibles`);
            }

            // 2. Verificar que el hilo no esté ocupado
            const hiloOcupado = await tx.mufa.findFirst({
                where: {
                    troncalId,
                    bufferEntrada,
                    hiloEntrada: parseInt(hiloEntrada)
                }
            });

            if (hiloOcupado) {
                throw new Error(`El hilo ${hiloEntrada} ya está siendo utilizado`);
            }

            // 3. Crear la Mufa
            const nuevaMufa = await tx.mufa.create({
                data: {
                    codigo: codigo || `MUF-${Date.now().toString().slice(-6)}`,
                    bufferEntrada,
                    hiloEntrada: parseInt(hiloEntrada),
                    latitud: parseFloat(latitud),
                    longitud: parseFloat(longitud),
                    troncalId,
                    posteId,
                    hilosDisponibles: 16,
                    ratioSplitteo: "1:16"
                }
            });

            // 4. Descontar hilo de la troncal
            await tx.troncal.update({
                where: { id: troncalId },
                data: { hilosLibres: { decrement: 1 } }
            });

            return nuevaMufa;
        });

        res.status(201).json({
            success: true,
            message: "Mufa creada correctamente",
            mufa: resultado
        });

    } catch (error) {
        console.error("❌ Error al crear mufa:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ====================== DETALLE DE MUFA ======================
exports.getMufaById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const mufa = await prisma.mufa.findUnique({
            where: { 
                id,
                troncal: { proyecto: { empresaId } }   // Seguridad
            },
            include: {
                troncal: true,
                poste: true,
                cajas: {
                    include: {
                        _count: { select: { clientes: true } },
                        clientes: { select: { nombre: true, dni: true } }
                    }
                }
            }
        });

        if (!mufa) {
            return res.status(404).json({
                success: false,
                message: "Mufa no encontrada o sin acceso"
            });
        }

        const capacidad = parseInt(mufa.ratioSplitteo.split(':')[1]) || 16;
        const ocupados = mufa.cajas.length;

        res.json({
            success: true,
            mufa: {
                ...mufa,
                capacidadSplitter: capacidad,
                hilosEnUso: ocupados,
                hilosLibresParaCajas: capacidad - ocupados
            }
        });

    } catch (error) {
        console.error("❌ Error al obtener mufa:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener detalle de la mufa"
        });
    }
};

// ====================== ACTUALIZAR MUFA ======================
exports.actualizarMufa = async (req, res) => {
    const { id } = req.params;
    const { codigo, troncalId, posteId, bufferEntrada, hiloEntrada, latitud, longitud, ratioSplitteo } = req.body;
    const { empresaId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar propiedad
            const mufaActual = await tx.mufa.findUnique({
                where: { id },
                include: { troncal: { select: { proyecto: { select: { empresaId: true } } } } }
            });

            if (!mufaActual || mufaActual.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("Mufa no encontrada o sin acceso");
            }

            // Lógica de cambio de hilo (si aplica)
            // ... (puedo expandirla más si lo necesitas)

            return await tx.mufa.update({
                where: { id },
                data: {
                    codigo,
                    posteId,
                    bufferEntrada,
                    hiloEntrada: hiloEntrada ? parseInt(hiloEntrada) : undefined,
                    ratioSplitteo,
                    latitud: latitud ? parseFloat(latitud) : undefined,
                    longitud: longitud ? parseFloat(longitud) : undefined
                }
            });
        });

        res.json({
            success: true,
            message: "Mufa actualizada correctamente",
            mufa: resultado
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ====================== ELIMINAR MUFA (Repone hilo) ======================
exports.eliminarMufa = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        await prisma.$transaction(async (tx) => {
            const mufa = await tx.mufa.findUnique({
                where: { id },
                include: { troncal: { select: { proyecto: { select: { empresaId: true } } } } }
            });

            if (!mufa || mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("Mufa no encontrada o sin acceso");
            }

            // Reponer hilo a la troncal
            await tx.troncal.update({
                where: { id: mufa.troncalId },
                data: { hilosLibres: { increment: 1 } }
            });

            // Eliminar mufa (cajas se eliminan por cascade si lo configuraste)
            await tx.mufa.delete({ where: { id } });
        });

        res.json({
            success: true,
            message: "Mufa eliminada y hilo repuesto correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar mufa:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error al eliminar mufa"
        });
    }
};
// ====================== OBTENER HILOS OCUPADOS ======================
exports.getHilosOcupados = async (req, res) => {
    const { mufaId } = req.params;
    try {
        const cajas = await prisma.caja.findMany({
            where: { mufaId },
            select: { hiloEntradaMufa: true }
        });
        const ocupados = cajas.map(c => c.hiloEntradaMufa);
        res.json({ success: true, hilosOcupados: ocupados });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener hilos" });
    }
};
