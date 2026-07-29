import L from 'leaflet';

// Importar las imágenes
import posteImg from '../assets/icons/luz-de-la-calle.png';
import posteOcupadoImg from '../assets/icons/energia.png';
import mufaImg from '../assets/icons/fibra-optica.png';
import clienteImg from '../assets/icons/clasificacion.png';

// Detectar si es dispositivo móvil
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const getZoomScale = (zoomLevel) => {
    if (zoomLevel >= 18) return 1.2;
    if (zoomLevel >= 17) return 1.05;
    if (zoomLevel >= 15) return 0.85;
    if (zoomLevel >= 13) return 0.68;
    return 0.55;
};

// ==================== ICONOS DINÁMICOS (RESPONSIVE) ====================

export const getIconoPoste = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 16 : 24;
    const size = Math.round(baseSize * getZoomScale(zoomLevel));
    return new L.Icon({
        iconUrl: posteImg,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
        popupAnchor: [0, -size],
    });
};

export const getIconoPosteOcupado = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 16 : 24;
    const size = Math.round(baseSize * getZoomScale(zoomLevel));
    return new L.Icon({
        iconUrl: posteOcupadoImg,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
        popupAnchor: [0, -size],
    });
};

export const getIconoMufa = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 15 : 22;
    const size = Math.round(baseSize * getZoomScale(zoomLevel));
    return new L.Icon({
        iconUrl: mufaImg,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
        popupAnchor: [0, -size],
    });
};

export const getIconoCaja = (codigo = '', zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 24 : 36;
    const size = Math.round(baseSize * getZoomScale(zoomLevel));
    const fontSize = isMob ? '12px' : '18px';
    const textFontSize = isMob ? '8px' : '11px';
    const bgColor = '#ff6b35';
    const borderColor = '#fff';
    const codigoTruncado = codigo && codigo.length > 10 ? codigo.substring(0, 10) + '...' : codigo;
    const showLabel = zoomLevel >= 17;
    
    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="background:${bgColor};border:3px solid ${borderColor};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:bold;box-shadow:0 4px 12px rgba(255,107,53,0.6);">📦</div>
            ${showLabel && codigoTruncado ? `<div style="background:rgba(0,0,0,0.9);color:white;font-size:${textFontSize};font-weight:bold;padding:2px 6px;border-radius:3px;white-space:nowrap;max-width:90px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${bgColor};">${codigoTruncado}</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, showLabel && codigoTruncado ? size + 20 : size],
        iconAnchor: [Math.round(size / 2), showLabel && codigoTruncado ? size + 20 : size],
        popupAnchor: [0, -(size / 2 + 10)]
    });
};

export const getIconoCliente = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 14 : 20;
    const width = Math.round(baseSize * getZoomScale(zoomLevel));
    const height = Math.round((isMob ? 18 : 26) * getZoomScale(zoomLevel));
    return new L.Icon({
        iconUrl: clienteImg,
        iconSize: [width, height],
        iconAnchor: [Math.round(width / 2), height],
        popupAnchor: [0, -height],
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