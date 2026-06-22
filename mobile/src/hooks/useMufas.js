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
        try {
            const res = await fvApi.post('/mufas', data);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al crear mufa');
            }
            setMufas(prev => [res.data.mufa || res.data.data, ...prev]);
            return res.data.mufa || res.data.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al crear mufa';
            throw new Error(mensaje);
        }
    };

    const actualizarMufa = async (id, data) => {
        const res = await fvApi.put(`/mufas/${id}`, data);
        setMufas(prev => prev.map(m => m.id === id ? { ...m, ...(res.data.mufa || res.data.data || res.data) } : m));
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