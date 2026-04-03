import React, { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { Loader2, Satellite, RefreshCcw, Search, MapPin } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// Componentes propios
import MapaRed from '../components/map/MapaRed';
import FormularioCaja from '../components/map/FormularioCaja';
import { useFetchRed } from '../hooks/useFetchRed';
import fvApi from '../api/fvApi';

const MapaPage = () => {
    const { infraestructura, loading, recargar } = useFetchRed();
    
    // Estados de UI
    const [mostrarModalCaja, setMostrarModalCaja] = useState(false);
    const [posteSeleccionado, setPosteSeleccionado] = useState(null);
    const [busquedaUrl, setBusquedaUrl] = useState('');
    const [buscandoFactibilidad, setBuscandoFactibilidad] = useState(false);

    // 📍 Lógica de Factibilidad (Buscador)
    const verificarFactibilidad = async (e) => {
        e.preventDefault();
        if (!busquedaUrl) return;

        setBuscandoFactibilidad(true);
        try {
            const { data } = await fvApi.post('/red/factibilidad', { googleMapsUrl: busquedaUrl });
            
            if (data.disponible) {
                toast.success(`¡Hay factibilidad! ${data.cajas.length} cajas encontradas a menos de 300m.`, {
                    duration: 5000,
                    icon: '🚀'
                });
            } else {
                toast.error('Sin cobertura directa. Se requiere expansión de red.', { duration: 5000 });
            }
        } catch (error) {
            error
            // El errorHandler global ya se encarga, aquí solo reseteamos el botón
        } finally {
            setBuscandoFactibilidad(false);
        }
    };

    const manejarSeleccionPoste = (poste) => {
        setPosteSeleccionado(poste);
        setMostrarModalCaja(true);
    };

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0d1117] text-[#58a6ff]">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="font-medium animate-pulse">Sincronizando con Nodo Chosica...</p>
        </div>
    );

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-100">
            <Toaster position="top-right" />

            {/* --- HEADER FLOTANTE Y BUSCADOR --- */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-3 max-w-md w-full px-4 sm:px-0">
                {/* Info Panel */}
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <Satellite className="text-blue-600" size={24} /> Forward Vision
                        </h1>
                        <button onClick={recargar} className="text-slate-400 hover:text-blue-600 transition-colors">
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                    <div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        <span>🛰️ Postes: {infraestructura.postes.length}</span>
                        <span>📦 Cajas: {infraestructura.cajas.length}</span>
                    </div>
                </div>

                {/* Search Bar (Factibilidad) */}
                <form onSubmit={verificarFactibilidad} className="flex gap-2">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Link de Google Maps para factibilidad..."
                            className="w-full pl-10 pr-4 py-3 bg-white shadow-lg rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={busquedaUrl}
                            onChange={(e) => setBusquedaUrl(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={buscandoFactibilidad}
                        className="bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        {buscandoFactibilidad ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                    </button>
                </form>
            </div>

            {/* --- EL MAPA --- */}
            <MapaRed 
                infraestructura={infraestructura} 
                alSeleccionarPoste={manejarSeleccionPoste}
            />

            {/* --- MODAL DE REGISTRO DE EQUIPOS --- */}
            {mostrarModalCaja && (
                <div className="absolute inset-0 z-[2000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="mb-6">
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">Nuevo Despliegue</span>
                            <h2 className="text-2xl font-bold text-slate-800 mt-2">Registrar NAP</h2>
                            <p className="text-sm text-slate-500">Poste actual: <span className="font-mono font-bold text-slate-700">{posteSeleccionado?.codigo}</span></p>
                        </div>
                        
                        <FormularioCaja 
                            poste={posteSeleccionado} 
                            alCancelar={() => setMostrarModalCaja(false)}
                            alGuardar={() => {
                                setMostrarModalCaja(false);
                                recargar();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapaPage;