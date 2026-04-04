import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const posteIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    iconSize: [30, 30], iconAnchor: [15, 30],
});

const MarcadorPoste = ({ poste, onAgregarEquipo }) => {
    return (
        <Marker position={[poste.latitud, poste.longitud]} icon={posteIcon}>
            <Popup>
                <div style={{ textAlign: 'center' }}>
                    <strong>Poste: {poste.codigo}</strong><hr/>
                    <button 
                        onClick={() => onAgregarEquipo('mufas', poste.id)} 
                        style={styles.btnMufa}
                    > + Mufa </button>
                    <button 
                        onClick={() => onAgregarEquipo('cajas', poste.id)} 
                        style={styles.btnCaja}
                    > + Caja NAP </button>
                </div>
            </Popup>
        </Marker>
    );
};

const styles = {
    btnMufa: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginBottom: '5px' },
    btnCaja: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', width: '100%' }
};

export default MarcadorPoste;