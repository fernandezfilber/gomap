
const prisma = require('../config/db');
// 1. CREAR: Vinculado a Proyecto y con inventario de hilos inicial
exports.createTroncal = async (req, res) => {
    try {
        // 1. Extraemos según los nombres REALES de tu modelo Prisma
        const { nombre, bufferColor, cantHilos, descripcion, ruta, proyectoId } = req.body;
        
        // 2. Validaciones estrictas
        if (!nombre || !bufferColor || !cantHilos || !proyectoId) {
            return res.status(400).json({ 
                error: "Nombre, Color de Buffer, cantHilos y proyectoId son obligatorios." 
            });
        }

        // 3. Creación en la DB
        const nueva = await prisma.troncal.create({
            data: { 
                nombre, 
                bufferColor, 
                cantHilos: parseInt(cantHilos), 
                hilosLibres: parseInt(cantHilos), // Inicializamos igual que la capacidad total
                descripcion: descripcion || "", 
                ruta: ruta || "", // Tu esquema dice String?, no Array
                proyectoId 
            }
        });

        res.status(201).json(nueva);
    } catch (error) {
        console.error("❌ Error en Troncal:", error.message);
        res.status(500).json({ 
            error: "Error al crear troncal", 
            detalle: error.message,
            codigoPrisma: error.code 
        });
    }
};
// 2. OBTENER TODAS: Incluyendo datos del proyecto y conteo de mufas
exports.getTroncales = async (req, res) => {
    try {
        const lista = await prisma.troncal.findMany({
            include: { 
                proyecto: { select: { nombre: true } }, // Para saber a qué proyecto pertenece
                _count: { select: { mufas: true } } 
            },
            orderBy: { creadoEn: 'desc' }
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener troncales" });
    }
};

// 3. ACTUALIZAR: Ahora permite cambiar el buffer y proyecto si es necesario
exports.updateTroncal = async (req, res) => {
    const { id } = req.params;
    const { nombre, bufferColor, capacidad, descripcion, ruta, proyectoId } = req.body;

    try {
        const existe = await prisma.troncal.findUnique({ where: { id } });
        if (!existe) {
            return res.status(404).json({ error: "La troncal no existe." });
        }

        // Si se cambia la capacidad, recalculamos hilos libres (Lógica sensible)
        let nuevosHilosLibres = existe.hilosLibres;
        if (capacidad !== undefined) {
            const diferencia = parseInt(capacidad) - existe.capacidad;
            nuevosHilosLibres = existe.hilosLibres + diferencia;
        }

        const actualizada = await prisma.troncal.update({
            where: { id },
            data: {
                nombre: nombre || existe.nombre,
                bufferColor: bufferColor || existe.bufferColor,
                capacidad: capacidad !== undefined ? parseInt(capacidad) : existe.capacidad,
                hilosLibres: nuevosHilosLibres,
                descripcion: descripcion !== undefined ? descripcion : existe.descripcion,
                ruta: ruta || existe.ruta,
                proyectoId: proyectoId || existe.proyectoId
            }
        });

        res.json({ mensaje: "Troncal actualizada", data: actualizada });
    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar", detalle: error.message });
    }
};

// 4. ELIMINAR: Limpieza en cascada total
exports.deleteTroncal = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            // A. Identificar toda la infraestructura aguas abajo
            const mufas = await tx.mufa.findMany({ where: { troncalId: id } });
            const mufaIds = mufas.map(m => m.id);

            const cajas = await tx.caja.findMany({ where: { mufaId: { in: mufaIds } } });
            const cajaIds = cajas.map(c => c.id);

            // B. Borrar cables que nacen o mueren en esta infraestructura
            await tx.tramoCable.deleteMany({
                where: {
                    OR: [
                        { mufaOrigenId: { in: mufaIds } },
                        { cajaDestinoId: { in: cajaIds } }
                    ]
                }
            });

            // C. Borrar en orden jerárquico inverso
            await tx.caja.deleteMany({ where: { id: { in: cajaIds } } });
            await tx.mufa.deleteMany({ where: { id: { in: mufaIds } } });
            await tx.troncal.delete({ where: { id } });
        });

        res.json({ mensaje: "Troncal y toda su descendencia eliminada correctamente." });
    } catch (error) {
        console.error("🔥 ERROR EN BORRADO:", error);
        res.status(500).json({ error: "Fallo al eliminar infraestructura vinculada" });
    }
};