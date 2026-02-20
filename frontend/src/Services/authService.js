import API from '../api/redApi';

export const loginUsuario = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        if (response.data.token) {
            // Guardamos el token y datos básicos para persistencia
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al conectar con el servidor";
    }
};