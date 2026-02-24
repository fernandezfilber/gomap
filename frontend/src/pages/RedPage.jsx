import React, { useState } from 'react';
import TroncalManager from '../components/TroncalManager';
import MufaManager from '../components/MufaManager';
import CajaManager from '../components/CajaManager';

const RedPage = () => {
  const [view, setView] = useState('troncales');

  return (
    <main className="min-h-screen bg-[#0d1117] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Informativa */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              Infraestructura <span className="text-blue-500">Forward Vision</span>
            </h1>
            <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">
              Sede Central: Lurigancho-Chosica | Gestión Lineal 2026
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-2xl">
            <span className="text-blue-400 text-[10px] font-black uppercase">● Modo Edición de Trazados Activo</span>
          </div>
        </header>

        {/* Navegador de Capas de Red (Sincronizado con colores del mapa) */}
        <nav className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setView('troncales')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase transition-all border-2 ${
              view === 'troncales' 
              ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105' 
              : 'bg-[#161b22] text-gray-500 border-gray-800 hover:border-purple-900'
            }`}
          >
            1. Troncales (Raíz)
          </button>
          
          <button 
            onClick={() => setView('mufas')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase transition-all border-2 ${
              view === 'mufas' 
              ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' 
              : 'bg-[#161b22] text-gray-500 border-gray-800 hover:border-blue-900'
            }`}
          >
            2. Mufas (Distribución)
          </button>
          
          <button 
            onClick={() => setView('cajas')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase transition-all border-2 ${
              view === 'cajas' 
              ? 'bg-green-600 text-white border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105' 
              : 'bg-[#161b22] text-gray-500 border-gray-800 hover:border-green-900'
            }`}
          >
            3. Cajas NAP (Terminales)
          </button>
        </nav>

        {/* Renderizado Condicional */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {view === 'troncales' && <TroncalManager />}
          {view === 'mufas' && <MufaManager />}
          {view === 'cajas' && <CajaManager />}
        </section>
      </div>
    </main>
  );
};

export default RedPage;