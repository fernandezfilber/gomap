import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useCajas = (proyectoId = null) => {
    const [cajas, setCajas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCajas = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = proyectoId 
                ? `/cajas?proyectoId=${proyectoId}` 
                : '/cajas';

            const { data } = await fvApi.get(url);
            setCajas(data.cajas || data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar cajas');
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    const crearCaja = async (data) => {
        const res = await fvApi.post('/cajas', data);
        setCajas(prev => [res.data.caja || res.data, ...prev]);
        return res.data;
    };

    const actualizarCaja = async (id, data) => {
        const res = await fvApi.put(`/cajas/${id}`, data);
        setCajas(prev => prev.map(c => c.id === id ? res.data : c));
        return res.data;
    };

    const eliminarCaja = async (id) => {
        await fvApi.delete(`/cajas/${id}`);
        setCajas(prev => prev.filter(c => c.id !== id));
    };

    useEffect(() => {
        fetchCajas();
    }, [fetchCajas]);

    return {
        cajas,
        loading,
        error,
        fetchCajas,
        crearCaja,
        actualizarCaja,
        eliminarCaja
    };
};

export default useCajas;