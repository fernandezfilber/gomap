// src/hooks/useCajas.js
import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useCajas = (proyectoId = null) => {
    const [cajas, setCajas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ==================== FETCH ====================
    const fetchCajas = useCallback(async () => {
        if (!proyectoId) {
            setCajas([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await fvApi.get(`/cajas?proyectoId=${proyectoId}`);
            console.log("📡 API CAJAS RAW:", data);
            const nuevasCajas = Array.isArray(data.cajas) ? data.cajas : (Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
            setCajas(nuevasCajas);
        } catch (err) {
            console.error("Error fetching cajas:", err);
            setError(err.response?.data?.message || 'Error al cargar las cajas');
            setCajas([]);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // ==================== CREAR ====================
    const crearCaja = async (formData) => {
        try {
            const payload = {
                ...formData,
                proyectoId: proyectoId,           // Aseguramos que tenga proyecto
            };

            const res = await fvApi.post('/cajas', payload);

            if (!res.data.success) {
                throw new Error(res.data.message || 'Error al crear la caja');
            }

            const nuevaCaja = res.data.caja || res.data.data;

            // Mejor práctica: volver a cargar desde el servidor
            await fetchCajas();

            return nuevaCaja;
        } catch (error) {
            const mensaje = error.response?.data?.message || error.message || 'Error al crear caja';
            console.error("Error en crearCaja:", error);
            throw new Error(mensaje);
        }
    };

    // ==================== ACTUALIZAR ====================
    const actualizarCaja = async (id, data) => {
        try {
            const res = await fvApi.put(`/cajas/${id}`, data);
            
            setCajas(prev => 
                prev.map(c => c.id === id ? { ...c, ...(res.data.caja || res.data.data || res.data) } : c)
            );
            
            return res.data;
        } catch (error) {
            console.error("Error actualizando caja:", error);
            throw error;
        }
    };

    // ==================== ELIMINAR ====================
    const eliminarCaja = async (id) => {
        try {
            await fvApi.delete(`/cajas/${id}`);
            setCajas(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Error eliminando caja:", error);
            throw error;
        }
    };

    // ==================== AUTO FETCH ====================
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
        eliminarCaja,
    };
};

export default useCajas;