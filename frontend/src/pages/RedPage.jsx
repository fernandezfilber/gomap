import React, { useState } from 'react';
import TroncalManager from '../components/TroncalManager'; // Nuevo
import MufaManager from '../components/MufaManager';
import CajaManager from '../components/CajaManager';

const RedPage = () => {
  // Iniciamos en troncales para asegurar el flujo jerárquico correcto
  const [view, setView] = useState('troncales');

  return (
    <main className="min-h-screen bg-[#0d1117] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Informativa */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Infraestructura <span className="text-blue-500">Forward Vision</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sede Central: Lurigancho-Chosica | Gestión de Red 2026</p>
        </header>

        {/* Navegador de Capas de Red */}
        <nav className="flex flex-wrap gap-3 mb-10 border-b border-gray-800 pb-6">
          <button 
            onClick={() => setView('troncales')}
            className={`px-6 py-2 rounded-xl font-bold text-xs uppercase transition-all border ${
              view === 'troncales' 
              ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]' 
              : 'bg-[#161b22] text-gray-400 border-gray-800 hover:border-gray-600'
            }`}
          >
            1. Troncales (Zonas)
          </button>
          
          <button 
            onClick={() => setView('mufas')}
            className={`px-6 py-2 rounded-xl font-bold text-xs uppercase transition-all border ${
              view === 'mufas' 
              ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
              : 'bg-[#161b22] text-gray-400 border-gray-800 hover:border-gray-600'
            }`}
          >
            2. Mufas (Hilos)
          </button>
          
          <button 
            onClick={() => setView('cajas')}
            className={`px-6 py-2 rounded-xl font-bold text-xs uppercase transition-all border ${
              view === 'cajas' 
              ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15_rgba(22,163,74,0.3)]' 
              : 'bg-[#161b22] text-gray-400 border-gray-800 hover:border-gray-600'
            }`}
          >
            3. Cajas NAP (Clientes)
          </button>
        </nav>

        {/* Renderizado Condicional de Componentes */}
        <section className="animate-in fade-in duration-500">
          {view === 'troncales' && <TroncalManager />}
          {view === 'mufas' && <MufaManager />}
          {view === 'cajas' && <CajaManager />}
        </section>
      </div>
    </main>
  );
};

export default RedPage;