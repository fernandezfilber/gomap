import { useState, useEffect } from 'react';
import fvApi from '../api/fvApi';

export const useEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmpresas = async () => {
        try {
            setLoading(true);
            const res = await fvApi.get('/empresas');
            setEmpresas(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar empresas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createEmpresa = async (data) => {
        const res = await fvApi.post('/empresas', data);
        setEmpresas(prev => [res.data, ...prev]);
        return res.data;
    };

    const updateEmpresa = async (id, data) => {
        const res = await fvApi.put(`/empresas/${id}`, data);
        setEmpresas(prev => prev.map(e => e.id === id ? res.data : e));
        return res.data;
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    return {
        empresas,
        loading,
        error,
        fetchEmpresas,
        createEmpresa,
        updateEmpresa
    };
};