const { prisma } = require('../config/db');

// ====================== OBTENER TODOS LOS SPLITTERS ======================
exports.getAll = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { mufaId, tipo, ratio } = req.query;

        const where = {
            mufa: {
                troncal: {
                    proyecto: { empresaId }
                }
            }
        };

        if (mufaId) where.mufaId = mufaId;
        if (tipo) where.tipo = tipo;
        if (ratio) where.ratio = ratio;

        const splitters = await prisma.splitter.findMany({
            where,
            include: {
                mufa: {
                    select: {
                        id: true,
                        codigo: true,
                        latitud: true,
                        longitud: true,
                        troncal: {
                            select: { nombre: true }
                        }
                    }
                },
                entradaHilo: {
                    select: {
                        id: true,
                        numero: true,
                        color: true,
                        troncal: { select: { nombre: true } }
                    }
                },
                salidas: {
                    include: {
                        caja: {
                            select: {
                                id: true,
                                codigo: true,
                                latitud: true,
                                longitud: true,
                                _count: { select: { clientes: true } }
                            }
                        }
                    },
                    orderBy: { numero: 'asc' }
                }
            },
            orderBy: { creadoEn: 'desc' }
        });

        // Calcular estadísticas de uso
        const splittersConStats = splitters.map(splitter => {
            const salidasOcupadas = splitter.salidas.filter(s => s.estado === 'OCUPADO').length;
            const salidasLibres = splitter.salidas.filter(s => s.estado === 'LIBRE').length;
            const ratioNum = parseInt(splitter.ratio.split(':')[1]) || 1;

            return {
                ...splitter,
                estadisticas: {
                    totalSalidas: ratioNum,
                    ocupadas: salidasOcupadas,
                    libres: salidasLibres,
                    porcentajeUso: Math.round((salidasOcupadas / ratioNum) * 100)
                }
            };
        });

        res.json({
            success: true,
            count: splittersConStats.length,
            splitters: splittersConStats
        });

    } catch (error) {
        console.error("❌ Error al obtener splitters:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de splitters"
        });
    }
};

// ====================== CREAR SPLITTER ======================
exports.create = async (req, res) => {
    try {
        const {
            codigo,
            tipo,
            ratio,
            mufaId,
            entradaHiloId,
            atenuacion,
            activo
        } = req.body;

        const { empresaId } = req.user;

        // Validaciones
        if (!codigo || !mufaId || !ratio) {
            return res.status(400).json({
                success: false,
                message: "Código, mufaId y ratio son obligatorios"
            });
        }

        // Verificar que la mufa pertenezca a la empresa
        const mufa = await prisma.mufa.findUnique({
            where: { id: mufaId },
            include: {
                troncal: { include: { proyecto: { select: { empresaId: true } } } }
            }
        });

        if (!mufa) {
            return res.status(404).json({
                success: false,
                message: "Mufa no encontrada"
            });
        }

        if (mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a esta mufa"
            });
        }

        // Si se especifica un hilo de entrada, verificar que esté disponible
        if (entradaHiloId) {
            const hilo = await prisma.hiloFibra.findUnique({
                where: { id: entradaHiloId },
                include: {
                    troncal: { include: { proyecto: { select: { empresaId: true } } } }
                }
            });

            if (!hilo || hilo.troncal.proyecto.empresaId !== empresaId) {
                return res.status(403).json({
                    success: false,
                    message: "No tienes acceso a este hilo"
                });
            }

            if (hilo.estado !== 'LIBRE') {
                return res.status(400).json({
                    success: false,
                    message: `El hilo no está disponible. Estado: ${hilo.estado}`
                });
            }
        }

        // Calcular número de salidas según ratio
        const ratioNum = parseInt(ratio.split(':')[1]) || 16;
        const atenuacionTypica = atenuacion || calcularAtenuacionSplitter(ratio);

        const resultado = await prisma.$transaction(async (tx) => {
            // Crear splitter
            const nuevoSplitter = await tx.splitter.create({
                data: {
                    codigo: codigo.toUpperCase(),
                    tipo: tipo || 'PLC',
                    ratio,
                    mufaId,
                    entradaHiloId: entradaHiloId || null,
                    atenuacion: atenuacionTypica,
                    activo: activo !== undefined ? activo : true
                }
            });

            // Crear salidas automáticamente
            const salidas = [];
            for (let i = 1; i <= ratioNum; i++) {
                salidas.push({
                    splitterId: nuevoSplitter.id,
                    numero: i,
                    estado: 'LIBRE'
                });
            }

            await tx.splitterSalida.createMany({
                data: salidas
            });

            // Si hay hilo de entrada, actualizar su estado
            if (entradaHiloId) {
                await tx.hiloFibra.update({
                    where: { id: entradaHiloId },
                    data: { estado: 'OCUPADO' }
                });

                // Actualizar contador de hilos libres en troncal
                await tx.troncal.update({
                    where: { id: hilo.troncalId },
                    data: { hilosLibres: { decrement: 1 } }
                });
            }

            return nuevoSplitter;
        });

        // Obtener splitter completo con salidas
        const splitterCompleto = await prisma.splitter.findUnique({
            where: { id: resultado.id },
            include: {
                mufa: { select: { codigo: true } },
                salidas: {
                    orderBy: { numero: 'asc' }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "Splitter creado correctamente",
            splitter: splitterCompleto
        });

    } catch (error) {
        console.error("❌ Error al crear splitter:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el splitter",
            error: error.message
        });
    }
};

// ====================== OBTENER SPLITTER POR ID ======================
exports.getById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const splitter = await prisma.splitter.findUnique({
            where: { id },
            include: {
                mufa: {
                    include: {
                        troncal: {
                            include: {
                                proyecto: { select: { empresaId: true, nombre: true } }
                            }
                        }
                    }
                },
                entradaHilo: {
                    select: {
                        id: true,
                        numero: true,
                        color: true,
                        bufferColor: true,
                        troncal: { select: { nombre: true } }
                    }
                },
                salidas: {
                    include: {
                        caja: {
                            select: {
                                id: true,
                                codigo: true,
                                latitud: true,
                                longitud: true,
                                puertosLibres: true,
                                _count: { select: { clientes: true } }
                            }
                        }
                    },
                    orderBy: { numero: 'asc' }
                }
            }
        });

        if (!splitter) {
            return res.status(404).json({
                success: false,
                message: "Splitter no encontrado"
            });
        }

        if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este splitter"
            });
        }

        // Calcular estadísticas
        const salidasOcupadas = splitter.salidas.filter(s => s.estado === 'OCUPADO').length;
        const salidasLibres = splitter.salidas.filter(s => s.estado === 'LIBRE').length;
        const salidasAveriadas = splitter.salidas.filter(s => s.estado === 'AVERIADO').length;
        const ratioNum = parseInt(splitter.ratio.split(':')[1]) || 1;

        res.json({
            success: true,
            splitter: {
                ...splitter,
                estadisticas: {
                    totalSalidas: ratioNum,
                    ocupadas: salidasOcupadas,
                    libres: salidasLibres,
                    averiadas: salidasAveriadas,
                    porcentajeUso: Math.round((salidasOcupadas / ratioNum) * 100)
                }
            }
        });

    } catch (error) {
        console.error("❌ Error al obtener splitter:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el splitter"
        });
    }
};

// ====================== OBTENER TODAS LAS SALIDAS DE UN SPLITTER ======================
exports.getSalidas = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const splitter = await prisma.splitter.findUnique({
            where: { id },
            include: {
                mufa: {
                    include: {
                        troncal: { include: { proyecto: { select: { empresaId: true } } } }
                    }
                },
                salidas: {
                    include: {
                        caja: {
                            select: {
                                id: true,
                                codigo: true,
                                latitud: true,
                                longitud: true
                            }
                        }
                    },
                    orderBy: { numero: 'asc' }
                }
            }
        });

        if (!splitter) {
            return res.status(404).json({
                success: false,
                message: "Splitter no encontrado"
            });
        }

        if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este splitter"
            });
        }

        res.json({
            success: true,
            splitterId: id,
            codigo: splitter.codigo,
            salidas: splitter.salidas
        });
    } catch (error) {
        console.error("❌ Error al obtener salidas del splitter:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener las salidas del splitter"
        });
    }
};

// ====================== ACTUALIZAR SPLITTER ======================
exports.update = async (req, res) => {
    const { id } = req.params;
    const { codigo, tipo, activo, atenuacion } = req.body;
    const { empresaId } = req.user;

    try {
        // Verificar que el splitter existe y pertenece a la empresa
        const splitter = await prisma.splitter.findUnique({
            where: { id },
            include: {
                mufa: {
                    include: {
                        troncal: { include: { proyecto: { select: { empresaId: true } } } }
                    }
                }
            }
        });

        if (!splitter) {
            return res.status(404).json({
                success: false,
                message: "Splitter no encontrado"
            });
        }

        if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este splitter"
            });
        }

        const splitterActualizado = await prisma.splitter.update({
            where: { id },
            data: {
                codigo: codigo ? codigo.toUpperCase() : undefined,
                tipo: tipo || undefined,
                activo: activo !== undefined ? activo : undefined,
                atenuacion: atenuacion !== undefined ? parseFloat(atenuacion) : undefined
            },
            include: {
                mufa: { select: { codigo: true } },
                salidas: { orderBy: { numero: 'asc' } }
            }
        });

        res.json({
            success: true,
            message: "Splitter actualizado correctamente",
            splitter: splitterActualizado
        });

    } catch (error) {
        console.error("❌ Error al actualizar splitter:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el splitter"
        });
    }
};

// ====================== ELIMINAR SPLITTER ======================
exports.delete = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar splitter
            const splitter = await tx.splitter.findUnique({
                where: { id },
                include: {
                    mufa: {
                        include: {
                            troncal: { include: { proyecto: { select: { empresaId: true } } } }
                        }
                    },
                    entradaHilo: true,
                    salidas: true
                }
            });

            if (!splitter) throw new Error("Splitter no encontrado");
            if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este splitter");
            }

            // Verificar que no tenga salidas ocupadas
            const salidasOcupadas = splitter.salidas.filter(s => s.estado === 'OCUPADO');
            if (salidasOcupadas.length > 0) {
                throw new Error(`No se puede eliminar el splitter porque tiene ${salidasOcupadas.length} salidas ocupadas`);
            }

            // Liberar hilo de entrada si existe
            if (splitter.entradaHiloId) {
                await tx.hiloFibra.update({
                    where: { id: splitter.entradaHiloId },
                    data: { estado: 'LIBRE' }
                });

                // Actualizar contador de hilos libres
                const hilo = await tx.hiloFibra.findUnique({
                    where: { id: splitter.entradaHiloId },
                    select: { troncalId: true }
                });

                if (hilo) {
                    await tx.troncal.update({
                        where: { id: hilo.troncalId },
                        data: { hilosLibres: { increment: 1 } }
                    });
                }
            }

            // Eliminar splitter (las salidas se eliminan en cascade)
            await tx.splitter.delete({ where: { id } });

            return { salidasEliminadas: splitter.salidas.length };
        });

        res.json({
            success: true,
            message: `Splitter eliminado correctamente. Se liberaron ${resultado.salidasEliminadas} salidas.`
        });

    } catch (error) {
        console.error("❌ Error al eliminar splitter:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al eliminar el splitter"
        });
    }
};

// ====================== CONECTAR SALIDA A CAJA ======================
exports.conectarSalida = async (req, res) => {
    const { id } = req.params; // Splitter ID
    const { numeroSalida, cajaId } = req.body;
    const { empresaId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar splitter
            const splitter = await tx.splitter.findUnique({
                where: { id },
                include: {
                    salidas: true,
                    mufa: {
                        include: {
                            troncal: { include: { proyecto: { select: { empresaId: true } } } }
                        }
                    }
                }
            });

            if (!splitter) throw new Error("Splitter no encontrado");
            if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este splitter");
            }

            // Buscar salida
            const salida = splitter.salidas.find(s => s.numero === parseInt(numeroSalida));
            if (!salida) throw new Error(`Salida ${numeroSalida} no encontrada`);
            if (salida.estado !== 'LIBRE') {
                throw new Error(`La salida ${numeroSalida} no está disponible. Estado: ${salida.estado}`);
            }

            // Verificar caja
            const caja = await tx.caja.findUnique({
                where: { id: cajaId },
                include: {
                    mufa: {
                        include: {
                            troncal: { include: { proyecto: { select: { empresaId: true } } } }
                        }
                    }
                }
            });

            if (!caja) throw new Error("Caja no encontrada");
            if (caja.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a esta caja");
            }
            if (caja.splitterSalida.length > 0) {
                throw new Error("Esta caja ya está conectada a otra salida de splitter");
            }

            // Actualizar salida
            await tx.splitterSalida.update({
                where: { id: salida.id },
                data: {
                    estado: 'OCUPADO',
                    cajaId: cajaId,
                    fechaConexion: new Date()
                }
            });

            return { splitter, salida, caja };
        });

        res.json({
            success: true,
            message: `Salida ${numeroSalida} conectada a caja ${resultado.caja.codigo} correctamente`
        });

    } catch (error) {
        console.error("❌ Error al conectar salida:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al conectar la salida"
        });
    }
};

// ====================== DESCONECTAR SALIDA ======================
exports.desconectarSalida = async (req, res) => {
    const { id } = req.params; // Splitter ID
    const { numeroSalida } = req.body;
    const { empresaId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar splitter
            const splitter = await tx.splitter.findUnique({
                where: { id },
                include: {
                    salidas: true,
                    mufa: {
                        include: {
                            troncal: { include: { proyecto: { select: { empresaId: true } } } }
                        }
                    }
                }
            });

            if (!splitter) throw new Error("Splitter no encontrado");
            if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este splitter");
            }

            // Buscar salida
            const salida = splitter.salidas.find(s => s.numero === parseInt(numeroSalida));
            if (!salida) throw new Error(`Salida ${numeroSalida} no encontrada`);
            if (salida.estado !== 'OCUPADO') {
                throw new Error(`La salida ${numeroSalida} no está conectada`);
            }

            // Desconectar
            await tx.splitterSalida.update({
                where: { id: salida.id },
                data: {
                    estado: 'LIBRE',
                    cajaId: null,
                    fechaConexion: null
                }
            });

            return { salida };
        });

        res.json({
            success: true,
            message: `Salida ${numeroSalida} desconectada correctamente`
        });

    } catch (error) {
        console.error("❌ Error al desconectar salida:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al desconectar la salida"
        });
    }
};

// ====================== CAMBIAR ESTADO DE SALIDA ======================
exports.cambiarEstadoSalida = async (req, res) => {
    const { id } = req.params; // Splitter ID
    const { numeroSalida, nuevoEstado } = req.body;
    const { empresaId } = req.user;

    const estadosValidos = ['LIBRE', 'OCUPADO', 'RESERVADO', 'AVERIADO'];

    if (!estadosValidos.includes(nuevoEstado)) {
        return res.status(400).json({
            success: false,
            message: `Estado inválido. Estados permitidos: ${estadosValidos.join(', ')}`
        });
    }

    try {
        const splitter = await prisma.splitter.findUnique({
            where: { id },
            include: {
                salidas: true,
                mufa: {
                    include: {
                        troncal: { include: { proyecto: { select: { empresaId: true } } } }
                    }
                }
            }
        });

        if (!splitter || splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este splitter"
            });
        }

        const salida = splitter.salidas.find(s => s.numero === parseInt(numeroSalida));
        if (!salida) {
            return res.status(404).json({
                success: false,
                message: `Salida ${numeroSalida} no encontrada`
            });
        }

        await prisma.splitterSalida.update({
            where: { id: salida.id },
            data: { estado: nuevoEstado }
        });

        res.json({
            success: true,
            message: `Estado de salida ${numeroSalida} actualizado a ${nuevoEstado}`
        });

    } catch (error) {
        console.error("❌ Error al cambiar estado de salida:", error);
        res.status(500).json({
            success: false,
            message: "Error al cambiar el estado de la salida"
        });
    }
};

// ====================== OBTENER SALIDAS DISPONIBLES ======================
exports.getSalidasDisponibles = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const splitter = await prisma.splitter.findUnique({
            where: { id },
            include: {
                salidas: {
                    where: { estado: 'LIBRE' },
                    orderBy: { numero: 'asc' }
                },
                mufa: {
                    include: {
                        troncal: { include: { proyecto: { select: { empresaId: true } } } }
                    }
                }
            }
        });

        if (!splitter || splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este splitter"
            });
        }

        res.json({
            success: true,
            splitterId: id,
            codigo: splitter.codigo,
            salidasDisponibles: splitter.salidas
        });

    } catch (error) {
        console.error("❌ Error al obtener salidas disponibles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener las salidas disponibles"
        });
    }
};

// ====================== FUNCIÓN AUXILIAR ======================
function calcularAtenuacionSplitter(ratio) {
    // Atenuaciones típicas en dB según ratio
    const atenuaciones = {
        '1:2': 3.5,
        '1:4': 7.0,
        '1:8': 10.5,
        '1:16': 14.0,
        '1:32': 17.5,
        '1:64': 21.0
    };
    return atenuaciones[ratio] || 14.0; // Default para 1:16
}
