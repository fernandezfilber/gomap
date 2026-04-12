const { prisma } = require('../config/db');

// ====================== OBTENER TODOS LOS POSTES (Solo de su empresa) ======================
// ====================== OBTENER TODOS LOS POSTES (Solo de su empresa) ======================
exports.getPostes = async (req, res) => {
    try {
        const empresaId = req.user?.empresaId;
        console.log('📍 getPostes start req.user:', req.user);

        if (!empresaId) {
            console.error("❌ getPostes: falta empresaId en req.user", req.user);
            return res.status(401).json({
                success: false,
                message: "Token inválido o sin empresaId"
            });
        }

        const postes = await prisma.poste.findMany({
            where: {
                OR: [
                    { tramosInicio: { some: { proyecto: { empresaId } } } },
                    { tramosFin:    { some: { proyecto: { empresaId } } } }
                ]
            },
            include: {
                mufa: {
                    select: { 
                        id: true, 
                        codigo: true 
                    }
                },
                caja: {
                    select: { 
                        id: true, 
                        codigo: true 
                    }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        res.json({
            success: true,
            count: postes.length,
            postes
        });

    } catch (error) {
        console.error("❌ Error al obtener postes:", error.message);
        if (error.message.includes("Unknown field")) {
            console.error("❌ Error de nombres de relación en Prisma. Revisa el schema.");
        }
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de postes"
        });
    }
};

// ====================== CREAR POSTE ======================
exports.createPoste = async (req, res) => {
    try {
        const { codigo, latitud, longitud, tipo, altura } = req.body;
        const { empresaId } = req.user;

        if (!latitud || !longitud) {
            return res.status(400).json({
                success: false,
                message: "Las coordenadas (latitud y longitud) son obligatorias"
            });
        }

        const nuevoPoste = await prisma.poste.create({
            data: {
                codigo: codigo || `P-${Date.now()}`,
                latitud: parseFloat(latitud),
                longitud: parseFloat(longitud),
                tipo: tipo || 'CONCRETO',
                altura: altura || '8m'
            }
        });

        console.log(`✅ Poste creado: ${nuevoPoste.codigo}`);

        res.status(201).json({
            success: true,
            message: "Poste creado correctamente",
            poste: nuevoPoste
        });

    } catch (error) {
        console.error("❌ Error al crear poste:", error);

        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: "Ya existe un poste con ese código"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error al crear el poste"
        });
    }
};

// ====================== OBTENER DETALLE DE UN POSTE ======================
exports.getPosteWithEquipos = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const poste = await prisma.poste.findUnique({
            where: { id },
            include: {
                mufa: {
                    select: {
                        id: true,
                        codigo: true,
                        ratioSplitteo: true,
                        hiloEntrada: true,
                        hilosDisponibles: true,
                        bufferEntrada: true
                    }
                },
                caja: {
                    include: {
                        _count: { select: { clientes: true } },
                        clientes: { select: { id: true, nombre: true, dni: true } }
                    }
                },
                tramosInicio: {
                    where: { proyecto: { empresaId } },
                    select: { id: true, nombre: true, tipoCable: true, colorVisual: true }
                },
                tramosFin: {
                    where: { proyecto: { empresaId } },
                    select: { id: true, nombre: true, tipoCable: true, colorVisual: true }
                }
            }
        });

        if (!poste) {
            return res.status(404).json({
                success: false,
                message: "Poste no encontrado o sin acceso"
            });
        }

        res.json({
            success: true,
            poste
        });

    } catch (error) {
        console.error("❌ Error al obtener detalle del poste:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el detalle del poste"
        });
    }
};

// ====================== ACTUALIZAR POSTE ======================
exports.updatePoste = async (req, res) => {
    const { id } = req.params;
    const { codigo, latitud, longitud, tipo, altura } = req.body;
    const { empresaId } = req.user;

    try {
        const dataUpdate = {};
        if (codigo) dataUpdate.codigo = codigo;
        if (latitud) dataUpdate.latitud = parseFloat(latitud);
        if (longitud) dataUpdate.longitud = parseFloat(longitud);
        if (tipo) dataUpdate.tipo = tipo;
        if (altura) dataUpdate.altura = altura;

        const posteActualizado = await prisma.poste.update({
            where: { id },
            data: dataUpdate
        });

        res.json({
            success: true,
            message: "Poste actualizado correctamente",
            poste: posteActualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Poste no encontrado"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al actualizar el poste"
        });
    }
};

// ====================== ELIMINAR POSTE (Con protección) ======================
exports.deletePoste = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        // Verificar si el poste tiene elementos conectados
        const poste = await prisma.poste.findUnique({
            where: { id },
            include: {
                mufa: true,
                caja: true,
                _count: {
                    select: {
                        tramosInicio: true,
                        tramosFin: true
                    }
                }
            }
        });

        if (!poste) {
            return res.status(404).json({
                success: false,
                message: "Poste no encontrado"
            });
        }

        const { tramosInicio, tramosFin } = poste._count;
        const hasMufa = !!poste.mufa;
        const hasCaja = !!poste.caja;

        if (hasMufa || hasCaja || tramosInicio > 0 || tramosFin > 0) {
            return res.status(400).json({
                success: false,
                message: `No se puede eliminar. El poste tiene ${hasMufa ? 1 : 0} mufa(s), ${hasCaja ? 1 : 0} caja(s) y ${tramosInicio + tramosFin} cable(s) conectados.`
            });
        }

        await prisma.poste.delete({ where: { id } });

        res.json({
            success: true,
            message: "Poste eliminado correctamente"
        });

    } catch (error) {
        console.error("❌ Error al eliminar poste:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el poste"
        });
    }
};