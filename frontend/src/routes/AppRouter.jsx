import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register'; // 👈 Importamos la nueva página
import Dashboard from '../pages/Dashboard';

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
            <Route 
                path="/dashboard" 
                element={<PrivateRoute><Dashboard /></PrivateRoute>} 
            />
            <Route 
                path="/login" 
                element={<PublicRoute><Login /></PublicRoute>} 
            />
            {/* 🆕 NUEVA RUTA DE REGISTRO */}
            <Route 
                path="/register" 
                element={<PublicRoute><Register /></PublicRoute>} 
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};

export default AppRouter;