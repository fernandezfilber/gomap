import { useState, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fvApi.post('/auth/login', { email, password });
            
            // Guardamos todo lo necesario para la sesión
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('proyectos', JSON.stringify(data.proyectos));
            
            setUser(data.user);
            
            // Redirección inmediata al Dashboard de FiberMap
            window.location.href = '/dashboard';
            return data;
        } catch (err) {
            const msg = err.response?.data?.message || "Error de conexión con el VPS Forward Vision";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const register = async (nombre, email, password, empresaId) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fvApi.post('/auth/register', { nombre, email, password, empresaId });
            
            // Tras registro, guardamos token y redirigimos
            localStorage.setItem('token', data.token);
            setUser(data.user);
            
            window.location.href = '/dashboard';
            return data;
        } catch (err) {
            const msg = err.response?.data?.message || "No se pudo crear la cuenta en el servidor";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('proyectos');
        setUser(null);
        window.location.href = '/login';
    }, []);

    return { user, loading, error, login, register, logout };
};

export default useAuth;