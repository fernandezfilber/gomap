import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      {/* Notificaciones globales (Toasts) */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* El cerebro de las rutas */}
      <AppRouter />
    </Router>
  );
}

export default App;