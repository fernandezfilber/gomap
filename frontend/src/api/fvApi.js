import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler';

const rawUrl = import.meta.env.VITE_API_URL || '/api';

const fvApi = axios.create({
    baseURL: rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`,
    timeout: 30000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
});



fvApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);


fvApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            console.error('⏱️ Timeout - El backend no responde');
        }
        handleGlobalError(error);
        return Promise.reject(error);
    }
);

export default fvApi;