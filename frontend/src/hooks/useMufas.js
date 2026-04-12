import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useMufas = (proyectoId = null) => {
    const [mufas, setMufas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMufas = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = proyectoId 
                ? `/mufas?proyectoId=${proyectoId}` 
                : '/mufas';

            const { data } = await fvApi.get(url);
            setMufas(data.mufas || data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar mufas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    const crearMufa = async (data) => {
        const res = await fvApi.post('/mufas', data);
        setMufas(prev => [res.data.mufa || res.data, ...prev]);
        return res.data;
    };

    const actualizarMufa = async (id, data) => {
        const res = await fvApi.put(`/mufas/${id}`, data);
        setMufas(prev => prev.map(m => m.id === id ? res.data : m));
        return res.data;
    };

    const eliminarMufa = async (id) => {
        await fvApi.delete(`/mufas/${id}`);
        setMufas(prev => prev.filter(m => m.id !== id));
    };

    useEffect(() => {
        fetchMufas();
    }, [fetchMufas]);

    return {
        mufas,
        loading,
        error,
        fetchMufas,
        crearMufa,
        actualizarMufa,
        eliminarMufa
    };
};

export default useMufas;