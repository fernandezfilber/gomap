import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, Users, Map as MapIcon, LogOut, 
    CheckCircle, PlusCircle, Settings, BarChart3,
    Search, Target, X, ShieldAlert, Navigation, PenTool, Package, ClipboardList, User
} from 'lucide-react';

import useProyectos from '../../hooks/useProyectos';
import useAuth from '../../hooks/useAuth';
import useRed from '../../hooks/useRed';
import ModalNuevoProyecto from '../modals/ModalNuevoProyecto';
import GoMapLogo from './GoMapLogo';
import logoFull from '../../assets/logoGOmap.png';

const Sidebar = ({ isOpen, onClose }) => {
    const { proyectos, setProyectoSeleccionado, proyectoSeleccionado, crearProyecto } = useProyectos();
    const { logout } = useAuth();
    
    const { verificarCobertura, resultadoFactibilidad, loading: factibilidadLoading } = useRed(proyectoSeleccionado?.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    // ==================== MANEJADORES ====================
    const handleCambioProyecto = (e) => {
        const idSeleccionado = e.target.value;
        if (!idSeleccionado) {
            setProyectoSeleccionado(null);
            localStorage.removeItem('proyectoId');
            return;
        }
        const proyectoEncontrado = proyectos.find(p => p.id === idSeleccionado);
        setProyectoSeleccionado(proyectoEncontrado);
        localStorage.setItem('proyectoId', idSeleccionado);
    };

    const handleSaveNuevoProyecto = async (datos) => {
        try {
            const nuevo = await crearProyecto(datos);
            setProyectoSeleccionado(nuevo);
            localStorage.setItem('proyectoId', nuevo.id);
            setIsModalOpen(false);
            alert(`Sector "${nuevo.nombre}" creado y activado.`);
        } catch (error) {
            console.error('Error al crear proyecto:', error);
            alert(error?.message || "Error al crear el proyecto");
        }
    };

    // ==================== EXTRAER COORDENADAS ====================
    const extraerCoordenadas = (input) => {
        if (!input) return null;

        const comprobadores = [
            /(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
            /@(-?\d+\.\d+),(-?\d+\.\d+)/,
            /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
            /(-?\d+\.\d+)\s+(-?\d+\.\d+)/
        ];

        for (const regex of comprobadores) {
            const match = input.match(regex);
            if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        }

        const numbers = input.match(/-?\d+(?:\.\d+)?/g) || [];
        for (let i = 0; i + 1 < numbers.length; i += 1) {
            const lat = parseFloat(numbers[i]);
            const lng = parseFloat(numbers[i + 1]);
            if (!Number.isNaN(lat) && !Number.isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                return { lat, lng };
            }
        }

        return null;
    };

    // ==================== RESOLVER URL CORTA ====================
    const resolveGoogleMapsUrl = async (url) => {
        if (!url.includes('maps.app.goo.gl')) return url;
        try {
            const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
            return response.headers.get('location') || response.url;
        } catch {
            return url;
        }
    };

    // ==================== BUSCAR COBERTURA (CON MARCA EN MAPA) ====================
    const handleBuscarCobertura = async () => {
        if (!proyectoSeleccionado) {
            alert("Primero selecciona un Sector");
            return;
        }
        if (!busqueda.trim()) {
            alert("Ingresa una URL o coordenadas");
            return;
        }

        try {
            const urlFinal = await resolveGoogleMapsUrl(busqueda);
            let coords = extraerCoordenadas(urlFinal);
            if (!coords) coords = extraerCoordenadas(busqueda);

            if (!coords) {
                alert("No se detectaron coordenadas válidas");
                return;
            }

            const res = await verificarCobertura(coords.lat, coords.lng);
            
            // NOTIFICAR AL MAPA
            const event = new window.CustomEvent('verificarPunto', { 
                detail: { 
                    lat: coords.lat, 
                    lng: coords.lng,
                    res 
                } 
            });
            window.dispatchEvent(event);

        } catch (error) {
            console.error("Error en búsqueda:", error);
            alert("Error al verificar cobertura");
        }
    };

    return (
        <>
            {/* Backdrop para móvil */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[1001] lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed lg:relative
                top-0 left-0
                w-72 bg-white h-screen flex flex-col text-slate-500 border-r border-slate-100 
                shadow-2xl z-[1001]
                transition-transform duration-300 ease-in-out
                pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <img src={logoFull} alt="GoMap" className="h-10 w-auto" />
                    <button 
                        onClick={onClose}
                        className="lg:hidden text-slate-300 hover:text-[#FF4500] p-2 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">

                    {/* SELECCIÓN DE SECTOR */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Infraestructura</label>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-1 text-[10px] font-black text-[#00E5FF] hover:text-[#00D4EB] transition-all uppercase bg-[#00E5FF]/5 px-3 py-1.5 rounded-full border border-[#00E5FF]/20"
                            >
                                <PlusCircle size={12} /> Nuevo
                            </button>
                        </div>

                        <select 
                            value={proyectoSeleccionado?.id || ""}
                            onChange={handleCambioProyecto}
                            className={`w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-[#00E5FF] transition-all cursor-pointer shadow-sm ${
                                proyectoSeleccionado ? 'border-[#00E5FF]/30' : 'border-slate-100'
                            }`}
                        >
                            <option value="">-- Seleccionar Sector --</option>
                            {proyectos.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>

                        {proyectoSeleccionado && (
                            <div className="p-4 bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-2xl flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                                <div className="overflow-hidden">
                                    <p className="text-[8px] font-black text-[#00E5FF] uppercase tracking-widest">En Línea</p>
                                    <p className="text-xs text-slate-900 font-bold truncate leading-tight">{proyectoSeleccionado.nombre}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BUSCADOR DE COBERTURA */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase px-1 tracking-[0.2em]">Factibilidad</label>
                        
                        <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4 shadow-xl shadow-slate-100/50">
                            <div className="flex items-center gap-2">
                                <Target size={16} className="text-[#FF4500]" />
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verificador GIS</span>
                            </div>

                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Coordenadas o URL"
                                className="w-full bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-xs text-slate-900 placeholder-slate-300 focus:border-[#00E5FF] focus:outline-none"
                            />

                            <button
                                onClick={handleBuscarCobertura}
                                disabled={factibilidadLoading || !proyectoSeleccionado}
                                className="w-full bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-900 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition-all font-black text-[10px] uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#00E5FF]/20"
                            >
                                {factibilidadLoading ? "Procesando..." : (
                                    <>
                                        <Search size={16} />
                                        Verificar Punto
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    const event = new window.CustomEvent('abrirBusquedaAvanzada');
                                    window.dispatchEvent(event);
                                }}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all font-black text-[10px] uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 border border-slate-800 shadow-lg"
                            >
                                <Navigation size={16} className="text-[#00E5FF]" />
                                Búsqueda por Radio
                            </button>

                            {resultadoFactibilidad && (
                                <div className={`text-center text-[10px] font-black uppercase tracking-widest py-2.5 rounded-full border ${
                                    resultadoFactibilidad.disponible 
                                        ? 'bg-[#00E5FF]/5 text-[#00E5FF] border-[#00E5FF]/20' 
                                        : 'bg-red-500/5 text-red-500 border-red-500/20'
                                }`}>
                                    {resultadoFactibilidad.disponible ? "Disponible" : "Sin Cobertura"}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* BUSCADOR POR CÓDIGO (NUEVO) */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase px-1 tracking-[0.2em]">Localizador</label>
                        <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4 shadow-xl shadow-slate-100/50">
                            <div className="flex items-center gap-2">
                                <PlusCircle size={16} className="text-[#00E5FF]" />
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Buscar por Código</span>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ej: P-1234, C-99..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-xs text-slate-900 placeholder-slate-300 focus:border-[#00E5FF] focus:outline-none pr-12"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const event = new window.CustomEvent('buscarPorCodigo', { detail: e.target.value });
                                            window.dispatchEvent(event);
                                        }
                                    }}
                                />
                                <button 
                                    onClick={(e) => {
                                        const val = e.currentTarget.previousSibling.value;
                                        const event = new window.CustomEvent('buscarPorCodigo', { detail: val });
                                        window.dispatchEvent(event);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00E5FF] p-2 rounded-full text-slate-900 hover:scale-110 transition-transform"
                                >
                                    <Search size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* NAVEGACIÓN */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase px-1 mb-4 block tracking-[0.2em]">Operaciones</label>
                        
                        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 transition-transform active:scale-95">
                            <MapIcon size={18} className="text-[#00E5FF]"/> Visor GIS
                        </button>

                        {['ADMIN', 'SUPERADMIN'].includes(JSON.parse(localStorage.getItem('user'))?.rol) && (
                            <>
                                <Link to="/dashboard/clientes" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                        <Users size={18} className="text-slate-300"/> Clientes
                                    </button>
                                </Link>

                                <Link to="/estadisticas" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                        <BarChart3 size={18} className="text-slate-300"/> Inteligencia
                                    </button>
                                </Link>

                                <Link to="/dashboard/usuarios" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                        <Users size={18} className="text-indigo-400"/> Mi Equipo
                                    </button>
                                </Link>

                                <Link to="/dashboard/inventario" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                        <Package size={18} className="text-orange-400"/> Almacén
                                    </button>
                                </Link>
                            </>
                        )}
                        
                        <Link to="/dashboard/croquis" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                            <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-violet-50 transition-all font-bold text-[10px] uppercase tracking-widest text-violet-500 hover:text-violet-600 bg-violet-50/50">
                                <PenTool size={18} className="text-violet-400"/> Bloc Notas
                            </button>
                        </Link>

                        {['ADMIN', 'SUPERADMIN', 'TECNICO'].includes(JSON.parse(localStorage.getItem('user'))?.rol) && (
                            <Link to="/dashboard/tickets" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                    <ClipboardList size={18} className="text-emerald-400"/> Tickets
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className="space-y-2 pt-6 border-t border-slate-50">
                        {JSON.parse(localStorage.getItem('user'))?.rol === 'SUPERADMIN' && (
                            <Link to="/admin" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                                <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-[#FF4500]/5 text-[#FF4500] hover:bg-[#FF4500] hover:text-white transition-all font-black text-[10px] uppercase tracking-widest mb-2 border border-[#FF4500]/10">
                                    <ShieldAlert size={18}/> Panel Maestro
                                </button>
                            </Link>
                        )}
                        <Link to="/dashboard/perfil" className="block" onClick={() => { if(window.innerWidth < 1024) onClose(); }}>
                            <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                <User size={18} className="text-blue-400"/> Mi Perfil
                            </button>
                        </Link>
                        <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900">
                            <Settings size={18} className="text-slate-200"/> Ajustes
                        </button>
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-50 bg-white">
                    <button 
                        onClick={logout} 
                        className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black uppercase text-[10px] tracking-widest border border-transparent hover:border-red-100"
                    >
                        <LogOut size={16}/> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {isModalOpen && (
                <ModalNuevoProyecto 
                    onSave={handleSaveNuevoProyecto} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};

export default Sidebar;
