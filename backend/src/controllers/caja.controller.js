const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS LAS CAJAS
exports.getCajas = async (req, res) => {
  try {
    const cajas = await prisma.caja.findMany({
      include: { mufa: true } // Incluye datos de la mufa para el mapa
    });
    res.json(cajas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario de cajas" });
  }
};

// 2. CREAR CAJA NAP (Lógica de Splitter 1x16)
exports.createCaja = async (req, res) => {
  try {
    const { 
      mufaId, 
      puertoMufa,     // Representa la salida del splitter (1-16)
      colorFibraCaja, // Color del hilo de esa salida
      puertoOlt, 
      latitud, 
      longitud, 
      puertosTotales 
    } = req.body;

    // Validar existencia de la mufa
    const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
    if (!mufa) return res.status(404).json({ error: "Mufa de origen no encontrada" });

    // VALIDACIÓN: ¿La salida del splitter ya está ocupada?
    const salidaOcupada = await prisma.caja.findFirst({
      where: { mufaId, puertoMufa: parseInt(puertoMufa) }
    });
    
    if (salidaOcupada) {
      return res.status(400).json({ 
        error: `La salida ${puertoMufa} del splitter ya tiene la caja ${salidaOcupada.codigo}` 
      });
    }

    // Generar código automático técnico (Ej: CHO-BAZ-HVE-C01)
    const nPuerto = puertoMufa.toString().padStart(2, '0');
    const codigoAuto = `${mufa.codigo}-C${nPuerto}`;

    const nuevaCaja = await prisma.caja.create({
      data: {
        codigo: codigoAuto,
        puertoMufa: parseInt(puertoMufa), // Guardamos el número de salida
        colorFibraCaja,
        puertoOlt,
        puertosTotales: parseInt(puertosTotales) || 16, // Capacidad para 8 o 16 clientes
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        mufaId
      }
    });

    res.status(201).json(nuevaCaja);
  } catch (error) {
    console.error("ERROR CREAR CAJA:", error.message);
    res.status(500).json({ error: "Error al registrar la caja", detalle: error.message });
  }
};

// 3. OBTENER SALIDAS OCUPADAS (Para el filtro del frontend)
exports.getHilosOcupados = async (req, res) => {
  try {
    const { mufaId } = req.params;
    const cajas = await prisma.caja.findMany({
      where: { mufaId },
      select: { puertoMufa: true }
    });
    // Retorna array de salidas usadas: [1, 2, 5]
    res.json(cajas.map(c => c.puertoMufa));
  } catch (error) {
    res.status(500).json({ error: "Error al consultar disponibilidad del splitter" });
  }
};

// 4. ACTUALIZAR CAJA
exports.actualizarCaja = async (req, res) => {
  try {
    const actualizada = await prisma.caja.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        puertoMufa: req.body.puertoMufa ? parseInt(req.body.puertoMufa) : undefined,
        latitud: req.body.latitud ? parseFloat(req.body.latitud) : undefined,
        longitud: req.body.longitud ? parseFloat(req.body.longitud) : undefined,
        puertosTotales: req.body.puertosTotales ? parseInt(req.body.puertosTotales) : undefined
      }
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la caja" });
  }
};

// 5. ELIMINAR CAJA (Libera la salida del splitter)
exports.deleteCaja = async (req, res) => {
  try {
    await prisma.caja.delete({ where: { id: req.params.id } });
    res.json({ message: "Caja eliminada y salida del splitter liberada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la caja" });
  }
};