import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler';

const fvApi = axios.create({
    // Si estás en producción usará toq.life, si no, tu local
    baseURL: import.meta.env.VITE_API_URL || 'https://toq.life/api',
    withCredentials: true,
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

// --- EMERGENCIA: Atrapa errores de Hostinger (500, 401, etc.) ---
fvApi.interceptors.response.use(
    (response) => response, 
    (error) => {
        handleGlobalError(error); 
        return Promise.reject(error);
    }
);

export default fvApi;