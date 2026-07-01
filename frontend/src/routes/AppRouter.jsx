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
import CroquisList from '../pages/Croquis/CroquisList';
import CroquisEditor from '../pages/Croquis/CroquisEditor';
import UsuariosAdmin from '../pages/Usuarios/UsuariosAdmin';
import InventarioDashboard from '../pages/Inventario/InventarioDashboard';
import ClientesDashboard from '../pages/Clientes/ClientesDashboard';
import TicketsDashboard from '../pages/Tickets/TicketsDashboard';

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
    return (token && (user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN' || user?.rol === 'TECNICO')) ? children : <Navigate to="/dashboard" />;
};

const InventoryRoute = ({ children }) => {
    const user = getStoredUser();
    const token = getStoredToken();
    return (token && (user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN')) ? children : <Navigate to="/dashboard" />;
};

const SuperAdminRoute = ({ children }) => {
    const user = getStoredUser();
    const token = getStoredToken();
    return (token && user?.rol === 'SUPERADMIN') ? children : <Navigate to="/dashboard" />;
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
            <Route path="/estadisticas" element={<AdminRoute><Estadisticas /></AdminRoute>} />
            <Route path="/dashboard/croquis" element={<PrivateRoute><CroquisList /></PrivateRoute>} />
            <Route path="/dashboard/croquis/:id" element={<PrivateRoute><CroquisEditor /></PrivateRoute>} />
            <Route path="/dashboard/tickets" element={<PrivateRoute><TicketsDashboard /></PrivateRoute>} />
            
            <Route path="/dashboard/usuarios" element={<AdminRoute><UsuariosAdmin /></AdminRoute>} />
            <Route path="/dashboard/inventario" element={<InventoryRoute><InventarioDashboard /></InventoryRoute>} />
            <Route path="/dashboard/clientes" element={<PrivateRoute><ClientesDashboard /></PrivateRoute>} />
            <Route path="/admin" element={<SuperAdminRoute><AdminPanel /></SuperAdminRoute>} />
            
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