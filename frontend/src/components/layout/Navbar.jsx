import React from 'react';

const Navbar = ({ activeView, setView, user, onLogout }) => {
  // Configuración de los ítems de navegación
  const navItems = [
    { id: 'inicio', label: 'Dashboard', icon: '📊' },
    { id: 'factibilidad', label: 'Factibilidad', icon: '📡' },
    { id: 'red', label: 'Infraestructura', icon: '🕸️' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
  ];

  return (
    <nav className="sticky top-0 z-[5000] bg-[#161b22]/80 backdrop-blur-md border-b border-gray-800 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. LOGO E IDENTIDAD VISUAL */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('inicio')}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
            FV
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-black italic uppercase tracking-tighter leading-none text-lg">
              Forward <span className="text-blue-500">Vision</span>
            </h1>
            <p className="text-[8px] text-gray-500 font-mono uppercase tracking-[0.2em] mt-1">
              Lurigancho - Chosica
            </p>
          </div>
        </div>

        {/* 2. MENÚ DE NAVEGACIÓN (TABS) */}
        <div className="flex bg-[#0d1117] p-1 rounded-2xl border border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all ${
                activeView === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="hidden md:block tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 3. PERFIL Y CONTROL DE SESIÓN */}
        <div className="flex items-center gap-4">
          {/* Info del Usuario */}
          <div className="hidden lg:block text-right border-r border-gray-800 pr-4">
            <p className="text-[9px] text-gray-500 font-mono leading-none uppercase tracking-tighter">
              {user?.rol || 'Operador'}
            </p>
            <p className="text-[10px] text-blue-400 font-bold leading-none uppercase mt-1">
              {user?.nombre || 'Personal Técnico'}
            </p>
          </div>

          {/* BOTÓN CERRAR SESIÓN */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 shadow-lg shadow-red-900/5 group"
            title="Finalizar Sesión"
          >
            <span className="text-[10px] font-black hidden md:block uppercase tracking-widest">Salir</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;