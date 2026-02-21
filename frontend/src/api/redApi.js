import axios from 'axios';

// --- CONFIGURACIÓN INICIAL ---
const API = axios.create({ 
    // Si existe la variable de entorno, úsala; si no, usa localhost para desarrollo
    baseURL: import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api` 
        : 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- NUEVO: INTERCEPTOR DE PETICIÓN (Request) ---
// Se ejecuta ANTES de enviar la petición al servidor
API.interceptors.request.use(
    (config) => {
        // Obtenemos el valor exacto que vimos en la imagen
        const token = localStorage.getItem('token'); 
        
        if (token) {
            // Importante: El espacio después de 'Bearer ' es obligatorio
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("⚠️ No se encontró la clave 'token' en el almacenamiento local");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- INTERCEPTOR DE RESPUESTA (Depuración) ---
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("🚨 API Error Detail:", {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

// --- SERVICIOS ---
// 1. TRONCALES
export const getTroncales = () => API.get('/troncales');
export const crearTroncal = (data) => API.post('/troncales', data);
export const actualizarTroncal = (id, data) => API.put(`/troncales/${id}`, data);
export const eliminarTroncal = (id) => API.delete(`/troncales/${id}`);

// 2. MUFAS
export const getMufas = () => API.get('/mufas');
export const crearMufa = (data) => API.post('/mufas', data); 
export const actualizarMufa = (id, data) => API.put(`/mufas/${id}`, data);
export const eliminarMufa = (id) => API.delete(`/mufas/${id}`);

// 3. CAJAS NAP
export const getCajas = () => API.get('/cajas');
export const crearCaja = (data) => API.post('/cajas', data);
export const actualizarCaja = (id, data) => API.put(`/cajas/${id}`, data);
export const eliminarCaja = (id) => API.delete(`/cajas/${id}`);

// 🔥 NUEVA FUNCIÓN: Obtener hilos/salidas ocupadas de una mufa específica
export const getHilosOcupados = (mufaId) => API.get(`/cajas/mufas/${mufaId}/ocupados`);

// 4. RED Y FACTIBILIDAD
export const obtenerMapaRed = () => API.get('/red/mapa'); 
export const verificarFactibilidad = (data) => API.post('/red/factibilidad', data);

export default API;