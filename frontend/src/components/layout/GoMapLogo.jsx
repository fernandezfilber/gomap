import React from 'react';

const GoMapLogo = ({ className = "h-8 w-8", textClassName = "text-xl", showText = true }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* SVG Logo similar al del usuario */}
            <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Pin de Ubicación Estilizado */}
                <path 
                    d="M50 95C50 95 85 65 85 35C85 15.67 69.33 0 50 0C30.67 0 15 15.67 15 35C15 65 50 95 50 95Z" 
                    fill="#1A73E8" 
                />
                {/* G Estilizada */}
                <path 
                    d="M50 20C38.9543 20 30 28.9543 30 40C30 51.0457 38.9543 60 50 60C61.0457 60 70 51.0457 70 40H50V48H61.5C60.5 53 55.5 55 50 55C41.7157 55 35 48.2843 35 40C35 31.7157 41.7157 25 50 25C56 25 61 28 63.5 32.5L69 28C65.5 22.5 58.5 20 50 20Z" 
                    fill="white" 
                />
                {/* Orbital/Fibra */}
                <circle 
                    cx="50" cy="35" r="30" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeDasharray="100 50"
                    strokeLinecap="round"
                    className="animate-spin-slow origin-center"
                    style={{ transformOrigin: '50% 35%' }}
                />
            </svg>
            
            {showText && (
                <div className="flex flex-col leading-none">
                    <span className={`font-black tracking-tighter text-white ${textClassName}`}>
                        go<span className="text-blue-500">map</span>
                    </span>
                    <span className="text-[7px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                        Gestión de Redes
                    </span>
                </div>
            )}
        </div>
    );
};

export default GoMapLogo;
