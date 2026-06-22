// src/utils/errorHandler.js
import { toast } from 'react-hot-toast'; // O la librería que prefieras

export const handleGlobalError = (error) => {
    const message = error.response?.data?.message || error.response?.data?.mensaje || error.message || "Error desconocido";
    const status = error.response?.status;

    console.error(`[GoMap Error ${status}]:`, error);

    const requestUrl = error.config?.url || '';
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register') || requestUrl.includes('/auth/registro-total');

    if (status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('proyectos');
        localStorage.removeItem('proyectoId');

        // No forzar redirección durante el intento de login/registro
        if (!isAuthRequest && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            window.location.href = '/login';
        }
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