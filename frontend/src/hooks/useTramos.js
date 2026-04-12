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
            const payload = {
                nombre: datos.nombre || `Tramo-${Date.now().toString().slice(-6)}`,
                tipoCable: datos.tipoCable || "FIBRA",
                path: JSON.stringify(datos.path || []),   // Importante: enviar como string
                proyectoId: proyectoId || datos.proyectoId,
                posteInicioId: datos.posteInicioId,
                posteFinId: datos.posteFinId,
                mufaOrigenId: datos.mufaOrigenId,
                cajaDestinoId: datos.cajaDestinoId
            };

            const { data } = await fvApi.post('/tramos', payload);

            // Parsear path para usarlo inmediatamente en el mapa
            const nuevoTramo = {
                ...data,
                path: typeof data.path === 'string' ? JSON.parse(data.path) : data.path || []
            };

            setTramos(prev => [nuevoTramo, ...prev]);
            return nuevoTramo;
        } catch (error) {
            console.error("❌ Error al crear tramo:", error);
            throw error;
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
            await fvApi.delete(`/tramos/${id}`);
            setTramos(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("❌ Error al eliminar tramo:", error);
            throw error;
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