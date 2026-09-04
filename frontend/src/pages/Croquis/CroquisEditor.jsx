import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fvApi from '../../api/fvApi';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup, ZoomControl, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotate';
import { ArrowLeft, Save, Plus, Type, Trash2, MapPin, MousePointer2, Navigation, UploadCloud, Palette } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ImportarCroquisModal from '../../components/modals/ImportarCroquisModal';

// Iconos Personalizados para el Borrador - Mejorados con colores visibles
const createCustomIcon = (emoji, color, label) => {
    const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMob ? 24 : 36;
    const fontSize = isMob ? '12px' : '18px';
    const textFontSize = isMob ? '8px' : '11px';
    
    // Colores mejorados y más visibles
    const colorMap = {
        '#f97316': '#ff6b35', // Naranja vibrante (mufa)
        'emerald': '#ff6b35', // Naranja para cajas (mismo que en principal)
        '#10b981': '#ff6b35'
    };
    
    const bgColor = colorMap[color] || color || '#ff6b35';
    // Truncar label a 10 caracteres
    const labelTruncado = label && label.length > 10 ? label.substring(0, 10) + '...' : label;
    
    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="background:${bgColor};border:3px solid white;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:bold;box-shadow:0 4px 12px rgba(255,107,53,0.6);">${emoji}</div>
            ${labelTruncado ? `<div style="background:rgba(0,0,0,0.9);color:white;font-size:${textFontSize};font-weight:bold;padding:2px 6px;border-radius:3px;white-space:nowrap;max-width:100px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${bgColor};">${labelTruncado}</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, labelTruncado ? size + 20 : size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 10)]
    });
};

// Iconos con colores de alto contraste para mapa de calles claro
const iconMufa = createCustomIcon('🌀', '#ff6b35', null);
const iconCajaDefault = createCustomIcon('📦', '#ff6b35', null);

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
    
    // UI states
    const [showImportModal, setShowImportModal] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [pendingTramoColor, setPendingTramoColor] = useState(false);
    const [tramoEditandoId, setTramoEditandoId] = useState(null);

    // Predefined colors
    const colors = [
        '#ef4444', '#3b82f6', '#22c55e', '#f97316', 
        '#8b5cf6', '#eab308', '#06b6d4', '#ec4899', '#1e293b'
    ];
    
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
                    
                    if (c.datosGraficos.nodos?.length > 0 && mapRef.current) {
                        const ult = c.datosGraficos.nodos[c.datosGraficos.nodos.length - 1];
                        mapRef.current.flyTo([ult.lat, ult.lng], 18);
                    }
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
        setPendingTramoColor(true);
        setShowColorPicker(true);
    };

    const applyTramoColor = (color) => {
        if (pendingTramoColor) {
            setTramos([...tramos, { id: `tramo_${Date.now()}`, path: puntosTemporales, color: color, label: 'Nuevo Tramo' }]);
            setPuntosTemporales([]);
            setModo('select');
            setPendingTramoColor(false);
        } else if (tramoEditandoId) {
            setTramos(tramos.map(tr => tr.id === tramoEditandoId ? { ...tr, color: color } : tr));
            setTramoEditandoId(null);
        }
        setShowColorPicker(false);
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
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                        <UploadCloud size={18} />
                        <span className="hidden md:inline">Importar al Mapa</span>
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-lg shadow-violet-600/30"
                    >
                        {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={18} />}
                        <span className="hidden md:inline">Guardar</span>
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 relative">
                <button onClick={handleMiUbicacion} className="absolute top-24 right-4 z-[1001] bg-slate-900/80 backdrop-blur p-3 rounded-full shadow-xl hover:bg-slate-800 transition-all text-violet-400 border border-slate-700/50" title="Mi Ubicación">
                    <Navigation size={20} fill="currentColor" />
                </button>

                <MapContainer center={[-11.95, -76.72]} zoom={15} maxZoom={22} className="h-full w-full" zoomControl={false} rotate={true} touchRotate={true} rotateControl={{ closeOnZeroBearing: false }}>
                    <ZoomControl position="topright" />
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="Satélite (Google)">
                            <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked name="Calles (Google)">
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
                        const icon = n.type === 'mufa' ? iconMufa : createCustomIcon('📦', '#ff6b35', n.label);
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

                    {tramos.map(t => {
                        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
                        return <Polyline key={t.id} positions={t.path} pathOptions={{ color: t.color, weight: isDesktop ? 5 : 3, opacity: 0.9 }}>
                            <Popup>
                                <div className="text-center p-2">
                                    <p className="font-bold text-slate-800 mb-2">{t.label}</p>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => {
                                            setTramoEditandoId(t.id);
                                            setShowColorPicker(true);
                                        }} className="bg-indigo-500/10 text-indigo-600 w-full py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1">
                                            <Palette size={14} /> Cambiar Color
                                        </button>
                                        <button onClick={() => eliminarTramo(t.id)} className="bg-red-500/10 text-red-500 w-full py-1.5 rounded-lg text-xs font-bold transition-colors">Borrar Tramo</button>
                                    </div>
                                </div>
                            </Popup>
                        </Polyline>
                    })}

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
            
            {showColorPicker && (
                <div className="fixed inset-0 z-[2000] bg-black/50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl">
                        <h3 className="text-lg font-bold mb-4 text-center">Selecciona un color</h3>
                        <div className="grid grid-cols-5 gap-3 mb-4">
                            {colors.map(c => (
                                <button key={c} onClick={() => applyTramoColor(c)} className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                        <div className="flex gap-2 items-center mb-4">
                            <span className="text-sm font-medium">Personalizado:</span>
                            <input type="color" id="custom-color-picker" className="w-10 h-10 border-0 rounded cursor-pointer" defaultValue="#000000" />
                            <button onClick={() => applyTramoColor(document.getElementById('custom-color-picker').value)} className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg font-bold">Aplicar</button>
                        </div>
                        <button onClick={() => {
                            setShowColorPicker(false);
                            if (pendingTramoColor) {
                                setPuntosTemporales([]);
                                setModo('select');
                                setPendingTramoColor(false);
                            }
                            setTramoEditandoId(null);
                        }} className="w-full bg-slate-100 text-slate-600 font-bold py-2 rounded-xl hover:bg-slate-200">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <ImportarCroquisModal 
                isOpen={showImportModal} 
                onClose={() => setShowImportModal(false)} 
                croquisId={id} 
                croquisData={{ nodos, tramos }} 
            />
        </div>
    );
};

export default CroquisEditor;
