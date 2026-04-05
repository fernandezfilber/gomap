import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MapaPrincipal from '../components/map/MapaPrincipal';

// Importación de formularios activos
import FormPoste from '../components/forms/FormPoste';
import FormMufa from '../components/forms/FormMufa';
import FormCaja from '../components/forms/FormCaja';
import FormCliente from '../components/forms/FormCliente';

// Hooks para el autoSave
import usePostes from '../hooks/usePostes';
import useCajas from '../hooks/useCajas';
import useMufas from '../hooks/useMufas';

const Dashboard = () => {
    const [elementoActivo, setElementoActivo] = useState(null);
    const { crearPoste } = usePostes();
    const { crearCaja } = useCajas();
    const { crearMufa } = useMufas();

    const cerrarVentana = () => {
        setElementoActivo(null);
    };

    // ⚡ MANEJADOR INTELIGENTE: Decide si guarda directo o abre formulario
    const manejarSeleccion = async (seleccion) => {
        if (seleccion.autoSave) {
            try {
                if (seleccion.tipo === 'poste') {
                    await crearPoste({
                        codigo: `P-JIC-${Date.now().toString().slice(-4)}`,
                        latitud: seleccion.coords.latitud,
                        longitud: seleccion.coords.longitud,
                        tipo: 'CONCRETO',
                        altura: '8M'
                    });
                }
                if (seleccion.tipo === 'caja') {
                    await crearCaja({
                        codigo: `NAP-${Date.now().toString().slice(-4)}`,
                        latitud: seleccion.coords.latitud,
                        longitud: seleccion.coords.longitud
                    });
                }
                if (seleccion.tipo === 'mufa') {
                    await crearMufa({
                        codigo: `MUF-${Date.now().toString().slice(-4)}`,
                        latitud: seleccion.coords.latitud,
                        longitud: seleccion.coords.longitud
                    });
                }
                // Si es autoSave, NO seteamos elementoActivo para que no se abra el modal
                return;
            } catch (error) {
                console.error("Error en registro rápido:", error);
            }
        }

        // Si no es autoSave (es edición o cliente), abrimos el formulario normal
        setElementoActivo(seleccion);
    };

    return (
        <div className="flex h-screen w-screen bg-slate-950 overflow-hidden relative">
            
            <Sidebar />

            <main className="flex-1 relative bg-white h-screen">
                
                {/* --- CAPA DE FORMULARIOS CON KEY ÚNICO (ELIMINA ERRORES DE REACT) --- */}
                {elementoActivo?.tipo === 'poste' && (
                    <FormPoste 
                        key={elementoActivo.data?.id || 'nuevo-p'} 
                        data={elementoActivo} 
                        onCancel={cerrarVentana} 
                    />
                )}
                {elementoActivo?.tipo === 'mufa' && (
                    <FormMufa 
                        key={elementoActivo.data?.id || 'nuevo-m'} 
                        data={elementoActivo} 
                        onCancel={cerrarVentana} 
                    />
                )}
                {elementoActivo?.tipo === 'caja' && (
                    <FormCaja 
                        key={elementoActivo.data?.id || 'nuevo-c'} 
                        data={elementoActivo} 
                        onCancel={cerrarVentana} 
                    />
                )}
                {elementoActivo?.tipo === 'cliente' && (
                    <FormCliente 
                        key={elementoActivo.data?.id || 'nuevo-cl'} 
                        data={elementoActivo} 
                        onCancel={cerrarVentana} 
                    />
                )}

                {/* El mapa maneja la selección y el toolbox */}
                <MapaPrincipal 
                    onSelect={manejarSeleccion} 
                    seleccion={elementoActivo}
                />

            </main>
        </div>
    );
};

export default Dashboard;