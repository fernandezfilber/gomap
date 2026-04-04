import { useState, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useTroncales = (proyectoId) => {
    const [troncales, setTroncales] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Traer troncales del proyecto activo
    const fetchTroncales = useCallback(async () => {
        if (!proyectoId) return;
        setLoading(true);
        try {
            const { data } = await fvApi.get(`/troncales?proyectoId=${proyectoId}`);
            setTroncales(data);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 2. CREAR: Registrar nueva manguera de fibra
    const crearTroncal = async (datos) => {
        // Aseguramos que la ruta sea un string JSON para evitar el error 4025 de MySQL
        const payload = {
            ...datos,
            proyectoId,
            ruta: datos.ruta ? JSON.stringify(datos.ruta) : "[]"
        };
        
        const { data } = await fvApi.post('/troncales', payload);
        setTroncales((prev) => [data, ...prev]);
        return data;
    };

    // 3. ACTUALIZAR: Cambiar color de buffer o descripción
    const actualizarTroncal = async (id, datosActualizados) => {
        const { data } = await fvApi.put(`/troncales/${id}`, datosActualizados);
        setTroncales((prev) => 
            prev.map((t) => (t.id === id ? data : t))
        );
        return data;
    };

    // 4. ELIMINAR
    const eliminarTroncal = async (id) => {
        await fvApi.delete(`/troncales/${id}`);
        setTroncales((prev) => prev.filter((t) => t.id !== id));
    };

    return {
        troncales,
        loading,
        fetchTroncales,
        crearTroncal,
        actualizarTroncal,
        eliminarTroncal
    };
};

export default useTroncales;