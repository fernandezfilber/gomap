// src/utils/errorHandler.js
import { toast } from 'react-hot-toast'; // O la librería que prefieras

export const handleGlobalError = (error) => {
    const message = error.response?.data?.message || error.response?.data?.mensaje || error.message || "Error desconocido";
    const status = error.response?.status;

    console.error(`[Forward Vision Error ${status}]:`, error);

    if (status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('proyectos');
        localStorage.removeItem('proyectoId');
        window.location.href = '/login';
        return;
    }

    if (status === 403) {
        toast.error("No tienes permisos para realizar esta acción.");
        return;
    }

    if (status >= 500) {
        toast.error("Error en el servidor. Intenta nuevamente más tarde.");
        return;
    }

    toast.error(message);
};