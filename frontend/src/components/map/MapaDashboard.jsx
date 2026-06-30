import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import useProyectos from '../../hooks/useProyectos';
import usePostes from '../../hooks/usePostes';
import useMufas from '../../hooks/useMufas';
import useCajas from '../../hooks/useCajas';
import useTramos from '../../hooks/useTramos';
import FormPosteRapido from '../forms/FormPosteRapido';
import FormMufaRapida from '../forms/FormMufaRapida';
import FormCajaRapida from '../forms/FormCajaRapida';
import SearchCajaCercana from '../modals/SearchCajaCercana';
import toast from 'react-hot-toast';
import { MapPin, Circle as CircleIcon, Search, Plus, Trash2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const MapaDashboard = () => {
  const mapRef = useRef(null);
  const { user } = useAuth();
  const { proyectos, proyectoSeleccionado, setProyectoSeleccionado } = useProyectos();
  const { postes, crearPoste, eliminarPoste } = usePostes(proyectoSeleccionado?.id);
  const { mufas } = useMufas(proyectoSeleccionado?.id);
  const { cajas } = useCajas(proyectoSeleccionado?.id);
  const { tramos } = useTramos(proyectoSeleccionado?.id);

  const [modo, setModo] = useState(null); // 'poste', 'mufa', 'caja', 'search'
  const [clickPos, setClickPos] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [selectedPoste, setSelectedPoste] = useState(null);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

  // Iconos personalizados
  const posteIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const mufaIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-purple.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const cajaIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Click en mapa para crear postes
  const handleMapClick = (e) => {
    if (!modo) return;
    const { lat, lng } = e.latlng;
    setClickPos({ latitud: lat, longitud: lng });
    setMostrarForm(true);
  };

  // Crear poste rápido
  const handleCrearPoste = async (codigo) => {
    if (!clickPos || !proyectoSeleccionado) {
      toast.error('Selecciona proyecto y haz clic en el mapa');
      return;
    }
    try {
      await crearPoste({
        codigo,
        latitud: clickPos.latitud,
        longitud: clickPos.longitud,
        proyectoId: proyectoSeleccionado?.id || proyectoSeleccionado,
        tipo: 'CONCRETO',
      });
      toast.success(`Poste ${codigo} creado`);
      setMostrarForm(false);
      setClickPos(null);
      setModo(null);
    } catch (error) {
      toast.error('Error al crear poste');
    }
  };

  // Parsear tramos a polylines
  const getTramoPolylines = () => {
    return tramos.map((tramo, idx) => {
      try {
        const path = JSON.parse(tramo.path);
        const coords = path.coordinates.map(([lng, lat]) => [lat, lng]);
        return (
          <Polyline
            key={idx}
            positions={coords}
            color={tramo.colorVisual || '#8b5cf6'}
            weight={3}
            opacity={0.7}
            dashArray="5, 5"
          />
        );
      } catch {
        return null;
      }
    });
  };

  // Centro del mapa (primera coordenada o por defecto Perú)
  const center = postes.length > 0 
    ? [postes[0].latitud, postes[0].longitud]
    : [-12.0, -76.5];

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🗺️ Red de Fibra Óptica</h1>
            <p className="text-gray-400">
              Proyecto: {proyectoSeleccionado ? '✅' : '❌'} 
              Modo: {modo ? `📍 ${modo.toUpperCase()}` : '⏸️ Inactivo'}
            </p>
          </div>

          {/* Selector Proyecto */}
          <select
            value={proyectoSeleccionado?.id || ''}
            onChange={(e) => {
              const seleccionado = proyectos.find((p) => p.id === e.target.value);
              setProyectoSeleccionado(seleccionado || null);
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="">Selecciona Proyecto</option>
            {proyectos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controles Laterales */}
      {user?.rol === 'ADMIN' && (
        <div className="absolute top-20 left-4 z-[500] bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl shadow-2xl p-2 space-y-2">
          <button
            onClick={() => setModo(modo === 'poste' ? null : 'poste')}
            className={`w-12 h-12 rounded flex items-center justify-center transition ${
              modo === 'poste' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            title="Crear Poste"
          >
            <MapPin size={20} />
          </button>

          <button
            onClick={() => setModo(modo === 'mufa' ? null : 'mufa')}
            className={`w-12 h-12 rounded flex items-center justify-center transition ${
              modo === 'mufa' ? 'bg-purple-500 text-white' : 'bg-gray-200'
            }`}
            title="Crear Mufa"
          >
            <CircleIcon size={20} />
          </button>

          <button
            onClick={() => setModo(modo === 'caja' ? null : 'caja')}
            className={`w-12 h-12 rounded flex items-center justify-center transition ${
              modo === 'caja' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            title="Crear Caja"
          >
            <Plus size={20} />
          </button>

          <button
            onClick={() => setMostrarBusqueda(true)}
            className="w-12 h-12 rounded bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            title="Buscar Cajas Cercanas"
          >
            <Search size={20} />
          </button>
        </div>
      )}



      {/* Mapa */}
      <div className="flex-1 relative">
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={13}
          className="w-full h-full"
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Tramos de Cable */}
          {getTramoPolylines()}

          {/* Postes */}
          {postes.map((poste) => (
            <Marker
              key={poste.id}
              position={[poste.latitud, poste.longitud]}
              icon={posteIcon}
              onClick={() => setSelectedPoste(poste)}
            >
              <Popup>
                <div className="text-sm">
                  <b>Poste: {poste.codigo}</b>
                  <p>Lat: {poste.latitud.toFixed(5)}</p>
                  <p>Lng: {poste.longitud.toFixed(5)}</p>
                  {user?.rol === 'ADMIN' && (
                    <button
                      onClick={() => eliminarPoste(poste.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Mufas */}
          {mufas.map((mufa) => (
            <Marker
              key={mufa.id}
              position={[mufa.latitud, mufa.longitud]}
              icon={mufaIcon}
            >
              <Popup>
                <div className="text-sm">
                  <b>Mufa: {mufa.codigo}</b>
                  <p>Splitter: {mufa.ratioSplitteo}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Cajas */}
          {cajas.map((caja) => (
            <Marker
              key={caja.id}
              position={[caja.latitud, caja.longitud]}
              icon={cajaIcon}
            >
              <Popup>
                <div className="text-sm">
                  <b>Caja: {caja.codigo}</b>
                  <p>Puertos: {caja.puertosLibres}/{caja.capacidadTotal}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Preview click */}
          {clickPos && (
            <Circle
              center={[clickPos.latitud, clickPos.longitud]}
              radius={50}
              color="red"
              fillColor="red"
              fillOpacity={0.2}
            />
          )}
        </MapContainer>
      </div>

      {/* Form Modal */}
      {mostrarForm && clickPos && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[600]">
          {modo === 'poste' && (
            <FormPosteRapido
              coordenadas={clickPos}
              onCancel={() => {
                setMostrarForm(false);
                setClickPos(null);
              }}
            />
          )}
          {modo === 'mufa' && (
            <FormMufaRapida
              coordenadas={clickPos}
              onCancel={() => {
                setMostrarForm(false);
                setClickPos(null);
              }}
            />
          )}
          {modo === 'caja' && (
            <FormCajaRapida
              coordenadas={clickPos}
              onCancel={() => {
                setMostrarForm(false);
                setClickPos(null);
              }}
            />
          )}
        </div>
      )}

      {/* Búsqueda de Cajas Cercanas */}
      {mostrarBusqueda && (
        <SearchCajaCercana onClose={() => setMostrarBusqueda(false)} />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1001] bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl shadow-2xl p-4 text-sm text-slate-200">
        <p className="font-bold mb-2">🗺️ Leyenda</p>
        <div className="space-y-1">
          <p>🔵 Postes</p>
          <p>🟣 Mufas (Reparto)</p>
          <p>🟢 Cajas (NAP)</p>
          <p>━━ Tramos Cable</p>
        </div>
      </div>
    </div>
  );
};

export default MapaDashboard;
