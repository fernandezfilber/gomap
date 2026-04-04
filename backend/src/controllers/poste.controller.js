const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS LOS POSTES (Optimizado con contadores de equipos y cables)
exports.getPostes = async (req, res) => {
    try {
        const postes = await prisma.poste.findMany({
            include: {
                _count: {
                    select: { 
                        cajas: true, 
                        mufas: true,
                        tramosInicio: true, // Cables que salen
                        tramosFin: true     // Cables que llegan
                    }
                }
            }
        });
        res.json(postes);
    } catch (error) {
        console.error("❌ ERROR GET POSTES:", error.message);
        res.status(500).json({ error: "Error al obtener la lista de postes" });
    }
};

// 2. CREAR POSTE (Mantenemos validación de coordenadas)
exports.createPoste = async (req, res) => {
    try {
        const { codigo, latitud, longitud, tipo, altura, propietario } = req.body;

        if (!latitud || !longitud) {
            return res.status(400).json({ error: "Las coordenadas (lat/lng) son obligatorias." });
        }

        const nuevoPoste = await prisma.poste.create({
            data: { 
                codigo: codigo || `P-${Date.now()}`, 
                latitud: parseFloat(latitud), 
                longitud: parseFloat(longitud), 
                tipo: tipo || 'CONCRETO', 
                altura: altura || '8m', 
                propietario: propietario || 'Forward Vision' 
            }
        });
        res.status(201).json(nuevoPoste);
    } catch (error) {
        res.status(400).json({ error: "Error al crear poste. El código podría estar duplicado." });
    }
};

// 3. DETALLE DE POSTE (Crucial para el "DetalleEquipo.jsx" que armamos)
exports.getPosteWithEquipos = async (req, res) => {
    const { id } = req.params;
    try {
        const poste = await prisma.poste.findUnique({
            where: { id },
            include: {
                // Traemos mufas con sus hilos y cajas con sus clientes
                mufas: { 
                    select: { 
                        id: true, 
                        codigo: true, 
                        ratioSplitteo: true, 
                        hiloEntrada: true,
                        bufferEntrada: true 
                    } 
                }, 
                cajas: { 
                    include: { 
                        _count: { select: { clientes: true } } 
                    } 
                },
                // Ver qué cables están anclados aquí
                tramosInicio: { select: { id: true, nombre: true, tipoCable: true } },
                tramosFin: { select: { id: true, nombre: true, tipoCable: true } }
            }
        });

        if (!poste) return res.status(404).json({ error: "Poste no encontrado." });
        
        res.json(poste);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalles del poste" });
    }
};

// 4. ACTUALIZAR (Mantenemos protección de tipos de datos)
exports.updatePoste = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = { ...req.body };

        if (dataUpdate.latitud) dataUpdate.latitud = parseFloat(dataUpdate.latitud);
        if (dataUpdate.longitud) dataUpdate.longitud = parseFloat(dataUpdate.longitud);

        const actualizado = await prisma.poste.update({
            where: { id },
            data: dataUpdate
        });

        res.json({ mensaje: "Poste actualizado correctamente", poste: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el poste." });
    }
};

// 5. ELIMINAR POSTE (Protección de Integridad de Red mejorada)
exports.deletePoste = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificamos TODA la infraestructura conectada
        const chequeo = await prisma.poste.findUnique({
            where: { id },
            include: {
                _count: { 
                    select: { 
                        mufas: true, 
                        cajas: true, 
                        tramosInicio: true, 
                        tramosFin: true 
                    } 
                }
            }
        });

        const { mufas, cajas, tramosInicio, tramosFin } = chequeo._count;

        if (mufas > 0 || cajas > 0 || tramosInicio > 0 || tramosFin > 0) {
            return res.status(400).json({ 
                error: "⚠️ Operación bloqueada", 
                detalle: `El poste tiene: ${mufas} mufas, ${cajas} cajas y ${tramosInicio + tramosFin} cables conectados. Elimine o mueva estos elementos primero.` 
            });
        }

        await prisma.poste.delete({ where: { id } });
        res.json({ message: "Poste retirado del sistema correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el poste." });
    }
};