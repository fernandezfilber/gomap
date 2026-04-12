import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import { MapPin, Share2, Box, Database, Users, X, Ruler, Trash2 } from 'lucide-react';

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
    const [modo, setModo] = useState('select'); // select, poste, tramo, mufa, caja, medir
    const [puntosTemporales, setPuntosTemporales] = useState([]);        // Para dibujar tramo
    const [puntosMedicion, setPuntosMedicion] = useState([]);           // Para modo medir
    const [formAbierto, setFormAbierto] = useState(false);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);

    // Hooks
    const { proyectos, proyectoSeleccionado, setProyectoSeleccionado } = useProyectos();
    const { postes, crearPoste } = usePostes();
    const { tramos, crearTramo } = useTramos(proyectoSeleccionado?.id);
    const { mufas } = useMufas(proyectoSeleccionado?.id);
    const { cajas } = useCajas(proyectoSeleccionado?.id);

    // ==================== CALCULAR DISTANCIA ====================
    const calcularDistanciaTotal = () => {
        if (puntosMedicion.length < 2) return 0;
        
        let total = 0;
        for (let i = 1; i < puntosMedicion.length; i++) {
            const prev = puntosMedicion[i-1];
            const curr = puntosMedicion[i];
            const distancia = L.latLng(prev).distanceTo(curr); // en metros
            total += distancia;
        }
        return (total / 1000).toFixed(3); // en kilómetros
    };

    // ==================== DETECTOR DE CLICS ====================
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (modo === 'poste') {
                    abrirFormulario('poste', {
                        isNew: true,
                        coords: { latitud: e.latlng.lat, longitud: e.latlng.lng }
                    });
                }

                if (modo === 'tramo') {
                    setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                }

                if (modo === 'medir') {
                    setPuntosMedicion(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                }
            }
        });
        return null;
    };

    const finalizarTramo = () => {
        if (puntosTemporales.length >= 2) {
            crearTramo({
                path: puntosTemporales,
                proyectoId: proyectoSeleccionado?.id,
            });
            setPuntosTemporales([]);
            setModo('select');
        }
    };

    const limpiarMedicion = () => {
        setPuntosMedicion([]);
    };

    const abrirFormulario = (tipo, datos = {}) => {
        setFormType(tipo);
        setFormData(datos);
        setFormAbierto(true);
        setModo('select');
    };

    return (
        <div className="relative h-screen w-full bg-slate-950">
            
            {/* TOOLBOX */}
            <div className="absolute top-6 left-6 z-[1001]">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-3xl p-3 flex flex-col gap-2">
                    {[
                        { id: 'select', icon: <MapPin size={22} />, label: 'Navegar' },
                        { id: 'poste', icon: <MapPin size={22} />, label: 'Nuevo Poste' },
                        { id: 'tramo', icon: <Share2 size={22} />, label: 'Jalar Fibra' },
                        { id: 'mufa', icon: <Database size={22} />, label: 'Instalar Mufa' },
                        { id: 'caja', icon: <Box size={22} />, label: 'Instalar Caja' },
                        { id: 'medir', icon: <Ruler size={22} />, label: 'Medir Distancia' },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setModo(tool.id);
                                setPuntosTemporales([]);
                                if (tool.id !== 'medir') setPuntosMedicion([]);
                            }}
                            className={`w-14 h-14 flex flex-col items-center justify-center rounded-2xl transition-all hover:scale-110 ${
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

            {/* SELECTOR DE PROYECTO */}
            <div className="absolute top-6 right-6 z-[1001]">
                <select
                    className="bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-3 w-80 focus:outline-none focus:border-blue-500"
                    value={proyectoSeleccionado?.id || ''}
                    onChange={(e) => {
                        const proj = proyectos.find(p => p.id === e.target.value);
                        setProyectoSeleccionado(proj);
                    }}
                >
                    <option value="">Seleccionar Proyecto</option>
                    {proyectos.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
            </div>

            <MapContainer center={[-11.92, -76.70]} zoom={16} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />

                {/* POSTES, MUFAS, CAJAS, TRAMOS... (mantengo tu lógica) */}
                {postes.map(poste => (
                    <Marker key={poste.id} position={[poste.latitud, poste.longitud]} icon={iconoPoste}>
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold">Poste: {poste.codigo}</p>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <button onClick={() => abrirFormulario('mufa', { posteId: poste.id, coords: { latitud: poste.latitud, longitud: poste.longitud }, isNew: true })} className="bg-orange-600 text-white py-2 rounded-xl text-sm">+ Mufa</button>
                                    <button onClick={() => abrirFormulario('caja', { posteId: poste.id, coords: { latitud: poste.latitud, longitud: poste.longitud }, isNew: true })} className="bg-emerald-600 text-white py-2 rounded-xl text-sm">+ Caja</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {mufas.map(m => <Marker key={m.id} position={[m.latitud, m.longitud]} icon={iconoMufa} />)}
                {cajas.map(c => <Marker key={c.id} position={[c.latitud, c.longitud]} icon={iconoCaja} />)}

                {tramos.map(tramo => (
                    <Polyline key={tramo.id} positions={tramo.path} pathOptions={{ color: '#a855f7', weight: 7 }} />
                ))}

                {/* Línea temporal tramo */}
                {puntosTemporales.length > 1 && (
                    <Polyline positions={puntosTemporales} pathOptions={{ color: '#c026d3', weight: 6, dashArray: '8,5' }} />
                )}

                {/* Línea de medición */}
                {puntosMedicion.length > 1 && (
                    <Polyline positions={puntosMedicion} pathOptions={{ color: '#eab308', weight: 5, dashArray: '10,8' }} />
                )}
            </MapContainer>

            {/* BARRA INFERIOR */}
            {modo !== 'select' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[1001]">
                    <span className="font-bold uppercase tracking-widest text-xs">MODO:</span>
                    <span className="text-blue-400 font-semibold">
                        {modo === 'medir' ? 'MEDICIÓN DE DISTANCIA' : modo.toUpperCase()}
                    </span>

                    {modo === 'tramo' && puntosTemporales.length >= 2 && (
                        <button onClick={finalizarTramo} className="ml-4 bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-sm font-medium">
                            Finalizar Tramo
                        </button>
                    )}

                    {modo === 'medir' && (
                        <>
                            <span className="ml-4 text-yellow-400 font-medium">
                                Distancia: {calcularDistanciaTotal()} km
                            </span>
                            <button onClick={limpiarMedicion} className="ml-4 text-yellow-400 hover:text-yellow-300">
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
            {formAbierto && formType === 'caja' && <FormCaja data={formData} onCancel={() => setFormAbierto(false)} />}
            {formAbierto && formType === 'poste' && <FormPoste data={formData} onCancel={() => setFormAbierto(false)} />}
        </div>
    );
};

export default MapaPrincipal;