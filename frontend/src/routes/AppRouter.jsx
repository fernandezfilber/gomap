import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Empresa from '../pages/Empresa'; // 👈 Importamos tu nueva Landing de Marketing
import Estadisticas from '../pages/Estadisticas';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return !token ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* 🏠 LA PUERTA DE ENTRADA: Landing Page de Marketing */}
            <Route path="/" element={<Empresa />} />

            {/* 📊 PANEL DE CONTROL: Solo para logueados */}
            <Route 
                path="/dashboard" 
                element={<PrivateRoute><Dashboard /></PrivateRoute>} 
            />

            {/* 📈 ESTADÍSTICAS: Solo para logueados */}
            <Route 
                path="/estadisticas" 
                element={<PrivateRoute><Estadisticas /></PrivateRoute>} 
            />

            {/* 🔑 ACCESO: Solo para no logueados */}
            <Route 
                path="/login" 
                element={<PublicRoute><Login /></PublicRoute>} 
            />

            {/* 🆕 REGISTRO DE TÉCNICOS: Solo para no logueados */}
            <Route 
                path="/register" 
                element={<PublicRoute><Register /></PublicRoute>} 
            />

            {/* 🛡️ RUTA DE EMERGENCIA: Si se pierde, lo mandamos a la Landing o al Dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;