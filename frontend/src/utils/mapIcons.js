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
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16],
});

export const iconoPosteOcupado = new L.Icon({
    iconUrl: posteOcupadoImg,
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16],
});

export const iconoMufa = new L.Icon({
    iconUrl: mufaImg,
    iconSize: [15, 15],
    iconAnchor: [7, 15],
    popupAnchor: [0, -15],
});

export const iconoCaja = L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;">
        <div class="bg-white border-[1px] border-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm">📦</div>
    </div>`,
    className: 'custom-div-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
});

export const iconoCliente = new L.Icon({
    iconUrl: clienteImg,
    iconSize: [14, 18],
    iconAnchor: [7, 18],
    popupAnchor: [0, -18],
});

// Icono temporal (opcional)
export const iconoPosteTemporal = new L.Icon({
    iconUrl: posteImg,
    iconSize: [19, 19],
    iconAnchor: [9, 19],
    popupAnchor: [0, -19],
});

export default {
    iconoPoste,
    iconoPosteOcupado,
    iconoMufa,
    iconoCaja,
    iconoCliente,
    iconoPosteTemporal
};