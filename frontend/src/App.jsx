import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import { ProyectosProvider } from './context/ProyectoContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{ 
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, 
        currency: "USD" 
    }}>
    <Router>
      <ProyectosProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <AppRouter />
      </ProyectosProvider>
    </Router>
    </PayPalScriptProvider>
  );
}

export default App;