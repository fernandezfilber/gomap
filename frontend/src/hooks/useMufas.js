import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useMufas = (proyectoId) => {
    const [mufas, setMufas] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Traer puntos de empalme/mufas de Jicamarca
    const fetchMufas = useCallback(async () => {
        // Quitamos el bloqueo para permitir carga global si no hay ID seleccionado
        setLoading(true);
        try {
            const url = proyectoId ? `/mufas?proyectoId=${proyectoId}` : '/mufas';
            const { data } = await fvApi.get(url);
            
            setMufas(data);
            console.log("Mufas (empalmes) cargadas:", data.length);
        } catch (error) {
            console.error("Error al cargar mufas en toq.life");
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 🔥 AUTO-EJECUCIÓN: Crucial para que aparezcan al montar el componente
    useEffect(() => {
        fetchMufas();
    }, [fetchMufas]);

    // 2. CREAR: Registrar nuevo punto de empalme/splitter
    const crearMufa = async (datos) => {
        try {
            const payload = {
                ...datos,
                proyectoId: proyectoId || datos.proyectoId,
                // Valores por defecto técnicos para Forward Vision
                ratioSplitteo: datos.ratioSplitteo || "1:16",
                hilosDisponibles: datos.hilosDisponibles || 16
            };
            
            const { data } = await fvApi.post('/mufas', payload);
            
            // Actualizamos la lista completa para asegurar sincronía con el mapa
            fetchMufas(); 
            return data;
        } catch (error) {
            console.error("Error al registrar mufa");
            throw error;
        }
    };

    // 3. ACTUALIZAR: Cambiar puerto de entrada o ratio
    const actualizarMufa = async (id, datosActualizados) => {
        try {
            const { data } = await fvApi.put(`/mufas/${id}`, datosActualizados);
            setMufas((prev) => 
                prev.map((m) => (m.id === id ? data : m))
            );
            return data;
        } catch (error) {
            console.error("Error al actualizar datos de la mufa");
        }
    };

    // 4. ELIMINAR: Quitar mufa del sistema
    const eliminarMufa = async (id) => {
        try {
            await fvApi.delete(`/mufas/${id}`);
            setMufas((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Error al eliminar mufa");
        }
    };

    return {
        mufas,
        loading,
        fetchMufas,
        crearMufa,
        actualizarMufa,
        eliminarMufa
    };
};

export default useMufas;