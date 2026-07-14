import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fvApi from '../../api/fvApi';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup, ZoomControl, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeft, Save, Plus, Type, Trash2, MapPin, MousePointer2, Navigation } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

// Iconos Personalizados para el Borrador
const createCustomIcon = (emoji, color, label) => L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;">
        <div class="bg-white border border-${color}-500 rounded-full w-3 h-3 flex items-center justify-center text-[5px] shadow">${emoji}</div>
        ${label ? `<span style="background:rgba(0,0,0,0.75);color:white;font-size:3px;font-weight:bold;padding:0px 2px;border-radius:2px;margin-top:1px;white-space:nowrap;max-width:40px;overflow:hidden;text-overflow:ellipsis;">${label}</span>` : ''}
    </div>`,
    className: 'custom-div-icon',
    iconSize: [10, 16],
    iconAnchor: [5, 5],
    popupAnchor: [0, -5]
});

const iconMufa = createCustomIcon('🌀', 'orange', null);
const iconCajaDefault = createCustomIcon('📦', 'emerald', null);

const CroquisEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Meta Datos del Croquis
    const [nombre, setNombre] = useState('Nuevo Croquis');
    const [destinatario, setDestinatario] = useState('');
    const [lugar, setLugar] = useState('');
    
    // Gráficos (Nodos y Tramos)
    const [nodos, setNodos] = useState([]); // {id, type: 'mufa'|'caja', lat, lng, label}
    const [tramos, setTramos] = useState([]); // {id, path: [[lat,lng]], color, label}
    
    // Estados de Interacción (Modos: 'select', 'add_mufa', 'add_caja', 'add_tramo')
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);
    
    // Loading
    const [saving, setSaving] = useState(false);
    
    // Ubicacion
    const [miUbicacion, setMiUbicacion] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (id && id !== 'nuevo') {
            fetchCroquis();
        } else {
            // Autocentrar si es nuevo usando ubicación
            navigator.geolocation.getCurrentPosition(pos => {
                const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setMiUbicacion(loc);
                if (mapRef.current) mapRef.current.flyTo([loc.lat, loc.lng], 18);
            });
        }
    }, [id]);

    const fetchCroquis = async () => {
        try {
            const res = await fvApi.get(`/croquis/${id}`);
            if (res.data.success) {
                const c = res.data.croquis;
                setNombre(c.nombre);
                setDestinatario(c.destinatario || '');
                setLugar(c.lugar || '');
                if (c.datosGraficos) {
                    setNodos(c.datosGraficos.nodos || []);
                    setTramos(c.datosGraficos.tramos || []);
                }
            }
        } catch (error) {
            console.error('Error fetching croquis:', error);
            alert('Error cargando el croquis');
            navigate('/dashboard/croquis');
        }
    };

    const handleSave = async () => {
        if (!nombre.trim()) return alert('El nombre es obligatorio');
        setSaving(true);
        try {
            const payload = {
                nombre,
                destinatario,
                lugar,
                datosGraficos: { nodos, tramos }
            };

            if (id === 'nuevo') {
                const res = await fvApi.post('/croquis', payload);
                navigate(`/dashboard/croquis/${res.data.croquis.id}`, { replace: true });
            } else {
                await fvApi.put(`/croquis/${id}`, payload);
                alert('Guardado exitosamente');
            }
        } catch (error) {
            alert('Error guardando el croquis');
        } finally {
            setSaving(false);
        }
    };

    const handleMiUbicacion = () => {
        if (!mapRef.current) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setMiUbicacion(loc);
            mapRef.current.flyTo([loc.lat, loc.lng], 18);
        }, (err) => alert("No se pudo obtener la ubicación"));
    };

    const MapEvents = () => {
        const map = useMapEvents({
            click(e) {
                if (modo === 'add_mufa') {
                    setNodos(prev => [...prev, { id: `mufa_${Date.now()}`, type: 'mufa', lat: e.latlng.lat, lng: e.latlng.lng, label: 'Nueva Mufa' }]);
                } else if (modo === 'add_caja') {
                    const nombreCaja = prompt('Nombre de la caja:') || 'Nueva Caja';
                    setNodos(prev => [...prev, { id: `caja_${Date.now()}`, type: 'caja', lat: e.latlng.lat, lng: e.latlng.lng, label: nombreCaja }]);
                } else if (modo === 'add_tramo') {
                    setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                }
            }
        });
        mapRef.current = map;
        return null;
    };

    const handleNodoClick = (nodoId, lat, lng) => {
        if (modo === 'add_tramo') {
            setPuntosTemporales([...puntosTemporales, [lat, lng]]);
        }
    };

    const finalizarTramo = () => {
        if (puntosTemporales.length < 2) {
            alert('Se necesitan al menos 2 puntos para un tramo');
            setPuntosTemporales([]);
            return;
        }
        setTramos([...tramos, { id: `tramo_${Date.now()}`, path: puntosTemporales, color: '#8b5cf6', label: 'Nuevo Tramo' }]);
        setPuntosTemporales([]);
        setModo('select');
    };

    const eliminarNodo = (nid) => setNodos(nodos.filter(n => n.id !== nid));
    const eliminarTramo = (tid) => setTramos(tramos.filter(t => t.id !== tid));

    // Toolbar Mobile Friendly
    const BotonHerramienta = ({ active, icon, label, onClick, colorClass }) => (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${active ? colorClass : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
        >
            {icon}
            <span className="text-[9px] mt-1 font-bold uppercase tracking-wider">{label}</span>
        </button>
    );

    return (
        <div className="flex flex-col h-screen w-full bg-slate-900 animate-in fade-in duration-300">
            {/* Topbar */}
            <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between z-10 shadow-xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard/croquis')} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            className="bg-transparent text-white font-black text-lg focus:outline-none border-b border-transparent focus:border-violet-500 placeholder-slate-600 w-40 md:w-auto"
                            placeholder="Nombre del Mapa"
                        />
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={destinatario} 
                                onChange={(e) => setDestinatario(e.target.value)} 
                                className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 w-24 md:w-32"
                                placeholder="Para (Técnico)"
                            />
                            <input 
                                type="text" 
                                value={lugar} 
                                onChange={(e) => setLugar(e.target.value)} 
                                className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 w-24 md:w-32"
                                placeholder="Lugar / Ref."
                            />
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    <span className="hidden md:inline">{saving ? 'Guardando...' : 'Guardar'}</span>
                </button>
            </div>

            {/* Main Area */}
            <div className="flex-1 relative">
                <button onClick={handleMiUbicacion} className="absolute top-24 right-4 z-[1001] bg-slate-900/80 backdrop-blur p-3 rounded-full shadow-xl hover:bg-slate-800 transition-all text-violet-400 border border-slate-700/50" title="Mi Ubicación">
                    <Navigation size={20} fill="currentColor" />
                </button>

                <MapContainer center={[-11.95, -76.72]} zoom={15} maxZoom={22} className="h-full w-full" zoomControl={false}>
                    <ZoomControl position="topright" />
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="Satélite (Google)">
                            <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Calles (Google)">
                            <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Relieve (Google)">
                            <TileLayer url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OpenStreetMap">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OSM' maxZoom={19} />
                        </LayersControl.BaseLayer>
                    </LayersControl>
                    
                    {nodos.map(n => {
                        const icon = n.type === 'mufa' ? iconMufa : createCustomIcon('📦', 'emerald', n.label);
                        return (
                        <Marker 
                            key={n.id} 
                            position={[n.lat, n.lng]} 
                            icon={icon}
                            eventHandlers={{ click: () => handleNodoClick(n.id, n.lat, n.lng) }}
                        >
                            <Popup>
                                <div className="text-center p-2 min-w-[180px]">
                                    <input 
                                        type="text" 
                                        defaultValue={n.label}
                                        onBlur={(e) => {
                                            const newLabel = e.target.value.trim() || n.label;
                                            setNodos(prev => prev.map(nd => nd.id === n.id ? { ...nd, label: newLabel } : nd));
                                        }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
                                        className="w-full text-center font-bold text-slate-800 mb-2 border-b border-slate-300 focus:border-violet-500 focus:outline-none py-1 text-sm"
                                    />
                                    <p className="text-[10px] text-slate-400 mb-2 uppercase">Toca para editar nombre</p>
                                    <button onClick={() => eliminarNodo(n.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-full py-2 rounded-lg text-xs font-bold transition-colors">Eliminar Nodo</button>
                                </div>
                            </Popup>
                        </Marker>
                        );
                    })}

                    {tramos.map(t => (
                        <Polyline key={t.id} positions={t.path} pathOptions={{ color: t.color, weight: 2, opacity: 0.9 }}>
                            <Popup>
                                <div className="text-center p-2">
                                    <p className="font-bold text-slate-800 mb-2">{t.label}</p>
                                    <button onClick={() => eliminarTramo(t.id)} className="bg-red-500/10 text-red-500 w-full py-2 rounded-lg text-xs font-bold transition-colors">Borrar Tramo</button>
                                </div>
                            </Popup>
                        </Polyline>
                    ))}

                    {/* Tramo Temporal */}
                    {puntosTemporales.length > 0 && <Polyline positions={puntosTemporales} pathOptions={{ color: '#ec4899', weight: 2, dashArray: '4, 3' }} />}

                    {miUbicacion && (<Marker position={[miUbicacion.lat, miUbicacion.lng]} icon={L.divIcon({ html: `<div class="no-print animate-pulse bg-violet-500 p-2 rounded-full border-2 border-white shadow-lg shadow-violet-500/50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>`, className: 'custom-div-icon', iconSize: [40, 40], iconAnchor: [20, 40] })}><Popup>Tu ubicación actual</Popup></Marker>)}

                    <MapEvents />
                </MapContainer>

                {/* Toolbar Inferior Móvil */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-2xl shadow-2xl flex items-center gap-2">
                    <BotonHerramienta 
                        active={modo === 'select'} 
                        icon={<MousePointer2 size={24} />} 
                        label="Seleccionar" 
                        onClick={() => setModo('select')} 
                        colorClass="bg-blue-600 text-white" 
                    />
                    <div className="w-px h-10 bg-slate-700 mx-1"></div>
                    <BotonHerramienta 
                        active={modo === 'add_mufa'} 
                        icon={<span className="text-xl">🌀</span>} 
                        label="Mufa" 
                        onClick={() => setModo('add_mufa')} 
                        colorClass="bg-orange-600 text-white" 
                    />
                    <BotonHerramienta 
                        active={modo === 'add_caja'} 
                        icon={<span className="text-xl">📦</span>} 
                        label="Caja" 
                        onClick={() => setModo('add_caja')} 
                        colorClass="bg-emerald-600 text-white" 
                    />
                    <BotonHerramienta 
                        active={modo === 'add_tramo'} 
                        icon={<span className="text-xl text-violet-300">〰️</span>} 
                        label="Tramo" 
                        onClick={() => setModo('add_tramo')} 
                        colorClass="bg-violet-600 text-white" 
                    />
                </div>

                {/* Confirmar Tramo Floating Button */}
                {puntosTemporales.length > 0 && modo === 'add_tramo' && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 border border-slate-700 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{puntosTemporales.length} Ptos</span>
                        <button onClick={finalizarTramo} className="bg-violet-600 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg">Finalizar Tramo</button>
                        <button onClick={() => setPuntosTemporales([])} className="bg-slate-800 text-red-400 p-2 rounded-xl hover:bg-slate-700"><Trash2 size={16} /></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CroquisEditor;
