import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Empresa from '../pages/Empresa';
import Estadisticas from '../pages/Estadisticas';
import MapInteractivo from '../pages/MapInteractivo';
import VerifyEmail from '../pages/VerifyEmail';
import AdminPanel from '../pages/AdminPanel';
import Blocked from '../pages/Blocked';

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};

const getStoredToken = () => {
    const token = localStorage.getItem('token');
    return (!token || token === 'null' || token === 'undefined') ? null : token;
};

const PrivateRoute = ({ children }) => {
    return getStoredToken() ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const user = getStoredUser();
    const token = getStoredToken();
    return (token && user?.rol === 'ADMIN') ? children : <Navigate to="/dashboard" />;
};

const PublicRoute = ({ children }) => {
    return !getStoredToken() ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Empresa />} />
            
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/mapa" element={<PrivateRoute><MapInteractivo /></PrivateRoute>} />
            <Route path="/estadisticas" element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
            
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
            
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/blocked" element={<Blocked />} />
            
            <Route path="/empresa" element={<Empresa />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;