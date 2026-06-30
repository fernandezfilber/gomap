// src/components/Map/MapaPrincipal.jsx
import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl, LayerGroup, ZoomControl } from 'react-leaflet';
import { X, Trash2, Ruler, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet-polylineoffset';
import toast from 'react-hot-toast';

import useProyectos from '../../hooks/useProyectos';
import usePostes from '../../hooks/usePostes';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';
import useCajas from '../../hooks/useCajas';
import useClientes from '../../hooks/useClientes';

import {
    iconoPoste,
    iconoPosteOcupado,
    iconoMufa,
    iconoCaja,
    iconoCliente
} from '../../utils/mapIcons';

import FormMufa from '../forms/FormMufa';
import FormCaja from '../forms/FormCaja';
import FormCajaRapida from '../forms/FormCajaRapida';
import FormCliente from '../forms/FormCliente';
import FormTramo from '../forms/FormTramo';
import FormOpcionesContinuar from '../forms/FormOpcionesContinuar';
import SearchCajaCercana from '../modals/SearchCajaCercana';
import MatrizEmpalmes from '../modals/MatrizEmpalmes';

const MapaPrincipal = ({ modo = 'select', setModo = () => { }, medirDistancia, setMedirDistancia }) => {
    const [puntosTemporales, setPuntosTemporales] = useState([]);
    const [colorTramoTemporal, setColorTramoTemporal] = useState('#ef4444');
    const [modal, setModal] = useState({ show: false, type: null, data: null });
    const [puntosDistancia, setPuntosDistancia] = useState([]);

    const { proyectoSeleccionado } = useProyectos();
    const { postes, crearPoste, eliminarPoste } = usePostes(proyectoSeleccionado?.id);
    const { tramos, crearTramo, eliminarTramo, actualizarTramo } = useTramos(proyectoSeleccionado?.id);
    const { mufas, crearMufa, eliminarMufa, actualizarMufa } = useMufas(proyectoSeleccionado?.id);
    const { cajas, crearCaja, eliminarCaja, actualizarCaja, fetchCajas } = useCajas(proyectoSeleccionado?.id);
    const { clientes, crearCliente, eliminarCliente, actualizarCliente } = useClientes(proyectoSeleccionado?.id);

    const [cajaResaltada, setCajaResaltada] = useState(null);
    const [puntoVerificado, setPuntoVerificado] = useState(null);
    const [nodoInicio, setNodoInicio] = useState(null);
    const [nodoFin, setNodoFin] = useState(null);
    const [tramoBaseParaContinuar, setTramoBaseParaContinuar] = useState(null);

    const markerRefs = useRef(new window.Map());
    const mapRef = useRef(null);
    const inicializadoRef = useRef(false);

    const esCoordenadaValida = (lat, lng) => {
        const l = parseFloat(lat);
        const g = parseFloat(lng);
        return !isNaN(l) && !isNaN(g);
    };

    // Debug de datos
    useEffect(() => {
        console.log("🔍 DIAGNÓSTICO GIS:");
        console.log("Postes:", postes.length);
        console.log("Cajas:", cajas.length);
        console.log("Mufas:", mufas.length);
        if (cajas.length > 0) {
            console.log("Ejemplo Caja:", cajas[0].codigo, "Lat:", cajas[0].latitud, "Lng:", cajas[0].longitud);
        }
    }, [postes, cajas, mufas]);

    // ==================== AUTO-CENTRAR AL INICIO ====================
    useEffect(() => {
        if (!inicializadoRef.current && mapRef.current) {
            // Revisar si viene de URL (ej. ?lat=x&lng=y)
            const params = new URLSearchParams(window.location.search);
            const urlLat = params.get('lat');
            const urlLng = params.get('lng');
            
            if (urlLat && urlLng && esCoordenadaValida(urlLat, urlLng)) {
                mapRef.current.setView([parseFloat(urlLat), parseFloat(urlLng)], 20);
                inicializadoRef.current = true;
                return;
            }

            if (postes.length > 0 || cajas.length > 0) {
                const coords = [];
                postes.forEach(p => { if (esCoordenadaValida(p.latitud, p.longitud)) coords.push([parseFloat(p.latitud), parseFloat(p.longitud)]); });
                cajas.forEach(c => { if (esCoordenadaValida(c.latitud, c.longitud)) coords.push([parseFloat(c.latitud), parseFloat(c.longitud)]); });
                if (coords.length > 0) {
                    const bounds = L.latLngBounds(coords);
                    mapRef.current.fitBounds(bounds, { padding: [100, 100], maxZoom: 18 });
                    inicializadoRef.current = true;
                }
            }
        }
    }, [postes, cajas]);

    // ==================== ESCUCHAR EVENTOS GLOBALES ====================
    useEffect(() => {
        const handleVerificarPunto = (e) => {
            const { lat, lng, res } = e.detail;
            setPuntoVerificado({ lat, lng });
            if (mapRef.current) mapRef.current.flyTo([lat, lng], 19, { animate: true });
            if (res?.cajaMasCercana) {
                setCajaResaltada(res.cajaMasCercana);
                setTimeout(() => {
                    const marker = markerRefs.current.get(res.cajaMasCercana.id);
                    if (marker) marker.openPopup();
                }, 1500);
            }
        };

        const handleCajaSeleccionada = (e) => {
            const caja = e.detail;
            if (!esCoordenadaValida(caja.latitud, caja.longitud)) return;
            setCajaResaltada(caja);
            if (mapRef.current) {
                mapRef.current.flyTo([parseFloat(caja.latitud), parseFloat(caja.longitud)], 21, { animate: true });
                setTimeout(() => {
                    const marker = markerRefs.current.get(caja.id);
                    if (marker) marker.openPopup();
                }, 1200);
            }
        };

        const handleAbrirBusqueda = () => setModal({ show: true, type: 'search', data: null });

        const handleBuscarPorCodigo = (e) => {
            const query = e.detail?.trim();
            if (!query) return;

            // 1. Check if it's a coordinate or Google Maps link
            // Extracts two floats separated by space, comma, or %2C
            const decodedQuery = decodeURIComponent(query);
            const coordRegex = /(-?\d{1,3}\.\d+)[\s,]+(-?\d{1,3}\.\d+)/;
            const match = decodedQuery.match(coordRegex);

            if (match && match[1] && match[2]) {
                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);
                if (esCoordenadaValida(lat, lng) && mapRef.current) {
                    mapRef.current.flyTo([lat, lng], 20, { animate: true });
                    toast.success('Ubicación encontrada');
                    // Add a temporary marker for 5 seconds
                    const tempId = 'temp-' + Date.now();
                    const marker = L.marker([lat, lng]).addTo(mapRef.current);
                    marker.bindPopup("<b>Coordenada Buscada</b>").openPopup();
                    setTimeout(() => mapRef.current.removeLayer(marker), 5000);
                    return; // Exit after flying to coords
                }
            }

            // 2. Normal text search
            const q = query.toLowerCase();
            const target = postes.find(p => p.codigo?.toLowerCase().includes(q)) || 
                           cajas.find(c => c.codigo?.toLowerCase().includes(q)) || 
                           mufas.find(m => m.codigo?.toLowerCase().includes(q)) || 
                           clientes.find(cl => cl.nombre?.toLowerCase().includes(q) || cl.dni?.includes(q));
            
            if (target) {
                const lat = target.latitud || target.lat;
                const lng = target.longitud || target.lng;
                if (esCoordenadaValida(lat, lng)) {
                    if (mapRef.current) {
                        mapRef.current.flyTo([parseFloat(lat), parseFloat(lng)], 20, { animate: true });
                        setTimeout(() => {
                            const marker = markerRefs.current.get(target.id);
                            if (marker) marker.openPopup();
                        }, 1200);
                    }
                }
            } else {
                toast.error('No se encontró el código ni la coordenada');
            }
        };

        window.addEventListener('verificarPunto', handleVerificarPunto);
        window.addEventListener('cajaSeleccionada', handleCajaSeleccionada);
        window.addEventListener('abrirBusquedaAvanzada', handleAbrirBusqueda);
        window.addEventListener('buscarPorCodigo', handleBuscarPorCodigo);

        return () => {
            window.removeEventListener('verificarPunto', handleVerificarPunto);
            window.removeEventListener('cajaSeleccionada', handleCajaSeleccionada);
            window.removeEventListener('abrirBusquedaAvanzada', handleAbrirBusqueda);
            window.removeEventListener('buscarPorCodigo', handleBuscarPorCodigo);
        };
    }, [postes, cajas, mufas, clientes]);

    useEffect(() => {
        const handleImprimir = () => {
            if (!mapRef.current) return;
            const coords = [];
            postes.forEach(p => { if (esCoordenadaValida(p.latitud, p.longitud)) coords.push([parseFloat(p.latitud), parseFloat(p.longitud)]); });
            if (coords.length > 0) {
                mapRef.current.fitBounds(L.latLngBounds(coords), { padding: [50, 50] });
                setTimeout(() => window.print(), 1500);
            } else window.print();
        };
        window.addEventListener('imprimirTodoElSector', handleImprimir);
        return () => window.removeEventListener('imprimirTodoElSector', handleImprimir);
    }, [postes]);

    const handleMiUbicacion = () => {
        if (!mapRef.current) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 18);
        }, (err) => alert("No se pudo obtener la ubicación"));
    };

    const getPosteIcon = (posteId) => {
        const tieneMufa = mufas.some(m => m.posteId === posteId);
        const tieneCaja = cajas.some(c => c.posteId === posteId);
        return (tieneMufa || tieneCaja) ? iconoPosteOcupado : iconoPoste;
    };

    const actualizarIconoPoste = (posteId) => {
        const marker = markerRefs.current.get(posteId);
        if (marker) marker.setIcon(getPosteIcon(posteId));
    };

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI / 180;
        const dLon = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(parseFloat(lat1) * Math.PI / 180) * Math.cos(parseFloat(lat2) * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const calcularCajaMasCercana = useCallback((lat, lng) => {
        if (!lat || !lng || !cajas?.length) return null;
        let masCercana = null; let dMin = Infinity;
        cajas.forEach((c) => {
            if (!esCoordenadaValida(c.latitud, c.longitud)) return;
            const d = calcularDistancia(lat, lng, c.latitud, c.longitud);
            if (d < dMin) { dMin = d; masCercana = c; }
        });
        return masCercana;
    }, [cajas]);

    const getOffset = useCallback((tramo) => {
        if (!tramo.posteInicioId || !tramo.posteFinId) return 0;
        const hermanos = tramos.filter(t => 
            (t.posteInicioId === tramo.posteInicioId && t.posteFinId === tramo.posteFinId) ||
            (t.posteInicioId === tramo.posteFinId && t.posteFinId === tramo.posteInicioId)
        );
        hermanos.sort((a,b) => a.id.localeCompare(b.id));
        const index = hermanos.findIndex(t => t.id === tramo.id);
        return index * 8; // 8px separation
    }, [tramos]);

    const MapEvents = () => {
        const map = useMap();
        mapRef.current = map;
        useEffect(() => {
            const handleClick = (e) => {
                if (e.originalEvent.button === 2) { e.originalEvent.preventDefault(); setModal({ show: true, type: 'cliente', data: { latitud: e.latlng.lat, longitud: e.latlng.lng } }); return; }
                if (medirDistancia) { setPuntosDistancia(prev => [...prev, [e.latlng.lat, e.latlng.lng]]); return; }
                if ((modo === 'tramo' || e.originalEvent?.shiftKey) && proyectoSeleccionado) {
                    const p = postes.find(p => esCoordenadaValida(p.latitud, p.longitud) && calcularDistancia(e.latlng.lat, e.latlng.lng, p.latitud, p.longitud) * 1000 <= 15);
                    if (p) {
                        if (puntosTemporales.length === 0) setNodoInicio({ id: p.id, tipo: 'poste' }); else setNodoFin({ id: p.id, tipo: 'poste' });
                        setPuntosTemporales(prev => [...prev, [parseFloat(p.latitud), parseFloat(p.longitud)]]);
                    } else setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                    return;
                }
                if (modo === 'poste' && proyectoSeleccionado) crearPoste({ codigo: `P-${Date.now().toString().slice(-5)}`, latitud: e.latlng.lat, longitud: e.latlng.lng, tipo: 'CONCRETO', proyectoId: proyectoSeleccionado.id });
            };
            map.on('click', handleClick); map.on('contextmenu', handleClick);
            return () => { map.off('click', handleClick); map.off('contextmenu', handleClick); };
        }, [modo, medirDistancia, postes, puntosTemporales, proyectoSeleccionado]);
        return null;
    };

    const posteParaCentrar = [...postes].reverse().find(p => esCoordenadaValida(p.latitud, p.longitud));
    const mapCenter = posteParaCentrar ? [parseFloat(posteParaCentrar.latitud), parseFloat(posteParaCentrar.longitud)] : [-11.95, -76.72];

    return (
        <div className="relative h-full w-full bg-slate-950">
            {/* Stats Flotantes */}
            <div className="hidden md:block absolute top-4 left-4 lg:top-6 lg:left-6 z-[1001] bg-slate-950/80 backdrop-blur-xl border border-white/10 p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white max-w-[160px] lg:max-w-xs rounded-[2rem]">
                <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><p className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">RED ACTIVA</p></div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    <div><p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Postes</p><p className="text-white font-black">{postes.length}</p></div>
                    <div><p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Cajas</p><p className="text-white font-black">{cajas.length}</p></div>
                    <div><p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Mufas</p><p className="text-white font-black">{mufas.length}</p></div>
                    <div><p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Clientes</p><p className="text-white font-black">{clientes.length}</p></div>
                </div>
            </div>

            {/* Medidor Distancia */}
            {medirDistancia && puntosDistancia.length > 0 && (
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-[1002] bg-blue-600/10 backdrop-blur-xl border border-blue-500/30 px-6 py-5 rounded-[2rem] text-white shadow-2xl min-w-[220px]">
                    <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div><p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">DISTANCIA TOTAL</p></div>
                    <div className="flex items-baseline gap-1"><span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">{(puntosDistancia.length > 1 ? puntosDistancia.reduce((acc, p, i) => i === 0 ? 0 : acc + calcularDistancia(puntosDistancia[i-1][0], puntosDistancia[i-1][1], p[0], p[1]), 0) * 1000 : 0).toFixed(2)}</span><span className="text-lg font-bold text-blue-500">m</span></div>
                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex flex-col"><span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Nodos</span><span className="text-xs font-bold text-white">{puntosDistancia.length}</span></div>
                        <button onClick={() => setPuntosDistancia([])} className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-2.5 px-5 rounded-xl">Reiniciar</button>
                    </div>
                </div>
            )}

            <button onClick={handleMiUbicacion} className="absolute top-24 right-4 z-[1001] bg-slate-900/80 backdrop-blur p-3 rounded-full shadow-xl hover:bg-slate-800 transition-all text-blue-500 border border-slate-700/50" title="Mi Ubicación"><Navigation size={20} fill="currentColor" /></button>

            <MapContainer center={mapCenter} zoom={18} maxZoom={22} className="h-full w-full" zoomControl={false}>
                <ZoomControl position="bottomright" />
                <LayersControl position="bottomright">
                    <LayersControl.BaseLayer checked name="Google Satélite + Calles"><TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} /></LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Google Street"><TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" attribution='&copy; Google Maps' maxZoom={22} maxNativeZoom={20} /></LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap"><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' maxZoom={22} /></LayersControl.BaseLayer>
                    
                    <LayersControl.Overlay checked name="Postes"><LayerGroup>{postes.filter(p => esCoordenadaValida(p.latitud, p.longitud)).map(p => (<Marker key={p.id} position={[parseFloat(p.latitud), parseFloat(p.longitud)]} icon={getPosteIcon(p.id)} ref={el => el ? markerRefs.current.set(p.id, el) : markerRefs.current.delete(p.id)} eventHandlers={{ click: (e) => { if (modo === 'tramo' || e.originalEvent?.shiftKey) { L.DomEvent.stopPropagation(e); if (puntosTemporales.length === 0) setNodoInicio({ id: p.id, tipo: 'poste' }); else setNodoFin({ id: p.id, tipo: 'poste' }); setPuntosTemporales(prev => [...prev, [parseFloat(p.latitud), parseFloat(p.longitud)]]); } } }}><Popup><div className="text-center p-2"><p className="font-bold mb-2">Poste: {p.codigo}</p><div className="flex gap-2"><button onClick={() => setModal({ show: true, type: 'mufa', data: { posteId: p.id, latitud: p.latitud, longitud: p.longitud } })} className="bg-orange-600 text-white px-2 py-1 rounded text-xs">+Mufa</button><button onClick={() => setModal({ show: true, type: 'caja_rapida', data: { posteId: p.id, latitud: p.latitud, longitud: p.longitud } })} className="bg-emerald-600 text-white px-2 py-1 rounded text-xs">+Caja</button></div><button onClick={() => eliminarPoste(p.id)} className="mt-4 text-red-500 text-xs">Eliminar Poste</button></div></Popup></Marker>))}</LayerGroup></LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Cables"><LayerGroup>{tramos.map(t => (<Polyline key={t.id} positions={t.path} pathOptions={{ color: t.colorVisual || '#ef4444', weight: 5, opacity: 0.9, offset: getOffset(t) }}><Popup><div className="text-center min-w-[180px] p-2"><p className="font-bold text-lg text-emerald-500 mb-1">{t.nombre || `Tramo ${t.id.slice(0,6)}`}</p><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-4">{t.capacidadHilos || 48} Hilos Totales</p><div className="flex flex-col gap-3"><button onClick={() => { setTramoBaseParaContinuar(t); setPuntosTemporales([t.path[t.path.length - 1]]); setNodoInicio({ id: t.posteFinId || t.posteInicioId, tipo: 'poste' }); setModo('tramo'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm w-full shadow-lg shadow-emerald-600/30">Continuar Tramo</button><button onClick={() => eliminarTramo(t.id)} className="text-red-500 hover:text-red-400 font-bold text-sm border border-red-500/50 hover:bg-red-50/10 rounded-xl py-2 w-full transition-colors">Eliminar</button></div></div></Popup></Polyline>))}</LayerGroup></LayersControl.Overlay>
                    
                    <LayersControl.Overlay checked name="Mufas"><LayerGroup>{mufas.filter(m => esCoordenadaValida(m.latitud, m.longitud)).map(m => (
                        <Marker key={m.id} position={[parseFloat(m.latitud), parseFloat(m.longitud)]} icon={iconoMufa} ref={el => el ? markerRefs.current.set(m.id, el) : markerRefs.current.delete(m.id)}>
                            <Popup><div className="text-center p-3"><p className="font-bold text-orange-400 text-xl mb-1">🌀 Mufa: {m.codigo}</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Splitter: {m.ratioSplitteo || 'N/A'}</p>{(() => { const cap = parseInt((m.ratioSplitteo || '1:16').split(':')[1]) || 16; const ocu = (cajas || []).filter(c => c.mufaId === m.id).length; const libre = cap - ocu; return <p className={`text-xs font-black mb-2 ${libre <= 0 ? 'text-red-400' : libre <= 2 ? 'text-yellow-400' : 'text-emerald-400'}`}>Hilos: {ocu}/{cap} usados ({libre} libres)</p>; })()}<div className="flex gap-2 mt-4"><button onClick={() => setModal({ show: true, type: 'mufa', data: m })} className="flex-1 bg-orange-600 text-white py-2 px-1 rounded-xl text-xs font-bold">Editar</button><button onClick={() => setModal({ show: true, type: 'matriz_empalmes', data: { nodoId: m.id, tipoNodo: 'MUFA' } })} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-1 rounded-xl text-xs font-bold transition-colors">Empalmes</button><button onClick={() => eliminarMufa(m.id)} className="flex-1 bg-red-600 text-white py-2 px-1 rounded-xl text-xs font-bold">Borrar</button></div></div></Popup>
                        </Marker>
                    ))}</LayerGroup></LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Cajas"><LayerGroup>{cajas.filter(c => esCoordenadaValida(c.latitud, c.longitud)).map(c => (
                        <Marker key={c.id} position={[parseFloat(c.latitud), parseFloat(c.longitud)]} icon={iconoCaja} ref={el => el ? markerRefs.current.set(c.id, el) : markerRefs.current.delete(c.id)} zIndexOffset={cajaResaltada?.id === c.id ? 5000 : 1000}>
                            <Popup>
                                <div className="text-center p-3">
                                    <p className="font-bold text-emerald-400 text-xl mb-1">📦 Caja: {c.codigo}</p>
                                    <div className="mb-3 space-y-1">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Empresa: <span className="text-white">{c.poste?.proyecto?.empresa?.nombre || 'N/A'}</span></p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hilo: <span className="text-emerald-400">{c.colorHiloCaja || 'Azul'}</span></p>
                                        {c.mufa && <p className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">Mufa: {c.mufa.codigo}</p>}
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Puertos: <span className="text-white">{c.puertosLibres}/{c.capacidadTotal}</span></p>
                                    </div>
                                    <div className="flex gap-2 justify-center mt-4">
                                        <button onClick={() => setModal({ show: true, type: 'caja', data: c })} className="flex-1 text-xs font-bold text-blue-500 hover:text-blue-400">Editar</button>
                                        <button onClick={() => setModal({ show: true, type: 'matriz_empalmes', data: { nodoId: c.id, tipoNodo: 'CAJA' } })} className="flex-1 text-xs font-bold bg-blue-600 text-white rounded px-2 py-1">Empalmes</button>
                                        <button onClick={() => eliminarCaja(c.id)} className="flex-1 text-xs font-bold text-red-500 hover:text-red-400"><Trash2 size={14} className="inline" /> Borrar</button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}</LayerGroup></LayersControl.Overlay>
                    
                    <LayersControl.Overlay checked name="Clientes">
                        <LayerGroup>
                            {clientes.filter(cl => esCoordenadaValida(cl.latitud, cl.longitud)).map(cl => {
                                const caja = cajas.find(c => c.id === cl.cajaId || c.id === cl.caja?.id);
                                return (
                                    <Fragment key={cl.id}>
                                        <Marker position={[parseFloat(cl.latitud), parseFloat(cl.longitud)]} icon={iconoCliente} ref={el => el ? markerRefs.current.set(cl.id, el) : markerRefs.current.delete(cl.id)}>
                                            <Popup>
                                                <div className="text-center">
                                                    <p className="font-bold text-violet-400 text-xl mb-1">{cl.nombre}</p>
                                                    <p className="text-xs text-slate-500">{cl.dni}</p>
                                                    <div className="flex gap-3 mt-4">
                                                        <button onClick={() => setModal({ show: true, type: 'cliente', data: cl })} className="flex-1 bg-violet-600 text-white py-2 rounded-xl text-xs">Editar</button>
                                                        <button onClick={() => eliminarCliente(cl.id)} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-xs">Eliminar</button>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                        {caja && esCoordenadaValida(caja.latitud, caja.longitud) && (
                                            <Polyline 
                                                positions={[
                                                    [parseFloat(caja.latitud), parseFloat(caja.longitud)], 
                                                    [parseFloat(cl.latitud), parseFloat(cl.longitud)]
                                                ]} 
                                                pathOptions={{ color: '#8b5cf6', weight: 3, dashArray: '5, 5', opacity: 0.7 }} 
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                <MapEvents />
                {puntoVerificado && (<Marker position={[puntoVerificado.lat, puntoVerificado.lng]} icon={L.divIcon({ html: `<div class="no-print animate-bounce bg-[#00E5FF] p-2 rounded-full border-2 border-white shadow-lg shadow-[#00E5FF]/50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>`, className: 'custom-div-icon', iconSize: [40, 40], iconAnchor: [20, 40] })} />)}
                {puntosTemporales.length > 1 && <Polyline positions={puntosTemporales} pathOptions={{ color: colorTramoTemporal, weight: 6, opacity: 0.85, dashArray: '8, 6' }} />}
                {medirDistancia && puntosDistancia.length > 1 && <Polyline positions={puntosDistancia} pathOptions={{ color: '#ec4899', weight: 5, dashArray: '10, 5' }} />}
            </MapContainer>

            {puntosTemporales.length > 0 && (
                <div className="absolute bottom-36 lg:bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-4 py-3 lg:px-8 lg:py-5 shadow-2xl flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 lg:gap-5 z-[1001] rounded-2xl lg:rounded-[2rem] w-[90%] max-w-[320px] lg:max-w-max">
                    <span className="font-bold uppercase tracking-widest text-[10px] lg:text-xs text-slate-400 w-full lg:w-auto text-center">TRAMO EN PROGRESO</span>
                    <input type="color" value={colorTramoTemporal} onChange={(e) => setColorTramoTemporal(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                    <button onClick={() => { 
                        if (puntosTemporales.length < 2 || !nodoInicio || !nodoFin) return alert('Datos incompletos');
                        if (tramoBaseParaContinuar) {
                            setModal({ show: true, type: 'opciones_continuar', data: { tramoBase: tramoBaseParaContinuar, nuevosPuntos: puntosTemporales, nuevoFin: nodoFin } });
                        } else {
                            setModal({ show: true, type: 'tramo', data: { path: puntosTemporales, proyectoId: proyectoSeleccionado.id, posteInicioId: nodoInicio.id, posteFinId: nodoFin.id, colorVisual: colorTramoTemporal } });
                        }
                    }} className="bg-violet-600 hover:bg-violet-700 px-4 py-2 lg:px-8 lg:py-3 rounded-xl font-bold transition-all text-sm lg:text-base">Finalizar Tramo</button>
                    <button onClick={() => { setPuntosTemporales([]); setNodoInicio(null); setNodoFin(null); setTramoBaseParaContinuar(null); setModo('select'); }} className="text-red-400 hover:text-red-300 ml-auto lg:ml-0"><X size={24} className="lg:w-7 lg:h-7" /></button>
                </div>
            )}

            {modal.show && (
                <div className="fixed inset-0 bg-black/80 z-[1003] flex items-center justify-center p-4 backdrop-blur-sm">
                    {modal.type === 'mufa' && <FormMufa data={modal.data} cajas={cajas} onCancel={() => setModal({show:false})} onSuccess={() => actualizarIconoPoste(modal.data?.posteId)} crearMufa={crearMufa} actualizarMufa={actualizarMufa} />}
                    {modal.type === 'caja' && <FormCaja data={modal.data} mufas={mufas} cajas={cajas} onCancel={() => setModal({show:false})} onSuccess={() => { fetchCajas(); actualizarIconoPoste(modal.data?.posteId); setModal({show:false}); }} crearCaja={crearCaja} actualizarCaja={actualizarCaja} />}
                    {modal.type === 'caja_rapida' && <FormCajaRapida coordenadas={{ latitud: modal.data.latitud, longitud: modal.data.longitud }} posteId={modal.data.posteId} onCancel={() => setModal({show:false})} onSuccess={() => { fetchCajas(); setModal({show:false}); }} />}
                    {modal.type === 'cliente' && <FormCliente data={modal.data} cajas={cajas} calcularCajaMasCercana={calcularCajaMasCercana} crearCliente={crearCliente} actualizarCliente={actualizarCliente} eliminarCliente={eliminarCliente} onCancel={() => setModal({show:false})} onSuccess={() => setModal({show:false})} />}
                    {modal.type === 'tramo' && <FormTramo data={modal.data} onCancel={() => setModal({show:false})} onSubmit={(datosCompletos) => {
                        crearTramo(datosCompletos).then(() => {
                            setPuntosTemporales([]); setNodoInicio(null); setNodoFin(null); setModo('select'); setModal({show:false});
                        }).catch(err => alert(err.message));
                    }} />}
                    {modal.type === 'search' && <SearchCajaCercana onClose={() => setModal({show:false})} />}
                    {modal.type === 'matriz_empalmes' && <MatrizEmpalmes nodoId={modal.data.nodoId} tipoNodo={modal.data.tipoNodo} onCancel={() => setModal({show:false})} />}
                    {modal.type === 'opciones_continuar' && <FormOpcionesContinuar 
                        data={modal.data} 
                        onCancel={() => setModal({show:false})}
                        onExtender={async () => {
                            try {
                                const tb = modal.data.tramoBase;
                                const mergedPath = [...tb.path, ...modal.data.nuevosPuntos.slice(1)];
                                await actualizarTramo(tb.id, {
                                    path: mergedPath,
                                    posteFinId: modal.data.nuevoFin.id
                                });
                                setPuntosTemporales([]); setNodoInicio(null); setNodoFin(null); setTramoBaseParaContinuar(null); setModo('select'); setModal({show:false});
                            } catch (e) { alert(e.message); }
                        }}
                        onPonerMufa={async (datosNuevoTramo, tipoElegido) => {
                            try {
                                const tb = modal.data.tramoBase;
                                const p = postes.find(po => po.id === tb.posteFinId || po.id === tb.posteInicioId);
                                await crearMufa({
                                    posteId: p.id,
                                    troncalId: tb.id,
                                    codigo: `MUFA-${Date.now().toString().slice(-6)}`,
                                    ratioSplitteo: tipoElegido === 'mufa_pase' ? 'PASE' : '1:16',
                                    hilosTotales: 16,
                                    hilosOcupados: 0,
                                    color: 'Naranja',
                                    latitud: p.latitud,
                                    longitud: p.longitud
                                });
                                await crearTramo(datosNuevoTramo);
                                setPuntosTemporales([]); setNodoInicio(null); setNodoFin(null); setTramoBaseParaContinuar(null); setModo('select'); setModal({show:false});
                            } catch (e) { alert(e.message); }
                        }}
                    />}
                </div>
            )}
        </div>
    );
};

export default MapaPrincipal;
