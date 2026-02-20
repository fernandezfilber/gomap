const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER MUFAS CON DISPONIBILIDAD DE HILOS
exports.getMufas = async (req, res) => {
  try {
    // Incluimos la troncal y el conteo de cajas asociadas para saber la disponibilidad
    const mufas = await prisma.mufa.findMany({ 
      include: { 
        troncal: true,
        _count: {
          select: { cajas: true } // Cuenta automáticamente cuántas cajas NAP tiene la mufa
        }
      } 
    });

    // Formateamos la respuesta para facilitar el trabajo al frontend de Filber
    const mufasProcesadas = mufas.map(m => ({
      ...m,
      hilosOcupados: m._count.cajas,
      hilosLibres: 16 - m._count.cajas, // Basado en el límite de 16 que definiste
      estaLlena: m._count.cajas >= 16
    }));

    res.json(mufasProcesadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mufas" });
  }
};

// 2. CREAR MUFA CON CÓDIGO AUTOMÁTICO
exports.crearMufa = async (req, res) => {
  try {
    const { troncalId, bufferColor, hiloColor, latitud, longitud, direccion } = req.body;

    // 1. Validar existencia de la troncal
    const troncal = await prisma.troncal.findUnique({ where: { id: troncalId } });
    if (!troncal) return res.status(404).json({ error: "Troncal no encontrada" });

    // 2. Validar que la combinación Sangría/Hilo no esté repetida en la troncal
    const existe = await prisma.mufa.findFirst({
      where: { troncalId, bufferColor, hiloColor }
    });
    if (existe) return res.status(400).json({ error: "Este hilo de la troncal ya está asignado a otra mufa" });

    // 3. Generar prefijos y código (Ej: CHO-BAZ-HVE)
    const prefijoB = "B" + bufferColor.substring(0, 2).toUpperCase();
    const prefijoH = "H" + hiloColor.substring(0, 2).toUpperCase();
    const codigoAuto = `${troncal.prefijo}-${prefijoB}-${prefijoH}`;

    // 4. Crear registro con tipos de datos correctos para Prisma
    const nuevaMufa = await prisma.mufa.create({
      data: {
        codigo: codigoAuto,
        bufferColor,
        bufferPrefijo: prefijoB,
        hiloColor,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        direccion: direccion || "",
        troncalId
      }
    });

    res.status(201).json(nuevaMufa);
  } catch (error) {
    console.error("ERROR PRISMA:", error.message);
    res.status(500).json({ error: "Error al crear mufa", detalle: error.message });
  }
};

// 3. ACTUALIZAR MUFA
exports.actualizarMufa = async (req, res) => {
  try {
    const mufa = await prisma.mufa.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        latitud: req.body.latitud ? parseFloat(req.body.latitud) : undefined,
        longitud: req.body.longitud ? parseFloat(req.body.longitud) : undefined
      }
    });
    res.json(mufa);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar mufa" });
  }
};

// 4. ELIMINAR MUFA (Con manejo de dependencias)
exports.eliminarMufa = async (req, res) => {
  try {
    // Nota: El 'onDelete: Cascade' en tu modelo Prisma se encargará de las cajas si está configurado
    await prisma.mufa.delete({ where: { id: req.params.id } });
    res.json({ message: "Mufa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ 
      error: "No se puede eliminar la mufa", 
      detalle: "Asegúrate de que no tenga cajas NAP activas o que el Cascade esté activo." 
    });
  }
};