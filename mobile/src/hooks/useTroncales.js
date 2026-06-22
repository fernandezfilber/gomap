import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useTroncales = (proyectoId = null) => {
    const [troncales, setTroncales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTroncales = useCallback(async () => {
        setLoading(true);
        try {
            const url = proyectoId 
                ? `/troncales?proyectoId=${proyectoId}` 
                : '/troncales';
            
            const { data } = await fvApi.get(url);
            setTroncales(data.troncales || data);
        } catch (err) {
            console.error('Error al cargar troncales:', err);
            setError('Error al cargar troncales');
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    const crearTroncal = async (data) => {
        try {
            const res = await fvApi.post('/troncales', data);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al crear troncal');
            }
            setTroncales(prev => [res.data.troncal || res.data.data, ...prev]);
            return res.data.troncal || res.data.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al crear troncal';
            throw new Error(mensaje);
        }
    };

    const actualizarTroncal = async (id, data) => {
        try {
            const res = await fvApi.put(`/troncales/${id}`, data);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al actualizar troncal');
            }
            setTroncales(prev => prev.map(t => t.id === id ? (res.data.troncal || res.data.data) : t));
            return res.data.troncal || res.data.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al actualizar troncal';
            throw new Error(mensaje);
        }
    };

    const eliminarTroncal = async (id) => {
        try {
            const res = await fvApi.delete(`/troncales/${id}`);
            if (!res.data.success) {
                throw new Error(res.data.message || 'No se puede eliminar esta troncal');
            }
            setTroncales(prev => prev.filter(t => t.id !== id));
            return res.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al eliminar troncal';
            throw new Error(mensaje);
        }
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