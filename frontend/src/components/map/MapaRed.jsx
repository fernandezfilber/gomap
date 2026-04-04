import React, { useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Hooks y Servicios Personalizados
import { useMapData } from '../../hooks/useMapData';
import { useDrawFiber } from '../../hooks/useDrawFiber';
import { useGestionRed } from '../../hooks/useGestionRed';
import { redService } from '../../api/redService';

// Componentes de Interfaz
import Toolbar from './Toolbar';
import DetalleEquipo from './DetalleEquipo';
import ConfirmDelete from './ConfirmDelete';

// Configuración de Iconos
const posteIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    iconSize: [30, 30], iconAnchor: [15, 30],
});

const MapaRed = () => {
    // 1. ESTADOS DE INTERFAZ
    const [modo, setModo] = useState('VER');
    const [seleccionado, setSeleccionado] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // 2. HOOKS DE LÓGICA (Separados por funcionalidad)
    const { postes, tramos, troncales, reload } = useMapData();
    const { actualizarElemento, eliminarElemento } = useGestionRed(reload);
    
    const { 
        puntos, trazando, setTrazando, agregarPunto, guardar, color, setPuntos 
    } = useDrawFiber(async (nuevoTramo) => {
        await redService.crearTramo(nuevoTramo);
        reload();
    });

    // 3. EVENTOS DE CLICK EN EL MAPA
    const MapEvents = () => {
        useMapEvents({
            click: async (e) => {
                if (modo === 'AGREGAR_POSTE') {
                    const codigo = prompt("Código del nuevo poste:");
                    if (codigo) {
                        await redService.crearPoste({ 
                            codigo, 
                            latitud: e.latlng.lat, 
                            longitud: e.latlng.lng 
                        });
                        reload();
                        setModo('VER');
                    }
                } else if (trazando) {
                    agregarPunto(e.latlng);
                }
            },
        });
        return null;
    };

    // 4. MANEJADORES DE ACCIONES
    const handleFinalizarTrazo = async () => {
        const nombre = prompt("Nombre del tramo/cable:");
        if (!nombre) return;
        const tipo = prompt("¿Es TRONCAL o RAMAL?", "RAMAL");
        
        await guardar({ nombre, tipoCable: tipo });
        setModo('VER');
    };

    const confirmDeleteAction = async () => {
        await eliminarElemento(seleccionado.tipo, seleccionado.data.id);
        setShowConfirm(false);
        setSeleccionado(null);
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            {/* BARRA DE HERRAMIENTAS */}
            <Toolbar 
                modo={modo} 
                setModo={(m) => {
                    setModo(m);
                    setTrazando(m === 'TRAZAR_FIBRA');
                    if (m !== 'TRAZAR_FIBRA') setPuntos([]);
                }} 
                onFinalizarTrazo={handleFinalizarTrazo}
                hayTrazoActivo={puntos.length > 1}
            />

            <MapContainer center={[-11.935, -76.702]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />

                {/* CAPA: TRONCALES (Líneas gruesas negras/oscuras) */}
                {troncales.map((t) => (
                    <Polyline 
                        key={`troncal-${t.id}`} 
                        positions={t.ruta.map(p => [p.lat, p.lng])} 
                        color="#0f172a" 
                        weight={6}
                        eventHandlers={{ click: () => setSeleccionado({ data: t, tipo: 'troncales' }) }}
                    />
                ))}

                {/* CAPA: TRAMOS/RAMALES (Líneas de colores) */}
                {tramos.map((t) => (
                    <Polyline 
                        key={`tramo-${t.id}`} 
                        positions={t.path.map(p => [p.lat, p.lng])} 
                        color={t.color || "#8b5cf6"} 
                        weight={3}
                        eventHandlers={{ click: () => setSeleccionado({ data: t, tipo: 'tramos' }) }}
                    />
                ))}

                {/* PREVISUALIZACIÓN DE TRAZO ACTUAL */}
                {trazando && <Polyline positions={puntos} color={color} weight={4} dashArray="10, 10" />}

                {/* CAPA: POSTES Y EQUIPOS */}
                {postes.map((p) => (
                    <Marker key={`poste-${p.id}`} position={[p.latitud, p.longitud]} icon={posteIcon}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <strong>Poste: {p.codigo}</strong><hr/>
                                <button 
                                    onClick={() => setSeleccionado({ data: p, tipo: 'postes' })}
                                    style={styles.btnInfo}
                                > Ver Detalles / Gestionar </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* MODAL DE EDICIÓN/DETALLE */}
            {seleccionado && (
                <DetalleEquipo 
                    equipo={seleccionado.data} 
                    tipo={seleccionado.tipo}
                    onUpdate={actualizarElemento}
                    onDelete={() => setShowConfirm(true)}
                    onClose={() => setSeleccionado(null)}
                />
            )}

            {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
            <ConfirmDelete 
                isOpen={showConfirm}
                tipo={seleccionado?.tipo}
                nombre={seleccionado?.data?.codigo || seleccionado?.data?.nombre}
                onConfirm={confirmDeleteAction}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

const styles = {
    btnInfo: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', width: '100%' }
};

export default MapaRed;