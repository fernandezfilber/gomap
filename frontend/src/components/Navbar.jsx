import React from 'react';

const Navbar = ({ activeView, setView, user, onLogout }) => {
  const navItems = [
    { id: 'inicio', label: 'Dashboard', icon: '📊' },
    { id: 'factibilidad', label: 'Factibilidad', icon: '📡' },
    { id: 'red', label: 'Infraestructura', icon: '🕸️' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
  ];

  return (
    <nav className="sticky top-0 z-[5000] bg-[#161b22]/80 backdrop-blur-md border-b border-gray-800 px-6 py-3 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('inicio')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            FV
          </div>
          <span className="text-xl font-black tracking-tighter text-white hidden sm:block">
            FORWARD <span className="text-blue-500">VISION</span>
          </span>
        </div>

        {/* 2. LINKS DE NAVEGACIÓN */}
        <div className="flex bg-[#0d1117] p-1 rounded-xl border border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 3. PERFIL Y CERRAR SESIÓN */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right border-r border-gray-800 pr-4">
            <p className="text-[9px] text-gray-500 font-mono leading-none uppercase">{user?.rol || 'Personal'}</p>
            <p className="text-[10px] text-blue-400 font-bold leading-none uppercase mt-1">{user?.nombre || 'Operador'}</p>
          </div>

          {/* BOTÓN CERRAR SESIÓN */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 group"
            title="Finalizar Jornada"
          >
            <span className="text-[10px] font-bold hidden md:block uppercase">Salir</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;