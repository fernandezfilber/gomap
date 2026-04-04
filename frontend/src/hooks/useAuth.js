import { useState, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. LOGIN: Entrar al sistema de Forward Vision
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fvApi.post('/auth/login', { email, password });
            
            // Guardamos el token y los datos básicos del usuario
            localStorage.setItem('token', data.token);
            setUser(data.user);
            
            // Redirigimos al Dashboard
            window.location.href = '/dashboard';
            return data;
        } catch (err) {
            const msg = err.response?.data?.error || "Error de conexión con el Nodo Chosica";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 2. REGISTER: Crear nueva cuenta de técnico/admin
    const register = async (nombre, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fvApi.post('/auth/register', { nombre, email, password });
            
            // Opcional: Loguear automáticamente tras registro
            localStorage.setItem('token', data.token);
            setUser(data.user);
            
            window.location.href = '/dashboard';
            return data;
        } catch (err) {
            const msg = err.response?.data?.error || "No se pudo crear la cuenta";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 3. LOGOUT: Salir y limpiar rastro
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    }, []);

    return {
        user,
        loading,
        error,
        login,
        register,
        logout
    };
};

export default useAuth;