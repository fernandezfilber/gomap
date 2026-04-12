import L from 'leaflet';

// Configuración base para iconos personalizados
const crearIconoPersonalizado = (colorFondo, svgContent, tamaño = 38) => {
    return L.divIcon({
        className: 'custom-map-icon',
        html: `
            <div style="
                background: ${colorFondo};
                width: ${tamaño}px;
                height: ${tamaño}px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4),
                            0 0 0 4px rgba(255,255,255,0.9);
                border: 3px solid white;
                transition: all 0.2s ease;
            ">
                <div style="color: white; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.6));">
                    ${svgContent}
                </div>
            </div>
        `,
        iconSize: [tamaño, tamaño],
        iconAnchor: [tamaño / 2, tamaño / 2],
        popupAnchor: [0, -tamaño / 2 - 8],
    });
};

// ==================== ICONOS MEJORADOS ====================

export const iconoPoste = crearIconoPersonalizado(
    'linear-gradient(135deg, #1e40af, #3b82f6)', 
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3v18"></path>
        <path d="M6 7h12"></path>
        <path d="M4 19h16"></path>
        <circle cx="12" cy="10" r="2" fill="white" stroke="white"/>
    </svg>
`);

export const iconoMufa = crearIconoPersonalizado(
    'linear-gradient(135deg, #c2410c, #f97316)', 
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" fill="none"/>
        <path d="M8 12h8"/>
        <path d="M12 8v8"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
`);

export const iconoCaja = crearIconoPersonalizado(
    'linear-gradient(135deg, #166534, #4ade80)', 
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="6" width="16" height="14" rx="2"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <path d="M9 14h6"/>
        <path d="M9 18h6"/>
    </svg>
`);

export const iconoCliente = crearIconoPersonalizado(
    'linear-gradient(135deg, #7c3aed, #a855f7)', 
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
`);

// Icono para modo "colocar poste" (más grande y visible)
export const iconoPosteTemporal = L.divIcon({
    className: 'custom-div-icon',
    html: `
        <div style="background: #3b82f6; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px rgba(59,130,246,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v18"></path>
                <path d="M6 7h12"></path>
                <path d="M4 19h16"></path>
            </svg>
        </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
});

export default {
    iconoPoste,
    iconoMufa,
    iconoCaja,
    iconoCliente,
    iconoPosteTemporal
};