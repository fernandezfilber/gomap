const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Obtener todos los postes (Carga inicial del mapa)
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
    res.status(500).json({ error: "Error al obtener la lista de postes" });
  }
};

// 2. Crear un nuevo poste
exports.createPoste = async (req, res) => {
  try {
    const { codigo, latitud, longitud, tipo, altura, propietario } = req.body;
    const nuevoPoste = await prisma.poste.create({
      data: { 
        codigo: codigo || `P-${Date.now()}`, 
        latitud: parseFloat(latitud), 
        longitud: parseFloat(longitud), 
        tipo: tipo || 'MADERA', 
        altura: altura || '8m', 
        propietario: propietario || 'Forward Vision' 
      }
    });
    res.status(201).json(nuevoPoste);
  } catch (error) {
    res.status(400).json({ error: "Error al crear poste", details: error.message });
  }
};

// 3. Detalle de poste con sus equipos (Popups del mapa)
exports.getPosteWithEquipos = async (req, res) => {
  const { id } = req.params;
  try {
    const poste = await prisma.poste.findUnique({
      where: { id },
      include: {
        mufas: true, 
        cajas: true  
      }
    });
    if (!poste) return res.status(404).json({ error: "Poste no encontrado" });
    res.json(poste);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalles del poste" });
  }
};

// 4. Actualizar datos (Cambio de ubicación o altura)
exports.updatePoste = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizado = await prisma.poste.update({
            where: { id },
            data: {
                ...req.body,
                latitud: req.body.latitud ? parseFloat(req.body.latitud) : undefined,
                longitud: req.body.longitud ? parseFloat(req.body.longitud) : undefined
            }
        });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el poste" });
    }
};

// 5. Eliminar poste
exports.deletePoste = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.poste.delete({ where: { id } });
        res.json({ message: "Poste eliminado" });
    } catch (error) {
        res.status(500).json({ error: "No se puede eliminar un poste con equipos activos" });
    }
};