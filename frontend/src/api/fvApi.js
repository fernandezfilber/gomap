import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler'; // <--- Importamos el manejador central

const fvApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- INTERCEPTOR DE PETICIONES ---
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

// --- INTERCEPTOR DE RESPUESTAS ---
fvApi.interceptors.response.use(
    (response) => response, 
    (error) => {
        // En lugar de hacer un switch gigante aquí, llamamos a nuestro manejador
        handleGlobalError(error); 
        
        return Promise.reject(error);
    }
);

export default fvApi;