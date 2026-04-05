import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Share2, Box, Database, MousePointer2, X, Settings } from 'lucide-react';

// Hooks de Red de Forward Vision
import usePostes from '../../hooks/usePostes';
import useCajas from '../../hooks/useCajas';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';

// 🎨 CONFIGURACIÓN DE ICONOS
const crearIcono = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const iconoPoste = crearIcono('blue');
const iconoCaja = crearIcono('green');
const iconoMufa = crearIcono('orange');

// --- 🛠️ SUBCOMPONENTE: CAPA DE INFRAESTRUCTURA (Maneja useMap) ---
const CapaInfraestructura = ({ postes, cajas, mufas, onSelect, setModo, setPuntosTemporales }) => {
    const map = useMap(); // ✅ Ahora sí funciona porque es hijo de MapContainer

    return (
        <>
            {/* 📍 RENDER DE POSTES */}
            {postes?.map(p => (
                <Marker key={`p-${p.id}`} icon={iconoPoste} position={[Number(p.latitud), Number(p.longitud)]}>
                    <Popup>
                        <div className="flex flex-col gap-2 w-48 p-1">
                            <p className="text-[10px] font-black text-blue-600 border-b pb-1 uppercase italic">Poste: {p.codigo}</p>

                            <button
                                onClick={() => {
                                    map.closePopup(); // Cierra el popup para que se vea el FormCaja
                                    onSelect({
                                        tipo: 'caja',
                                        id: p.id, // 👈 ¡ESTE ES EL POSTE ID! Si no lo pones aquí, el form no lo recibe
                                        isNew: true,
                                        coords: { latitud: p.latitud, longitud: p.longitud },
                                        mufaId: p.mufaId
                                    });
                                }}
                                className="flex items-center gap-2 text-[10px] bg-emerald-600 text-white p-2 rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-all"
                            > <Box size={14} /> Instalar Caja NAP </button>

                            <button
                                onClick={() => {
                                    map.closePopup();
                                    onSelect({
                                        tipo: 'mufa',
                                        posteId: p.id, // Vinculamos la mufa al poste actual
                                        isNew: true,
                                        coords: { latitud: p.latitud, longitud: p.longitud }
                                    });
                                }}
                                className="flex items-center gap-2 text-[10px] bg-orange-600 text-white p-2 rounded-lg font-bold shadow-md hover:bg-orange-700 transition-all"
                            > <Database size={14} /> Instalar Mufa </button>
                            <button
                                onClick={() => {
                                    map.closePopup();
                                    setModo('tramo');
                                    setPuntosTemporales([[Number(p.latitud), Number(p.longitud)]]);
                                }}
                                className="flex items-center gap-2 text-[10px] bg-violet-600 text-white p-2 rounded-lg font-bold shadow-md hover:bg-violet-700 transition-all"
                            > <Share2 size={14} /> Seguir Cableando </button>

                            <button
                                onClick={() => onSelect({ tipo: 'poste', data: p, isNew: false })}
                                className="text-[8px] text-slate-400 mt-1 text-center hover:underline"
                            > Ver Detalles del Poste </button>
                        </div>
                    </Popup>
                </Marker>
            ))}


            {/* 🟢 RENDER DE CAJAS */}


            {cajas?.map(c => (
                <Marker
                    key={`c-${c.id}`}
                    icon={iconoCaja}
                    position={[Number(c.latitud), Number(c.longitud)]}
                    eventHandlers={{ click: () => onSelect({ tipo: 'caja', data: c, isNew: false }) }}
                />
            ))}

            {/* 🟠 RENDER DE MUFAS */}
            {mufas?.map(m => (
                <Marker
                    key={`m-${m.id}`}
                    icon={iconoMufa}
                    position={[Number(m.latitud), Number(m.longitud)]}
                    eventHandlers={{ click: () => onSelect({ tipo: 'mufa', data: m, isNew: false }) }}
                />
            ))}
        </>
    );
};

// --- 🛠️ SUBCOMPONENTE: DETECTOR DE CLICS EN EL MAPA ---
const DetectorEventos = ({ modo, onSelect, puntosTemporales, setPuntosTemporales }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            if (modo === 'tramo') {
                setPuntosTemporales([...puntosTemporales, [lat, lng]]);
            } else if (modo === 'poste') {
                onSelect({ tipo: 'poste', coords: { latitud: lat, longitud: lng }, isNew: true, autoSave: true });
            } else if (modo === 'caja' || modo === 'mufa') {
                onSelect({ tipo: modo, coords: { latitud: lat, longitud: lng }, isNew: true, autoSave: false });
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

// --- 🌍 COMPONENTE PRINCIPAL ---
const MapaPrincipal = ({ onSelect }) => {
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);

    const { postes } = usePostes();
    const { cajas } = useCajas();
    const { tramos } = useTramos();
    const { mufas } = useMufas();

    const tools = [
        { id: 'select', icon: <MousePointer2 size={18} />, color: 'bg-slate-700' },
        { id: 'poste', icon: <MapPin size={18} />, color: 'bg-blue-600' },
        { id: 'caja', icon: <Box size={18} />, color: 'bg-emerald-600' },
        { id: 'mufa', icon: <Database size={18} />, color: 'bg-orange-600' },
        { id: 'tramo', icon: <Share2 size={18} />, color: 'bg-violet-600' },
    ];

    return (
        <div className="relative h-screen w-full bg-slate-200">

            {/* TOOLBOX FLOTANTE */}
            <div className="absolute top-6 left-6 z-[1001] flex flex-col gap-2 bg-white/90 p-2 rounded-2xl shadow-2xl backdrop-blur-md">
                {tools.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => { setModo(t.id); setPuntosTemporales([]); }}
                        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${modo === t.id ? `${t.color} text-white scale-110 shadow-lg` : 'text-slate-500 hover:bg-slate-100'
                            }`}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>

            <MapContainer center={[-11.935, -76.701]} zoom={16} className="h-full w-full" zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Eventos de clic en el mapa */}
                <DetectorEventos
                    modo={modo} onSelect={onSelect}
                    puntosTemporales={puntosTemporales} setPuntosTemporales={setPuntosTemporales}
                />

                {/* Capa de Marcadores (Subcomponente que usa useMap) */}
                <CapaInfraestructura
                    postes={postes} cajas={cajas} mufas={mufas}
                    onSelect={onSelect} setModo={setModo}
                    setPuntosTemporales={setPuntosTemporales} puntosTemporales={puntosTemporales}
                />

                {/* Render de Cables (Tramos) */}
                {tramos?.map(t => (
                    <Polyline key={`t-${t.id}`} positions={t.path} pathOptions={{ color: '#8b5cf6', weight: 5, opacity: 0.8 }} />
                ))}

                {/* Dibujo de Cable Temporal */}
                {puntosTemporales.length > 0 && (
                    <Polyline positions={puntosTemporales} pathOptions={{ color: '#8b5cf6', weight: 3, dashArray: '10, 15' }} />
                )}
            </MapContainer>

            {/* Barra de Estado Inferior */}
            {modo !== 'select' && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-4">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    <span>Modo <span className="text-emerald-400">{modo}</span> activo</span>
                    <button onClick={() => { setModo('select'); setPuntosTemporales([]); }} className="bg-white/10 hover:bg-red-500 p-1.5 rounded-lg">
                        <X size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapaPrincipal;