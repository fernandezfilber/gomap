import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// 🛠️ PARCHE CRÍTICO: Iconos de Leaflet para Producción
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos y Hooks
import { MapPin, Share2, Box, Database, MousePointer2, X, User } from 'lucide-react';
import usePostes from '../../hooks/usePostes';
import useCajas from '../../hooks/useCajas';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';
import useClientes from '../../hooks/useClientes';

// 1. Detector de Clics (Postes y Cables)
const DetectorEventos = ({ modo, onSelect, puntosTemporales, setPuntosTemporales }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            if (modo === 'tramo') {
                setPuntosTemporales([...puntosTemporales, [lat, lng]]);
            } else if (modo !== 'select') {
                onSelect({ 
                    tipo: modo, 
                    coords: { latitud: lat, longitud: lng }, 
                    isNew: true 
                });
            }
        },
        contextmenu() {
            if (modo === 'tramo' && puntosTemporales.length > 1) {
                onSelect({ tipo: 'tramo', path: puntosTemporales, isNew: true });
                setPuntosTemporales([]);
            }
        }
    });
    return null;
};

const MapaPrincipal = ({ onSelect, seleccion }) => {
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);

    // 📡 CARGA GLOBAL: Quitamos el ID del proyecto para forzar la visibilidad
    const { postes } = usePostes(); 
    const { cajas } = useCajas();
    const { tramos } = useTramos();
    const { mufas } = useMufas();
    const { clientes } = useClientes();

    // Monitor de datos en consola (F12 para ver esto)
    useEffect(() => {
        console.log("--- DEBUG FORWARD VISION ---");
        console.log("Postes recibidos:", postes?.length || 0);
        console.log("Cajas recibidas:", cajas?.length || 0);
        console.log("Tramos recibidos:", tramos?.length || 0);
    }, [postes, cajas, tramos]);

    const tools = [
        { id: 'select', icon: <MousePointer2 size={18}/>, color: 'bg-slate-700' },
        { id: 'poste', icon: <MapPin size={18}/>, color: 'bg-blue-600' },
        { id: 'caja', icon: <Box size={18}/>, color: 'bg-emerald-600' },
        { id: 'tramo', icon: <Share2 size={18}/>, color: 'bg-violet-600' },
    ];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-200">
            
            {/* TOOLBOX FLOTANTE */}
            <div className="absolute top-6 left-6 z-[1001] flex flex-col gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200">
                {tools.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => { setModo(t.id); setPuntosTemporales([]); }}
                        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
                            modo === t.id ? `${t.color} text-white scale-110 shadow-lg` : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>

            <MapContainer center={[-11.935, -76.701]} zoom={15} className="h-full w-full z-0" zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                <DetectorEventos 
                    modo={modo} 
                    onSelect={onSelect} 
                    puntosTemporales={puntosTemporales} 
                    setPuntosTemporales={setPuntosTemporales} 
                />

                {/* 📍 RENDER POSTES (Forzando Number) */}
                {postes?.map(p => (
                    <Marker 
                        key={`p-${p.id}`} 
                        position={[Number(p.latitud), Number(p.longitud)]}
                        eventHandlers={{ click: () => onSelect({ tipo: 'poste', data: p, isNew: false }) }}
                    >
                        <Popup><p className="font-bold text-xs">P-JIC: {p.codigo}</p></Popup>
                    </Marker>
                ))}

                {/* 📦 RENDER CAJAS */}
                {cajas?.map(c => (
                    <Marker 
                        key={`c-${c.id}`} 
                        position={[Number(c.latitud), Number(c.longitud)]}
                        eventHandlers={{ click: () => onSelect({ tipo: 'caja', data: c, isNew: false }) }}
                    />
                ))}

                {/* 🧶 RENDER TRAMOS (Cables) */}
                {tramos?.map(t => (
                    <Polyline 
                        key={`t-${t.id}`} 
                        positions={t.path} 
                        pathOptions={{ color: '#6366f1', weight: 5 }} 
                    />
                ))}

                {/* 🧵 CABLE TEMPORAL */}
                {puntosTemporales.length > 0 && (
                    <Polyline positions={puntosTemporales} pathOptions={{ color: '#8b5cf6', weight: 3, dashArray: '10, 10' }} />
                )}
            </MapContainer>

            {/* AVISO DE MODO */}
            {modo !== 'select' && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-white/10">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest">
                        {modo === 'tramo' ? 'Clics para cable - Clic derecho para fin' : `Modo ${modo} listo`}
                    </p>
                    <button onClick={() => { setModo('select'); setPuntosTemporales([]); }} className="bg-white/10 p-1 rounded-lg hover:bg-red-500 transition-all">
                        <X size={12}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapaPrincipal;