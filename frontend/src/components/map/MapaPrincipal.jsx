import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import '../../styles/leaflet-plugins.css';
import { MapPin, Share2, Box, Database, Users, X, Ruler, Trash2, Search, Target } from 'lucide-react';

// Importar MarkerClusterGroup
import 'leaflet.markercluster';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchItem, setSelectedSearchItem] = useState(null);
    const [clienteLocation, setClienteLocation] = useState('');
    const [cajasCercanas, setCajasCercanas] = useState([]);
    const [showCajasCercanas, setShowCajasCercanas] = useState(false);
    const [centerPosition, setCenterPosition] = useState([-11.92, -76.70]);
    const mapRef = useRef(null);

    // Hooks
    const { proyectos, proyectoSeleccionado, setProyectoSeleccionado } = useProyectos();
    const { postes, crearPoste } = usePostes();
    const { tramos, crearTramo } = useTramos(proyectoSeleccionado?.id);
    const { mufas } = useMufas(proyectoSeleccionado?.id);
    const { cajas } = useCajas(proyectoSeleccionado?.id);

    // ==================== DETECTAR POSTES CERCANOS ====================
    const encontrarPostesCercanos = (lat, lng, radio = 0.001) => {
        return postes.filter(poste => {
            const distLat = Math.abs(poste.latitud - lat);
            const distLng = Math.abs(poste.longitud - lng);
            return distLat <= radio && distLng <= radio;
        });
    };

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
    const crearPosteDirecto = async (coords) => {
        if (!proyectoSeleccionado) {
            alert('Selecciona primero un proyecto antes de crear postes.');
            return;
        }

        const codigoGenerado = `P-${Date.now().toString().slice(-5)}`;
        try {
            await crearPoste({
                codigo: codigoGenerado,
                latitud: coords.latitud,
                longitud: coords.longitud,
                tipo: 'CONCRETO',
                altura: '8m'
            });
            setCenterPosition([coords.latitud, coords.longitud]);
            if (mapRef.current) {
                mapRef.current.flyTo([coords.latitud, coords.longitud], 16);
            }
            // Mantener el modo 'poste' para poder agregar varios postes seguidos
        } catch (error) {
            console.error('Error creando poste directo:', error);
            alert('No se pudo crear el poste. Revisa la consola.');
        }
    };

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (modo === 'poste') {
                    crearPosteDirecto({ latitud: e.latlng.lat, longitud: e.latlng.lng });
                    return;
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

    const finalizarTramo = async () => {
        if (puntosTemporales.length < 2) {
            alert('Necesitas al menos 2 puntos para crear un tramo');
            return;
        }

        try {
            const inicioTramo = puntosTemporales[0];
            const finTramo = puntosTemporales[puntosTemporales.length - 1];

            // Buscar postes cercanos a los extremos
            const postesCercanoInicio = encontrarPostesCercanos(inicioTramo[0], inicioTramo[1]);
            const postesCercanoFin = encontrarPostesCercanos(finTramo[0], finTramo[1]);

            let posteInicioId = null;
            let posteFinId = null;

            // Si encuentra exactamente un poste cercano en cada extremo, usarlos automáticamente
            if (postesCercanoInicio.length === 1) {
                posteInicioId = postesCercanoInicio[0].id;
            } else if (postesCercanoInicio.length > 1) {
                const seleccionado = window.confirm(
                    `Se encontraron ${postesCercanoInicio.length} postes cercanos al inicio. ¿Usar el primero?`
                );
                if (seleccionado) posteInicioId = postesCercanoInicio[0].id;
            }

            if (postesCercanoFin.length === 1) {
                posteFinId = postesCercanoFin[0].id;
            } else if (postesCercanoFin.length > 1) {
                const seleccionado = window.confirm(
                    `Se encontraron ${postesCercanoFin.length} postes cercanos al fin. ¿Usar el primero?`
                );
                if (seleccionado) posteFinId = postesCercanoFin[0].id;
            }

            await crearTramo({
                path: puntosTemporales,
                proyectoId: proyectoSeleccionado?.id,
                posteInicioId,
                posteFinId
            });

            setPuntosTemporales([]);
            setModo('select');
            alert('✅ Tramo creado correctamente');
        } catch (error) {
            console.error('Error al crear tramo:', error);
            alert('❌ Error al crear el tramo. Revisa la consola.');
        }
    };

    const limpiarMedicion = () => {
        setPuntosMedicion([]);
    };

    const abrirFormulario = (tipo, datos = {}) => {
        setFormType(tipo);
        setFormData({ ...datos, isNew: true });
        setFormAbierto(true);
        setModo('select');
    };

    const abrirInstalacion = (tipo, datos = {}) => {
        abrirFormulario(tipo, datos);
    };

    const allElementos = [
        ...postes.map(poste => ({
            id: poste.id,
            tipo: 'Poste',
            codigo: poste.codigo,
            position: [poste.latitud, poste.longitud],
            data: poste
        })),
        ...mufas.map(mufa => ({
            id: mufa.id,
            tipo: 'Mufa',
            codigo: mufa.codigo,
            position: [mufa.latitud, mufa.longitud],
            data: mufa
        })),
        ...cajas.map(caja => ({
            id: caja.id,
            tipo: 'Caja',
            codigo: caja.codigo,
            position: [caja.latitud, caja.longitud],
            data: caja
        }))
    ];

    const buscarElementos = (value) => {
        setSearchTerm(value);
        const term = value.trim().toLowerCase();
        if (!term) {
            setSearchResults([]);
            return;
        }

        const resultados = allElementos.filter(item =>
            item.codigo?.toLowerCase().includes(term) ||
            item.tipo.toLowerCase().includes(term)
        ).slice(0, 8);

        setSearchResults(resultados);
    };

    const seleccionarElemento = (item) => {
        setSelectedSearchItem(item);
        setSearchTerm(item.codigo);
        setSearchResults([]);
    };

    // Función para calcular distancia usando fórmula de Haversine
    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // Función para geocodificar dirección del cliente
    const geocodificarCliente = async (direccion) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}&limit=1`);
            const data = await response.json();
            if (data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
            return null;
        } catch (error) {
            console.error('Error geocodificando:', error);
            return null;
        }
    };

    // Función para buscar cajas cercanas
    const buscarCajasCercanas = async () => {
        if (!clienteLocation.trim()) {
            alert('Ingresa una dirección o coordenadas del cliente');
            return;
        }

        let clienteCoords = null;

        // Verificar si es coordenadas (formato: lat,lng)
        const coordsMatch = clienteLocation.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
        if (coordsMatch) {
            clienteCoords = {
                lat: parseFloat(coordsMatch[1]),
                lng: parseFloat(coordsMatch[2])
            };
        } else {
            // Geocodificar dirección
            clienteCoords = await geocodificarCliente(clienteLocation);
        }

        if (!clienteCoords) {
            alert('No se pudo encontrar la ubicación del cliente');
            return;
        }

        // Calcular distancias a todas las cajas
        const cajasConDistancia = cajas.map(caja => ({
            ...caja,
            distancia: calcularDistancia(clienteCoords.lat, clienteCoords.lng, caja.latitud, caja.longitud)
        }));

        // Ordenar por distancia y tomar las 5 más cercanas dentro de 5km
        const cajasCercanasFiltradas = cajasConDistancia
            .filter(caja => caja.distancia <= 5) // Máximo 5km
            .sort((a, b) => a.distancia - b.distancia)
            .slice(0, 5);

        setCajasCercanas(cajasCercanasFiltradas);
        setShowCajasCercanas(true);

        // Centrar mapa en la ubicación del cliente
        if (mapRef.current) {
            mapRef.current.flyTo([clienteCoords.lat, clienteCoords.lng], 15);
        }
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

    // Componente para inicializar plugins del mapa
    const MapPlugins = () => {
        const map = useMap();

        useEffect(() => {
            if (!map) return;

            mapRef.current = map;

            // Agregar control de geocoding
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

            return () => {
                map.removeControl(geocoder);
            };
        }, [map]);

        return null;
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
                    ]
                    .filter(tool => {
                        // Si estás en modo 'tramo', solo muestra opciones relacionadas a tramos
                        if (modo === 'tramo') {
                            return tool.id === 'tramo' || tool.id === 'select';
                        }
                        return true;
                    })
                    .map(tool => (
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
                        title="Centrar en el último poste creado"
                    >
                        <Target size={18} />
                        <span>{postes[0]?.codigo || 'Ir a Poste'}</span>
                    </button>
                </div>
            )}

            {/* BUSCADOR DE MAPA */}
            <div className="absolute top-28 right-6 z-[1001] w-80">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-3xl p-3">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Buscar en el mapa</label>
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

            {/* BUSCADOR DE CAJAS CERCANAS */}
            <div className="absolute top-[420px] right-6 z-[1001] w-80">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-3xl p-3">
                    <label className="block text-slate-700 text-sm font-semibold mb-2 flex items-center gap-2">
                        <Target size={16} />
                        Buscar cajas cercanas al cliente
                    </label>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:border-blue-500 text-sm"
                            type="text"
                            placeholder="Dirección o coordenadas (lat,lng)"
                            value={clienteLocation}
                            onChange={(e) => setClienteLocation(e.target.value)}
                        />
                        <button
                            onClick={buscarCajasCercanas}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl transition"
                            title="Buscar cajas cercanas"
                        >
                            <Search size={18} />
                        </button>
                    </div>

                    {showCajasCercanas && (
                        <div className="mt-3 max-h-40 overflow-y-auto space-y-2">
                            <div className="text-xs text-slate-600 mb-2">Cajas más cercanas (≤5km):</div>
                            {cajasCercanas.length > 0 ? (
                                cajasCercanas.map(caja => (
                                    <div key={caja.id} className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-xs">
                                        <div className="font-semibold text-blue-800">{caja.codigo}</div>
                                        <div className="text-blue-600">{caja.distancia.toFixed(2)} km</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-slate-500">No se encontraron cajas cercanas</div>
                            )}
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
                            pathOptions={{ color, weight: 8, opacity: 0.8 }}
                        >
                            <Popup>
                                <div className="space-y-1 text-sm">
                                    <div className="font-bold">{tramo.nombre}</div>
                                    <div>Tipo: {tramo.tipoCable}</div>
                                    {tramo.posteInicio && <div>Inicio: {tramo.posteInicio.codigo}</div>}
                                    {tramo.posteFin && <div>Fin: {tramo.posteFin.codigo}</div>}
                                </div>
                            </Popup>
                        </Polyline>
                    );
                })}

                {/* Línea temporal tramo */}
                {puntosTemporales.length > 1 && (
                    <Polyline positions={puntosTemporales} pathOptions={{ color: '#c026d3', weight: 6, dashArray: '8,5' }} />
                )}

                {/* Línea de medición */}
                {puntosMedicion.length > 1 && (
                    <Polyline positions={puntosMedicion} pathOptions={{ color: '#eab308', weight: 5, dashArray: '10,8' }} />
                )}

                {/* POSTES */}
                {postes.map(poste => (
                    <Marker key={`poste-${poste.id}`} position={[poste.latitud, poste.longitud]} icon={iconoPoste}>
                        <Popup>
                            <div className="space-y-2">
                                <div className="font-bold">Poste {poste.codigo}</div>
                                <div className="text-sm text-slate-600">Tipo: {poste.tipo}</div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => abrirInstalacion('mufa', {
                                            posteId: poste.id,
                                            coords: { latitud: poste.latitud, longitud: poste.longitud },
                                            ratioSplitteo: '1:16'
                                        })}
                                        className="rounded-2xl bg-orange-500 text-white px-3 py-2 text-xs font-semibold hover:bg-orange-600"
                                    >
                                        MUFA de Pase
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => abrirInstalacion('mufa', {
                                            posteId: poste.id,
                                            coords: { latitud: poste.latitud, longitud: poste.longitud },
                                            ratioSplitteo: '1:32'
                                        })}
                                        className="rounded-2xl bg-purple-600 text-white px-3 py-2 text-xs font-semibold hover:bg-purple-700"
                                    >
                                        MUFA para Splitter
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => abrirInstalacion('caja', {
                                        posteId: poste.id,
                                        coords: { latitud: poste.latitud, longitud: poste.longitud }
                                    })}
                                    className="w-full rounded-2xl bg-emerald-600 text-white px-3 py-2 text-xs font-semibold hover:bg-emerald-700"
                                >
                                    Instalar Caja
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* MUFAS */}
                {mufas.map(mufa => (
                    <Marker key={`mufa-${mufa.id}`} position={[mufa.latitud, mufa.longitud]} icon={iconoMufa}>
                        <Popup>
                            <div className="space-y-1 text-sm">
                                <div className="font-bold">Mufa {mufa.codigo}</div>
                                <div>Splitter: {mufa.ratioSplitteo}</div>
                                <div>Hilos libres: {mufa.hilosDisponibles}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* CAJAS */}
                {cajas.map(caja => (
                    <Marker key={`caja-${caja.id}`} position={[caja.latitud, caja.longitud]} icon={iconoCaja}>
                        <Popup>
                            <div className="space-y-1 text-sm">
                                <div className="font-bold">Caja {caja.codigo}</div>
                                <div>Puertos libres: {caja.puertosLibres}</div>
                                <div>Poste: {caja.posteId}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Marcadores de cajas cercanas */}
                {showCajasCercanas && cajasCercanas.map(caja => (
                    <Marker key={`cercana-${caja.id}`} position={[caja.latitud, caja.longitud]} icon={iconoCaja}>
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold">Caja: {caja.codigo}</p>
                                <p className="text-sm text-blue-600">Distancia: {caja.distancia.toFixed(2)} km</p>
                                <p className="text-xs text-gray-600">Capacidad: {caja.capacidad || 'N/A'}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
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

                    {modo === 'poste' && (
                        <span className="ml-4 text-emerald-300 text-sm">
                            Haz clic en el mapa para crear un poste directo sin formulario.
                        </span>
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