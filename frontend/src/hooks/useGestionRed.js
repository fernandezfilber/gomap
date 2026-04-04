import fvApi from '../api/fvApi';
import { toast } from 'react-hot-toast'; // Opcional para mejores alertas

export const useGestionRed = (reload) => {
    
    // 1. Acciones Especiales (Crear Mufas/Cajas/Splitters)
    const ejecutarAccion = async (accion, payload) => {
        try {
            switch (accion) {
                case 'AGREGAR_MUFA':
                    await fvApi.post('/mufas', payload);
                    toast.success("Mufa agregada al poste");
                    break;
                case 'AGREGAR_CAJA':
                    await fvApi.post('/cajas', payload);
                    toast.success("Caja NAP instalada");
                    break;
                case 'SPLITTEAR_HILO':
                    // Payload: { mufaId, hiloEntrada, ratio }
                    await fvApi.post(`/mufas/${payload.mufaId}/split`, payload);
                    toast.success("Hilo dividido con éxito");
                    break;
                case 'ELIMINAR_MUFA':
                    await fvApi.delete(`/mufas/${payload}`);
                    toast.success("Mufa retirada");
                    break;
                default:
                    console.warn("Acción no reconocida");
            }
            reload();
        } catch (error) {
            console.error(`Error en acción ${accion}:`, error);
            toast.error("Error en la operación");
        }
    };

    // 2. Actualizar metadata de equipos existentes
    const actualizarElemento = async (tipo, id, data) => {
        try {
            await fvApi.put(`/${tipo}/${id}`, data);
            toast.success("✅ Datos actualizados");
            reload();
        } catch (error) {
            console.error(`Error al editar ${tipo}:`, error);
        }
    };

    // 3. Eliminar con validación
    const eliminarElemento = async (tipo, id) => {
        if (!window.confirm(`¿Seguro de eliminar este ${tipo}?`)) return;

        try {
            await fvApi.delete(`/${tipo}/${id}`);
            toast.success("🗑️ Registro eliminado");
            reload();
        } catch (error) {
            console.error(`Error al eliminar ${tipo}:`, error);
        }
    };

    return { actualizarElemento, eliminarElemento, ejecutarAccion };
};