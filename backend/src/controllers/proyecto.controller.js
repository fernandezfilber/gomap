
const prisma = require('../config/db');

exports.crearProyecto = async (req, res) => {
  console.log("--- 🛰️ INICIO DE OPERACIÓN: CREAR PROYECTO ---");
  console.log("📦 Datos recibidos del cliente:", req.body);

  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      console.warn("⚠️ Intento de creación sin nombre");
      return res.status(400).json({ error: "Nombre obligatorio" });
    }

    console.log("⏳ Prisma intentando 'create' en la DB...");
    
    const proyecto = await prisma.proyecto.create({
      data: { 
        nombre, 
        descripcion,
        estado: "PLANIFICACION" 
      }
    });

    console.log("✅ Proyecto creado con éxito ID:", proyecto.id);
    res.status(201).json(proyecto);

  } catch (error) {
    console.error("❌ ERROR DETECTADO EN PRIMA:");
    console.error("Cod Error:", error.code); // P2002, P1001, etc.
    console.error("Mensaje:", error.message);
    
    // Esto nos dirá si el binario de Rust falló por librerías
    if (error.message.includes("engine")) {
      console.error("🚨 Fallo crítico del Query Engine de Prisma");
    }

    res.status(500).json({ 
      error: "Error del motor de base de datos",
      detalles: error.message,
      codigo: error.code 
    });
  }
};
// 2. LISTAR: Resumen de todos los proyectos con conteo de cables
exports.listarProyectos = async (req, res) => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: { 
        _count: { 
          select: { 
            tramos: true,
            troncales: true 
          } 
        } 
      },
      orderBy: { creadoEn: 'desc' }
    });
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de proyectos" });
  }
};

// 3. DETALLE PROFUNDO: Carga toda la infraestructura de una zona (GIS)
exports.getProyectoDetalle = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id },
      include: {
        // Traemos las troncales y sus mufas
        troncales: {
          include: {
            _count: { select: { mufas: true } }
          }
        },
        // Traemos todos los cables del proyecto con sus anclajes
        tramos: {
          include: {
            posteInicio: { select: { codigo: true, latitud: true, longitud: true } },
            posteFin: { select: { codigo: true, latitud: true, longitud: true } }
          }
        }
      }
    });

    if (!proyecto) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar el detalle técnico del proyecto" });
  }
};

// 4. ACTUALIZAR: Modificar nombre, descripción o estado (ej: pasar a EN_EJECUCION)
exports.actualizarProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;
  try {
    const actualizado = await prisma.proyecto.update({
      where: { id },
      data: { nombre, descripcion, estado }
    });
    res.json({ mensaje: "Proyecto actualizado", proyecto: actualizado });
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el proyecto" });
  }
};

// 5. ELIMINAR: Borrado seguro (Cascade)
exports.eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    // Al eliminar el proyecto, el schema v6 borrará troncales y cables asociados
    await prisma.proyecto.delete({ where: { id } });
    res.json({ mensaje: "Proyecto e infraestructura asociada eliminados correctamente" });
  } catch (error) {
    console.error("🔥 Error en eliminación destructiva:", error);
    res.status(500).json({ error: "Error al eliminar el proyecto y sus dependencias" });
  }
};