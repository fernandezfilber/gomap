import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import { ProyectosProvider } from './context/ProyectoContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{ 
        "client-id": "AfUnH02UYtkQA37IHjbAXahkAscIgR9NGwCQyCR__3ooakMQwXeJJyOU7ehF1WPflTbt_1HNgyNEzlFU", 
        currency: "PEN" 
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