import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler';

const fvApi = axios.create({
    // Prioridad total a tu nueva IP del VPS configurada en el .env
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: false, // Cambiado a false para evitar bloqueos por falta de HTTPS
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- SEGURIDAD: Inyecta el Token en cada llamada ---
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

// --- MANEJO DE ERRORES: Ahora detectará errores de tu propio VPS ---
fvApi.interceptors.response.use(
    (response) => response, 
    (error) => {
        handleGlobalError(error); 
        return Promise.reject(error);
    }
);

export default fvApi;