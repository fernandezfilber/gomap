// src/utils/errorHandler.js
import { toast } from 'react-hot-toast'; // O la librería que prefieras

export const handleGlobalError = (error) => {
    const message = error.response?.data?.mensaje || error.message || "Error desconocido";
    const status = error.response?.status;

    console.error(`[Forward Vision Error ${status}]:`, error);

    if (status === 401) {
        toast.error("Sesión expirada. Por favor, ingresa de nuevo.");
        // Lógica de logout aquí
    } else if (status === 403) {
        toast.error("No tienes permisos para realizar esta acción.");
    } else if (status >= 500) {
        toast.error("Error en el servidor de Chosica. Intente más tarde.");
    } else {
        toast.error(message);
    }
};