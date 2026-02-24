import React, { useState } from 'react';
import MapaGeneral from '../components/MapaGeneral';
import BuscadorFactibilidad from '../components/BuscadorFactibilidad';

const FactibilidadPage = () => {
  const [modoMapa, setModoMapa] = useState('buscador'); 

  return (
    <main className="flex-1 flex flex-col bg-[#0d1117] text-white min-h-[calc(100vh-80px)] animate-in fade-in duration-500">
      
      {/* 1. SELECTOR DE MODO (TABS) */}
      <section className="bg-[#161b22] border-b border-gray-800 p-4 sticky top-0 z-[1000]">
        <div className="max-w-4xl mx-auto flex p-1 bg-[#0d1117] rounded-2xl border border-gray-800 shadow-inner">
          <button 
            onClick={() => setModoMapa('buscador')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              modoMapa === 'buscador' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
              : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <span>📡</span> Consulta Técnica
          </button>
          <button 
            onClick={() => setModoMapa('general')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              modoMapa === 'general' 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' 
              : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <span>🕸️</span> Mapa de Red Global
          </button>
        </div>
      </section>

      {/* 2. CONTENIDO DINÁMICO */}
      <div className="flex-grow">
        {modoMapa === 'buscador' ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <BuscadorFactibilidad />
          </div>
        ) : (
          <div className="p-4 md:p-6 animate-in zoom-in-95 duration-500">
            <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  Topología <span className="text-cyan-500">Lineal</span> de Red
                </h2>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                  Trazado Real de Fibra Óptica sobre Calles y Avenidas
                </p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl">
                 <p className="text-cyan-500 text-[10px] font-black uppercase animate-pulse">● Sincronización de Trazados Activa</p>
              </div>
            </header>

            {/* Mapa General Técnico Expandido */}
            <div className="h-[75vh] w-full bg-[#161b22] rounded-[40px] overflow-hidden border-4 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <MapaGeneral />
            </div>
          </div>
        )}
      </div>

      {/* 3. LEYENDA TÉCNICA ACTUALIZADA (Solo visible en mapa general) */}
      {modoMapa === 'general' && (
        <footer className="p-6 bg-[#0d1117] border-t border-gray-800 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-8 justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#ff00ff] rounded-full shadow-[0_0_8px_#ff00ff]"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Troncal 96F</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fibra de Distribución</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#39ff14] rounded-full shadow-[0_0_8px_#39ff14]"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Acceso Cliente (NAP)</span>
            </div>
            <div className="flex items-center gap-3 border-l border-gray-800 pl-8">
              <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-[8px]">📍</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Postes Técnicos</span>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
};

export default FactibilidadPage;