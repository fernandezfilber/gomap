import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

import { X } from 'lucide-react';

import useProyectos from '../../hooks/useProyectos';
import usePostes from '../../hooks/usePostes';
import useTramos from '../../hooks/useTramos';
import useMufas from '../../hooks/useMufas';
import useCajas from '../../hooks/useCajas';
import useAuth from '../../hooks/useAuth';

import { iconoPoste, iconoMufa, iconoCaja } from '../../utils/mapIcons';

import FormMufa from '../forms/FormMufa';
import FormCaja from '../forms/FormCaja';
import FormPoste from '../forms/FormPoste';

import Sidebar from '../layout/Sidebar';
import Toolbox from '../layout/Toolbox';

// Icono personalizado para mufas
const createMufaIcon = () => L.divIcon({
    className: 'custom-mufa-icon',
    html: `<div class="bg-orange-600 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white">M</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

const MapaPrincipal = () => {
    const [modo, setModo] = useState('select');
    const [puntosTemporales, setPuntosTemporales] = useState([]);
    const [puntosMedicion, setPuntosMedicion] = useState([]);
    const [formAbierto, setFormAbierto] = useState(false);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);

    const [radioProximidad, setRadioProximidad] = useState(0.005);
    const [cajasCercanas, setCajasCercanas] = useState([]);

    const mapRef = useRef(null);

    // Hooks
    const { proyectos, proyectoSeleccionado, setProyectoSeleccionado } = useProyectos();
    const { postes, crearPoste } = usePostes(proyectoSeleccionado?.id);
    const { tramos, crearTramo } = useTramos(proyectoSeleccionado?.id);
    const { mufas } = useMufas(proyectoSeleccionado?.id);
    const { cajas } = useCajas(proyectoSeleccionado?.id);
    const { logout } = useAuth();

    // Utilidades
    const encontrarPostesCercanos = useCallback((lat, lng) => {
        return postes.filter(poste => 
            L.latLng(lat, lng).distanceTo([poste.latitud, poste.longitud]) <= 50
        );
    }, [postes]);

    const buscarCajasCercanas = useCallback((lat, lng, radio) => {
        const factor = radio * 0.01;
        const cercanas = cajas.filter(caja => {
            return Math.abs(caja.latitud - lat) <= factor && 
                   Math.abs(caja.longitud - lng) <= factor;
        });
        setCajasCercanas(cercanas);
    }, [cajas]);

    const calcularDistanciaTotal = () => {
        if (puntosMedicion.length < 2) return '0.000';
        let total = 0;
        for (let i = 1; i < puntosMedicion.length; i++) {
            total += L.latLng(puntosMedicion[i-1]).distanceTo(puntosMedicion[i]);
        }
        return (total / 1000).toFixed(3);
    };

    const crearPosteDirecto = async (coords) => {
        if (!proyectoSeleccionado) return alert('Selecciona un proyecto primero');

        try {
            await crearPoste({
                codigo: `P-${Math.floor(Math.random() * 90000) + 10000}`,
                latitud: coords.lat,
                longitud: coords.lng,
                tipo: 'CONCRETO',
                altura: '8m',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const finalizarTramo = async () => {
        if (puntosTemporales.length < 2) {
            alert('Mínimo 2 puntos para crear un tramo');
            return;
        }

        const inicio = puntosTemporales[0];
        const fin = puntosTemporales[puntosTemporales.length - 1];

        const pInicio = encontrarPostesCercanos(inicio[0], inicio[1])[0];
        const pFin = encontrarPostesCercanos(fin[0], fin[1])[0];

        try {
            await crearTramo({
                nombre: `Tramo-${Date.now().toString().slice(-4)}`,
                path: puntosTemporales,
                proyectoId: proyectoSeleccionado.id,
                posteInicioId: pInicio?.id || null,
                posteFinId: pFin?.id || null,
            });

            setPuntosTemporales([]);
            setModo('select');
        } catch (error) {
            console.error(error);
        }
    };

    const abrirFormulario = (tipo, datos = {}) => {
        setFormType(tipo);
        setFormData({ data: datos });
        setFormAbierto(true);
    };

    // Eventos del mapa
    const MapEvents = () => {
        const map = useMap();
        mapRef.current = map;

        useMapEvents({
            click(e) {
                if (modo === 'poste') {
                    crearPosteDirecto(e.latlng);
                } else if (modo === 'tramo') {
                    setPuntosTemporales(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                } else if (modo === 'medir') {
                    setPuntosMedicion(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
                }
            },
            contextmenu(e) {
                e.originalEvent.preventDefault();
                buscarCajasCercanas(e.latlng.lat, e.latlng.lng, radioProximidad);
            }
        });
        return null;
    };

    // Centrar mapa
    const MapCenterer = () => {
        const map = useMap();
        useEffect(() => {
            map.flyTo([-11.92, -76.70], 16, { duration: 1 });
        }, [map]);
        return null;
    };

    return (
        <div className="relative h-screen w-full bg-slate-950 flex overflow-hidden">
            <Sidebar 
                proyectos={proyectos}
                proyectoSeleccionado={proyectoSeleccionado}
                setProyectoSeleccionado={setProyectoSeleccionado}
                postes={postes}
                tramos={tramos}
                mufas={mufas}
                cajas={cajas}
                cajasCercanas={cajasCercanas}
                radioProximidad={radioProximidad}
                setRadioProximidad={setRadioProximidad}
                logout={logout}
            />

            <div className="flex-1 relative">
                <Toolbox modo={modo} setModo={setModo} />

                <MapContainer
                    center={[-11.92, -76.70]}
                    zoom={16}
                    className="h-full w-full"
                    ref={mapRef}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <MapEvents />
                    <MapCenterer />

                    {/* Tramos */}
                    {tramos.map(t => (
                        <Polyline
                            key={t.id}
                            positions={t.path}
                            pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7 }}
                        />
                    ))}

                    {/* Postes y elementos */}
                    {postes.map(p => {
                        const mufasP = mufas.filter(m => m.posteId === p.id);
                        const cajasP = cajas.filter(c => c.posteId === p.id);

                        return (
                            <div key={p.id}>
                                <Marker position={[p.latitud, p.longitud]} icon={iconoPoste}>
                                    <Popup>
                                        <div className="p-3">
                                            <p className="font-black text-blue-600">POSTE {p.codigo}</p>
                                            <div className="flex gap-2 mt-3">
                                                <button 
                                                    onClick={() => abrirFormulario('mufa', { posteId: p.id, latitud: p.latitud, longitud: p.longitud })}
                                                    className="bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-600"
                                                >
                                                    + MUFA
                                                </button>
                                                <button 
                                                    onClick={() => abrirFormulario('caja', { posteId: p.id, latitud: p.latitud, longitud: p.longitud })}
                                                    className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600"
                                                >
                                                    + CAJA
                                                </button>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>

                                {/* Mufas */}
                                {mufasP.map((m, i) => (
                                    <Marker
                                        key={m.id}
                                        position={[
                                            p.latitud + 0.00012 * Math.cos(i),
                                            p.longitud + 0.00012 * Math.sin(i)
                                        ]}
                                        icon={createMufaIcon()}
                                    />
                                ))}

                                {/* Cajas */}
                                {cajasP.map(c => (
                                    <Marker key={c.id} position={[c.latitud, c.longitud]} icon={iconoCaja}>
                                        <Popup>CAJA {c.codigo || ''}</Popup>
                                    </Marker>
                                ))}
                            </div>
                        );
                    })}

                    {/* Líneas temporales */}
                    {puntosTemporales.length > 1 && (
                        <Polyline positions={puntosTemporales} pathOptions={{ color: '#a855f7', dashArray: '8,6' }} />
                    )}
                    {puntosMedicion.length > 1 && (
                        <Polyline positions={puntosMedicion} pathOptions={{ color: '#eab308', weight: 4 }} />
                    )}
                </MapContainer>

                {/* Barra inferior */}
                {modo !== 'select' && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 border border-slate-700 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6">
                        <div>
                            <span className="text-xs text-slate-500">MODO ACTIVO</span>
                            <p className="text-blue-400 font-bold text-xl tracking-wider">{modo.toUpperCase()}</p>
                        </div>

                        {modo === 'tramo' && (
                            <button 
                                onClick={finalizarTramo}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold"
                            >
                                GUARDAR TRAMO
                            </button>
                        )}

                        {modo === 'medir' && (
                            <div className="text-yellow-400 font-mono text-2xl font-bold">
                                {calcularDistanciaTotal()} KM
                            </div>
                        )}

                        <button 
                            onClick={() => {
                                setModo('select');
                                setPuntosTemporales([]);
                                setPuntosMedicion([]);
                            }}
                            className="p-3 text-slate-400 hover:text-white"
                        >
                            <X size={28} />
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Formularios */}
            {formAbierto && (
                <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md">
                        {formType === 'mufa' && <FormMufa data={formData} onCancel={() => setFormAbierto(false)} />}
                        {formType === 'caja' && <FormCaja data={formData} mufas={mufas} onCancel={() => setFormAbierto(false)} />}
                        {formType === 'poste' && <FormPoste data={formData} onCancel={() => setFormAbierto(false)} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapaPrincipal;