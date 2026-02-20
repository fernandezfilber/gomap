import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import FactibilidadPage from './pages/FactibilidadPage';
import RedPage from './pages/RedPage';
import Login from './components/ui/Login';

function App() {
  const [view, setView] = useState('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('token') !== null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try { return saved ? JSON.parse(saved) : null; } catch { return null; }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  // 1. Si no hay sesión, mostramos el componente de acceso puro
  if (!isLoggedIn) {
    return <Login onLoginSuccess={(u) => { setIsLoggedIn(true); setUser(u); }} />;
  }

  // 2. Si hay sesión, el MainLayout se encarga de la envoltura (Navbar/Footer)
  return (
    <MainLayout activeView={view} setView={setView} user={user} onLogout={handleLogout}>
      {view === 'inicio' && <FactibilidadPage user={user} />}
      {view === 'red' && <RedPage user={user} />}
      {/* Puedes agregar más vistas aquí fácilmente */}
    </MainLayout>
  );
}

export default App;