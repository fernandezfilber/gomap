import L from 'leaflet';

// Importar las imágenes
import posteImg from '../assets/icons/luz-de-la-calle.png';
import posteOcupadoImg from '../assets/icons/energia.png';
import mufaImg from '../assets/icons/fibra-optica.png';
import cajaImg from '../assets/icons/caja-negra.png';
import clienteImg from '../assets/icons/clasificacion.png';

// ==================== ICONOS DESDE ARCHIVOS ====================

export const iconoPoste = new L.Icon({
    iconUrl: posteImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export const iconoPosteOcupado = new L.Icon({
    iconUrl: posteOcupadoImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export const iconoMufa = new L.Icon({
    iconUrl: mufaImg,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

export const iconoCaja = L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;">
        <div class="bg-white border-2 border-emerald-500 rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg">📦</div>
    </div>`,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

export const iconoCliente = new L.Icon({
    iconUrl: clienteImg,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
});

// Icono temporal (opcional)
export const iconoPosteTemporal = new L.Icon({
    iconUrl: posteImg, // o crea uno especial
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

export default {
    iconoPoste,
    iconoPosteOcupado,
    iconoMufa,
    iconoCaja,
    iconoCliente,
    iconoPosteTemporal
};