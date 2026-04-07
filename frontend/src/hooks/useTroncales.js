import { useState, useCallback, useEffect } from 'react';
import fvApi from '../api/fvApi';

const useTroncales = (proyectoId) => {
    const [troncales, setTroncales] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Traer troncales (con filtro opcional de proyecto)
    const fetchTroncales = useCallback(async () => {
        setLoading(true);
        try {
            // Si hay proyectoId, filtramos; si no, traemos todas para evitar el array vacío
            const url = proyectoId ? `/troncales?proyectoId=${proyectoId}` : '/troncales';
            const { data } = await fvApi.get(url);
            
            console.log("📡 [Hook Troncales] Datos cargados:", data);
            setTroncales(data);
        } catch (error) {
            console.error("❌ [Hook Troncales] Error al listar:", error);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 🔥 Disparador automático al cargar el hook
    useEffect(() => {
        fetchTroncales();
    }, [fetchTroncales]);

    // 2. CREAR: Nueva troncal
    const crearTroncal = async (datos) => {
        try {
            const payload = {
                ...datos,
                proyectoId,
                ruta: datos.ruta ? JSON.stringify(datos.ruta) : "[]"
            };
            const { data } = await fvApi.post('/troncales', payload);
            await fetchTroncales(); // Recargar lista real
            return data;
        } catch (error) {
            console.error("❌ Error al crear troncal:", error);
            throw error;
        }
    };

    // 3. ACTUALIZAR: Modificar nombre, buffer o capacidad
    const actualizarTroncal = async (id, datosActualizados) => {
        try {
            // Aseguramos que si se actualiza la ruta, sea un string válido
            const payload = {
                ...datosActualizados,
                ruta: datosActualizados.ruta ? JSON.stringify(datosActualizados.ruta) : undefined
            };
            
            const { data } = await fvApi.put(`/troncales/${id}`, payload);
            
            // Actualización optimista en el estado local
            setTroncales((prev) => 
                prev.map((t) => (t.id === id ? { ...t, ...data } : t))
            );
            return data;
        } catch (error) {
            console.error("❌ Error al actualizar troncal:", error);
            throw error;
        }
    };

    // 4. ELIMINAR: Quitar troncal del sistema
    const eliminarTroncal = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta Troncal? Se perderán las mufas asociadas.")) return;
        
        try {
            await fvApi.delete(`/troncales/${id}`);
            // Filtramos localmente para que desaparezca del UI de inmediato
            setTroncales((prev) => prev.filter((t) => t.id !== id));
            console.log(`✅ Troncal ${id} eliminada.`);
        } catch (error) {
            console.error("❌ Error al eliminar troncal:", error);
            alert("No se pudo eliminar: Revisa si tiene mufas activas.");
            throw error;
        }
    };

    return {
        troncales,
        loading,
        fetchTroncales,
        crearTroncal,
        actualizarTroncal,
        eliminarTroncal
    };
};

export default useTroncales;