const { prisma } = require('../config/db');

// ====================== GENERAR HILOS AUTOMÁTICAMENTE ======================
const generarHilosTroncal = async (troncalId, cantHilos) => {
    // Colores según estándar TIA-598
    const coloresPrimarios = ['AZUL', 'NARANJA', 'VERDE', 'MARRON', 'GRIS', 'BLANCO', 'ROJO', 'NEGRO'];
    const coloresSecundarios = ['AZUL', 'NARANJA', 'VERDE', 'MARRON', 'GRIS', 'BLANCO', 'ROJO', 'NEGRO', 'AMARILLO', 'VIOLETA', 'ROSA', 'CELESTE'];

    const hilos = [];

    for (let i = 1; i <= cantHilos; i++) {
        const bufferIndex = Math.floor((i - 1) / 12);
        const hiloEnBuffer = ((i - 1) % 12);

        const colorBuffer = coloresPrimarios[bufferIndex] || 'AZUL';
        const colorHilo = coloresSecundarios[hiloEnBuffer] || 'AZUL';

        hilos.push({
            numero: i,
            troncalId: troncalId,
            estado: 'LIBRE',
            color: colorHilo,
            bufferColor: colorBuffer
        });
    }

    await prisma.hiloFibra.createMany({
        data: hilos
    });

    return hilos.length;
};

// ====================== OBTENER TODOS LOS HILOS ======================
exports.getAll = async (req, res) => {
    try {
        const { empresaId } = req.user;
        const { troncalId, estado, bufferColor } = req.query;

        const where = {
            troncal: {
                proyecto: {
                    empresaId
                }
            }
        };

        if (troncalId) where.troncalId = troncalId;
        if (estado) where.estado = estado;
        if (bufferColor) where.bufferColor = bufferColor;

        const hilos = await prisma.hiloFibra.findMany({
            where,
            include: {
                troncal: {
                    select: {
                        id: true,
                        nombre: true,
                        bufferColor: true,
                        olt: {
                            select: { nombre: true }
                        }
                    }
                },
                mufaOrigen: {
                    select: { id: true, codigo: true, latitud: true, longitud: true }
                },
                splitterComoEntrada: {
                    select: { id: true, codigo: true, ratio: true }
                },
                cajaComoDestino: {
                    select: { id: true, codigo: true, latitud: true, longitud: true }
                },
                historial: {
                    orderBy: { creadoEn: 'desc' },
                    take: 5,
                    include: {
                        usuario: { select: { nombre: true } }
                    }
                }
            },
            orderBy: [
                { troncalId: 'asc' },
                { numero: 'asc' }
            ]
        });

        res.json({
            success: true,
            count: hilos.length,
            hilos
        });

    } catch (error) {
        console.error("❌ Error al obtener hilos:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la lista de hilos"
        });
    }
};

// ====================== OBTENER HILOS POR TRONCAL ======================
exports.getByTroncal = async (req, res) => {
    const { troncalId } = req.params;
    const { empresaId } = req.user;

    try {
        // Verificar que la troncal pertenezca a la empresa
        const troncal = await prisma.troncal.findUnique({
            where: { id: troncalId },
            include: {
                proyecto: { select: { empresaId: true } }
            }
        });

        if (!troncal || troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a esta troncal"
            });
        }

        const hilos = await prisma.hiloFibra.findMany({
            where: { troncalId },
            include: {
                mufaOrigen: {
                    select: { id: true, codigo: true, latitud: true, longitud: true }
                },
                splitterComoEntrada: {
                    select: { id: true, codigo: true, ratio: true }
                },
                cajaComoDestino: {
                    select: { id: true, codigo: true, latitud: true, longitud: true }
                }
            },
            orderBy: { numero: 'asc' }
        });

        // Agrupar por buffer para visualización tipo patch panel
        const agrupadosPorBuffer = hilos.reduce((acc, hilo) => {
            if (!acc[hilo.bufferColor]) {
                acc[hilo.bufferColor] = [];
            }
            acc[hilo.bufferColor].push(hilo);
            return acc;
        }, {});

        res.json({
            success: true,
            troncal: {
                id: troncal.id,
                nombre: troncal.nombre,
                cantHilos: troncal.cantHilos,
                hilosLibres: troncal.hilosLibres
            },
            count: hilos.length,
            hilos,
            agrupadosPorBuffer
        });

    } catch (error) {
        console.error("❌ Error al obtener hilos de troncal:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los hilos de la troncal"
        });
    }
};

// ====================== OBTENER HILO POR ID ======================
exports.getById = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const hilo = await prisma.hiloFibra.findUnique({
            where: { id },
            include: {
                troncal: {
                    include: {
                        proyecto: { select: { empresaId: true, nombre: true } }
                    }
                },
                mufaOrigen: {
                    select: { id: true, codigo: true, latitud: true, longitud: true, ratioSplitteo: true }
                },
                splitterComoEntrada: {
                    select: { id: true, codigo: true, ratio: true, mufaId: true }
                },
                cajaComoDestino: {
                    select: { id: true, codigo: true, latitud: true, longitud: true, puertosLibres: true }
                },
                historial: {
                    orderBy: { creadoEn: 'desc' },
                    include: {
                        usuario: { select: { nombre: true, email: true } }
                    }
                },
                circuitos: {
                    include: {
                        circuito: {
                            include: {
                                cliente: { select: { id: true, nombre: true, dni: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!hilo) {
            return res.status(404).json({
                success: false,
                message: "Hilo no encontrado"
            });
        }

        if (hilo.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este hilo"
            });
        }

        res.json({
            success: true,
            hilo
        });

    } catch (error) {
        console.error("❌ Error al obtener hilo:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el hilo"
        });
    }
};

// ====================== CONECTAR HILO ======================
exports.conectar = async (req, res) => {
    const { id } = req.params;
    const { tipoDestino, destinoId, observaciones } = req.body;
    const { empresaId, id: usuarioId } = req.user;

    const tiposValidos = ['MUFA', 'SPLITTER', 'CAJA'];

    if (!tiposValidos.includes(tipoDestino)) {
        return res.status(400).json({
            success: false,
            message: "Tipo de destino inválido. Use: MUFA, SPLITTER o CAJA"
        });
    }

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar hilo
            const hilo = await tx.hiloFibra.findUnique({
                where: { id },
                include: {
                    troncal: {
                        include: {
                            proyecto: { select: { empresaId: true } }
                        }
                    }
                }
            });

            if (!hilo) throw new Error("Hilo no encontrado");
            if (hilo.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este hilo");
            }
            if (hilo.estado !== 'LIBRE') {
                throw new Error(`El hilo no está disponible. Estado actual: ${hilo.estado}`);
            }

            let updateData = {};
            let detalleHistorial = '';

            switch (tipoDestino) {
                case 'MUFA':
                    const mufa = await tx.mufa.findUnique({
                        where: { id: destinoId },
                        include: {
                            troncal: { include: { proyecto: { select: { empresaId: true } } } }
                        }
                    });

                    if (!mufa) throw new Error("Mufa no encontrada");
                    if (mufa.troncal.proyecto.empresaId !== empresaId) {
                        throw new Error("No tienes acceso a esta mufa");
                    }

                    updateData = {
                        estado: 'OCUPADO',
                        mufaOrigenId: destinoId
                    };
                    detalleHistorial = `Conectado a Mufa ${mufa.codigo}`;
                    break;

                case 'SPLITTER':
                    const splitter = await tx.splitter.findUnique({
                        where: { id: destinoId },
                        include: {
                            mufa: { include: { troncal: { include: { proyecto: { select: { empresaId: true } } } } } }
                        }
                    });

                    if (!splitter) throw new Error("Splitter no encontrado");
                    if (splitter.mufa.troncal.proyecto.empresaId !== empresaId) {
                        throw new Error("No tienes acceso a este splitter");
                    }
                    if (splitter.entradaHiloId) {
                        throw new Error("Este splitter ya tiene un hilo de entrada conectado");
                    }

                    updateData = {
                        estado: 'OCUPADO',
                        splitterEntradaId: destinoId
                    };
                    detalleHistorial = `Conectado a Splitter ${splitter.codigo}`;

                    // Actualizar el splitter también
                    await tx.splitter.update({
                        where: { id: destinoId },
                        data: { entradaHiloId: id }
                    });
                    break;

                case 'CAJA':
                    const caja = await tx.caja.findUnique({
                        where: { id: destinoId },
                        include: {
                            mufa: { include: { troncal: { include: { proyecto: { select: { empresaId: true } } } } } }
                        }
                    });

                    if (!caja) throw new Error("Caja no encontrada");
                    if (caja.mufa.troncal.proyecto.empresaId !== empresaId) {
                        throw new Error("No tienes acceso a esta caja");
                    }
                    if (caja.hiloFibraId) {
                        throw new Error("Esta caja ya tiene un hilo conectado");
                    }

                    updateData = {
                        estado: 'OCUPADO',
                        cajaComoDestino: { connect: { id: destinoId } }
                    };
                    detalleHistorial = `Conectado a Caja ${caja.codigo}`;

                    // Actualizar la caja
                    await tx.caja.update({
                        where: { id: destinoId },
                        data: { hiloFibraId: id }
                    });
                    break;
            }

            // Actualizar hilo
            const hiloActualizado = await tx.hiloFibra.update({
                where: { id },
                data: updateData
            });

            // Crear historial
            await tx.hiloHistorial.create({
                data: {
                    hiloId: id,
                    accion: 'CONECTAR',
                    usuarioId: usuarioId,
                    estadoAnterior: 'LIBRE',
                    estadoNuevo: 'OCUPADO',
                    detalle: observaciones || detalleHistorial
                }
            });

            // Actualizar contador de hilos libres en troncal
            await tx.troncal.update({
                where: { id: hilo.troncalId },
                data: { hilosLibres: { decrement: 1 } }
            });

            return hiloActualizado;
        });

        res.json({
            success: true,
            message: "Hilo conectado correctamente",
            hilo: resultado
        });

    } catch (error) {
        console.error("❌ Error al conectar hilo:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al conectar el hilo"
        });
    }
};

// ====================== DESCONECTAR HILO ======================
exports.desconectar = async (req, res) => {
    const { id } = req.params;
    const { motivo } = req.body;
    const { empresaId, id: usuarioId } = req.user;

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            // Verificar hilo
            const hilo = await tx.hiloFibra.findUnique({
                where: { id },
                include: {
                    troncal: {
                        include: {
                            proyecto: { select: { empresaId: true } }
                        }
                    },
                    splitterComoEntrada: true,
                    cajaComoDestino: true
                }
            });

            if (!hilo) throw new Error("Hilo no encontrado");
            if (hilo.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este hilo");
            }
            if (hilo.estado === 'LIBRE') {
                throw new Error("El hilo ya está libre");
            }

            const estadoAnterior = hilo.estado;
            let detalleHistorial = 'Desconectado';

            // Limpiar conexiones
            if (hilo.splitterEntradaId && hilo.splitterComoEntrada) {
                await tx.splitter.update({
                    where: { id: hilo.splitterEntradaId },
                    data: { entradaHiloId: null }
                });
                detalleHistorial = `Desconectado de Splitter ${hilo.splitterComoEntrada.codigo}`;
            }

            if (hilo.cajaComoDestino) {
                await tx.caja.update({
                    where: { id: hilo.cajaComoDestino.id },
                    data: { hiloFibraId: null }
                });
                detalleHistorial = `Desconectado de Caja ${hilo.cajaComoDestino.codigo}`;
            }

            // Actualizar hilo
            const hiloActualizado = await tx.hiloFibra.update({
                where: { id },
                data: {
                    estado: 'LIBRE',
                    mufaOrigenId: null,
                    splitterEntradaId: null
                }
            });

            // Crear historial
            await tx.hiloHistorial.create({
                data: {
                    hiloId: id,
                    accion: 'DESCONECTAR',
                    usuarioId: usuarioId,
                    estadoAnterior,
                    estadoNuevo: 'LIBRE',
                    detalle: motivo || detalleHistorial
                }
            });

            // Actualizar contador de hilos libres en troncal
            await tx.troncal.update({
                where: { id: hilo.troncalId },
                data: { hilosLibres: { increment: 1 } }
            });

            return hiloActualizado;
        });

        res.json({
            success: true,
            message: "Hilo desconectado correctamente",
            hilo: resultado
        });

    } catch (error) {
        console.error("❌ Error al desconectar hilo:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al desconectar el hilo"
        });
    }
};

// ====================== CAMBIAR ESTADO DE HILO ======================
exports.cambiarEstado = async (req, res) => {
    const { id } = req.params;
    const { nuevoEstado, motivo } = req.body;
    const { empresaId, id: usuarioId } = req.user;

    const estadosValidos = ['LIBRE', 'RESERVADO', 'OCUPADO', 'AVERIADO', 'MANTENIMIENTO'];

    if (!estadosValidos.includes(nuevoEstado)) {
        return res.status(400).json({
            success: false,
            message: `Estado inválido. Estados permitidos: ${estadosValidos.join(', ')}`
        });
    }

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            const hilo = await tx.hiloFibra.findUnique({
                where: { id },
                include: {
                    troncal: {
                        include: {
                            proyecto: { select: { empresaId: true } }
                        }
                    }
                }
            });

            if (!hilo) throw new Error("Hilo no encontrado");
            if (hilo.troncal.proyecto.empresaId !== empresaId) {
                throw new Error("No tienes acceso a este hilo");
            }

            const estadoAnterior = hilo.estado;

            // Determinar acción para historial
            let accion = 'MODIFICAR';
            if (nuevoEstado === 'AVERIADO') accion = 'AVERIAR';
            if (estadoAnterior === 'AVERIADO' && nuevoEstado !== 'AVERIADO') accion = 'REPARAR';

            const hiloActualizado = await tx.hiloFibra.update({
                where: { id },
                data: { estado: nuevoEstado }
            });

            // Crear historial
            await tx.hiloHistorial.create({
                data: {
                    hiloId: id,
                    accion,
                    usuarioId: usuarioId,
                    estadoAnterior,
                    estadoNuevo: nuevoEstado,
                    detalle: motivo || `Cambio de estado: ${estadoAnterior} → ${nuevoEstado}`
                }
            });

            // Actualizar contador de hilos libres si es necesario
            if (estadoAnterior === 'LIBRE' && nuevoEstado !== 'LIBRE') {
                await tx.troncal.update({
                    where: { id: hilo.troncalId },
                    data: { hilosLibres: { decrement: 1 } }
                });
            } else if (estadoAnterior !== 'LIBRE' && nuevoEstado === 'LIBRE') {
                await tx.troncal.update({
                    where: { id: hilo.troncalId },
                    data: { hilosLibres: { increment: 1 } }
                });
            }

            return hiloActualizado;
        });

        res.json({
            success: true,
            message: "Estado del hilo actualizado correctamente",
            hilo: resultado
        });

    } catch (error) {
        console.error("❌ Error al cambiar estado:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error al cambiar el estado del hilo"
        });
    }
};

// ====================== OBTENER HISTORIAL DEL HILO ======================
exports.getHistorial = async (req, res) => {
    const { id } = req.params;
    const { empresaId } = req.user;

    try {
        const hilo = await prisma.hiloFibra.findUnique({
            where: { id },
            include: {
                troncal: {
                    include: {
                        proyecto: { select: { empresaId: true } }
                    }
                }
            }
        });

        if (!hilo) {
            return res.status(404).json({
                success: false,
                message: "Hilo no encontrado"
            });
        }

        if (hilo.troncal.proyecto.empresaId !== empresaId) {
            return res.status(403).json({
                success: false,
                message: "No tienes acceso a este hilo"
            });
        }

        const historial = await prisma.hiloHistorial.findMany({
            where: { hiloId: id },
            orderBy: { creadoEn: 'desc' },
            include: {
                usuario: {
                    select: { id: true, nombre: true, email: true }
                }
            }
        });

        res.json({
            success: true,
            count: historial.length,
            historial
        });
    } catch (error) {
        console.error("❌ Error al obtener historial de hilo:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el historial del hilo"
        });
    }
};

// ====================== OBTENER ESTADÍSTICAS DE HILOS ======================
exports.getEstadisticas = async (req, res) => {
    const { empresaId } = req.user;

    try {
        const estadisticas = await prisma.hiloFibra.groupBy({
            by: ['estado'],
            where: {
                troncal: {
                    proyecto: { empresaId }
                }
            },
            _count: {
                estado: true
            }
        });

        const porBuffer = await prisma.hiloFibra.groupBy({
            by: ['bufferColor', 'estado'],
            where: {
                troncal: {
                    proyecto: { empresaId }
                }
            },
            _count: {
                estado: true
            }
        });

        res.json({
            success: true,
            estadisticas: {
                porEstado: estadisticas,
                porBuffer: porBuffer
            }
        });

    } catch (error) {
        console.error("❌ Error al obtener estadísticas:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener estadísticas de hilos"
        });
    }
};

// Exportar función de generación para usar en otros controladores
exports.generarHilosTroncal = generarHilosTroncal;
