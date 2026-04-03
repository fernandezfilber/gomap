import { useState, useEffect } from 'react';
import fvApi from '../api/fvApi';

export const useFetchRed = () => {
    const [infraestructura, setInfraestructura] = useState({
        postes: [],
        tramos: [],
        mufas: [],
        cajas: [],
        troncales: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            // Llamamos al endpoint maestro que creamos en el Backend
            const { data } = await fvApi.get('/red/mapa'); 
            
            setInfraestructura(data);
            setError(null);
        } catch (err) {
            err
            setError("No se pudo cargar la red de fibra.");
        } finally {
            setLoading(false);
        }
    };

    // Se ejecuta una sola vez al abrir el mapa
    useEffect(() => {
        cargarDatos();
    }, []);

    return { infraestructura, loading, error, recargar: cargarDatos };
};