import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from 'react-leaflet';
import { obtenerMapaRed } from '../api/redApi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- ICONOS TÉCNICOS PERSONALIZADOS ---
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
  caja: crearIconoTecnico('#39ff14', 'caja')  // Verde neón
};

const MapaGeneral = () => {
  const [infra, setInfra] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    try {
      const res = await obtenerMapaRed();
      setInfra(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); } 
    finally { setCargando(false); }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  if (cargando) return (
    <div className="flex flex-col items-center justify-center h-[75vh] bg-slate-900 rounded-2xl">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-cyan-400 font-bold animate-pulse">CARGANDO RED TÉCNICA...</p>
    </div>
  );

  return (
    <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl">
      
      {/* LEYENDA TÉCNICA FLOTANTE */}
      <div className="absolute top-5 left-5 z-[1000] bg-slate-800/90 p-4 rounded-lg border border-slate-600 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-6 bg-cyan-500 rounded-sm"></div>
          <span className="text-sm font-bold">MUFA DE SANGRÍA</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
          <span className="text-sm font-bold">CAJA NAP (FTTH)</span>
        </div>
        <div className="border-t border-slate-600 my-2"></div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-0.5 bg-white border-t border-dashed"></div>
          <span className="text-[10px] text-slate-300">ENLACE DE FIBRA</span>
        </div>
      </div>

      <MapContainer center={[-11.935, -76.705]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Google Satélite">
            <TileLayer url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" subdomains={['mt0','mt1','mt2','mt3']} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Mapa de Calles">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>

        {infra.map(troncal => (
          troncal.mufas?.map(mufa => (
            <React.Fragment key={mufa.id}>
              
              {/* MUFA */}
              <Marker position={[mufa.latitud, mufa.longitud]} icon={iconos.mufa}>
                <Popup>
                  <div className="text-slate-800">
                    <b className="text-cyan-600">MUFA: {mufa.codigo}</b><br/>
                    <b>Buffer:</b> {mufa.bufferColor} <br/>
                    <b>Hilo:</b> {mufa.hiloColor}
                  </div>
                </Popup>
              </Marker>

              {mufa.cajas?.map(caja => (
                <React.Fragment key={caja.id}>
                  {/* ENLACE (Blanco vibrante sobre satélite) */}
                  <Polyline 
                    positions={[[mufa.latitud, mufa.longitud], [caja.latitud, caja.longitud]]} 
                    pathOptions={{ color: 'white', weight: 2, dashArray: '10, 10', opacity: 0.8 }} 
                  />
                  
                  {/* CAJA NAP */}
                  <Marker position={[caja.latitud, caja.longitud]} icon={iconos.caja}>
                    <Popup>
                      <div className="text-slate-800">
                        <b className="text-green-600">CAJA: {caja.codigo}</b><br/>
                        <b>Puertos:</b> {caja.puertosTotales} <br/>
                        <b>OLT:</b> {caja.puertoOlt || 'N/A'}
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaGeneral;