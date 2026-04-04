const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS LOS POSTES (Carga optimizada para el mapa)
exports.getPostes = async (req, res) => {
    try {
        const postes = await prisma.poste.findMany({
            include: {
                _count: {
                    select: { cajas: true, mufas: true }
                }
            }
        });
        res.json(postes);
    } catch (error) {
        console.error("❌ ERROR GET POSTES:", error.message);
        res.status(500).json({ error: "Error al obtener la lista de postes" });
    }
};

// 2. CREAR POSTE (Con validación de coordenadas)
exports.createPoste = async (req, res) => {
    try {
        const { codigo, latitud, longitud, tipo, altura, propietario } = req.body;

        // Validación de datos obligatorios
        if (!latitud || !longitud) {
            return res.status(400).json({ error: "Las coordenadas (lat/lng) son obligatorias para ubicar el poste." });
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
        console.error("❌ ERROR CREATE POSTE:", error.message);
        res.status(400).json({ error: "Error al crear poste. El código podría estar duplicado.", detalle: error.message });
    }
};

// 3. DETALLE DE POSTE CON EQUIPOS (Para el Popup del mapa)
exports.getPosteWithEquipos = async (req, res) => {
    const { id } = req.params;
    try {
        const poste = await prisma.poste.findUnique({
            where: { id },
            include: {
                mufas: { select: { id: true, codigo: true, estadoFisico: true } }, 
                cajas: { select: { id: true, codigo: true, puertosTotales: true } }
            }
        });

        if (!poste) return res.status(404).json({ error: "Poste no encontrado en la base de datos." });
        
        res.json(poste);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalles del poste" });
    }
};

// 4. ACTUALIZAR (Mover poste o cambiar material)
exports.updatePoste = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = { ...req.body };

        // Asegurar que las coordenadas sean números si se envían
        if (dataUpdate.latitud) dataUpdate.latitud = parseFloat(dataUpdate.latitud);
        if (dataUpdate.longitud) dataUpdate.longitud = parseFloat(dataUpdate.longitud);

        const actualizado = await prisma.poste.update({
            where: { id },
            data: dataUpdate
        });

        res.json({ mensaje: "Poste actualizado correctamente", poste: actualizado });
    } catch (error) {
        console.error("❌ ERROR UPDATE POSTE:", error.message);
        res.status(500).json({ error: "Error al actualizar el poste. Verifique los datos." });
    }
};

// 5. ELIMINAR POSTE (Con validación de seguridad)
exports.deletePoste = async (req, res) => {
    const { id } = req.params;
    try {
        // Antes de borrar, verificamos si tiene equipos para dar un mensaje claro
        const equiposCount = await prisma.poste.findUnique({
            where: { id },
            include: {
                _count: { select: { mufas: true, cajas: true } }
            }
        });

        if (equiposCount._count.mufas > 0 || equiposCount._count.cajas > 0) {
            return res.status(400).json({ 
                error: "⚠️ Operación bloqueada", 
                detalle: `El poste tiene ${equiposCount._count.mufas} mufa(s) y ${equiposCount._count.cajas} caja(s) instaladas. Primero mueva los equipos a otro poste.` 
            });
        }

        await prisma.poste.delete({ where: { id } });
        res.json({ message: "Poste retirado del sistema correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el poste." });
    }
};