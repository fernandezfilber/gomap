import L from 'leaflet';

// Importar las imágenes
import posteImg from '../assets/icons/luz-de-la-calle.png';
import posteOcupadoImg from '../assets/icons/energia.png';
import mufaImg from '../assets/icons/fibra-optica.png';
import cajaImg from '../assets/icons/caja-negra.png';
import clienteImg from '../assets/icons/clasificacion.png';

// Detectar si es dispositivo móvil
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

// ==================== ICONOS DINÁMICOS (RESPONSIVE) ====================

export const getIconoPoste = () => {
    const isMob = isMobile();
    return new L.Icon({
        iconUrl: posteImg,
        iconSize: isMob ? [16, 16] : [24, 24],
        iconAnchor: isMob ? [8, 16] : [12, 24],
        popupAnchor: [0, isMob ? -16 : -24],
    });
};

export const getIconoPosteOcupado = () => {
    const isMob = isMobile();
    return new L.Icon({
        iconUrl: posteOcupadoImg,
        iconSize: isMob ? [16, 16] : [24, 24],
        iconAnchor: isMob ? [8, 16] : [12, 24],
        popupAnchor: [0, isMob ? -16 : -24],
    });
};

export const getIconoMufa = () => {
    const isMob = isMobile();
    return new L.Icon({
        iconUrl: mufaImg,
        iconSize: isMob ? [15, 15] : [22, 22],
        iconAnchor: isMob ? [7, 15] : [11, 22],
        popupAnchor: [0, isMob ? -15 : -22],
    });
};

export const getIconoCaja = (codigo = '') => {
    const isMob = isMobile();
    const size = isMob ? 24 : 36;
    const fontSize = isMob ? '12px' : '18px';
    const textFontSize = isMob ? '8px' : '11px';
    const bgColor = '#ff6b35'; // Naranja vibrante que resalta más
    const borderColor = '#fff';
    // Truncar código a 10 caracteres
    const codigoTruncado = codigo && codigo.length > 10 ? codigo.substring(0, 10) + '...' : codigo;
    
    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="background:${bgColor};border:3px solid ${borderColor};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:bold;box-shadow:0 4px 12px rgba(255,107,53,0.6);">📦</div>
            ${codigoTruncado ? `<div style="background:rgba(0,0,0,0.9);color:white;font-size:${textFontSize};font-weight:bold;padding:2px 6px;border-radius:3px;white-space:nowrap;max-width:90px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${bgColor};">${codigoTruncado}</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, codigoTruncado ? size + 20 : size],
        iconAnchor: [size / 2, codigoTruncado ? size + 20 : size / 2],
        popupAnchor: [0, -(size / 2 + 10)]
    });
};

export const getIconoCliente = () => {
    const isMob = isMobile();
    return new L.Icon({
        iconUrl: clienteImg,
        iconSize: isMob ? [14, 18] : [20, 26],
        iconAnchor: isMob ? [7, 18] : [10, 26],
        popupAnchor: [0, isMob ? -18 : -26],
    });
};

// Icono temporal (opcional)
export const getIconoPosteTemporal = () => {
    const isMob = isMobile();
    return new L.Icon({
        iconUrl: posteImg,
        iconSize: isMob ? [19, 19] : [28, 28],
        iconAnchor: isMob ? [9, 19] : [14, 28],
        popupAnchor: [0, isMob ? -19 : -28],
    });
};

// ==================== BACKWARD COMPATIBILITY: ICONOS ESTÁTICOS ====================

export const iconoPoste = getIconoPoste();

export const iconoPosteOcupado = getIconoPosteOcupado();

export const iconoMufa = getIconoMufa();

export const iconoCaja = getIconoCaja();

export const iconoCliente = getIconoCliente();

// Icono temporal (opcional)
export const iconoPosteTemporal = getIconoPosteTemporal();

export default {
    iconoPoste,
    iconoPosteOcupado,
    iconoMufa,
    iconoCaja,
    iconoCliente,
    iconoPosteTemporal
};