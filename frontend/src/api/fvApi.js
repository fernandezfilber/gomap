import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler';

const fvApi = axios.create({
    // Prioriza la variable de entorno, si no, usa localhost
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- INTERCEPTOR DE PETICIONES (Seguridad) ---
fvApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- INTERCEPTOR DE RESPUESTAS (Manejador de Errores) ---
fvApi.interceptors.response.use(
    (response) => response, 
    (error) => {
        // Centralizamos el error (401, 404, 500, etc.)
        handleGlobalError(error); 
        return Promise.reject(error);
    }
);

export default fvApi;