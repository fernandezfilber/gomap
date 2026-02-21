import axios from "axios";

// --- CONFIGURACIÓN INICIAL ---
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR DE PETICIÓN (Request) ---
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Token agregado al header para:", config.url);
    }
    // Sin else → ya no sale el warning en cada petición

    return config;
  },
  (error) => Promise.reject(error),
);

// --- INTERCEPTOR DE RESPUESTA (solo para depuración) ---
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

// --- SERVICIOS (los que ya tenías) ---
export const getTroncales = () => API.get("/troncales");
export const crearTroncal = (data) => API.post("/troncales", data);
export const actualizarTroncal = (id, data) =>
  API.put(`/troncales/${id}`, data);
export const eliminarTroncal = (id) => API.delete(`/troncales/${id}`);

export const getMufas = () => API.get("/mufas");
export const crearMufa = (data) => API.post("/mufas", data);
export const actualizarMufa = (id, data) => API.put(`/mufas/${id}`, data);
export const eliminarMufa = (id) => API.delete(`/mufas/${id}`);

export const getCajas = () => API.get("/cajas");
export const crearCaja = (data) => API.post("/cajas", data);
export const actualizarCaja = (id, data) => API.put(`/cajas/${id}`, data);
export const eliminarCaja = (id) => API.delete(`/cajas/${id}`);

export const getHilosOcupados = (mufaId) =>
  API.get(`/cajas/mufas/${mufaId}/ocupados`);

export const obtenerMapaRed = () => API.get("/red/mapa");
export const verificarFactibilidad = (data) =>
  API.post("/red/factibilidad", data);

// ==================== AUTH - LOGIN ====================
export const loginUsuario = async (credentials) => {
  try {
    // <<< CAMBIA ESTA RUTA según tu backend >>>
    // Prueba primero con '/login' o '/auth/login'
    const response = await API.post('/auth/login', credentials);

    console.log("🔥 Respuesta del servidor (login):", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error.response?.data || error);
    throw error;
  }
};
export default API;
