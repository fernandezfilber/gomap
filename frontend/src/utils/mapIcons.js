import L from 'leaflet';

// Detectar si es dispositivo móvil
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const getZoomScale = (zoomLevel) => {
    if (zoomLevel >= 18) return 1.0;
    if (zoomLevel >= 16) return 0.75;
    if (zoomLevel >= 14) return 0.55;
    if (zoomLevel >= 12) return 0.38;
    return 0.25;
};

const colorNameToHex = {
    Azul: '#3b82f6',
    Naranja: '#f97316',
    Verde: '#22c55e',
    Marrón: '#a16207',
    Gris: '#6b7280',
    Blanco: '#f8fafc',
    Rojo: '#ef4444',
    Negro: '#111827',
    Amarillo: '#eab308',
    Violeta: '#8b5cf6',
    Rosa: '#ec4899',
    Aqua: '#06b6d4',
};

const getColorFromName = (colorName) => {
    if (!colorName) return '#3b82f6';
    return colorNameToHex[colorName] || colorName;
};

const getCircleIcon = (fillColor, zoomLevel, label = '') => {
    const isMob = isMobile();
    const baseSize = isMob ? 18 : 26;
    const size = Math.max(14, Math.round(baseSize * getZoomScale(zoomLevel)));
    const showLabel = zoomLevel >= 18 && label;
    const labelFontSize = isMob ? '8px' : '10px';

    return L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="background:${fillColor};border:2px solid rgba(255,255,255,0.9);border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 8px rgba(0,0,0,0.18);"></div>
            ${showLabel ? `<div style="background:rgba(0,0,0,0.75);color:white;font-size:${labelFontSize};font-weight:700;padding:2px 5px;border-radius:9999px;white-space:nowrap;">${label}</div>` : ''}
        </div>`,
        className: 'custom-div-icon',
        iconSize: [size, showLabel ? size + 18 : size],
        iconAnchor: [Math.round(size / 2), showLabel ? size + 18 : size],
        popupAnchor: [0, -(size / 2 + 8)],
    });
};

// ==================== ICONOS DINÁMICOS (RESPONSIVE) ====================

export const getIconoPoste = (zoomLevel = 18) => {
    return getCircleIcon('#64748b', zoomLevel);
};

export const getIconoPosteOcupado = (zoomLevel = 18) => {
    return getCircleIcon('#0ea5e9', zoomLevel);
};

export const getIconoMufa = (zoomLevel = 18) => {
    return getCircleIcon('#f97316', zoomLevel);
};

export const getIconoCaja = (codigo = '', colorName = '#3b82f6', zoomLevel = 18) => {
    const fillColor = getColorFromName(colorName);
    const label = codigo ? (codigo.length > 8 ? `${codigo.substring(0, 8)}...` : codigo) : '';
    return getCircleIcon(fillColor, zoomLevel, label);
};

export const getIconoCliente = (zoomLevel = 18) => {
    return getCircleIcon('#8b5cf6', zoomLevel);
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