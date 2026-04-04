const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Obtener todas las mufas (Capa general)
exports.getMufas = async (req, res) => {
    try {
        const mufas = await prisma.mufa.findMany({ 
            include: { 
                troncal: true,
                poste: true,
                _count: { select: { cajas: true } }
            } 
        });

        const mufasProcesadas = mufas.map(m => {
            // Validamos que capacidadHilos exista para evitar el error 500
            const capacidad = m.capacidadHilos || 16; 
            const ocupados = m._count?.cajas || 0;

            return {
                ...m,
                hilosOcupados: ocupados,
                hilosLibres: capacidad - ocupados, 
                estaLlena: ocupados >= capacidad,
            };
        });

        res.json(mufasProcesadas);
    } catch (error) {
        console.error("🔥 Error real en Mufas:", error);
        res.status(500).json({ 
            error: "Error al obtener mufas", 
            detalle: error.message // Esto nos dirá el error exacto en la web
        });
    }
};
// 2. Obtener UNA mufa específica (Detalle)
exports.getMufaById = async (req, res) => {
    const { id } = req.params;
    try {
        const mufa = await prisma.mufa.findUnique({
            where: { id },
            include: {
                troncal: true,
                poste: true,
                cajas: { include: { _count: { select: { clientes: true } } } }
            }
        });
        if (!mufa) return res.status(404).json({ error: "Mufa no encontrada" });
        res.json(mufa);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalle de mufa" });
    }
};

// 4. Crear mufa
exports.crearMufa = async (req, res) => {
    try {
        const { troncalId, posteId, bufferColor, hiloColor, latitud, longitud } = req.body;
        
        const troncal = await prisma.troncal.findUnique({ where: { id: troncalId } });
        if (!troncal) return res.status(404).json({ error: "Troncal inexistente" });

        const prefijoB = "B" + (bufferColor || "XX").substring(0, 2).toUpperCase();
        const prefijoH = "H" + (hiloColor || "XX").substring(0, 2).toUpperCase();
        const codigoAuto = `${troncal.prefijo}-${prefijoB}-${prefijoH}`;

        const nueva = await prisma.mufa.create({
            data: {
                codigo: codigoAuto,
                bufferColor, bufferPrefijo: prefijoB, hiloColor,
                latitud: parseFloat(latitud), longitud: parseFloat(longitud),
                troncalId, posteId
            }
        });
        res.status(201).json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear", detalle: error.message });
    }
};

// 5. Actualizar mufa (IMPORTANTE: Nombre debe coincidir con la ruta)
exports.actualizarMufa = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizada = await prisma.mufa.update({
            where: { id },
            data: req.body
        });
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// 6. Eliminar mufa
exports.eliminarMufa = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.mufa.delete({ where: { id } });
        res.json({ mensaje: "Mufa eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};
exports.getHilosOcupados = async (req, res) => {
    const { mufaId } = req.params;
    try {
        const cajas = await prisma.caja.findMany({
            where: { mufaId },
            select: { puertoMufa: true } // Asumiendo que 'puertoMufa' es el campo en tu esquema
        });
        
        // Devolvemos un array simple de números [1, 5, 8]
        const ocupados = cajas.map(c => c.puertoMufa);
        res.json(ocupados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener hilos ocupados" });
    }
};

exports.getMufaById = async (req, res) => {
    const { id } = req.params;
    try {
        const mufa = await prisma.mufa.findUnique({
            where: { id },
            include: {
                troncal: true,
                poste: true,
                cajas: {
                    select: {
                        id: true,
                        codigo: true,
                        puertoMufa: true,
                        _count: { select: { clientes: true } }
                    }
                }
            }
        });

        if (!mufa) return res.status(404).json({ error: "Mufa no encontrada" });

        // Calculamos disponibilidad antes de enviar
        const data = {
            ...mufa,
            hilosUsados: mufa.cajas.length,
            hilosLibres: (mufa.capacidadHilos || 16) - mufa.cajas.length
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalle de la mufa" });
    }
};