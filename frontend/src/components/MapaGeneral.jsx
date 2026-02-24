import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Polyline, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { obtenerMapaRed } from '../api/redApi';

const MapaGeneral = () => {
  const [infra, setInfra] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const cargar = useCallback(async () => {
    try {
      const res = await obtenerMapaRed();
      setInfra(Array.isArray(res.data) ? res.data : []);
    } catch (err) { 
      console.error("Error al cargar mapa de red:", err); 
    } finally { 
      setCargando(false); 
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  if (!isLoaded || cargando) return (
    <div className="flex flex-col items-center justify-center h-[75vh] bg-[#0d1117] rounded-2xl border border-gray-800">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-400 font-black animate-pulse uppercase tracking-widest">Sincronizando Raíz de Red...</p>
    </div>
  );

  return (
    <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden border-4 border-[#161b22] shadow-2xl">
      
      {/* LEYENDA TÉCNICA FLOTANTE PRO */}
      <div className="absolute top-5 left-5 z-10 bg-[#0d1117]/90 p-4 rounded-2xl border border-gray-700 backdrop-blur-md shadow-2xl text-white pointer-events-none">
        <h4 className="text-[10px] font-black text-blue-400 mb-3 uppercase tracking-tighter">Leyenda de Infraestructura</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-1 bg-[#ff00ff] rounded-full shadow-[0_0_5px_#ff00ff]"></div>
            <span className="text-[10px] font-bold uppercase">Troncal Principal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-1 bg-[#00EAFF] rounded-full shadow-[0_0_5px_#00EAFF]"></div>
            <span className="text-[10px] font-bold uppercase">Distribución Mufa</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-1 bg-[#39ff14] rounded-full shadow-[0_0_5px_#39ff14]"></div>
            <span className="text-[10px] font-bold uppercase">Acceso Caja NAP</span>
          </div>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: -11.935, lng: -76.705 }}
        zoom={15}
        options={{
          mapTypeId: 'satellite',
          tilt: 45,
          styles: [{ featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] }]
        }}
      >
        {infra.map(troncal => (
          <React.Fragment key={troncal.id}>
            
            {/* 1. DIBUJAR RUTA TRONCAL (RAÍZ MADRE) */}
            {troncal.ruta && (
              <Polyline 
                path={troncal.ruta}
                options={{ strokeColor: '#ff00ff', strokeWeight: 6, strokeOpacity: 0.9 }}
              />
            )}

            {troncal.mufas?.map(mufa => (
              <React.Fragment key={mufa.id}>
                
                {/* 2. DIBUJAR RUTA HACIA MUFA (RAMA) */}
                {mufa.ruta && (
                  <Polyline 
                    path={mufa.ruta}
                    options={{ strokeColor: '#00EAFF', strokeWeight: 4, strokeOpacity: 0.8 }}
                  />
                )}

                {/* MARCADOR MUFA */}
                <Marker 
                  position={{ lat: mufa.latitud, lng: mufa.longitud }}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  onClick={() => setSeleccionado({ tipo: 'MUFA', data: mufa })}
                />

                {mufa.cajas?.map(caja => (
                  <React.Fragment key={caja.id}>
                    
                    {/* 3. DIBUJAR RUTA HACIA CAJA (HOJAS) */}
                    {caja.ruta && (
                      <Polyline 
                        path={caja.ruta}
                        options={{ strokeColor: '#39ff14', strokeWeight: 2, strokeOpacity: 0.7 }}
                      />
                    )}

                    {/* MARCADOR CAJA NAP */}
                    <Marker 
                      position={{ lat: caja.latitud, lng: caja.longitud }}
                      icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                      onClick={() => setSeleccionado({ tipo: 'CAJA', data: caja })}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        {/* VENTANA DE INFORMACIÓN DINÁMICA */}
        {seleccionado && (
          <InfoWindow
            position={{ lat: seleccionado.data.latitud, lng: seleccionado.data.longitud }}
            onCloseClick={() => setSeleccionado(null)}
          >
            <div className="text-black p-2 min-w-[150px]">
              <h4 className="font-black text-blue-600 border-b border-gray-200 mb-1">
                {seleccionado.tipo}: {seleccionado.data.codigo}
              </h4>
              <p className="text-[10px] text-gray-600 uppercase font-bold">
                {seleccionado.tipo === 'MUFA' ? `Buffer: ${seleccionado.data.bufferColor}` : `Puertos: ${seleccionado.data.puertosTotales}`}
              </p>
              <p className="text-[10px] mt-1 italic text-gray-500">
                {seleccionado.data.detalles || "Sin notas técnicas."}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapaGeneral;