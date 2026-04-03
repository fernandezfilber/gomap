import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Importación de Páginas
import LoginPage from '../pages/LoginPage';
import MapaPage from '../pages/MapaPage';
import Dashboard from '../pages/Dashboard';
import Inventario from '../pages/Inventario';

/**
 * Middleware de protección de rutas.
 * Si no hay token, redirige al login de Forward Vision.
 */
const ProtectedRoute = ({ isAuthenticated }) => {
    // Si está autenticado, renderiza las rutas hijas mediante <Outlet />
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
    // Verificamos si existe el token en el almacenamiento local
    const isAuthenticated = !!localStorage.getItem('token'); 

    return (
        <Routes>
            {/* 🚪 RUTA PÚBLICA (Sin Sidebar) */}
            <Route path="/login" element={<LoginPage />} />

            {/* 🛰️ GRUPO DE RUTAS PRIVADAS */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                {/* Todas las rutas aquí adentro usarán el MainLayout.
                    El componente <Outlet /> dentro de MainLayout será 
                    reemplazado por MapaPage, Dashboard, etc.
                */}
                <Route element={<MainLayout />}>
                    {/* Redirección inicial al entrar al sistema */}
                    <Route path="/" element={<Navigate to="/mapa" replace />} />
                    
                    {/* Páginas del Sistema GIS */}
                    <Route path="/mapa" element={<MapaPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventario" element={<Inventario />} />
                    
                    {/* Puedes agregar aquí la ruta de Clientes o Configuración luego */}
                </Route>
            </Route>

            {/* 🛡️ 404 - SEGURIDAD: Cualquier ruta desconocida vuelve al Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRouter;