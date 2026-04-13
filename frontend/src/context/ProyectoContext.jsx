import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const ProyectoContext = createContext(null);

export const ProyectosProvider = ({ children }) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProyectos = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await fvApi.get('/proyectos');
            const lista = data.proyectos || data;
            setProyectos(lista);

            const proyectoGuardado = window.localStorage.getItem('proyectoId');
            const proyectoEncontrado = proyectoGuardado ? lista.find(p => p.id === proyectoGuardado) : null;

            if (proyectoEncontrado) {
                setProyectoSeleccionado(proyectoEncontrado);
            } else if (lista.length === 1) {
                setProyectoSeleccionado(lista[0]);
                window.localStorage.setItem('proyectoId', lista[0].id);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar proyectos');
            console.error('Error al cargar proyectos:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const crearProyecto = async (nuevoProyecto) => {
        const { data } = await fvApi.post('/proyectos', nuevoProyecto);
        const proyectoCreado = data.proyecto || data;
        setProyectos(prev => [proyectoCreado, ...prev]);
        setProyectoSeleccionado(proyectoCreado);
        window.localStorage.setItem('proyectoId', proyectoCreado.id);
        return proyectoCreado;
    };

    const actualizarProyecto = async (id, datos) => {
        const { data } = await fvApi.put(`/proyectos/${id}`, datos);
        const proyectoActualizado = data.proyecto || data;
        setProyectos(prev => prev.map(p => p.id === id ? proyectoActualizado : p));
        if (proyectoSeleccionado?.id === id) {
            setProyectoSeleccionado(proyectoActualizado);
            window.localStorage.setItem('proyectoId', proyectoActualizado.id);
        }
        return proyectoActualizado;
    };

    const eliminarProyecto = async (id) => {
        await fvApi.delete(`/proyectos/${id}`);
        setProyectos(prev => prev.filter(p => p.id !== id));
        if (proyectoSeleccionado?.id === id) {
            setProyectoSeleccionado(null);
            window.localStorage.removeItem('proyectoId');
        }
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) return;
        fetchProyectos();
    }, [fetchProyectos]);

    return (
        <ProyectoContext.Provider value={{
            proyectos,
            proyectoSeleccionado,
            setProyectoSeleccionado,
            loading,
            error,
            fetchProyectos,
            crearProyecto,
            actualizarProyecto,
            eliminarProyecto
        }}>
            {children}
        </ProyectoContext.Provider>
    );
};

export const useProyectoContext = () => {
    const context = useContext(ProyectoContext);
    if (!context) {
        throw new Error('useProyectoContext debe llamarse dentro de ProyectosProvider');
    }
    return context;
};
