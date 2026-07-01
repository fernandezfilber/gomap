import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import { ProyectosProvider } from './context/ProyectoContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { App as CapacitorApp } from '@capacitor/app';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          CapacitorApp.exitApp();
        }
      });
      
      // GPS Tracker (cada 1 minuto)
      const rastrearGPS = async () => {
        try {
          const { Geolocation } = await import('@capacitor/geolocation');
          const pos = await Geolocation.getCurrentPosition();
          
          // Import fvApi on the fly to avoid circular deps in App
          const { default: fvApi } = await import('./api/fvApi');
          
          await fvApi.post('/averias/ubicacion', {
            latitud: pos.coords.latitude,
            longitud: pos.coords.longitude,
            precision: pos.coords.accuracy
          });
        } catch (e) {
          console.log('Error de GPS:', e);
        }
      };

      // Rastrear inmediatamente y luego cada minuto
      rastrearGPS();
      const interval = setInterval(rastrearGPS, 60000);

      return () => {
        CapacitorApp.removeAllListeners();
        clearInterval(interval);
      };
    }
  }, []);

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