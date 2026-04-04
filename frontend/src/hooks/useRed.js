import { useState, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useRed = (proyectoId) => {
    const [mapaCompleto, setMapaCompleto] = useState(null);
    const [resultadoFactibilidad, setResultadoFactibilidad] = useState(null);
    const [loading, setLoading] = useState(false);

    // 1. OBTENER MAPA: Trae el árbol Troncales -> Mufas -> Cajas en un solo viaje
    const fetchMapaRed = useCallback(async () => {
        if (!proyectoId) return;
        setLoading(true);
        try {
            // Esta ruta es la que definiste: /api/redes/mapa
            const { data } = await fvApi.get(`/redes/mapa?proyectoId=${proyectoId}`);
            setMapaCompleto(data);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 2. VERIFICAR FACTIBILIDAD: ¿Hay cobertura en estas coordenadas?
    const verificarCobertura = async (latitud, longitud) => {
        setLoading(true);
        try {
            const { data } = await fvApi.post('/redes/factibilidad', {
                latitud,
                longitud,
                proyectoId
            });
            setResultadoFactibilidad(data);
            return data; // Devuelve la Caja NAP más cercana
        } catch (err) {
            console.error("Error al calcular factibilidad en el Nodo Chosica");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        mapaCompleto,
        resultadoFactibilidad,
        loading,
        fetchMapaRed,
        verificarCobertura
    };
};

export default useRed;