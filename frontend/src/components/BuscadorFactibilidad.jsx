import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { verificarFactibilidad } from '../api/redApi';

// --- ICONOS TÉCNICOS IDÉNTICOS AL MAPA GENERAL ---
const crearIconoTecnico = (color, tipo) => {
  const iconHtml = tipo === 'mufa' 
    ? `<svg viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="white" stroke-width="1"><path d="M12,2A2,2 0 0,1 14,4V6H15A2,2 0 0,1 17,8V18A2,2 0 0,1 15,20H9A2,2 0 0,1 7,18V8A2,2 0 0,1 9,6H10V4A2,2 0 0,1 12,2M12,4A1,1 0 0,0 11,5V6H13V5A1,1 0 0,0 12,4Z"/></svg>`
    : `<svg viewBox="0 0 24 24" width="28" height="28" fill="${color}" stroke="white" stroke-width="1"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M8,10h2v2h-2z M14,10h2v2h-2z M8,14h2v2h-2z M14,14h2v2h-2z" fill="white"/></svg>`;

  return L.divIcon({
    className: 'bg-transparent',
    html: `<div style="filter: drop-shadow(0 0 5px ${color})">${iconHtml}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const iconos = {
  mufa: crearIconoTecnico('#00d4ff', 'mufa'), // Cian eléctrico
  caja: crearIconoTecnico('#39ff14', 'caja'), // Verde neón
  cliente: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })
};

const BuscadorFactibilidad = () => {
  const [inputBusqueda, setInputBusqueda] = useState('');
  const [clientePos, setClientePos] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const MapUpdater = ({ pos }) => {
    const map = useMap();
    useEffect(() => { if (pos) map.flyTo([pos.lat, pos.lng], 17); }, [pos, map]);
    return null;
  };

  const analizarFactibilidad = async () => {
    const valorLimpio = inputBusqueda.trim().replace(/["']/g, ""); 
    if (!valorLimpio) return;
    setCargando(true);
    try {
      const response = await verificarFactibilidad({ googleMapsUrl: valorLimpio });
      setResultado(response.data);
      if (response.data.clienteCoords) {
        setClientePos(response.data.clienteCoords);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-2 md:p-6 text-white bg-[#0d1117] min-h-screen">
      
      {/* BUSCADOR RESPONSIVE */}
      <div className="bg-[#161b22] p-4 md:p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-3 shadow-2xl">
        <input
          type="text"
          placeholder="Ej: -11.935, -76.705 o Link de Maps"
          className="flex-1 bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3 md:py-4 text-base md:text-lg outline-none focus:border-blue-500 transition-all"
          value={inputBusqueda}
          onChange={(e) => setInputBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && analizarFactibilidad()}
        />
        <button 
          onClick={analizarFactibilidad} 
          disabled={cargando}
          className="bg-blue-600 hover:bg-blue-500 py-3 md:px-10 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95"
        >
          {cargando ? 'Buscando...' : 'Verificar'}
        </button>
      </div>

      {/* MAPA GRANDE Y RESPONSIVE */}
      <div className="h-[450px] md:h-[700px] w-full rounded-[25px] md:rounded-[40px] overflow-hidden border-2 md:border-8 border-slate-800 relative shadow-2xl">
        <MapContainer center={[-11.935, -76.705]} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" subdomains={['mt0','mt1','mt2','mt3']} />
          <MapUpdater pos={clientePos} />

          {clientePos && (
            <>
              <Marker position={[clientePos.lat, clientePos.lng]} icon={iconos.cliente} />
              <Circle 
                center={[clientePos.lat, clientePos.lng]} 
                radius={300} 
                pathOptions={{ color: '#3b82f6', fillOpacity: 0.1, weight: 2, dashArray: '10, 10' }} 
              />
            </>
          )}

          {resultado?.cajas?.map((caja) => (
            <React.Fragment key={caja.id}>
              {/* CAJA NAP CON ICONO TÉCNICO IDÉNTICO */}
              <Marker position={[caja.latitud, caja.longitud]} icon={iconos.caja}>
                <Popup>
                  <div className="text-slate-900 font-bold text-center">
                    <p className="text-blue-600 uppercase text-[10px]">Caja NAP</p>
                    <p className="text-sm">{caja.codigo}</p>
                    <p className="text-lg text-green-600 font-black">{caja.distancia_metros}m</p>
                  </div>
                </Popup>
              </Marker>

              {/* MUFA Y ENLACE VISUAL */}
              {caja.mufa && (
                <>
                  <Marker position={[caja.mufa.latitud, caja.mufa.longitud]} icon={iconos.mufa} />
                  <Polyline 
                    positions={[[caja.latitud, caja.longitud], [caja.mufa.latitud, caja.mufa.longitud]]}
                    pathOptions={{ color: 'white', weight: 1.5, dashArray: '10, 10', opacity: 0.7 }}
                  />
                </>
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* LISTA DE RESULTADOS RESPONSIVA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
        {resultado?.cajas?.map((c, i) => (
          <div 
            key={c.id} 
            className={`p-5 md:p-6 rounded-[28px] md:rounded-[35px] border-2 transition-all ${i === 0 ? 'bg-blue-600/20 border-blue-500 shadow-xl' : 'bg-[#161b22] border-gray-800'}`}
          >
             <div className="flex justify-between items-start mb-3">
               <span className="text-[10px] bg-blue-600 px-3 py-1 rounded-full font-black uppercase">Opción {i+1}</span>
               <span className="text-sm font-bold text-blue-400 font-mono">{c.distancia_metros} m</span>
             </div>
             <p className="text-2xl md:text-3xl font-black text-white truncate tracking-tighter">{c.codigo}</p>
             <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">Puerto OLT: <span className="text-green-400">{c.puertoOlt || 'S/N'}</span></p>
          </div>
        ))}
        {resultado?.cajas?.length === 0 && !cargando && resultado && (
          <div className="col-span-full bg-red-900/20 border-4 border-red-500/50 p-8 md:p-12 rounded-[40px] text-center">
            <h2 className="text-red-400 font-black text-xl md:text-2xl uppercase tracking-tighter italic">Requiere Expansión de Red</h2>
            <p className="text-[10px] md:text-xs text-red-300/60 mt-2 font-bold uppercase">Sin infraestructura en el radio de 300 metros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorFactibilidad;