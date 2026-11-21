import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Search, MapPin, PlusCircle, PenTool, ClipboardList, 
    Maximize, Minimize, Map as MapIcon, ChevronRight,
    Sparkles, Compass, ShieldCheck, FolderGit2
} from 'lucide-react';
import GoMapLogo from '../layout/GoMapLogo';
import useAuth from '../../hooks/useAuth';

const HubHerramientas = ({ 
    proyectos = [], 
    onSeleccionarProyecto, 
    onCrearProyecto, 
    onBuscarPorRadio, 
    onBuscarGPS 
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filtroProyecto, setFiltroProyecto] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Detección de fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    await document.documentElement.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                }
            }
        } catch (err) {
            console.log('Fullscreen error:', err);
        }
    };

    const proyectosFiltrados = proyectos.filter(p => 
        (p.nombre || '').toLowerCase().includes(filtroProyecto.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8 custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-300">
                
                {/* Header Superior del Hub */}
                <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800/80 rounded-3xl p-5 md:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-[#00E5FF]/10 text-[#00E5FF] px-2.5 py-1 rounded-full border border-[#00E5FF]/20">
                                    <Sparkles size={12} /> Centro de Control
                                </span>
                                <span className="text-xs text-slate-400 font-semibold">
                                    {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                                Bienvenido, <span className="text-[#00E5FF]">{user?.nombre || 'Técnico'}</span> 👋
                            </h1>
                            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
                                Selecciona una herramienta rápida o ingresa directamente a uno de tus sectores de red.
                            </p>
                        </div>

                        {/* Botón de Pantalla Completa para móvil y PC */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold border border-slate-700/80 transition-all shadow-md"
                                title="Ocupar pantalla completa en el móvil"
                            >
                                {isFullscreen ? <Minimize size={16} className="text-[#00E5FF]" /> : <Maximize size={16} className="text-[#00E5FF]" />}
                                <span className="hidden sm:inline">{isFullscreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}</span>
                                <span className="sm:hidden">{isFullscreen ? 'Normal' : 'Pantalla Completa'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid de Herramientas Rápidas */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <Compass size={16} className="text-[#00E5FF]" /> Herramientas Rápidas
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
                        
                        {/* 1. Buscar Caja por Radio */}
                        <div 
                            onClick={onBuscarPorRadio}
                            className="group bg-slate-900/80 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 hover:border-[#00E5FF]/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/30 hover:shadow-[#00E5FF]/5"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00E5FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Search size={22} />
                                </div>
                                <h3 className="text-base font-black text-white group-hover:text-[#00E5FF] transition-colors mb-1">
                                    Buscar Caja por Radio
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Por coordenadas (Lat, Lng) o link de Google Maps con radio ajustable.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-cyan-400">
                                <span>Abrir Buscador</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* 2. Caja más cercana a mi Ubicación GPS */}
                        <div 
                            onClick={onBuscarGPS}
                            className="group bg-slate-900/80 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/30 hover:shadow-emerald-500/5"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin size={22} />
                                </div>
                                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors mb-1">
                                    Caja en mi Ubicación
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Detecta tu GPS en 1 toque y ubica la caja de fibra más cercana a ti.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                                <span>Activar GPS</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* 3. Crear Nuevo Proyecto / Sector */}
                        <div 
                            onClick={onCrearProyecto}
                            className="group bg-slate-900/80 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/30 hover:shadow-blue-500/5"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <PlusCircle size={22} />
                                </div>
                                <h3 className="text-base font-black text-white group-hover:text-blue-400 transition-colors mb-1">
                                    Crear Nuevo Sector
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Registra una nueva zona o proyecto para trazar postes, cajas y cables.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-blue-400">
                                <span>Nuevo Proyecto</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* 4. Crear Nuevo Bloc de Notas (Croquis) */}
                        <div 
                            onClick={() => navigate('/dashboard/croquis/nuevo')}
                            className="group bg-slate-900/80 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/30 hover:shadow-violet-500/5"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <PenTool size={22} />
                                </div>
                                <h3 className="text-base font-black text-white group-hover:text-violet-400 transition-colors mb-1">
                                    Nuevo Bloc de Notas
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Dibuja un borrador rápido de red en croquis sin afectar el mapa principal.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-violet-400">
                                <span>Abrir Bloc</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sección de Sectores / Proyectos Disponibles */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <FolderGit2 size={16} className="text-[#00E5FF]" /> Mis Sectores y Redes
                                <span className="bg-slate-800 text-[#00E5FF] px-2 py-0.5 rounded-full text-[10px]">
                                    {proyectos.length}
                                </span>
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Toca un sector para cargar su mapa y gestionar su infraestructura.
                            </p>
                        </div>

                        {proyectos.length > 4 && (
                            <div className="w-full sm:w-64">
                                <input
                                    type="text"
                                    value={filtroProyecto}
                                    onChange={(e) => setFiltroProyecto(e.target.value)}
                                    placeholder="Filtrar sectores..."
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                                />
                            </div>
                        )}
                    </div>

                    {proyectosFiltrados.length === 0 ? (
                        <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-3xl p-8 text-center space-y-3">
                            <FolderGit2 size={36} className="text-slate-600 mx-auto" />
                            <p className="text-sm font-bold text-slate-300">
                                {filtroProyecto ? "No se encontraron sectores con ese nombre" : "Aún no tienes sectores registrados"}
                            </p>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                Crea tu primer sector para comenzar a colocar postes, mufas, cajas y tramos de fibra.
                            </p>
                            <button
                                onClick={onCrearProyecto}
                                className="inline-flex items-center gap-2 bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-950 font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-[#00E5FF]/20"
                            >
                                <PlusCircle size={15} /> Crear Primer Sector
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {proyectosFiltrados.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => onSeleccionarProyecto(p)}
                                    className="group bg-slate-900/90 hover:bg-slate-850 active:scale-[0.98] border border-slate-800/90 hover:border-[#00E5FF]/50 rounded-2xl p-4.5 cursor-pointer transition-all duration-200 flex items-center justify-between shadow-lg shadow-black/20"
                                >
                                    <div className="flex items-center gap-3.5 overflow-hidden">
                                        <div className="w-11 h-11 rounded-xl bg-slate-800 text-[#00E5FF] flex items-center justify-center shrink-0 group-hover:bg-[#00E5FF] group-hover:text-slate-950 transition-colors">
                                            <MapIcon size={20} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                                                {p.nombre}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-medium">
                                                Entrar al mapa del sector
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-slate-600 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all pl-2">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Acceso Rápido Secundario a Croquis */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                            <ClipboardList size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">¿Tienes borradores gráficos guardados?</p>
                            <p className="text-[11px] text-slate-400">Accede al listado de blocs de notas para consultar o importar a un sector.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard/croquis')}
                        className="w-full sm:w-auto bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                    >
                        Ver Lista de Croquis
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HubHerramientas;
