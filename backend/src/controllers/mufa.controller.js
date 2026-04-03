const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER MUFAS (Ahora incluye el Poste y lógica de capacidad)
exports.getMufas = async (req, res) => {
  try {
    const mufas = await prisma.mufa.findMany({ 
      include: { 
        troncal: true,
        poste: true, // NUEVO: Incluir el soporte físico
        _count: {
          select: { cajas: true } 
        }
      } 
    });

    const mufasProcesadas = mufas.map(m => ({
      ...m,
      hilosOcupados: m._count.cajas,
      hilosLibres: m.capacidadHilos - m._count.cajas, 
      estaLlena: m._count.cajas >= m.capacidadHilos,
    }));

    res.json(mufasProcesadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mufas" });
  }
};

// 2. CREAR MUFA (Soporta vinculación a Poste y Troncal)
exports.crearMufa = async (req, res) => {
  try {
    const { 
        troncalId, 
        posteId,      // NUEVO: ID del poste desde el mapa
        bufferColor, 
        hiloColor, 
        latitud, 
        longitud, 
        direccion,
        ruta,         
        detalles,     
        estadoFisico 
    } = req.body;

    // 1. Validar existencia de la troncal
    const troncal = await prisma.troncal.findUnique({ where: { id: troncalId } });
    if (!troncal) return res.status(404).json({ error: "Troncal no encontrada" });

    // 2. Lógica de Coordenadas Heredadas del Poste
    let latFinal = parseFloat(latitud);
    let lngFinal = parseFloat(longitud);

    if (posteId) {
      const poste = await prisma.poste.findUnique({ where: { id: posteId } });
      if (poste) {
        latFinal = poste.latitud;
        lngFinal = poste.longitud;
      }
    }

    // 3. Validar que la combinación Sangría/Hilo no esté repetida en esta troncal
    const existe = await prisma.mufa.findFirst({
      where: { troncalId, bufferColor, hiloColor }
    });
    if (existe) return res.status(400).json({ error: "Este hilo de la troncal ya está asignado a otra mufa" });

    // 4. Generar códigos automáticos
    const prefijoB = "B" + bufferColor.substring(0, 2).toUpperCase();
    const prefijoH = "H" + hiloColor.substring(0, 2).toUpperCase();
    const codigoAuto = `${troncal.prefijo}-${prefijoB}-${prefijoH}`;

    // 5. Crear Mufa
    const nuevaMufa = await prisma.mufa.create({
      data: {
        codigo: codigoAuto,
        bufferColor,
        bufferPrefijo: prefijoB,
        hiloColor,
        latitud: latFinal,
        longitud: lngFinal,
        direccion: direccion || "",
        troncalId,
        posteId: posteId || null, // Vínculo al poste físico
        ruta: ruta || null,         
        detalles: detalles || "",   
        estadoFisico: estadoFisico || "BUENO"
      },
      include: { poste: true, troncal: true }
    });

    res.status(201).json(nuevaMufa);
  } catch (error) {
    console.error("ERROR PRISMA:", error.message);
    res.status(500).json({ error: "Error al crear mufa", detalle: error.message });
  }
};

// 3. ACTUALIZAR MUFA (Sincroniza con Poste si cambia)
exports.actualizarMufa = async (req, res) => {
  try {
    const { posteId, latitud, longitud } = req.body;
    let dataUpdate = { ...req.body };

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

    const mufa = await prisma.mufa.update({
      where: { id: req.params.id },
      data: dataUpdate
    });
    res.json(mufa);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar mufa" });
  }
};

// 4. ELIMINAR MUFA
exports.eliminarMufa = async (req, res) => {
  try {
    // Nota: El borrado en cascada de Cajas dependerá de tu Schema.prisma
    await prisma.mufa.delete({ where: { id: req.params.id } });
    res.json({ message: "Mufa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se puede eliminar la mufa. Verifique que no tenga cajas asociadas." });
  }
};