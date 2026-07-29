const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const croquisController = {
  // Crear un nuevo croquis
  createCroquis: async (req, res) => {
    try {
      const { nombre, destinatario, lugar, datosGraficos } = req.body;
      const empresaId = req.user.empresaId;
      
      const croquis = await prisma.croquis.create({
        data: {
          nombre,
          destinatario,
          lugar,
          datosGraficos,
          empresaId,
          creadoPorId: req.user.id,
          actualizadoPorId: req.user.id
        }
      });
      
      res.status(201).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al crear croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
    }
  },

  // Obtener todos los croquis de una empresa
  getCroquisByEmpresa: async (req, res) => {
    try {
      const empresaId = req.user.empresaId;
      
      if (!empresaId) {
        return res.status(400).json({ success: false, message: 'Se requiere empresaId' });
      }

      const croquis = await prisma.croquis.findMany({
        where: { empresaId },
        orderBy: { creadoEn: 'desc' },
        include: {
          creadoPor: {
            select: { nombre: true, rol: true }
          }
        }
      });
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al obtener croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Obtener un croquis específico
  getCroquisById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const croquis = await prisma.croquis.findUnique({
        where: { id },
        include: {
          creadoPor: {
            select: { nombre: true, rol: true }
          }
        }
      });
      
      if (!croquis) {
        return res.status(404).json({ success: false, message: 'Croquis no encontrado' });
      }
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al obtener croquis por ID:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Actualizar un croquis (nombre, destinatario, o los gráficos)
  updateCroquis: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, destinatario, lugar, datosGraficos } = req.body;
      
      const croquis = await prisma.croquis.update({
        where: { id },
        data: {
          ...(nombre && { nombre }),
          ...(destinatario !== undefined && { destinatario }),
          ...(lugar !== undefined && { lugar }),
          ...(datosGraficos && { datosGraficos }),
          actualizadoPorId: req.user.id
        }
      });
      
      res.status(200).json({ success: true, croquis });
    } catch (error) {
      console.error('Error al actualizar croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  // Eliminar un croquis
  deleteCroquis: async (req, res) => {
    try {
      const { id } = req.params;
      
      await prisma.croquis.delete({
        where: { id }
      });
      
      res.status(200).json({ success: true, message: 'Croquis eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar croquis:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  getCajasCercanasEnCroquis: async (req, res) => {
    try {
        const empresaId = req.user.empresaId;
        const lat = parseFloat(req.query.latitud);
        const lng = parseFloat(req.query.longitud);
        const radioMetros = parseInt(req.query.radio) || 500;
        
        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ success: false, message: 'Coordenadas inválidas' });
        }

        const allCroquis = await prisma.croquis.findMany({
            where: { empresaId },
            select: { id: true, nombre: true, datosGraficos: true }
        });

        const R = 6371000;
        const toRad = (d) => d * Math.PI / 180;
        const haversine = (lat1, lon1, lat2, lon2) => {
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        };

        const resultados = [];
        for (const croquis of allCroquis) {
            const nodos = croquis.datosGraficos?.nodos || [];
            for (const nodo of nodos) {
                if (nodo.type === 'caja') {
                    const dist = haversine(lat, lng, nodo.lat, nodo.lng);
                    if (dist <= radioMetros) {
                        resultados.push({
                            croquisId: croquis.id,
                            croquisNombre: croquis.nombre,
                            nodoId: nodo.id,
                            label: nodo.label,
                            lat: nodo.lat,
                            lng: nodo.lng,
                            distancia_metros: Math.round(dist * 100) / 100
                        });
                    }
                }
            }
        }

        resultados.sort((a, b) => a.distancia_metros - b.distancia_metros);
        res.json({ success: true, cajas: resultados.slice(0, 20) });
    } catch (error) {
        console.error('Error getCajasCercanasEnCroquis:', error);
        res.status(500).json({ success: false, message: 'Error buscando cajas en croquis' });
    }
  },

  importarCroquis: async (req, res) => {
    try {
        const { id } = req.params;
        const { proyectoId } = req.body;
        const empresaId = req.user.empresaId;

        const croquis = await prisma.croquis.findUnique({ where: { id } });
        if (!croquis || croquis.empresaId !== empresaId) {
            return res.status(404).json({ success: false, message: 'Croquis no encontrado' });
        }

        const proyecto = await prisma.proyecto.findFirst({ where: { id: proyectoId, empresaId } });
        if (!proyecto) {
            return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
        }

        const nodos = croquis.datosGraficos?.nodos || [];
        const tramosCroquis = croquis.datosGraficos?.tramos || [];

        // Obtener o crear troncal principal para las mufas
        let troncalPrincipal = await prisma.troncal.findFirst({
            where: { proyectoId, nombre: { contains: 'Principal' } }
        });

        if (!troncalPrincipal) {
            troncalPrincipal = await prisma.troncal.findFirst({
                where: { proyectoId }
            });
        }

        if (!troncalPrincipal) {
            return res.status(400).json({ 
                success: false, 
                message: 'El proyecto no tiene un troncal configurado. Por favor, crea un troncal primero.' 
            });
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const nodoToPosteId = {};
            const postePorCoordenada = new Map();
            let postesCreados = 0;
            let cajasCreadas = 0;
            let mufasCreadas = 0;
            let tramosCreados = 0;

            const coordKey = (lat, lng) => `${Number(lat).toFixed(6)}|${Number(lng).toFixed(6)}`;

            const obtenerOCrearPoste = async (lat, lng) => {
                const key = coordKey(lat, lng);
                const posteExistenteId = postePorCoordenada.get(key);
                if (posteExistenteId) {
                    return { posteId: posteExistenteId, creado: false };
                }

                const suffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
                const poste = await tx.poste.create({
                    data: {
                        codigo: `P-IMP-${suffix}`,
                        latitud: Number(lat),
                        longitud: Number(lng),
                        tipo: 'IMPORTADO',
                        proyectoId
                    }
                });

                postePorCoordenada.set(key, poste.id);
                postesCreados++;
                return { posteId: poste.id, creado: true };
            };

            // Crear o reutilizar postes para cada nodo del croquis y asociar cajas/mufas
            for (const nodo of nodos) {
                const { posteId } = await obtenerOCrearPoste(nodo.lat, nodo.lng);
                nodoToPosteId[nodo.id] = posteId;

                if (nodo.type === 'caja') {
                    const suffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
                    const codigoCaja = nodo.label || `CAJA-IMP-${suffix}`;
                    const existe = await tx.caja.findFirst({ where: { codigo: codigoCaja } });
                    const codigoFinal = existe ? `${codigoCaja}-${suffix}` : codigoCaja;
                    
                    await tx.caja.create({
                        data: {
                            codigo: codigoFinal,
                            latitud: nodo.lat,
                            longitud: nodo.lng,
                            posteId,
                            capacidadTotal: 16,
                            puertosLibres: 16
                        }
                    });
                    cajasCreadas++;
                } else if (nodo.type === 'mufa') {
                    const suffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
                    const codigoMufa = nodo.label || `MUFA-IMP-${suffix}`;
                    const existe = await tx.mufa.findFirst({ where: { codigo: codigoMufa } });
                    const codigoFinal = existe ? `${codigoMufa}-${suffix}` : codigoMufa;

                    await tx.mufa.create({
                        data: {
                            codigo: codigoFinal,
                            latitud: nodo.lat,
                            longitud: nodo.lng,
                            posteId,
                            troncalId: troncalPrincipal.id
                        }
                    });
                    mufasCreadas++;
                }
            }

            // Crear tramos enlazados a postes en los extremos del recorrido
            for (const tramo of tramosCroquis) {
                if (tramo.path && tramo.path.length >= 2) {
                    const [inicio, fin] = tramo.path;
                    const { posteId: posteInicioId } = await obtenerOCrearPoste(inicio[0], inicio[1]);
                    const { posteId: posteFinId } = await obtenerOCrearPoste(fin[0], fin[1]);

                    await tx.tramoCable.create({
                        data: {
                            nombre: tramo.label || 'Tramo Importado',
                            path: JSON.stringify(tramo.path),
                            colorVisual: tramo.color || '#8b5cf6',
                            proyectoId,
                            capacidadHilos: 48,
                            posteInicioId,
                            posteFinId
                        }
                    });
                    tramosCreados++;
                }
            }

            return { postesCreados, cajasCreadas, mufasCreadas, tramosCreados };
        });

        res.json({ 
            success: true, 
            message: `Importación exitosa: ${resultado.postesCreados} postes, ${resultado.cajasCreadas} cajas, ${resultado.mufasCreadas} mufas, ${resultado.tramosCreados} tramos`,
            data: resultado 
        });
    } catch (error) {
        console.error('Error importarCroquis:', error);
        res.status(500).json({ success: false, message: error.message || 'Error al importar croquis' });
    }
  }
};

module.exports = croquisController;
