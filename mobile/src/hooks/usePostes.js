import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const usePostes = (proyectoId = null) => {
    const [postes, setPostes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = proyectoId 
                ? `/postes?proyectoId=${proyectoId}` 
                : '/postes';

            const { data } = await fvApi.get(url);
            const nuevosPostes = Array.isArray(data.postes) ? data.postes : (Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
            setPostes(nuevosPostes);
            
        } catch (err) {
            console.error("❌ Error en fetchPostes:", err);
            setError(err.response?.data?.message || 'Error al cargar postes');
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    const crearPoste = async (data) => {
        try {
            console.log("📤 Enviando nuevo poste:", data);
            const res = await fvApi.post('/postes', data);
            
            console.log("✅ Poste creado en backend:", res.data);
            
            // Mejor estrategia: recargar la lista completa en vez de update optimista
            await fetchPostes();
            
            return res.data.poste || res.data;
        } catch (error) {
            console.error("❌ Error al crear poste:", error.response?.data || error);
            throw error;
        }
    };

    const actualizarPoste = async (id, data) => {
        const res = await fvApi.put(`/postes/${id}`, data);
        await fetchPostes(); // Recargar lista
        return res.data;
    };

    const eliminarPoste = async (id) => {
        try {
            const res = await fvApi.delete(`/postes/${id}`);
            if (!res.data.success) {
                throw new Error(res.data.message || 'No se puede eliminar este poste');
            }
            await fetchPostes(); // Recargar lista
            return res.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al eliminar el poste';
            throw new Error(mensaje);
        }
    };

    // Carga inicial
    useEffect(() => {
        fetchPostes();
    }, [fetchPostes]);

    return {
        postes,
        loading,
        error,
        fetchPostes,
        crearPoste,
        actualizarPoste,
        eliminarPoste
    };
};

export default usePostes;