// src/components/MapaPrincipal.jsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import { MapPin, Share2, Box, Database, MousePointer2, X } from 'lucide-react';

import usePostes from '../../hooks/usePostes';
import useCajas from '../../hooks/useCajas';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';

import { iconoPoste, iconoCaja, iconoMufa } from '../../utils/mapIcons';

// Offset solo para postes
const agregarOffsetPoste = (lat, lng, index) => [
    Number(lat) + index * 0.00005,
    Number(lng) + index * 0.00007
];

const CapaInfraestructura = ({ postes, cajas, mufas, onSelect, setModo, setPuntosTemporales }) => {
    const map = useMap();

    return (
        <>
            {/* ==================== POSTES ==================== */}
            {postes?.map((p, i) => (
                <Marker
                    key={`p-${p.id}`}
                    icon={iconoPoste}
                    position={agregarOffsetPoste(p.latitud, p.longitud, i)}
                >
                    <Popup>
                        <div className="flex flex-col gap-2 w-60 p-2">
                            <p className="font-black text-blue-600 border-b pb-2">Poste: {p.codigo}</p>

                            <button
                                onClick={() => {
                                    map.closePopup();
                                    onSelect({ tipo: 'caja', posteId: p.id, isNew: true, coords: { latitud: p.latitud, longitud: p.longitud } });
                                }}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl text-sm font-bold"
                            >
                                <Box size={18} /> Instalar Caja NAP
                            </button>

                            <button
                                onClick={() => {
                                    map.closePopup();
                                    onSelect({ tipo: 'mufa', posteId: p.id, isNew: true, coords: { latitud: p.latitud, longitud: p.longitud } });
                                }}
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl text-sm font-bold"
                            >
                                <Database size={18} /> Instalar Mufa
                            </button>

                            <button
                                onClick={() => {
                                    map.closePopup();
                                    setModo('tramo');
                                    setPuntosTemporales([[Number(p.latitud), Number(p.longitud)]]);
                                }}
                                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl text-sm font-bold"
                            >
                                <Share2 size={18} /> Seguir Cableando
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* ==================== CAJAS (mismo punto que su poste) ==================== */}
            {cajas?.map((c) => (
                <Marker
                    key={`c-${c.id}`}
                    icon={iconoCaja}
                    position={[Number(c.latitud), Number(c.longitud)]}
                    eventHandlers={{ click: () => onSelect({ tipo: 'caja', data: c, isNew: false }) }}
                />
            ))}

            {/* ==================== MUFAS (mismo punto que su poste) ==================== */}
            {mufas?.map((m) => (
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

// ==================== DETECTOR DE EVENTOS ====================
const DetectorEventos = ({ modo, onSelect, puntosTemporales, setPuntosTemporales }) => {
    useMapEvents({
        click(e) {
            if (modo === 'tramo') {
                setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
            }
        },
        contextmenu() {
            if (modo === 'tramo' && puntosTemporales.length >= 2) {
                onSelect({ tipo: 'tramo', path: puntosTemporales, isNew: true });
                setPuntosTemporales([]);
            }
        }
    });
    return null;
};

// ==================== COMPONENTE PRINCIPAL ====================
const MapaPrincipal = ({ onSelect }) => {
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);

    const { postes } = usePostes();
    const { cajas } = useCajas();
    const { tramos } = useTramos();
    const { mufas } = useMufas();

    return (
        <div className="relative h-screen w-full bg-slate-200">
            {/* TOOLBOX */}
            <div className="absolute top-6 left-6 z-[1001] flex flex-col gap-2 bg-white/95 p-3 rounded-3xl shadow-2xl backdrop-blur-md border border-slate-200">
                {[
                    { id: 'select', icon: <MousePointer2 size={20} />, color: 'bg-slate-700' },
                    { id: 'poste', icon: <MapPin size={20} />, color: 'bg-blue-600' },
                    { id: 'caja', icon: <Box size={20} />, color: 'bg-emerald-600' },
                    { id: 'mufa', icon: <Database size={20} />, color: 'bg-orange-600' },
                    { id: 'tramo', icon: <Share2 size={20} />, color: 'bg-violet-600' },
                ].map(t => (
                    <button
                        key={t.id}
                        onClick={() => { setModo(t.id); setPuntosTemporales([]); }}
                        className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${modo === t.id ? `${t.color} text-white scale-110 shadow-lg` : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>

            <MapContainer
                center={[-11.9355, -76.7005]}
                zoom={18}
                className="h-full w-full"
                zoomControl={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <DetectorEventos
                    modo={modo}
                    onSelect={onSelect}
                    puntosTemporales={puntosTemporales}
                    setPuntosTemporales={setPuntosTemporales}
                />

                <CapaInfraestructura
                    postes={postes}
                    cajas={cajas}
                    mufas={mufas}
                    onSelect={onSelect}
                    setModo={setModo}
                    setPuntosTemporales={setPuntosTemporales}
                />

                {/* ==================== TRAMOS ==================== */}
                {tramos?.map((tramo, i) => {
                    try {
                        let posiciones = tramo.path;
                        if (typeof posiciones === 'string') posiciones = JSON.parse(posiciones);

                        if (!posiciones || posiciones.length < 2) return null;

                        return (
                            <Polyline
                                key={`tramo-${tramo.id}-${i}`}
                                positions={posiciones}
                                pathOptions={{
                                    color: tramo.colorVisual || '#8b5cf6',
                                    weight: 9,
                                    opacity: 1,
                                    lineCap: 'round',
                                    lineJoin: 'round',
                                }}
                            >
                                <Popup>
                                    <div className="p-3">
                                        <h4 className="font-bold text-lg">{tramo.nombre}</h4>
                                        <p className="text-sm text-slate-600">{tramo.tipoCable}</p>
                                    </div>
                                </Popup>
                            </Polyline>
                        );
                    } catch (e) {
                        return null;
                    }
                })}

                {/* Cable temporal */}
                {puntosTemporales.length > 1 && (
                    <Polyline
                        positions={puntosTemporales}
                        pathOptions={{ color: '#a855f7', weight: 8, dashArray: '10,8', opacity: 0.9 }}
                    />
                )}
            </MapContainer>

            {/* BARRA INFERIOR */}
            {modo !== 'select' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-2xl">
                    MODO <span className="text-emerald-400">{modo.toUpperCase()}</span> ACTIVO
                    <button
                        onClick={() => { setModo('select'); setPuntosTemporales([]); }}
                        className="ml-2 p-2 hover:bg-red-500 rounded-xl transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapaPrincipal;