import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // 1. Importa Outlet
import { 
  LayoutDashboard, Map as MapIcon, Users, 
  Settings, LogOut, Database, Wifi 
} from 'lucide-react';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <MapIcon size={20} />, label: 'Visor de Red', path: '/mapa' },
        { icon: <Database size={20} />, label: 'Inventario', path: '/inventario' },
        { icon: <Users size={20} />, label: 'Clientes', path: '/clientes' },
        { icon: <Settings size={20} />, label: 'Configuración', path: '/config' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-slate-900 overflow-hidden">
            {/* --- SIDEBAR VERTICAL --- */}
            <aside className="w-64 bg-[#161b22] border-r border-slate-800 flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Wifi className="text-white" size={24} />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        Forward <span className="text-blue-500">V.</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group"
                        >
                            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <main className="flex-1 relative overflow-hidden bg-[#0d1117]">
                {/* 🚀 CLAVE: Outlet renderiza la página que coincida con la URL actual 
                   Mantenemos {children} por si acaso usas el layout de forma manual
                */}
                <Outlet /> 
                {children}
            </main>
        </div>
    );
};

export default MainLayout;