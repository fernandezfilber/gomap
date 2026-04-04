import fvApi from '../api/fvApi';

export const useGestionRed = (reload) => {
    
    // Actualizar cualquier equipo (Mufa, Caja, Tramo)
    const actualizarElemento = async (tipo, id, data) => {
        try {
            await fvApi.put(`/${tipo}/${id}`, data);
            alert("✅ Actualizado con éxito");
            reload(); // Refresca el mapa
        } catch (error) {
            console.error(`Error al editar ${tipo}:`, error);
        }
    };

    // Eliminar con validación de cascada
    const eliminarElemento = async (tipo, id) => {
        const confirmar = window.confirm(`¿Estás seguro de eliminar este ${tipo}? Se borrarán las conexiones asociadas.`);
        if (!confirmar) return;

        try {
            await fvApi.delete(`/${tipo}/${id}`);
            alert("🗑️ Eliminado correctamente");
            reload();
        } catch (error) {
            console.error(`Error al eliminar ${tipo}:`, error);
        }
    };

    return { actualizarElemento, eliminarElemento };
};