import { useCallback } from 'react';
import fvApi from '../api/fvApi';

/**
 * Hook para gestionar la creación de activos de red (Mufas y Cajas)
 * en postes específicos del mapa.
 */
export const useEquipos = (reload) => {

    const agregarEquipo = useCallback(async (tipo, datos) => {
        // tipo: 'mufas' o 'cajas'
        // datos: { posteId, troncalId, etc }
        
        try {
            const endpoint = `/${tipo}`;
            const response = await fvApi.post(endpoint, datos);
            
            if (response.data) {
                alert(`✅ ${tipo === 'mufas' ? 'Mufa' : 'Caja'} creada con éxito.`);
                if (reload) reload(); // Refresca el mapa para mostrar el nuevo equipo
            }
        } catch (error) {
            console.error(`Error al crear ${tipo}:`, error);
            // El errorHandler global ya se encarga de las alertas, 
            // pero aquí podrías manejar lógica específica si falla.
        }
    }, [reload]);

    return { agregarEquipo };
};