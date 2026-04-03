import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Componentes y Hooks propios
import Toolbar from './Toolbar';
import { useFibra } from '../../hooks/useFibra';
import { useInfraestructura } from '../../hooks/useInfraestructura';

const posteIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const MapaRed = () => {
    const [modo, setModo] = useState('VER');
    const [postes, setPostes] = useState([]);
    const [tramosGuardados, setTramosGuardados] = useState([]); // 🚀 Estado para los cables de la DB

    const { puntosCable, trazando, agregarPunto, iniciarTrazo, finalizarTrazo } = useFibra('http://localhost:5000/api/tramos');
    const { agregarEquipo } = useInfraestructura('http://localhost:5000/api');

    // 1. Cargar Postes y Tramos desde el Backend
    const cargarDatos = async () => {
        try {
            const [resPostes, resTramos] = await Promise.all([
                fetch('http://localhost:5000/api/postes').then(r => r.json()),
                fetch('http://localhost:5000/api/tramos').then(r => r.json())
            ]);
            setPostes(resPostes);
            setTramosGuardados(resTramos);
        } catch (err) {
            console.error("Error cargando infraestructura:", err);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const MapEvents = () => {
        useMapEvents({
            click: (e) => {
                if (modo === 'TRAZAR_FIBRA' || trazando) {
                    agregarPunto(e.latlng);
                }
            },
        });
        return null;
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%', cursor: trazando ? 'crosshair' : 'grab' }}>
            
            {trazando && (
                <div style={styles.floatingAlert}>
                    🛰️ MODO TRAZADO ACTIVO: Haz click para agregar puntos de fibra
                </div>
            )}

            <Toolbar 
                modo={modo} 
                setModo={(nuevoModo) => {
                    setModo(nuevoModo);
                    if (nuevoModo === 'TRAZAR_FIBRA') iniciarTrazo();
                }} 
                onFinalizarTrazo={async () => {
                    await finalizarTrazo({ nombre: 'Troncal Chosica', tipoCable: 'ADSS 24H' });
                    setModo('VER');
                    cargarDatos(); // 🔄 Recargar para ver el nuevo cable
                }}
                hayTrazoActivo={puntosCable.length > 1}
            />

            <MapContainer center={[-11.935, -76.702]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; Forward Vision' />
                <MapEvents />

                {/* 2. DIBUJAR TRAMOS GUARDADOS (Transformando objetos a arrays) */}
                {tramosGuardados.map((tramo) => {
                    // Leaflet necesita [[lat, lng], [lat, lng]]
                    const posiciones = tramo.path.map(p => [p.lat, p.lng]);
                    return (
                        <Polyline 
                            key={tramo.id} 
                            positions={posiciones} 
                            color="#8b5cf6" 
                            weight={5}
                        >
                            <Popup>
                                <strong>{tramo.nombre}</strong><br/>
                                Cable: {tramo.tipoCable}
                            </Popup>
                        </Polyline>
                    );
                })}

                {/* 3. PREVISUALIZACIÓN DEL TRAZO ACTUAL */}
                {puntosCable.length > 0 && (
                    <Polyline positions={puntosCable} color="#f59e0b" weight={3} dashArray="5, 10" />
                )}

                {/* 4. POSTES */}
                {postes.map((p) => (
                    <Marker key={p.id} position={[p.latitud, p.longitud]} icon={posteIcon}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <h4>Poste: {p.codigo}</h4>
                                <button onClick={() => agregarEquipo('mufas', p.id)} style={styles.popupBtn}>+ Mufa</button>
                                <button onClick={() => agregarEquipo('cajas', p.id)} style={styles.popupBtn}>+ Caja</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

const styles = {
    floatingAlert: {
        position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1100, backgroundColor: '#8b5cf6', color: 'white', padding: '10px 20px',
        borderRadius: '30px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
    },
    popupBtn: {
        fontSize: '10px', padding: '5px 8px', margin: '2px', cursor: 'pointer',
        backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px'
    }
};

export default MapaRed;