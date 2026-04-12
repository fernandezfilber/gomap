import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useClientes = (proyectoId = null) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClientes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = proyectoId 
                ? `/clientes?proyectoId=${proyectoId}` 
                : '/clientes';

            const { data } = await fvApi.get(url);
            setClientes(data.clientes || data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar clientes');
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    const crearCliente = async (data) => {
        const res = await fvApi.post('/clientes', data);
        setClientes(prev => [res.data.cliente || res.data, ...prev]);
        return res.data;
    };

    const actualizarCliente = async (id, data) => {
        const res = await fvApi.put(`/clientes/${id}`, data);
        setClientes(prev => prev.map(c => c.id === id ? res.data : c));
        return res.data;
    };

    const eliminarCliente = async (id) => {
        await fvApi.delete(`/clientes/${id}`);
        setClientes(prev => prev.filter(c => c.id !== id));
    };

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    return {
        clientes,
        loading,
        error,
        fetchClientes,
        crearCliente,
        actualizarCliente,
        eliminarCliente
    };
};

export default useClientes;