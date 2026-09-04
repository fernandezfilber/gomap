import L from 'leaflet';

// Importar las imágenes
import posteImg from '../assets/icons/luz-de-la-calle.png';
import posteOcupadoImg from '../assets/icons/energia.png';
import mufaImg from '../assets/icons/fibra-optica.png';
import cajaImg from '../assets/icons/caja-negra.png';
import clienteImg from '../assets/icons/clasificacion.png';

// Detectar si es dispositivo móvil
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const getZoomScale = (zoomLevel) => {
    if (zoomLevel >= 18) return 1.0;
    if (zoomLevel >= 16) return 0.75;
    if (zoomLevel >= 14) return 0.55;
    if (zoomLevel >= 12) return 0.38;
    return 0.25;
};

// ==================== ICONOS DINÁMICOS (RESPONSIVE) ====================

export const getIconoPoste = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 16 : 24;
    const size = Math.max(14, Math.round(baseSize * getZoomScale(zoomLevel)));
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
    const size = Math.max(14, Math.round(baseSize * getZoomScale(zoomLevel)));
    return new L.Icon({
        iconUrl: posteOcupadoImg,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
        popupAnchor: [0, -size],
    });
};

export const getIconoMufa = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 14 : 28;
    const size = Math.max(14, Math.round(baseSize * getZoomScale(zoomLevel)));
    const fontSize = isMob ? '10px' : '16px';
    const textFontSize = isMob ? '7px' : '10px';
    const bgColor = '#7c3aed';
    const borderColor = '#ffffff';
    const showLabel = zoomLevel >= 18;

    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="background:${bgColor};border:2px solid ${borderColor};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:bold;box-shadow:0 2px 10px rgba(124,58,237,0.35);">🌀</div>
            ${showLabel ? `<div style="background:rgba(0,0,0,0.85);color:white;font-size:${textFontSize};font-weight:bold;padding:2px 5px;border-radius:4px;white-space:nowrap;max-width:90px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${bgColor};">MUFA</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, showLabel ? size + 20 : size],
        iconAnchor: [Math.round(size / 2), Math.round(size / 2)],
        popupAnchor: [0, -(size / 2 + 10)]
    });
};

export const getIconoCaja = (codigo = '', zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 16 : 32;
    const size = Math.max(14, Math.round(baseSize * getZoomScale(zoomLevel)));
    const fontSize = isMob ? '10px' : '18px';
    const textFontSize = isMob ? '7px' : '10px';
    const bgColor = '#f97316';
    const borderColor = '#ffffff';
    const codigoTruncado = codigo && codigo.length > 12 ? codigo.substring(0, 12) + '...' : codigo;
    const showLabel = zoomLevel >= 18;

    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="background:${bgColor};border:2px solid ${borderColor};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:bold;box-shadow:0 2px 10px rgba(249,115,22,0.35);">📦</div>
            ${showLabel && codigoTruncado ? `<div style="background:rgba(0,0,0,0.85);color:white;font-size:${textFontSize};font-weight:bold;padding:2px 5px;border-radius:4px;white-space:nowrap;max-width:110px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${bgColor};">${codigoTruncado}</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, showLabel && codigoTruncado ? size + 22 : size],
        iconAnchor: [Math.round(size / 2), Math.round(size / 2)],
        popupAnchor: [0, -(size / 2 + 10)]
    });
};

export const getIconoCliente = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 14 : 20;
    const width = Math.max(12, Math.round(baseSize * getZoomScale(zoomLevel)));
    const height = Math.max(14, Math.round((isMob ? 18 : 26) * getZoomScale(zoomLevel)));
    return new L.Icon({
        iconUrl: clienteImg,
        iconSize: [width, height],
        iconAnchor: [Math.round(width / 2), height],
        popupAnchor: [0, -height],
    });
};

// Icono temporal (opcional)
export const getIconoPosteTemporal = (zoomLevel = 18) => {
    const isMob = isMobile();
    const baseSize = isMob ? 19 : 28;
    const size = Math.max(16, Math.round(baseSize * getZoomScale(zoomLevel)));
    return new L.Icon({
        iconUrl: posteImg,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
        popupAnchor: [0, -size],
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