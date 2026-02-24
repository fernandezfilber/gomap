import React, { useState } from 'react';
import { GoogleMap, Marker, Circle, Polyline, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { verificarFactibilidad } from '../api/redApi';

const BuscadorFactibilidad = () => {
  const [inputBusqueda, setInputBusqueda] = useState('');
  const [clientePos, setClientePos] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cajaSeleccionada, setCajaSeleccionada] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const analizarFactibilidad = async () => {
    const valorLimpio = inputBusqueda.trim().replace(/["']/g, ""); 
    if (!valorLimpio) return;
    setCargando(true);
    setResultado(null);

    try {
      const response = await verificarFactibilidad({ googleMapsUrl: valorLimpio });
      setResultado(response.data);
      if (response.data.clienteCoords) {
        setClientePos(response.data.clienteCoords);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la verificación de red");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-2 md:p-6 text-white bg-[#0d1117] min-h-screen">
      
      {/* BUSCADOR */}
      <div className="bg-[#161b22] p-4 md:p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-3 shadow-2xl">
        <input
          type="text"
          placeholder="Ej: -11.935, -76.705 o Link de Google Maps"
          className="flex-1 bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3 text-lg outline-none focus:border-blue-500"
          value={inputBusqueda}
          onChange={(e) => setInputBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && analizarFactibilidad()}
        />
        <button 
          onClick={analizarFactibilidad} 
          disabled={cargando}
          className="bg-blue-600 hover:bg-blue-500 py-3 md:px-10 rounded-xl font-black uppercase text-xs transition-all shadow-lg"
        >
          {cargando ? 'Analizando...' : 'Verificar Factibilidad'}
        </button>
      </div>

      {/* MAPA GOOGLE SATÉLITE */}
      <div className="h-[450px] md:h-[650px] w-full rounded-[30px] overflow-hidden border-4 border-[#161b22] shadow-2xl relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={clientePos || { lat: -11.935, lng: -76.702 }}
            zoom={clientePos ? 17 : 14}
            options={{ mapTypeId: 'satellite', streetViewControl: true }}
          >
            {/* UBICACIÓN DEL CLIENTE POTENCIAL */}
            {clientePos && (
              <>
                <Marker 
                  position={clientePos} 
                  icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                />
                <Circle 
                  center={clientePos} 
                  radius={300} 
                  options={{ strokeColor: '#3b82f6', fillOpacity: 0.1, strokeWeight: 2 }} 
                />
              </>
            )}

            {/* CAJAS NAP ENCONTRADAS Y SUS RUTAS */}
            {resultado?.cajas?.map((caja) => (
              <React.Fragment key={caja.id}>
                {/* MARCADOR CAJA NAP (ICONO VERDE) */}
                <Marker 
                  position={{ lat: caja.latitud, lng: caja.longitud }}
                  icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  onClick={() => setCajaSeleccionada(caja)}
                />

                {/* SI LA CAJA TIENE RUTA DIBUJADA, LA MOSTRAMOS POR LAS CALLES */}
                {caja.ruta && caja.ruta.length > 0 ? (
                    <Polyline 
                        path={caja.ruta}
                        options={{ color: '#39ff14', weight: 3, opacity: 0.8 }}
                    />
                ) : (
                    /* SI NO TIENE RUTA, LÍNEA RECTA PUNTEADA HACIA LA UBICACIÓN DEL CLIENTE */
                    <Polyline 
                        path={[ {lat: caja.latitud, lng: caja.longitud}, clientePos ]}
                        options={{ strokeColor: '#ffffff', strokeOpacity: 0.5, strokeWeight: 1, icons: [{ icon: {path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2}, offset: '0', repeat: '10px' }] }}
                    />
                )}

                {cajaSeleccionada?.id === caja.id && (
                    <InfoWindow 
                        position={{ lat: caja.latitud, lng: caja.longitud }}
                        onCloseClick={() => setCajaSeleccionada(null)}
                    >
                        <div className="text-black p-2">
                            <p className="font-bold text-blue-600">{caja.codigo}</p>
                            <p className="text-xs">Distancia: <b>{caja.distancia_metros}m</b></p>
                            <p className="text-xs">Puertos: {caja.puertosTotales}</p>
                        </div>
                    </InfoWindow>
                )}
              </React.Fragment>
            ))}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full bg-[#161b22]">Cargando Google Maps...</div>
        )}
      </div>

      {/* TARJETAS DE RESULTADO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
        {resultado?.cajas?.map((c, i) => (
          <div 
            key={c.id} 
            className={`p-6 rounded-[30px] border-2 transition-all ${i === 0 ? 'bg-blue-600/20 border-blue-500' : 'bg-[#161b22] border-gray-800'}`}
          >
            <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] bg-blue-600 px-3 py-1 rounded-full font-black uppercase">Prioridad {i+1}</span>
               <span className="text-sm font-bold text-blue-400">{c.distancia_metros} m</span>
            </div>
            <p className="text-2xl font-black text-white tracking-tighter">{c.codigo}</p>
            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">Capacidad: <span className="text-green-400">{c.puertosTotales} Puertos</span></p>
          </div>
        ))}

        {resultado?.cajas?.length === 0 && !cargando && resultado && (
          <div className="col-span-full bg-red-900/10 border-4 border-red-500/30 p-10 rounded-[40px] text-center shadow-lg shadow-red-900/20 animate-pulse">
            <h2 className="text-red-400 font-black text-2xl uppercase italic tracking-tighter">Sin Cobertura Directa</h2>
            <p className="text-xs text-red-300/60 mt-2 uppercase font-bold">No se detectó infraestructura en un radio de 300 metros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorFactibilidad;