import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MapaPrincipal from '../components/map/MapaPrincipal';

// Importación de formularios activos
import FormPoste from '../components/forms/FormPoste';
import FormMufa from '../components/forms/FormMufa';
import FormCaja from '../components/forms/FormCaja';
import FormCliente from '../components/forms/FormCliente';

const Dashboard = () => {
    const [elementoActivo, setElementoActivo] = useState(null); 

    const cerrarVentana = () => {
        setElementoActivo(null);
    };

    return (
        <div className="flex h-screen w-screen bg-slate-950 overflow-hidden relative">
            
            <Sidebar />

            <main className="flex-1 relative bg-white h-screen">
                
                {/* --- CAPA DE FORMULARIOS (Solo los necesarios) --- */}
                {elementoActivo?.tipo === 'poste' && (
                    <FormPoste data={elementoActivo} onCancel={cerrarVentana} />
                )}
                {elementoActivo?.tipo === 'mufa' && (
                    <FormMufa data={elementoActivo} onCancel={cerrarVentana} />
                )}
                {elementoActivo?.tipo === 'caja' && (
                    <FormCaja data={elementoActivo} onCancel={cerrarVentana} />
                )}
                {elementoActivo?.tipo === 'cliente' && (
                    <FormCliente data={elementoActivo} onCancel={cerrarVentana} />
                )}

                {/* El mapa ocupa todo el espacio y maneja su propio Toolbox */}
                <MapaPrincipal 
                    onSelect={(data) => setElementoActivo(data)} 
                    seleccion={elementoActivo}
                />

            </main>
        </div>
    );
};

export default Dashboard;