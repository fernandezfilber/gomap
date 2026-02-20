import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corregir error de iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente para recentrar el mapa cuando llegan datos nuevos
function RecenterMap({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView([coords.lat, coords.lng], 17);
        }
    }, [coords, map]);
    return null;
}

const MapaRed = ({ data, loading }) => {
    // Coordenadas iniciales (Centro de Chosica)
    const center = { lat: -11.9348, lng: -76.7092 };

    return (
        <div className="h-full w-full relative">
            {loading && (
                <div className="absolute inset-0 z-[1000] bg-[#0d1117]/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}

            <MapContainer 
                center={[center.lat, center.lng]} 
                zoom={14} 
                className="h-full w-full"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                />

                {/* Si hay datos, centramos y marcamos la ubicación del cliente */}
                {data?.punto_central && (
                    <>
                        <RecenterMap coords={data.punto_central} />
                        <Marker position={[data.punto_central.lat, data.punto_central.lng]}>
                            <Popup>Ubicación del Cliente</Popup>
                        </Marker>
                        
                        {/* Círculo de cobertura de 200 metros */}
                        <Circle 
                            center={[data.punto_central.lat, data.punto_central.lng]}
                            radius={200}
                            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
                        />
                    </>
                )}

                {/* Dibujar las cajas NAP encontradas */}
                {data?.cajas?.map((caja, idx) => (
                    <Marker 
                        key={idx} 
                        position={[caja.latitud, caja.longitud]}
                        icon={L.divIcon({
                            className: 'custom-div-icon',
                            html: `<div style="background-color: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        })}
                    >
                        <Popup>
                            <div className="text-xs">
                                <p className="font-bold text-blue-600">{caja.codigo}</p>
                                <p>Puertos: {caja.puertosTotales}</p>
                                <p>Distancia: {Math.round(caja.distancia_metros)}m</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapaRed;