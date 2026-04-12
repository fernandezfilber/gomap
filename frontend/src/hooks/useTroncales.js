import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useTroncales = () => {
    const [troncales, setTroncales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTroncales = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await fvApi.get('/troncales');
            setTroncales(data.troncales || data);
        } catch (err) {
            err
            setError('Error al cargar troncales');
        } finally {
            setLoading(false);
        }
    }, []);

    const crearTroncal = async (data) => {
        const res = await fvApi.post('/troncales', data);
        setTroncales(prev => [res.data.troncal || res.data, ...prev]);
        return res.data;
    };

    const actualizarTroncal = async (id, data) => {
        const res = await fvApi.put(`/troncales/${id}`, data);
        setTroncales(prev => prev.map(t => t.id === id ? res.data : t));
        return res.data;
    };

    const eliminarTroncal = async (id) => {
        await fvApi.delete(`/troncales/${id}`);
        setTroncales(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        fetchTroncales();
    }, [fetchTroncales]);

    return {
        troncales,
        loading,
        error,
        fetchTroncales,
        crearTroncal,
        actualizarTroncal,
        eliminarTroncal
    };
};

export default useTroncales;