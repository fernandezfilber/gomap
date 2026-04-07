// src/utils/mapIcons.js
import L from 'leaflet';

// Función para crear iconos personalizados
const crearIconoPersonalizado = (color, svgContent, tamaño = 34) => {
    return L.divIcon({
        className: 'custom-div-icon', // Evita estilos por defecto de Leaflet
        html: `
            <div style="
                background-color: ${color};
                width: ${tamaño + 12}px;
                height: ${tamaño + 12}px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.35);
                border: 3px solid white;
            ">
                <div style="color: white; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
                    ${svgContent}
                </div>
            </div>
        `,
        iconSize: [tamaño + 12, tamaño + 12],
        iconAnchor: [(tamaño + 12) / 2, (tamaño + 12) / 2],
        popupAnchor: [0, -(tamaño + 10)],
    });
};

// ==================== ICONOS ====================

export const iconoPoste = crearIconoPersonalizado('#1e40af', `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3v18"></path>
        <path d="M7 7h10"></path>
        <path d="M5 19h14"></path>
    </svg>
`);

export const iconoCaja = crearIconoPersonalizado('#166534', `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="8" width="18" height="13" rx="2"></rect>
        <path d="M16 4h-8l2-3h4z"></path>
    </svg>
`);

export const iconoMufa = crearIconoPersonalizado('#c2410c', `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
    </svg>
`);