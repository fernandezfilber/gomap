import { useState } from 'react';
import MapaPrincipal from '../components/map/MapaPrincipal';
import FormPoste from '../components/forms/FormPoste';
import FormMufa from '../components/forms/FormMufa';
import FormCaja from '../components/forms/FormCaja';

const Dashboard = () => {
    const [elementoActivo, setElementoActivo] = useState(null);

    const cerrarVentana = () => {
        setElementoActivo(null);
    };

    return (
        <div className="flex h-screen w-screen bg-slate-950 overflow-hidden relative">
            <main className="flex-1 relative bg-white h-screen">
                {/* FORMULARIOS */}
                {elementoActivo?.tipo === 'poste' && (
                    <FormPoste
                        key={elementoActivo.data?.id || 'nuevo'}
                        data={elementoActivo}
                        onCancel={cerrarVentana}
                    />
                )}
                {elementoActivo?.tipo === 'mufa' && (
                    <FormMufa
                        key={elementoActivo.data?.id || 'nuevo'}
                        data={elementoActivo}
                        onCancel={cerrarVentana}
                    />
                )}
                {elementoActivo?.tipo === 'caja' && (
                    <FormCaja
                        key={elementoActivo.data?.id || 'nuevo'}
                        data={elementoActivo}
                        onCancel={cerrarVentana}
                    />
                )}

                <MapaPrincipal />
            </main>
        </div>
    );
};

export default Dashboard;
