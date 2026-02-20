import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-10 border-t border-gray-800/30 bg-[#0d1117]">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            &copy; 2026 Filber Development // Forward Vision Fiber
          </p>
          <p className="text-gray-700 text-[9px] font-mono mt-1">
            Lurigancho - Chosica, Lima // v2.0.4-stable
          </p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Servidor USA-East Activo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;