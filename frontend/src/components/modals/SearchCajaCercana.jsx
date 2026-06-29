import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X, MapPin, Navigation } from 'lucide-react';
import fvApi from '../../api/fvApi';

const SearchCajaCercana = ({ onClose }) => {
  const [coordenadasInput, setCoordenadasInput] = useState('');
  const [radio, setRadio] = useState('500'); // metros
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleBuscar = async (e) => {
    e.preventDefault();
    
    if (!coordenadasInput) {
      toast.error('Ingresa coordenadas o pega un link');
      return;
    }

    const decoded = decodeURIComponent(coordenadasInput);
    const coordRegex = /(-?\d{1,3}\.\d+)[\s,]+(-?\d{1,3}\.\d+)/;
    const match = decoded.match(coordRegex);

    if (!match || !match[1] || !match[2]) {
      toast.error('Formato inválido. Usa lat, lng o un link válido');
      return;
    }

    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);

    setCargando(true);
    try {
      const response = await fvApi.get('/cajas/cercanas', {
        params: {
          latitud: lat,
          longitud: lng,
          radio: parseInt(radio),
        },
      });
      setResultados(response.data.cajas || []);
      if (response.data.cajas.length === 0) {
        toast.info('No hay cajas cercanas');
      }
    } catch (error) {
      toast.error('Error en búsqueda');
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
        <div className="space-y-2 max-h-96 overflow-auto">
          {resultados.length > 0 ? (
            <>
              <p className="font-bold text-sm mb-2">Encontradas {resultados.length} cajas:</p>
              {resultados.map((caja, idx) => {
                const match = decodeURIComponent(coordenadasInput).match(/(-?\d{1,3}\.\d+)[\s,]+(-?\d{1,3}\.\d+)/);
                const latBusqueda = match ? parseFloat(match[1]) : 0;
                const lngBusqueda = match ? parseFloat(match[2]) : 0;
                const dist = distancia(
                  latBusqueda,
                  lngBusqueda,
                  caja.latitud,
                  caja.longitud
                );
                return (
                  <div
                    key={idx}
                    onClick={() => {
                        const event = new window.CustomEvent('cajaSeleccionada', { detail: caja });
                        window.dispatchEvent(event);
                        onClose();
                    }}
                    className="border rounded p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-bold text-green-600">📦 {caja.codigo}</p>
                    <p className="text-sm text-gray-600">
                      Distancia: <b>{dist}m</b>
                    </p>
                    <p className="text-sm text-gray-600">
                      Puertos: {caja.puertosLibres}/{caja.capacidadTotal}
                    </p>
                    {caja.mufa && (
                      <p className="text-sm text-purple-600">
                        Mufa: {caja.mufa.codigo}
                      </p>
                    )}
                  </div>
                );
              })}
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
