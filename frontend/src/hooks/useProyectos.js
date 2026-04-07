import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Trae todos los sectores (Jicamarca, Chosica, etc.)
    const fetchProyectos = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await fvApi.get('/proyectos');
            setProyectos(data);
            
            // Auto-selección: Si solo hay uno, lo marcamos como activo
            if (data.length === 1 && !proyectoSeleccionado) {
                setProyectoSeleccionado(data[0]);
            }
        } finally {
            setLoading(false);
        }
    }, [proyectoSeleccionado]);

    // 2. CREAR: Registra un nuevo sector de red
// En src/hooks/useProyectos.js
const crearProyecto = async (nuevoProyecto) => {
    try {
        const { data } = await fvApi.post('/proyectos', nuevoProyecto);
        // Actualizamos la lista local para que aparezca en el select del Sidebar
        setProyectos([...proyectos, data]);
        return data;
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        throw error;
    }
};
    // 3. ACTUALIZAR: Cambia nombre o descripción (Limpio de avisos ESLint)
    const actualizarProyecto = async (id, datosActualizados) => {
        const { data } = await fvApi.put(`/proyectos/${id}`, datosActualizados);
        
        setProyectos((prev) => 
            prev.map((p) => (p.id === id ? data : p))
        );
        
        if (proyectoSeleccionado?.id === id) {
            setProyectoSeleccionado(data);
        }
        return data;
    };

    // 4. ELIMINAR: Borra el sector y toda su infraestructura vinculada
    const eliminarProyecto = async (id) => {
        await fvApi.delete(`/proyectos/${id}`);
        
        setProyectos((prev) => prev.filter((p) => p.id !== id));
        
        if (proyectoSeleccionado?.id === id) {
            setProyectoSeleccionado(null);
        }
    };

    // Ejecución inicial al cargar la App
    useEffect(() => {
        fetchProyectos();
    }, [fetchProyectos]);

    return {
        proyectos,
        proyectoSeleccionado,
        setProyectoSeleccionado,
        fetchProyectos,
        crearProyecto,
        actualizarProyecto,
        eliminarProyecto,
        loading
    };
};

export default useProyectos;