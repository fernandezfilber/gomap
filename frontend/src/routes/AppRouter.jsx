import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

// 1. PRIMERO DEFINIMOS LOS COMPONENTES DE PROTECCIÓN
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return !token ? children : <Navigate to="/dashboard" />;
};

// 2. LUEGO USAMOS AppRouter
const AppRouter = () => {
    return (
        <Routes>
            <Route 
                path="/dashboard" 
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/login" 
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } 
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};

export default AppRouter;