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
        try {
            const res = await fvApi.post('/clientes', data);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al crear cliente');
            }
            setClientes(prev => [res.data.cliente || res.data.data, ...prev]);
            return res.data.cliente || res.data.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al crear cliente';
            throw new Error(mensaje);
        }
    };

    const eliminarCliente = async (id) => {
        try {
            const res = await fvApi.delete(`/clientes/${id}`);
            if (!res.data.success) {
                throw new Error(res.data.message || 'No se puede eliminar este cliente');
            }
            setClientes(prev => prev.filter(c => c.id !== id));
            return res.data;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al eliminar cliente';
            throw new Error(mensaje);
        }
    };

    const actualizarCliente = async (id, data) => {
        try {
            const res = await fvApi.put(`/clientes/${id}`, data);
            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al actualizar el cliente');
            }
            setClientes(prev => prev.map(cliente => cliente.id === id ? res.data.cliente : cliente));
            return res.data.cliente;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al actualizar cliente';
            throw new Error(mensaje);
        }
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