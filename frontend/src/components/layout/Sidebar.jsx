import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, Users, Map as MapIcon, LogOut, 
    CheckCircle, PlusCircle, Settings, HardDrive, BarChart3 
} from 'lucide-react';
import useProyectos from '../../hooks/useProyectos';
import useAuth from '../../hooks/useAuth';
import ModalNuevoProyecto from '../modals/ModalNuevoProyecto'; // 👈 Asegúrate de crear este componente

const Sidebar = () => {
    const { proyectos, setProyectoSeleccionado, proyectoSeleccionado, crearProyecto } = useProyectos();
    const { logout } = useAuth();
    
    // Estado para controlar el modal de nuevo proyecto
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ⚡ Manejador de cambio de Sector
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

    // 🚀 Guardar nuevo proyecto y seleccionarlo
    const handleSaveNuevoProyecto = async (datos) => {
        try {
            const nuevo = await crearProyecto(datos);
            setProyectoSeleccionado(nuevo);
            localStorage.setItem('proyectoId', nuevo.id);
            setIsModalOpen(false);
            alert(`✅ Sector "${nuevo.nombre}" creado y activado.
✅ Troncal inicial lista para instalar mufas.`);
        } catch {
            alert("❌ Error al crear el proyecto en el servidor.");
        }
    };

    return (
        <>
            <aside className="w-72 bg-slate-900 h-screen flex flex-col text-slate-300 border-r border-slate-800 shadow-2xl z-[1001]">
                
                {/* BRANDING / LOGO */}
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 italic leading-none">
                        <span className="bg-blue-600 px-2 py-1 rounded text-sm not-italic font-black uppercase shadow-lg shadow-blue-900/50">FV</span>
                        Forward Vision
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-8 overflow-y-auto custom-scrollbar">
                    
                    {/* SECCIÓN: GESTIÓN DE SECTORES (PROYECTOS) */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Infraestructura</label>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:text-blue-400 transition-all uppercase bg-blue-500/10 px-2 py-1 rounded-lg"
                            >
                                <PlusCircle size={12} /> Nuevo
                            </button>
                        </div>

                        <select 
                            value={proyectoSeleccionado?.id || ""}
                            onChange={handleCambioProyecto}
                            className={`w-full bg-slate-800 border-2 p-3.5 rounded-2xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer shadow-inner ${
                                proyectoSeleccionado ? 'border-blue-500/40' : 'border-slate-700'
                            }`}
                        >
                            <option value="">-- Seleccionar Sector --</option>
                            {proyectos.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>

                        {/* INDICADOR DE ESTADO ACTIVO */}
                        {proyectoSeleccionado && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
                                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                                <div className="overflow-hidden">
                                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">Sector en Línea</p>
                                    <p className="text-xs text-white font-bold truncate leading-tight">{proyectoSeleccionado.nombre}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECCIÓN: NAVEGACIÓN PRINCIPAL */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-2 mb-2 block tracking-widest">Operaciones</label>
                        <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/40 transition-transform active:scale-95">
                            <MapIcon size={18}/> Visor de Red GIS
                        </button>
                        <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white">
                            <Users size={18}/> Gestión de Clientes
                        </button>
                        <Link to="/estadisticas">
                            <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white">
                                <BarChart3 size={18}/> Estadísticas
                            </button>
                        </Link>
                        <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white">
                            <LayoutDashboard size={18}/> Reportes Técnicos
                        </button>
                    </div>

                    {/* SECCIÓN: CONFIGURACIÓN */}
                    <div className="space-y-1 pt-4 border-t border-slate-800">
                        <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest text-slate-500">
                            <Settings size={18}/> Ajustes de Red
                        </button>
                    </div>
                </nav>

                {/* BOTÓN CERRAR SESIÓN */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <button 
                        onClick={logout} 
                        className="flex items-center gap-3 w-full p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-black uppercase text-[10px] tracking-widest border border-transparent hover:border-red-400/20"
                    >
                        <LogOut size={16}/> Salir del Sistema
                    </button>
                </div>
            </aside>

            {/* MODAL DE NUEVO PROYECTO */}
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