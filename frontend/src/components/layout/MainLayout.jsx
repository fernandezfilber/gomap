import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, activeView, setView, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 font-sans flex flex-col">
      {/* Barra de navegación superior fija */}
      <Navbar 
        activeView={activeView} 
        setView={setView} 
        user={user} 
        onLogout={onLogout} 
      />

      {/* Contenedor principal del Dashboard o Gestión */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-4 md:p-6 animate-in fade-in duration-700">
        {children}
      </main>

      {/* Pie de página informativo */}
      <Footer />
    </div>
  );
};

export default MainLayout;