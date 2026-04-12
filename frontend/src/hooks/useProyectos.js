import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProyectos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fvApi.get('/proyectos');
            setProyectos(data.proyectos || data);
            
            if (data.proyectos?.length === 1 && !proyectoSeleccionado) {
                setProyectoSeleccionado(data.proyectos[0]);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar proyectos');
        } finally {
            setLoading(false);
        }
    }, [proyectoSeleccionado]);

    const crearProyecto = async (nuevoProyecto) => {
        const { data } = await fvApi.post('/proyectos', nuevoProyecto);
        setProyectos(prev => [data.proyecto || data, ...prev]);
        return data;
    };

    const actualizarProyecto = async (id, datosActualizados) => {
        const { data } = await fvApi.put(`/proyectos/${id}`, datosActualizados);
        setProyectos(prev => prev.map(p => p.id === id ? data : p));
        if (proyectoSeleccionado?.id === id) setProyectoSeleccionado(data);
        return data;
    };

    const eliminarProyecto = async (id) => {
        await fvApi.delete(`/proyectos/${id}`);
        setProyectos(prev => prev.filter(p => p.id !== id));
        if (proyectoSeleccionado?.id === id) setProyectoSeleccionado(null);
    };

    useEffect(() => {
        fetchProyectos();
    }, [fetchProyectos]);

    return {
        proyectos,
        proyectoSeleccionado,
        setProyectoSeleccionado,
        loading,
        error,
        fetchProyectos,
        crearProyecto,
        actualizarProyecto,
        eliminarProyecto
    };
};

export default useProyectos;