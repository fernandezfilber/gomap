import { useState, useCallback } from 'react';

/**
 * Hook para gestionar el trazado de líneas de fibra óptica en el mapa.
 */
export const useDrawFiber = (onSaveCallback) => {
    const [puntos, setPuntos] = useState([]);
    const [trazando, setTrazando] = useState(false);
    const [color, setColor] = useState('#8b5cf6');

    // Inicia el proceso de dibujo
    const iniciarTrazo = () => {
        setPuntos([]);
        setTrazando(true);
    };

    // Agrega un punto (lat/lng) al trazo actual
    const agregarPunto = useCallback((latlng) => {
        setPuntos((prev) => [...prev, latlng]);
    }, []);

    // Procesa el guardado y limpia el estado local
    const guardar = async (detalles) => {
        if (puntos.length < 2) {
            alert("El trazo debe tener al menos 2 puntos.");
            return;
        }

        const nuevoTramo = {
            path: puntos.map(p => ({ lat: p.lat, lng: p.lng })),
            color,
            ...detalles
        };

        try {
            await onSaveCallback(nuevoTramo);
            setPuntos([]);
            setTrazando(false);
        } catch (error) {
            console.error("Error al guardar el trazo de fibra:", error);
        }
    };

    return { 
        puntos, 
        trazando, 
        setTrazando, 
        agregarPunto, 
        guardar, 
        color, 
        setColor, 
        iniciarTrazo, 
        setPuntos 
    };
};