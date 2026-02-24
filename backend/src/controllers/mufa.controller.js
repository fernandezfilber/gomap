const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER MUFAS (Con ruta y detalles)
exports.getMufas = async (req, res) => {
  try {
    const mufas = await prisma.mufa.findMany({ 
      include: { 
        troncal: true,
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
      // La ruta ya viene incluida en el objeto m por Prisma
    }));

    res.json(mufasProcesadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mufas" });
  }
};

// 2. CREAR MUFA (Soporta Dibujo de Ruta y Detalles)
exports.crearMufa = async (req, res) => {
  try {
    const { 
        troncalId, 
        bufferColor, 
        hiloColor, 
        latitud, 
        longitud, 
        direccion,
        ruta,        // Nuevo: Array de coordenadas del dibujo
        detalles,    // Nuevo: Texto descriptivo
        estadoFisico // Nuevo: Estado técnico
    } = req.body;

    // Validar existencia de la troncal
    const troncal = await prisma.troncal.findUnique({ where: { id: troncalId } });
    if (!troncal) return res.status(404).json({ error: "Troncal no encontrada" });

    // Validar que la combinación Sangría/Hilo no esté repetida
    const existe = await prisma.mufa.findFirst({
      where: { troncalId, bufferColor, hiloColor }
    });
    if (existe) return res.status(400).json({ error: "Este hilo ya está asignado" });

    // Generar códigos
    const prefijoB = "B" + bufferColor.substring(0, 2).toUpperCase();
    const prefijoH = "H" + hiloColor.substring(0, 2).toUpperCase();
    const codigoAuto = `${troncal.prefijo}-${prefijoB}-${prefijoH}`;

    const nuevaMufa = await prisma.mufa.create({
      data: {
        codigo: codigoAuto,
        bufferColor,
        bufferPrefijo: prefijoB,
        hiloColor,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        direccion: direccion || "",
        troncalId,
        // NUEVOS CAMPOS
        ruta: ruta || null,         // Guarda el JSON del dibujo
        detalles: detalles || "",   // Guarda notas adicionales
        estadoFisico: estadoFisico || "BUENO"
      }
    });

    res.status(201).json(nuevaMufa);
  } catch (error) {
    console.error("ERROR PRISMA:", error.message);
    res.status(500).json({ error: "Error al crear mufa", detalle: error.message });
  }
};

// 3. ACTUALIZAR MUFA (Para corregir rutas o detalles después)
exports.actualizarMufa = async (req, res) => {
  try {
    const mufa = await prisma.mufa.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        latitud: req.body.latitud ? parseFloat(req.body.latitud) : undefined,
        longitud: req.body.longitud ? parseFloat(req.body.longitud) : undefined,
        // Prisma maneja la actualización del JSON de 'ruta' automáticamente si viene en el body
      }
    });
    res.json(mufa);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar mufa" });
  }
};

// 4. ELIMINAR MUFA
exports.eliminarMufa = async (req, res) => {
  try {
    await prisma.mufa.delete({ where: { id: req.params.id } });
    res.json({ message: "Mufa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se puede eliminar la mufa" });
  }
};