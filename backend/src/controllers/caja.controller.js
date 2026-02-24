const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS LAS CAJAS (Incluyendo rutas para el dibujo)
exports.getCajas = async (req, res) => {
  try {
    const cajas = await prisma.caja.findMany({
      include: { mufa: true } 
    });
    res.json(cajas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario de cajas" });
  }
};

// 2. CREAR CAJA NAP (Soporta dibujo de ruta por calles)
exports.createCaja = async (req, res) => {
  try {
    const { 
      mufaId, 
      puertoMufa, 
      colorFibraCaja, 
      puertoOlt, 
      latitud, 
      longitud, 
      puertosTotales,
      ruta,          // NUEVO: Array de coordenadas del trazado
      detalles,      // NUEVO: Texto sobre ubicación física
      observaciones  // NUEVO: Notas técnicas adicionales
    } = req.body;

    const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
    if (!mufa) return res.status(404).json({ error: "Mufa de origen no encontrada" });

    const salidaOcupada = await prisma.caja.findFirst({
      where: { mufaId, puertoMufa: parseInt(puertoMufa) }
    });
    
    if (salidaOcupada) {
      return res.status(400).json({ 
        error: `La salida ${puertoMufa} del splitter ya tiene la caja ${salidaOcupada.codigo}` 
      });
    }

    const nPuerto = puertoMufa.toString().padStart(2, '0');
    const codigoAuto = `${mufa.codigo}-C${nPuerto}`;

    const nuevaCaja = await prisma.caja.create({
      data: {
        codigo: codigoAuto,
        puertoMufa: parseInt(puertoMufa),
        colorFibraCaja,
        puertoOlt,
        puertosTotales: parseInt(puertosTotales) || 16,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        mufaId,
        // NUEVOS CAMPOS GUARDADOS:
        ruta: ruta || null,
        detalles: detalles || "",
        observaciones: observaciones || ""
      }
    });

    res.status(201).json(nuevaCaja);
  } catch (error) {
    console.error("ERROR CREAR CAJA:", error.message);
    res.status(500).json({ error: "Error al registrar la caja", detalle: error.message });
  }
};

// 3. ACTUALIZAR CAJA (Permite editar el trazado de fibra)
exports.actualizarCaja = async (req, res) => {
  try {
    const actualizada = await prisma.caja.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        puertoMufa: req.body.puertoMufa ? parseInt(req.body.puertoMufa) : undefined,
        latitud: req.body.latitud ? parseFloat(req.body.latitud) : undefined,
        longitud: req.body.longitud ? parseFloat(req.body.longitud) : undefined,
        puertosTotales: req.body.puertosTotales ? parseInt(req.body.puertosTotales) : undefined,
        // Prisma actualizará 'ruta' y 'detalles' si vienen en el body
      }
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la caja" });
  }
};

// 4. ELIMINAR CAJA
exports.deleteCaja = async (req, res) => {
  try {
    await prisma.caja.delete({ where: { id: req.params.id } });
    res.json({ message: "Caja eliminada y salida del splitter liberada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la caja" });
  }
};

// 5. OBTENER SALIDAS OCUPADAS
exports.getHilosOcupados = async (req, res) => {
  try {
    const { mufaId } = req.params;
    const cajas = await prisma.caja.findMany({
      where: { mufaId },
      select: { puertoMufa: true }
    });
    res.json(cajas.map(c => c.puertoMufa));
  } catch (error) {
    res.status(500).json({ error: "Error al consultar disponibilidad del splitter" });
  }
};