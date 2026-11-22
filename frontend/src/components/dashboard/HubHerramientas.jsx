import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Search, MapPin, PlusCircle, PenTool, ClipboardList, 
    Maximize, Minimize, Map as MapIcon, ChevronRight,
    FolderGit2
} from 'lucide-react';
import logoFull from '../../assets/logoGOmap.png';
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

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
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
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 p-4 md:p-8 custom-scrollbar flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6 animate-in fade-in duration-300 py-4">
                
                {/* Logo & Marca Superior (Idéntico a la pantalla de Acceso Seguro) */}
                <div className="flex flex-col items-center text-center">
                    <img src={logoFull} alt="GoMap" className="h-12 w-auto mb-2.5" />
                    <p className="text-[10px] font-black tracking-[0.28em] text-slate-400 uppercase">
                        ENTERPRISE NETWORK MANAGER
                    </p>
                </div>

                {/* Tarjeta Principal de Herramientas (Estilo Acceso Seguro) */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-9 shadow-2xl shadow-slate-200/80 space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-wider uppercase">
                                PANEL DE CONTROL
                            </h2>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">
                                Hola, <span className="text-cyan-600 font-black">{user?.nombre || 'Técnico'}</span>
                            </p>
                        </div>

                        {/* Botón Pantalla Completa */}
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3.5 py-2 rounded-full text-xs font-bold border border-slate-200/70 transition-all active:scale-95"
                            title="Pantalla completa"
                        >
                            {isFullscreen ? <Minimize size={14} className="text-cyan-500" /> : <Maximize size={14} className="text-cyan-500" />}
                            <span className="text-[11px] font-bold">{isFullscreen ? 'Salir' : 'Full'}</span>
                        </button>
                    </div>

                    {/* Botones de Acción Directos - Sin tanta descripción */}
                    <div className="space-y-3.5">
                        
                        {/* 1. Buscar Caja en Mi Ubicación (GPS) - Botón Primario Resaltado */}
                        <button
                            onClick={onBuscarGPS}
                            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] hover:from-[#00D4EB] hover:to-[#0EA5E9] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest py-4 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-cyan-400/25 active:scale-95 transition-all"
                        >
                            <MapPin size={20} className="text-slate-950" />
                            <span>Caja en mi ubicación actual</span>
                        </button>

                        {/* 2. Buscar Caja por Radio (Link o Coordenadas) */}
                        <button
                            onClick={onBuscarPorRadio}
                            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-full border border-slate-200/80 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                                    <Search size={16} />
                                </div>
                                <span>Buscar caja por radio / link</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* 3. Crear Nuevo Sector */}
                        <button
                            onClick={onCrearProyecto}
                            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-full border border-slate-200/80 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                    <PlusCircle size={16} />
                                </div>
                                <span>Crear nuevo sector / proyecto</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* 4. Nuevo Bloc de Notas (Croquis) */}
                        <button
                            onClick={() => navigate('/dashboard/croquis/nuevo')}
                            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-full border border-slate-200/80 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-600 flex items-center justify-center">
                                    <PenTool size={16} />
                                </div>
                                <span>Nuevo bloc de notas (croquis)</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* 5. Ver Mis Blocs de Notas */}
                        <button
                            onClick={() => navigate('/dashboard/croquis')}
                            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-full border border-slate-200/80 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                    <ClipboardList size={16} />
                                </div>
                                <span>Ver lista de bloc de notas</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                    </div>

                    {/* SECCIÓN DE SECTORES / PROYECTOS REGISTRADOS */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                <FolderGit2 size={13} className="text-cyan-500" />
                                Sectores Registrados ({proyectos.length})
                            </label>
                        </div>

                        {proyectos.length > 3 && (
                            <input
                                type="text"
                                value={filtroProyecto}
                                onChange={(e) => setFiltroProyecto(e.target.value)}
                                placeholder="Filtrar por nombre..."
                                className="w-full bg-slate-50 border border-slate-200/80 rounded-full px-5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-bold"
                            />
                        )}

                        <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                            {proyectosFiltrados.length === 0 ? (
                                <p className="text-xs text-slate-400 text-center py-4 font-semibold">
                                    {filtroProyecto ? "No se encontró el sector" : "Aún no tienes sectores"}
                                </p>
                            ) : (
                                proyectosFiltrados.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => onSeleccionarProyecto(p)}
                                        className="group bg-slate-50 hover:bg-cyan-50/50 border border-slate-200/70 hover:border-cyan-300 rounded-2xl p-3.5 cursor-pointer transition-all flex items-center justify-between active:scale-[0.99]"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-cyan-600 flex items-center justify-center shadow-xs group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
                                                <MapIcon size={17} />
                                            </div>
                                            <p className="text-xs font-black text-slate-800 group-hover:text-cyan-900 truncate uppercase">
                                                {p.nombre}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] font-black text-cyan-600 pl-2 shrink-0">
                                            <span>VER MAPA</span>
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default HubHerramientas;
