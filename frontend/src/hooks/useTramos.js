import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useTramos = (proyectoId) => {
    const [tramos, setTramos] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Carga segura de cables
    const fetchTramos = useCallback(async () => {
        setLoading(true);
        try {
            const url = proyectoId ? `/tramos?proyectoId=${proyectoId}` : '/tramos';
            const { data } = await fvApi.get(url);
            
            // 🛡️ FILTRO DE SEGURIDAD: Evita el Error 500 por datos mal formados
            const tramosProcesados = data.map(t => {
                let pathLimpio = [];
                try {
                    // Si el path es un String de la DB, lo convertimos a Array
                    if (typeof t.path === 'string') {
                        pathLimpio = JSON.parse(t.path);
                    } else if (Array.isArray(t.path)) {
                        pathLimpio = t.path;
                    }
                } catch (e) {
                    console.error("Error en formato de path para tramo:", t.id);
                    pathLimpio = []; // Fallback para no romper el mapa
                }
                return { ...t, path: pathLimpio };
            }).filter(t => t.path.length > 0); // Solo mostramos los que tienen puntos válidos
            
            setTramos(tramosProcesados);
            console.log("Cables (tramos) visualizados:", tramosProcesados.length);
        } catch (err) {
            console.error("Error 500 detectado: El servidor tiene problemas con la tabla de tramos.");
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 🔥 EJECUCIÓN AUTOMÁTICA
    useEffect(() => {
        fetchTramos();
    }, [fetchTramos]);

    // 2. CREAR: Registro de cableado en Jicamarca
    const crearTramo = async (datos) => {
        try {
            const payload = {
                nombre: datos.nombre || `Tramo-${Date.now()}`,
                tipo: datos.tipo || "FIBRA_ADSS",
                // CRÍTICO: MySQL necesita el path como STRING
                path: JSON.stringify(datos.path || []),
                proyectoId: proyectoId || datos.proyectoId,
                estado: "OPERATIVO"
            };
            
            const { data } = await fvApi.post('/tramos', payload);
            
            // Parseamos la respuesta para que React lo dibuje al instante
            const nuevoTramo = { 
                ...data, 
                path: typeof data.path === 'string' ? JSON.parse(data.path) : data.path 
            };
            
            setTramos((prev) => [nuevoTramo, ...prev]);
            return nuevoTramo;
        } catch (error) {
            console.error("Error al guardar el nuevo cableado.");
            throw error;
        }
    };

    // 3. ELIMINAR
    const eliminarTramo = async (id) => {
        try {
            await fvApi.delete(`/tramos/${id}`);
            setTramos((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("No se pudo eliminar el tramo seleccionado.");
        }
    };

    return {
        tramos,
        loading,
        fetchTramos,
        crearTramo,
        eliminarTramo
    };
};

export default useTramos;