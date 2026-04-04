import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    // ESTA ES LA CLAVE: El Router debe envolver a TODO lo demás
    <Router>
      {/* 1. Notificaciones primero */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* 2. El cerebro de las rutas después */}
      <AppRouter />
    </Router>
  );
}

export default App;