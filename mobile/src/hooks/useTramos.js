import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useTramos = (proyectoId = null) => {
    const [tramos, setTramos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ====================== OBTENER TRAMOS ======================
    const fetchTramos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = proyectoId 
                ? `/tramos?proyectoId=${proyectoId}` 
                : '/tramos';

            const { data } = await fvApi.get(url);

            // Procesamiento seguro del campo 'path'
            const tramosProcesados = (data.tramos || data).map(tramo => {
                let pathArray = [];
                try {
                    if (typeof tramo.path === 'string') {
                        pathArray = JSON.parse(tramo.path);
                    } else if (Array.isArray(tramo.path)) {
                        pathArray = tramo.path;
                    }
                } catch (e) {
                    e
                    console.warn(`Error parseando path del tramo ${tramo.id}`);
                    pathArray = [];
                }

                return { ...tramo, path: pathArray };
            });

            setTramos(tramosProcesados);
        } catch (err) {
            const mensaje = err.response?.data?.message || 'Error al cargar los tramos';
            setError(mensaje);
            console.error("❌ Error en fetchTramos:", err);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // ====================== CREAR TRAMO ======================
    const crearTramo = async (datos) => {
        try {
            // ✅ VALIDACIÓN: Path no vacío
            if (!datos.path || (Array.isArray(datos.path) && datos.path.length === 0)) {
                throw new Error('La ruta del tramo (path) no puede estar vacía');
            }

            // ✅ VALIDACIÓN: Debe tener POSTES O MUFA→CAJA
            const tienePostes = Boolean(datos.posteInicioId && datos.posteFinId);
            const tieneMufaCaja = Boolean(datos.mufaOrigenId && datos.cajaDestinoId);

            if (!tienePostes && !tieneMufaCaja) {
                throw new Error('El tramo debe tener (posteInicio + posteFin) O (mufaOrigen + cajaDestino)');
            }

            const payload = {
                nombre: datos.nombre || `Tramo-${Date.now().toString().slice(-6)}`,
                tipoCable: datos.tipoCable || "FIBRA",
                path: JSON.stringify(datos.path || []),   // Importante: enviar como string
                colorVisual: datos.colorVisual || '#ef4444',
                proyectoId: proyectoId || datos.proyectoId,
                posteInicioId: datos.posteInicioId,
                posteFinId: datos.posteFinId,
                mufaOrigenId: datos.mufaOrigenId,
                cajaDestinoId: datos.cajaDestinoId
            };

            const { data } = await fvApi.post('/tramos', payload);
            if (!data.success) {
                throw new Error(data.message || 'Error al crear tramo');
            }

            const tramoCreado = data.tramo || data;

            // Parsear path para usarlo inmediatamente en el mapa
            const nuevoTramo = {
                ...tramoCreado,
                path: typeof tramoCreado.path === 'string' ? JSON.parse(tramoCreado.path) : tramoCreado.path || []
            };

            setTramos(prev => [nuevoTramo, ...prev]);
            return nuevoTramo;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al crear tramo';
            throw new Error(mensaje);
        }
    };

    // ====================== ACTUALIZAR TRAMO ======================
    const actualizarTramo = async (id, datos) => {
        try {
            const payload = {
                ...datos,
                path: datos.path ? JSON.stringify(datos.path) : undefined
            };

            const { data } = await fvApi.put(`/tramos/${id}`, payload);

            setTramos(prev => prev.map(t => 
                t.id === id 
                    ? { ...data, path: typeof data.path === 'string' ? JSON.parse(data.path) : data.path } 
                    : t
            ));

            return data;
        } catch (error) {
            console.error("❌ Error al actualizar tramo:", error);
            throw error;
        }
    };

    // ====================== ELIMINAR TRAMO ======================
    const eliminarTramo = async (id) => {
        try {
            const res = await fvApi.delete(`/tramos/${id}`);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al eliminar tramo');
            }
            setTramos(prev => prev.filter(t => t.id !== id));
            return res.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al eliminar tramo';
            throw new Error(mensaje);
        }
    };

    // Carga inicial
    useEffect(() => {
        fetchTramos();
    }, [fetchTramos]);

    return {
        tramos,
        loading,
        error,
        fetchTramos,
        crearTramo,
        actualizarTramo,
        eliminarTramo
    };
};

export default useTramos;