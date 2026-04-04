import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useCajas = (proyectoId) => {
    const [cajas, setCajas] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Traer todas las NAP del sector (Jicamarca/Chosica)
    const fetchCajas = useCallback(async () => {
        // Quitamos el 'if (!proyectoId) return;' para permitir vistas globales
        setLoading(true);
        try {
            const url = proyectoId ? `/cajas?proyectoId=${proyectoId}` : '/cajas';
            const { data } = await fvApi.get(url);
            
            setCajas(data);
            console.log("Cajas NAP cargadas:", data.length);
        } catch (error) {
            console.error("Error al obtener cajas desde toq.life");
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 🔥 AUTO-EJECUCIÓN: Se dispara al montar el componente o cambiar el proyecto
    useEffect(() => {
        fetchCajas();
    }, [fetchCajas]);

    // 2. CREAR: Registrar nueva Caja NAP (Distribución)
    const crearCaja = async (datos) => {
        try {
            const payload = {
                ...datos,
                proyectoId: proyectoId || datos.proyectoId,
                // Valores técnicos por defecto para la red
                puertosLibres: datos.puertosLibres || 16,
                colorHiloCaja: datos.colorHiloCaja || "Azul"
            };
            
            const { data } = await fvApi.post('/cajas', payload);
            
            // Refrescamos la lista para asegurar que el mapa se actualice
            fetchCajas(); 
            return data;
        } catch (error) {
            console.error("Error al registrar caja NAP");
            throw error;
        }
    };

    // 3. ACTUALIZAR: Mantenimiento o cambio de hilos
    const actualizarCaja = async (id, datosActualizados) => {
        try {
            const { data } = await fvApi.put(`/cajas/${id}`, datosActualizados);
            setCajas((prev) => 
                prev.map((c) => (c.id === id ? data : c))
            );
            return data;
        } catch (error) {
            console.error("Error al actualizar caja");
        }
    };

    // 4. ELIMINAR: Quitar caja del inventario
    const eliminarCaja = async (id) => {
        try {
            await fvApi.delete(`/cajas/${id}`);
            setCajas((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Error al eliminar caja");
        }
    };

    return {
        cajas,
        loading,
        fetchCajas,
        crearCaja,
        actualizarCaja,
        eliminarCaja
    };
};

export default useCajas;