import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X, MapPin, Navigation, PenTool } from 'lucide-react';
import fvApi from '../../api/fvApi';
import { useNavigate } from 'react-router-dom';

const SearchCajaCercana = ({ onClose }) => {
  const navigate = useNavigate();
  const [coordenadasInput, setCoordenadasInput] = useState('');
  const [radio, setRadio] = useState('500'); // metros
  const [resultados, setResultados] = useState([]);
  const [resultadosCroquis, setResultadosCroquis] = useState([]);
  const [cargando, setCargando] = useState(false);

  const extraerCoordenadas = (input) => {
    if (!input) return null;

    const buscadores = [
      /(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
      /@(-?\d+\.\d+),(-?\d+\.\d+)/,
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
      /(-?\d+\.\d+)\s+(-?\d+\.\d+)/
    ];

    for (const regex of buscadores) {
      const match = input.match(regex);
      if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }

    const numbers = input.match(/-?\d+(?:\.\d+)?/g) || [];
    for (let i = 0; i + 1 < numbers.length; i += 1) {
      const lat = parseFloat(numbers[i]);
      const lng = parseFloat(numbers[i + 1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
    }
    return null;
  };

  const handleBuscar = async (e) => {
    e.preventDefault();

    if (!coordenadasInput) {
      toast.error('Ingresa coordenadas o pega un link');
      return;
    }

    const decoded = decodeURIComponent(coordenadasInput.trim());
    const coords = extraerCoordenadas(decoded);

    if (!coords) {
      toast.error('Formato inválido. Usa lat, lng o un link válido');
      return;
    }

    const { lat, lng } = coords;

    setResultados([]);
    setResultadosCroquis([]);
    setCargando(true);

    try {
      const res = await Promise.allSettled([
        fvApi.get('/cajas/cercanas', {
          params: { latitud: lat, longitud: lng, radio: parseInt(radio, 10) },
        }),
        fvApi.get('/croquis/cajas-cercanas', {
          params: { latitud: lat, longitud: lng, radio: parseInt(radio, 10) },
        })
      ]);

      const mapaResult = res[0];
      const croquisResult = res[1];

      const cajasMapa = mapaResult.status === 'fulfilled' ? mapaResult.value.data?.cajas || [] : [];
      const cajasCroquis = croquisResult.status === 'fulfilled' ? croquisResult.value.data?.cajas || [] : [];

      setResultados(cajasMapa);
      setResultadosCroquis(cajasCroquis);

      if (mapaResult.status === 'rejected' || croquisResult.status === 'rejected') {
        const mensajeMapa = mapaResult.status === 'rejected' ? mapaResult.reason.response?.data?.message : null;
        const mensajeCroquis = croquisResult.status === 'rejected' ? croquisResult.reason.response?.data?.message : null;
        const mensaje = mensajeMapa || mensajeCroquis || 'Error en búsqueda';
        toast.error(`Búsqueda parcial: ${mensaje}`);
      } else if (cajasMapa.length === 0 && cajasCroquis.length === 0) {
        toast.info('No hay cajas cercanas en el mapa ni en croquis');
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      toast.error(error.response?.data?.message || 'Error en búsqueda');
    } finally {
      setCargando(false);
    }
  };

  const handleMiUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordenadasInput(`${position.coords.latitude}, ${position.coords.longitude}`);
          toast.success('Ubicación obtenida');
        },
        () => toast.error('No puedo obtener ubicación')
      );
    }
  };

  const distancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // metros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[600]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🔍 Cajas Cercanas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleBuscar} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Coordenadas o Link</label>
            <input
              type="text"
              value={coordenadasInput}
              onChange={(e) => setCoordenadasInput(e.target.value)}
              placeholder="-12.0124, -76.8690"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Radio (metros)</label>
            <input
              type="number"
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
              min="100"
              step="100"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={cargando}
              className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-50"
            >
              {cargando ? '🔄 Buscando...' : '🔍 Buscar'}
            </button>
            <button
              type="button"
              onClick={handleMiUbicacion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <Navigation size={16} /> Mi Ubicación
            </button>
          </div>
        </form>

        {/* Resultados */}
        <div className="space-y-4 max-h-[60vh] overflow-auto">
          {resultados.length > 0 || resultadosCroquis.length > 0 ? (
            <>
              {resultados.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-1 text-emerald-600"><MapPin size={16}/> En Mapa Principal ({resultados.length}):</h3>
                  <div className="space-y-2">
                    {resultados.map((caja, idx) => (
                      <div
                        key={`mapa-${idx}`}
                        onClick={() => {
                            const event = new window.CustomEvent('cajaSeleccionada', { detail: caja });
                            window.dispatchEvent(event);
                            onClose();
                        }}
                        className="border rounded p-3 bg-emerald-50/50 hover:bg-emerald-100 cursor-pointer transition-colors"
                      >
                        <p className="font-bold text-emerald-700">📦 {caja.codigo}</p>
                        <p className="text-sm text-gray-600">
                          Distancia: <b>{caja.distancia_metros}m</b> | Proyecto: {caja.proyectoNombre || 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resultadosCroquis.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-2 mt-4 flex items-center gap-1 text-violet-600"><PenTool size={16}/> En Croquis ({resultadosCroquis.length}):</h3>
                  <div className="space-y-2">
                    {resultadosCroquis.map((caja, idx) => (
                      <div
                        key={`croquis-${idx}`}
                        onClick={() => {
                            navigate(`/dashboard/croquis/${caja.croquisId}`);
                            onClose();
                        }}
                        className="border rounded p-3 bg-violet-50/50 hover:bg-violet-100 cursor-pointer transition-colors"
                      >
                        <p className="font-bold text-violet-700">📦 {caja.label}</p>
                        <p className="text-sm text-gray-600">
                          Distancia: <b>{caja.distancia_metros}m</b> | Croquis: {caja.croquisNombre}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-4">
              {cargando ? 'Buscando...' : 'Sin resultados'}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SearchCajaCercana;
