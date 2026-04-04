import { useState, useCallback, useEffect } from 'react'; // Añadimos useEffect
import fvApi from '../api/fvApi';

const usePostes = (proyectoId) => {
    const [postes, setPostes] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Ahora es más flexible
    const fetchPostes = useCallback(async () => {
        // Quitamos el 'if (!proyectoId) return;' para que pueda cargar datos globales
        setLoading(true);
        try {
            // Si hay proyectoId lo mandamos en la URL, si no, pedimos la ruta limpia
            const url = proyectoId ? `/postes?proyectoId=${proyectoId}` : '/postes';
            const { data } = await fvApi.get(url);
            
            console.log("Datos recibidos en el Hook:", data.length); 
            setPostes(data);
        } catch (error) {
            console.error("Error al traer postes:", error);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 🔥 CRÍTICO: El hook debe dispararse solo al cargar o cambiar el proyecto
    useEffect(() => {
        fetchPostes();
    }, [fetchPostes]);

    // 2. CREAR
    const crearPoste = async (datos) => {
        const payload = {
            ...datos,
            proyectoId: proyectoId || datos.proyectoId, // Aseguramos que guarde el ID
            altura: datos.altura || "8m",
            tipo: datos.tipo || "CONCRETO"
        };
        
        const { data } = await fvApi.post('/postes', payload);
        // Refrescamos la lista completa para asegurar sincronización
        fetchPostes(); 
        return data;
    };

    // ... (Resto de funciones: actualizarPoste, eliminarPoste se mantienen igual)

    return {
        postes,
        loading,
        fetchPostes,
        crearPoste
    };
};

export default usePostes;