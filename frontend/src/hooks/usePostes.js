import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const usePostes = () => {
    const [postes, setPostes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostes = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await fvApi.get('/postes');
            setPostes(data.postes || data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar postes');
        } finally {
            setLoading(false);
        }
    }, []);

    const crearPoste = async (data) => {
        const res = await fvApi.post('/postes', data);
        setPostes(prev => [res.data.poste || res.data, ...prev]);
        return res.data;
    };

    const actualizarPoste = async (id, data) => {
        const res = await fvApi.put(`/postes/${id}`, data);
        setPostes(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
    };

    const eliminarPoste = async (id) => {
        await fvApi.delete(`/postes/${id}`);
        setPostes(prev => prev.filter(p => p.id !== id));
    };

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