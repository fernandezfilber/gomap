const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODAS LAS CAJAS (Ahora incluye información del Poste)
exports.getCajas = async (req, res) => {
  try {
    const cajas = await prisma.caja.findMany({
      include: { 
        mufa: true,
        poste: true // Incluimos el poste para saber dónde está ubicada físicamente
      } 
    });
    res.json(cajas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario de cajas" });
  }
};

// 2. CREAR CAJA NAP (Vinculada a Poste y Mufa)
exports.createCaja = async (req, res) => {
  try {
    const { 
      mufaId, 
      posteId,       // NUEVO: ID del poste seleccionado en el mapa
      puertoMufa, 
      colorFibraCaja, 
      puertoOlt, 
      latitud, 
      longitud, 
      puertosTotales,
      ruta,          
      detalles,      
      observaciones  
    } = req.body;

    // 1. Validar Mufa
    const mufa = await prisma.mufa.findUnique({ where: { id: mufaId } });
    if (!mufa) return res.status(404).json({ error: "Mufa de origen no encontrada" });

    // 2. Lógica de Coordenadas Heredadas del Poste
    let latFinal = parseFloat(latitud);
    let lngFinal = parseFloat(longitud);

    if (posteId) {
      const poste = await prisma.poste.findUnique({ where: { id: posteId } });
      if (poste) {
        // Si hay poste, la caja se posiciona exactamente donde está el poste
        latFinal = poste.latitud;
        lngFinal = poste.longitud;
      }
    }

    // 3. Validar si el puerto de la mufa ya está usado
    const salidaOcupada = await prisma.caja.findFirst({
      where: { mufaId, puertoMufa: parseInt(puertoMufa) }
    });
    
    if (salidaOcupada) {
      return res.status(400).json({ 
        error: `La salida ${puertoMufa} de la mufa ya tiene la caja ${salidaOcupada.codigo}` 
      });
    }

    // 4. Generar Código Automático
    const nPuerto = puertoMufa.toString().padStart(2, '0');
    const codigoAuto = `${mufa.codigo}-C${nPuerto}`;

    // 5. Crear Caja
    const nuevaCaja = await prisma.caja.create({
      data: {
        codigo: codigoAuto,
        puertoMufa: parseInt(puertoMufa),
        colorFibraCaja,
        puertoOlt,
        puertosTotales: parseInt(puertosTotales) || 16,
        latitud: latFinal,
        longitud: lngFinal,
        mufaId,
        posteId: posteId || null, // Guardamos el vínculo físico
        ruta: ruta || null,
        detalles: detalles || "",
        observaciones: observaciones || ""
      },
      include: { poste: true } // Devolvemos la caja con los datos del poste
    });

    res.status(201).json(nuevaCaja);
  } catch (error) {
    console.error("ERROR CREAR CAJA:", error.message);
    res.status(500).json({ error: "Error al registrar la caja", detalle: error.message });
  }
};

// 3. ACTUALIZAR CAJA (Permite cambiar de poste o de trazado)
exports.actualizarCaja = async (req, res) => {
  try {
    const { posteId, latitud, longitud } = req.body;
    let dataUpdate = { ...req.body };

    // Si se actualiza el posteId, actualizamos también las coordenadas a las del nuevo poste
    if (posteId) {
      const poste = await prisma.poste.findUnique({ where: { id: posteId } });
      if (poste) {
        dataUpdate.latitud = poste.latitud;
        dataUpdate.longitud = poste.longitud;
      }
    } else {
      if (latitud) dataUpdate.latitud = parseFloat(latitud);
      if (longitud) dataUpdate.longitud = parseFloat(longitud);
    }

    if (req.body.puertoMufa) dataUpdate.puertoMufa = parseInt(req.body.puertoMufa);
    if (req.body.puertosTotales) dataUpdate.puertosTotales = parseInt(req.body.puertosTotales);

    const actualizada = await prisma.caja.update({
      where: { id: req.params.id },
      data: dataUpdate
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la caja" });
  }
};

// ... (Los métodos deleteCaja y getHilosOcupados se mantienen igual)
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