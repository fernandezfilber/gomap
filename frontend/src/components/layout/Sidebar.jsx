import useProyectos from '../../hooks/useProyectos';
import { LayoutDashboard, Users, Map as MapIcon, LogOut, CheckCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
    const { proyectos, setProyectoSeleccionado, proyectoSeleccionado } = useProyectos();
    const { logout } = useAuth();

    // ⚡ FUNCIÓN MAESTRA: Sincroniza el estado de React con la memoria del navegador
    const handleCambioProyecto = (e) => {
        const idSeleccionado = e.target.value;
        const proyectoEncontrado = proyectos.find(p => p.id === idSeleccionado);
        
        // 1. Actualiza la interfaz del Sidebar
        setProyectoSeleccionado(proyectoEncontrado);

        // 2. 🔥 GUARDA EL ID PARA EL FORMULARIO (Soluciona el error de sincronización)
        if (idSeleccionado) {
            localStorage.setItem('proyectoId', idSeleccionado);
        } else {
            localStorage.removeItem('proyectoId');
        }
    };

    return (
        <aside className="w-72 bg-slate-900 h-screen flex flex-col text-slate-300 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 italic leading-none">
                    <span className="bg-blue-600 px-2 py-1 rounded text-sm not-italic font-black uppercase">FV</span>
                    Forward Vision
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block ml-2 tracking-widest">Seleccionar Sector</label>
                    <select 
                        value={proyectoSeleccionado?.id || ""}
                        onChange={handleCambioProyecto}
                        className={`w-full bg-slate-800 border-2 p-3 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer ${
                            proyectoSeleccionado ? 'border-blue-500/50' : 'border-slate-700'
                        }`}
                    >
                        <option value="">-- Elige un Sector --</option>
                        {proyectos.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>

                    {proyectoSeleccionado && (
                        <div className="mt-4 p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <CheckCircle size={18} className="text-blue-400 shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">Sector Activo en Red</p>
                                <p className="text-sm text-white font-bold truncate leading-tight">{proyectoSeleccionado.nombre}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20">
                        <MapIcon size={20}/> Visor de Red
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition-all font-semibold">
                        <Users size={20}/> Clientes
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition-all font-semibold">
                        <LayoutDashboard size={20}/> Reportes
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button onClick={logout} className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-black uppercase text-xs tracking-widest">
                    <LogOut size={18}/> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;