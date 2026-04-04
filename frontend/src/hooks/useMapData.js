import { useState, useEffect, useCallback, useRef } from 'react'; // Agregamos useRef
import { redService } from '../api/redService';

export const useMapData = () => {
    const [data, setData] = useState({ postes: [], tramos: [], troncales: [] });
    const isMounted = useRef(false); // Para controlar que solo cargue una vez

    const reload = useCallback(async () => {
        try {
            const [postes, tramos, troncales] = await Promise.all([
                redService.getPostes(),
                redService.getTramos(),
                redService.getTroncales()
            ]);
            setData({ postes, tramos, troncales });
        } catch (error) {
            console.error("Error al recargar datos del mapa:", error);
        }
    }, []);

    useEffect(() => {
        // Solo ejecutamos reload si es la primera vez que se monta
        if (!isMounted.current) {
            reload();
            isMounted.current = true;
        }
    }, [reload]);

    return { ...data, reload };
};