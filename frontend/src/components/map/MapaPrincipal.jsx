import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import '../../styles/leaflet-plugins.css';
import { MapPin, Share2, X, Ruler, Trash2, Search, Target, Edit, BarChart3, LocateFixed, Menu, ChevronDown } from 'lucide-react';

import useProyectos from '../../hooks/useProyectos';
import usePostes from '../../hooks/usePostes';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';
import useCajas from '../../hooks/useCajas';

import { iconoPoste, iconoMufa, iconoCaja } from '../../utils/mapIcons';

import FormMufa from '../forms/FormMufa';
import FormCaja from '../forms/FormCaja';
import FormPoste from '../forms/FormPoste';

const MapaPrincipal = () => {
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);
    const [puntosMedicion, setPuntosMedicion] = useState([]);
    const [formAbierto, setFormAbierto] = useState(false);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchItem, setSelectedSearchItem] = useState(null);
    const [centerPosition, setCenterPosition] = useState([-11.92, -76.70]);
    const [sidebarAbierto, setSidebarAbierto] = useState(true);
    const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true);
    const [cajasCercanas, setCajasCercanas] = useState([]);
    const [radioProximidad, setRadioProximidad] = useState(0.005);
    const [ubicacionBusqueda, setUbicacionBusqueda] = useState(null);
    const mapRef = useRef(null);

    // Hooks básicos
    const { proyectos, proyectoSeleccionado, setProyectoSeleccionado } = useProyectos();
    const { postes, crearPoste } = usePostes(proyectoSeleccionado?.id);
    const { tramos, crearTramo } = useTramos(proyectoSeleccionado?.id);
    const { mufas, eliminarMufa } = useMufas(proyectoSeleccionado?.id);
    const { cajas, eliminarCaja } = useCajas(proyectoSeleccionado?.id);

    // Detectar postes cercanos
    const encontrarPostesCercanos = (lat, lng, radio = 0.001) => {
        return postes.filter(poste => {
            const distLat = Math.abs(poste.latitud - lat);
            const distLng = Math.abs(poste.longitud - lng);
            return distLat <= radio && distLng <= radio;
        });
    };

    // Buscar cajas cercanas a una ubicación
    const buscarCajasCercanas = (lat, lng, radio = 0.005) => {
        const cercanas = cajas.filter(caja => {
            const distLat = Math.abs(caja.latitud - lat);
            const distLng = Math.abs(caja.longitud - lng);
            return distLat <= radio && distLng <= radio;
        });
        setCajasCercanas(cercanas);
        setUbicacionBusqueda({ lat, lng });
        if (cercanas.length > 0) {
            setCenterPosition([lat, lng]);
        }
    };

    // Calcular distancia
    const calcularDistanciaTotal = () => {
        if (puntosMedicion.length < 2) return 0;
        let total = 0;
        for (let i = 1; i < puntosMedicion.length; i++) {
            const prev = puntosMedicion[i-1];
            const curr = puntosMedicion[i];
            total += L.latLng(prev).distanceTo(curr);
        }
        return (total / 1000).toFixed(3);
    };

    // Crear poste directo
    const crearPosteDirecto = async (coords) => {
        if (!proyectoSeleccionado) {
            alert('Selecciona primero un proyecto');
            return;
        }
        try {
            await crearPoste({
                codigo: `P-${Date.now().toString().slice(-5)}`,
                latitud: coords.lat,
                longitud: coords.lng,
                tipo: 'CONCRETO',
                altura: '8m'
            });
            setCenterPosition([coords.lat, coords.lng]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Eventos del mapa
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (modo === 'poste') {
                    crearPosteDirecto({ lat: e.latlng.lat, lng: e.latlng.lng });
                } else if (modo === 'tramo') {
                    setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                } else if (modo === 'medir') {
                    setPuntosMedicion(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                } else if (modo === 'select') {
                    // En modo selección, buscar cajas cercanas
                    buscarCajasCercanas(e.latlng.lat, e.latlng.lng, radioProximidad);
                }
            },
            contextmenu(e) {
                // Click derecho para buscar cajas cercanas en cualquier modo
                e.originalEvent.preventDefault();
                buscarCajasCercanas(e.latlng.lat, e.latlng.lng, radioProximidad);
            }
        });
        return null;
    };

    // Finalizar tramo
    const finalizarTramo = async () => {
        if (puntosTemporales.length < 2) {
            alert('Necesitas al menos 2 puntos');
            return;
        }
        try {
            const inicio = puntosTemporales[0];
            const fin = puntosTemporales[puntosTemporales.length - 1];
            const postesInicio = encontrarPostesCercanos(inicio[0], inicio[1]);
            const postesFin = encontrarPostesCercanos(fin[0], fin[1]);

            await crearTramo({
                path: puntosTemporales,
                proyectoId: proyectoSeleccionado?.id,
                posteInicioId: postesInicio[0]?.id,
                posteFinId: postesFin[0]?.id
            });
            setPuntosTemporales([]);
            setModo('select');
            alert('✅ Tramo creado');
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al crear tramo');
        }
    };

    // Abrir formulario
    const abrirFormulario = (tipo, datos = {}) => {
        setFormType(tipo);
        setFormData({ data: datos });
        setFormAbierto(true);
        setModo('select');
    };

    const abrirInstalacion = (tipo, datos = {}) => {
        abrirFormulario(tipo, { ...datos, isNew: true });
    };

    // Elementos para búsqueda
    const allElementos = [
        ...postes.map(p => ({ id: p.id, tipo: 'Poste', codigo: p.codigo, position: [p.latitud, p.longitud] })),
        ...mufas.map(m => ({ id: m.id, tipo: 'Mufa', codigo: m.codigo, position: [m.latitud, m.longitud] })),
        ...cajas.map(c => ({ id: c.id, tipo: 'Caja', codigo: c.codigo, position: [c.latitud, c.longitud] }))
    ];

    const buscarElementos = (value) => {
        setSearchTerm(value);
        const term = value.trim().toLowerCase();
        if (!term) { setSearchResults([]); return; }
        setSearchResults(allElementos.filter(item =>
            item.codigo?.toLowerCase().includes(term)
        ).slice(0, 8));
    };

    const seleccionarElemento = (item) => {
        setSelectedSearchItem(item);
        setSearchTerm(item.codigo);
        setSearchResults([]);
    };

    useEffect(() => {
        setSearchResults([]);
        setSelectedSearchItem(null);
        setSearchTerm('');
        if (!proyectoSeleccionado) return;
        if (postes.length > 0) {
            setCenterPosition([postes[0].latitud, postes[0].longitud]);
        } else if (tramos.length > 0 && tramos[0].path?.length > 0) {
            setCenterPosition(tramos[0].path[0]);
        }
    }, [proyectoSeleccionado, postes, tramos]);

    const MapCenterer = ({ position }) => {
        const map = useMap();
        useEffect(() => {
            if (!position) return;
            map.flyTo(position, 18, { duration: 0.7 });
        }, [position, map]);
        return null;
    };

    const MapPlugins = () => {
        const map = useMap();
        useEffect(() => {
            if (!map) return;
            mapRef.current = map;
            const geocoder = L.Control.geocoder({
                defaultMarkGeocode: false,
                position: 'topleft'
            }).on('markgeocode', function(e) {
                const bbox = e.geocode.bbox;
                const poly = L.polygon([
                    bbox.getSouthEast(),
                    bbox.getNorthEast(),
                    bbox.getNorthWest(),
                    bbox.getSouthWest()
                ]);
                map.fitBounds(poly.getBounds());
            }).addTo(map);
            return () => map.removeControl(geocoder);
        }, [map]);
        return null;
    };

    return (
        <div className="relative h-screen w-full bg-slate-950 flex">
            {/* SIDEBAR */}
            <div className={`absolute left-0 top-0 h-full z-[1002] transition-all duration-300 ${sidebarAbierto ? 'w-80' : 'w-0'} bg-slate-900 border-r border-slate-700 overflow-hidden shadow-2xl`}>
                <div className="p-4 h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-white font-bold text-lg">Forward Vision</h2>
                        <button onClick={() => setSidebarAbierto(false)} className="text-slate-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Selector de Proyecto */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase">Proyecto</label>
                        <select
                            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            value={proyectoSeleccionado?.id || ''}
                            onChange={(e) => {
                                const proj = proyectos.find(p => p.id === e.target.value);
                                setProyectoSeleccionado(proj);
                            }}
                        >
                            <option value="">Sin proyecto</option>
                            {proyectos.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Estadísticas */}
                    {proyectoSeleccionado && (
                        <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
                            <div className="flex items-center gap-2 mb-3">
                                <BarChart3 size={16} className="text-blue-400" />
                                <h3 className="text-white font-semibold text-sm">Estadísticas</h3>
                            </div>
                            <div className="space-y-2 text-xs text-slate-300">
                                <div className="flex justify-between">
                                    <span>Postes:</span>
                                    <span className="font-bold text-blue-300">{postes.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tramos:</span>
                                    <span className="font-bold text-purple-300">{tramos.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Mufas:</span>
                                    <span className="font-bold text-orange-300">{mufas.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Cajas:</span>
                                    <span className="font-bold text-emerald-300">{cajas.length}</span>
                                </div>
                                <div className="border-t border-slate-600 pt-2 mt-2">
                                    <span className="text-slate-400">Total elementos: </span>
                                    <span className="font-bold text-white">{postes.length + tramos.length + mufas.length + cajas.length}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Búsqueda de Cajas Cercanas */}
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <LocateFixed size={16} className="text-emerald-400" />
                            <h3 className="text-white font-semibold text-sm">Cajas Cercanas</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Radio de búsqueda (km)</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={radioProximidad}
                                    onChange={(e) => setRadioProximidad(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-xs text-slate-500 mt-1 block">{(radioProximidad * 111).toFixed(2)} km</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (ubicacionBusqueda) {
                                        buscarCajasCercanas(ubicacionBusqueda.lat, ubicacionBusqueda.lng, radioProximidad);
                                    } else {
                                        alert('Selecciona un punto en el mapa primero');
                                    }
                                }}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                            >
                                Buscar desde ubicación
                            </button>
                            {cajasCercanas.length > 0 && (
                                <div className="mt-3 bg-slate-900 rounded p-3 border border-emerald-500/30">
                                    <p className="text-xs text-emerald-400 font-semibold mb-2">{cajasCercanas.length} caja(s) encontrada(s)</p>
                                    <div className="space-y-1 max-h-48 overflow-y-auto">
                                        {cajasCercanas.map(caja => (
                                            <div key={caja.id} className="text-xs text-slate-300 bg-slate-800 p-2 rounded cursor-pointer hover:bg-slate-700" onClick={() => { setCenterPosition([caja.latitud, caja.longitud]); }}>
                                                <div className="font-semibold">{caja.codigo}</div>
                                                <div className="text-slate-500">Puertos: {caja.puertosLibres}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón para abrir/cerrar Sidebar */}
            {!sidebarAbierto && (
                <button
                    onClick={() => setSidebarAbierto(true)}
                    className="absolute top-6 left-6 z-[1001] bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl shadow-lg transition"
                    title="Abrir panel"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* TOOLBOX */}
            <div className={`absolute top-6 transition-all duration-300 z-[1001] ${sidebarAbierto ? 'left-96' : 'left-6'}`}>
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-3xl p-3 flex flex-col gap-2">
                    {[
                        { id: 'select', icon: <MapPin size={22} />, label: 'Navegar' },
                        { id: 'poste', icon: <MapPin size={22} />, label: 'Nuevo Poste' },
                        { id: 'tramo', icon: <Share2 size={22} />, label: 'Tramo Fibra' },
                        { id: 'medir', icon: <Ruler size={22} />, label: 'Medir' },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setModo(tool.id);
                                setPuntosTemporales([]);
                                if (tool.id !== 'medir') setPuntosMedicion([]);
                            }}
                            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all hover:scale-110 ${
                                modo === tool.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                            title={tool.label}
                        >
                            {tool.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* BOTÓN CENTRAR EN ÚLTIMO POSTE */}
            {postes.length > 0 && (
                <div className="absolute top-6 right-[22rem] z-[1001]">
                    <button
                        onClick={() => {
                            const ultimoPoste = postes[0];
                            setCenterPosition([ultimoPoste.latitud, ultimoPoste.longitud]);
                            if (mapRef.current) {
                                mapRef.current.flyTo([ultimoPoste.latitud, ultimoPoste.longitud], 18);
                            }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 transition shadow-lg"
                    >
                        <Target size={18} />
                        <span>{postes[0]?.codigo || 'Ir a Poste'}</span>
                    </button>
                </div>
            )}

            {/* BUSCADOR */}
            <div className="absolute top-28 right-6 z-[1001] w-80">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-3xl p-3">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Buscar elemento</label>
                    <input
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Código de poste, mufa o caja"
                        value={searchTerm}
                        onChange={(e) => buscarElementos(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="mt-3 max-h-56 overflow-y-auto space-y-2">
                            {searchResults.map(item => (
                                <button
                                    key={`${item.tipo}-${item.id}`}
                                    type="button"
                                    onClick={() => seleccionarElemento(item)}
                                    className="w-full text-left rounded-2xl border border-slate-200 px-3 py-3 hover:bg-slate-100"
                                >
                                    <div className="text-sm font-semibold">{item.codigo}</div>
                                    <div className="text-[11px] text-slate-500">{item.tipo}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <MapContainer center={[-11.92, -76.70]} zoom={16} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />
                <MapPlugins />
                {selectedSearchItem?.position && <MapCenterer position={selectedSearchItem.position} />}
                <MapCenterer position={centerPosition} />

                {/* TRAMOS */}
                {tramos.map((tramo, idx) => {
                    const colores = ['#a855f7', '#ec4899', '#f97316', '#06b6d4', '#8b5cf6'];
                    const color = colores[idx % colores.length];
                    return (
                        <Polyline
                            key={tramo.id}
                            positions={tramo.path}
                            pathOptions={{ color, weight: 6, opacity: 0.8 }}
                        >
                            <Popup>
                                <div className="space-y-1 text-sm">
                                    <div className="font-bold">{tramo.nombre || 'Tramo'}</div>
                                    <div>Tipo: {tramo.tipoCable}</div>
                                </div>
                            </Popup>
                        </Polyline>
                    );
                })}

                {/* POSTES CON MUFAS Y CAJAS */}
                {postes.map((poste) => {
                    const mufasDelPoste = mufas.filter(m => m.posteId === poste.id);
                    const cajasDelPoste = cajas.filter(c => c.posteId === poste.id);

                    return (
                        <div key={`poste-group-${poste.id}`}>
                            {/* Poste principal */}
                            <Marker position={[poste.latitud, poste.longitud]} icon={iconoPoste}>
                                <Popup>
                                    <div className="space-y-2">
                                        <div className="font-bold">Poste {poste.codigo}</div>
                                        <div className="text-sm text-slate-600">Tipo: {poste.tipo}</div>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => abrirInstalacion('mufa', {
                                                    posteId: poste.id,
                                                    coords: { latitud: poste.latitud, longitud: poste.longitud }
                                                })}
                                                className="rounded-2xl bg-orange-500 text-white px-3 py-2 text-xs font-semibold hover:bg-orange-600"
                                            >
                                                Instalar Mufa
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => abrirInstalacion('caja', {
                                                    posteId: poste.id,
                                                    coords: { latitud: poste.latitud, longitud: poste.longitud }
                                                })}
                                                className="rounded-2xl bg-emerald-600 text-white px-3 py-2 text-xs font-semibold hover:bg-emerald-700"
                                            >
                                                Instalar Caja
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* Mufas como burbujas flotantes */}
                            {mufasDelPoste.map((mufa, idx) => {
                                const angle = (idx * 120) * (Math.PI / 180);
                                const distance = 0.0003;
                                return (
                                    <Marker
                                        key={`mufa-bubble-${mufa.id}`}
                                        position={[poste.latitud + distance * Math.cos(angle), poste.longitud + distance * Math.sin(angle)]}
                                        icon={L.divIcon({
                                            className: 'custom-bubble-icon',
                                            html: `<div style="background:linear-gradient(135deg,#c2410c,#f97316);width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);border:3px solid white;font-size:24px;font-weight:900;color:white;">M</div>`,
                                            iconSize: [42, 42],
                                            iconAnchor: [21, 21],
                                            popupAnchor: [0, -21]
                                        })}
                                    >
                                        <Popup>
                                            <div className="text-sm space-y-2">
                                                <div className="font-bold text-orange-600">Mufa {mufa.codigo}</div>
                                                <div className="text-xs">Ratio: {mufa.ratioSplitteo}</div>
                                                <div className="flex gap-2 mt-2">
                                                    <button onClick={() => abrirFormulario('mufa', mufa)} className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">Editar</button>
                                                    <button onClick={() => { if(window.confirm('¿Eliminar?')) eliminarMufa(mufa.id); }} className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs">Eliminar</button>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* Cajas como burbujas flotantes */}
                            {cajasDelPoste.map((caja, idx) => {
                                const angle = (idx * 120 + 60) * (Math.PI / 180);
                                const distance = 0.0003;
                                return (
                                    <Marker
                                        key={`caja-bubble-${caja.id}`}
                                        position={[poste.latitud + distance * Math.cos(angle), poste.longitud + distance * Math.sin(angle)]}
                                        icon={L.divIcon({
                                            className: 'custom-bubble-icon',
                                            html: `<div style="background:linear-gradient(135deg,#166534,#4ade80);width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);border:3px solid white;font-size:24px;font-weight:900;color:white;">C</div>`,
                                            iconSize: [42, 42],
                                            iconAnchor: [21, 21],
                                            popupAnchor: [0, -21]
                                        })}
                                    >
                                        <Popup>
                                            <div className="text-sm space-y-2">
                                                <div className="font-bold text-emerald-600">Caja {caja.codigo}</div>
                                                <div className="text-xs">Puertos: {caja.puertosLibres}</div>
                                                <div className="flex gap-2 mt-2">
                                                    <button onClick={() => abrirFormulario('caja', caja)} className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">Editar</button>
                                                    <button onClick={() => { if(window.confirm('¿Eliminar?')) eliminarCaja(caja.id); }} className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs">Eliminar</button>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </div>
                    );
                })}

                {/* MUFAS independientes */}
                {mufas.map(mufa => (
                    <Marker key={`mufa-${mufa.id}`} position={[mufa.latitud, mufa.longitud]} icon={iconoMufa}>
                        <Popup>
                            <div className="text-sm space-y-2">
                                <div className="font-bold">Mufa {mufa.codigo}</div>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => abrirFormulario('mufa', mufa)} className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">Editar</button>
                                    <button onClick={() => { if(window.confirm('¿Eliminar?')) eliminarMufa(mufa.id); }} className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs">Eliminar</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* CAJAS independientes */}
                {cajas.map(caja => (
                    <Marker key={`caja-${caja.id}`} position={[caja.latitud, caja.longitud]} icon={iconoCaja}>
                        <Popup>
                            <div className="text-sm space-y-2">
                                <div className="font-bold">Caja {caja.codigo}</div>
                                <div className="text-xs">Puertos: {caja.puertosLibres}</div>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => abrirFormulario('caja', caja)} className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">Editar</button>
                                    <button onClick={() => { if(window.confirm('¿Eliminar?')) eliminarCaja(caja.id); }} className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs">Eliminar</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Marcador de ubicación de búsqueda */}
                {ubicacionBusqueda && (
                    <Marker
                        position={[ubicacionBusqueda.lat, ubicacionBusqueda.lng]}
                        icon={L.icon({
                            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiBmaWxsPSIjMTBiOTgxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                        })}
                    >
                        <Popup>Ubicacion de búsqueda</Popup>
                    </Marker>
                )}

                {/* Línea temporal de tramo */}
                {puntosTemporales.length > 1 && (
                    <Polyline positions={puntosTemporales} pathOptions={{ color: '#c026d3', weight: 6, dashArray: '8,5' }} />
                )}

                {/* Línea de medición */}
                {puntosMedicion.length > 1 && (
                    <Polyline positions={puntosMedicion} pathOptions={{ color: '#eab308', weight: 5, dashArray: '10,8' }} />
                )}
            </MapContainer>

            {/* BARRA INFERIOR DE ESTADO */}
            {modo !== 'select' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[1001]">
                    <span className="font-bold uppercase tracking-widest text-xs">MODO:</span>
                    <span className="text-blue-400 font-semibold">{modo.toUpperCase()}</span>
                    {modo === 'tramo' && puntosTemporales.length >= 2 && (
                        <button onClick={finalizarTramo} className="ml-4 bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-sm font-medium">Finalizar Tramo</button>
                    )}
                    {modo === 'poste' && (
                        <span className="ml-4 text-emerald-300 text-sm">Haz clic en el mapa para crear un poste</span>
                    )}
                    {modo === 'medir' && (
                        <>
                            <span className="ml-4 text-yellow-400 font-medium">Distancia: {calcularDistanciaTotal()} km</span>
                            <button onClick={() => setPuntosMedicion([])} className="ml-4 text-yellow-400 hover:text-yellow-300">
                                <Trash2 size={20} />
                            </button>
                        </>
                    )}
                    <button onClick={() => { setModo('select'); setPuntosTemporales([]); setPuntosMedicion([]); }} className="ml-auto text-red-400 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>
            )}

            {/* FORMULARIOS */}
            {formAbierto && formType === 'mufa' && <FormMufa data={formData} onCancel={() => setFormAbierto(false)} />}
            {formAbierto && formType === 'caja' && <FormCaja data={formData} mufas={mufas} onCancel={() => setFormAbierto(false)} />}
            {formAbierto && formType === 'poste' && <FormPoste data={formData} onCancel={() => setFormAbierto(false)} />}
        </div>
    );
};

export default MapaPrincipal;
