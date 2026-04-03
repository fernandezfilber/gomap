import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Componentes y Hooks propios
import Toolbar from './Toolbar';
import { useFibra } from '../../hooks/useFibra';
import { useInfraestructura } from '../../hooks/useInfraestructura';

// Icono personalizado para los postes de Forward Vision
const posteIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const MapaRed = () => {
    // 1. Estados del Componente
    const [modo, setModo] = useState('VER');
    const [postes, setPostes] = useState([]);

    // 2. Hooks de Lógica GIS
    const { puntosCable, trazando, agregarPunto, iniciarTrazo, finalizarTrazo } = useFibra('http://localhost:5000/api/tramos');
    const { agregarEquipo } = useInfraestructura('http://localhost:5000/api');

    // 3. Cargar Infraestructura desde Hostinger
    useEffect(() => {
        fetch('http://localhost:5000/api/postes')
            .then(res => res.json())
            .then(data => setPostes(data))
            .catch(err => console.error("Error cargando red:", err));
    }, []);

    // 4. Capturador de Eventos del Mapa
    const MapEvents = () => {
        useMapEvents({
            click: (e) => {
                if (modo === 'TRAZAR_FIBRA' || trazando) {
                    agregarPunto(e.latlng);
                } else if (modo === 'AGREGAR_POSTE') {
                    // Lógica para enviar POST de nuevo poste aquí
                    console.log("Nuevo nodo detectado en:", e.latlng);
                }
            },
        });
        return null;
    };

    return (
        <div style={{ 
            position: 'relative', 
            height: '100vh', 
            width: '100%',
            cursor: trazando ? 'crosshair' : 'grab' // UX: Cambio de cursor al dibujar
        }}>
            
            {/* AVISO DE MODO INGENIERÍA (Elimina el aviso de ESLint de 'trazando') */}
            {trazando && (
                <div style={styles.floatingAlert}>
                    🛰️ MODO TRAZADO ACTIVO: Haz click para agregar puntos de fibra
                </div>
            )}

            {/* BARRA DE HERRAMIENTAS */}
            <Toolbar 
                modo={modo} 
                setModo={(nuevoModo) => {
                    setModo(nuevoModo);
                    if (nuevoModo === 'TRAZAR_FIBRA') iniciarTrazo();
                }} 
                onFinalizarTrazo={() => {
                    finalizarTrazo({ nombre: 'Troncal Chosica', tipoCable: 'ADSS 24H' });
                    setModo('VER');
                }}
                hayTrazoActivo={puntosCable.length > 1}
            />

            {/* CANVAS DEL MAPA */}
            <MapContainer 
                center={[-11.935, -76.702]} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; Forward Vision GIS'
                />

                <MapEvents />

                {/* Previsualización del cableado en tiempo real */}
                {puntosCable.length > 0 && (
                    <Polyline 
                        positions={puntosCable} 
                        color="#8b5cf6" 
                        weight={4} 
                        dashArray="10, 10" 
                    />
                )}

                {/* Capa de Postes */}
                {postes.map((p) => (
                    <Marker 
                        key={p.id} 
                        position={[p.latitud, p.longitud]} 
                        icon={posteIcon}
                    >
                        <Popup>
                            <div style={{ textAlign: 'center', minWidth: '150px' }}>
                                <h4 style={{ margin: '0 0 10px 0' }}>📍 Poste: {p.codigo}</h4>
                                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                    <button onClick={() => agregarEquipo('mufas', p.id)} style={styles.popupBtn}>+ Mufa</button>
                                    <button onClick={() => agregarEquipo('cajas', p.id)} style={styles.popupBtn}>+ Caja</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

// Estilos internos para mantener el JSX limpio
const styles = {
    floatingAlert: {
        position: 'absolute',
        top: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
        backgroundColor: '#8b5cf6',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '12px',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        pointerEvents: 'none'
    },
    popupBtn: {
        fontSize: '10px',
        padding: '5px 8px',
        cursor: 'pointer',
        backgroundColor: '#f1f5f9',
        border: '1px solid #cbd5e1',
        borderRadius: '4px'
    }
};

export default MapaRed;