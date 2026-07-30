import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import useMufas from '../../hooks/useMufas';
import useCajas from '../../hooks/useCajas';
import useTramos from '../../hooks/useTramos';

const MapaVisualizacion = () => {
  const { mufas } = useMufas();
  const { cajas } = useCajas();
  const { tramos } = useTramos();

  const allCoordinates = useMemo(() => {
    const coords = [];
    mufas.forEach(m => {
      if (m.latitud && m.longitud) coords.push([parseFloat(m.latitud), parseFloat(m.longitud)]);
    });
    cajas.forEach(c => {
      if (c.latitud && c.longitud) coords.push([parseFloat(c.latitud), parseFloat(c.longitud)]);
    });
    tramos.forEach(t => {
      if (Array.isArray(t.path)) {
        t.path.forEach(point => {
          if (Array.isArray(point) && point.length >= 2) coords.push([parseFloat(point[0]), parseFloat(point[1])]);
        });
      }
    });
    return coords;
  }, [mufas, cajas, tramos]);

  const bounds = useMemo(() => {
    if (!allCoordinates.length) return null;
    return L.latLngBounds(allCoordinates);
  }, [allCoordinates]);

  const center = bounds ? bounds.getCenter() : [-12.0, -76.5];
  const zoom = bounds ? 13 : 5;

  const squareIcon = new L.DivIcon({
    html: '<div style="width:12px;height:12px;background:#7c3aed;border:2px solid white;border-radius:4px;box-shadow:0 0 6px rgba(124,58,237,0.5);"></div>',
    className: 'simple-mufa-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <div className="h-screen w-full bg-slate-950">
      <div className="absolute z-40 left-4 top-4 bg-slate-900/80 text-white px-4 py-3 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <p className="text-sm font-bold">Vista global de red</p>
        <p className="text-xs text-slate-300">Solo visualización · sin edición · sin etiquetas</p>
      </div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution=""
          maxZoom={19}
        />

        {bounds && <FitBounds bounds={bounds} />}

        {tramos.map((tramo) => (
          Array.isArray(tramo.path) ? (
            <Polyline
              key={tramo.id}
              positions={tramo.path}
              pathOptions={{ color: tramo.colorVisual || '#22c55e', weight: 3, opacity: 0.7, lineCap: 'round' }}
            />
          ) : null
        ))}

        {cajas.filter(c => c.latitud && c.longitud).map((caja) => (
          <CircleMarker
            key={caja.id}
            center={[parseFloat(caja.latitud), parseFloat(caja.longitud)]}
            radius={5}
            pathOptions={{ fillColor: '#f97316', color: '#ffffff', weight: 1, opacity: 0.9, fillOpacity: 0.9 }}
          />
        ))}

        {mufas.filter(m => m.latitud && m.longitud).map((mufa) => (
          <Marker
            key={mufa.id}
            position={[parseFloat(mufa.latitud), parseFloat(mufa.longitud)]}
            icon={squareIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
};

const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [90, 90], maxZoom: 15 });
    }
  }, [bounds, map]);
  return null;
};

export default MapaVisualizacion;
