import useProyectos from '../../hooks/useProyectos';
import { LayoutDashboard, Users, Map as MapIcon, LogOut, CheckCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
    const { proyectos, setProyectoSeleccionado, proyectoSeleccionado } = useProyectos();
    const { logout } = useAuth();

    return (
        <aside className="w-72 bg-slate-900 h-screen flex flex-col text-slate-300 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 italic">
                    <span className="bg-blue-600 px-2 py-1 rounded text-sm not-italic">FV</span>
                    Forward Vision
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Selector de Proyecto */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-3 block ml-2">Seleccionar Sector</label>
                    <select 
                        // Usamos proyectoSeleccionado?.id para que el select muestre el valor correcto
                        value={proyectoSeleccionado?.id || ""}
                        onChange={(e) => setProyectoSeleccionado(proyectos.find(p => p.id === e.target.value))}
                        className={`w-full bg-slate-800 border p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                            proyectoSeleccionado ? 'border-blue-500/50' : 'border-slate-700'
                        }`}
                    >
                        <option value="">-- Elige un Sector --</option>
                        {proyectos.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>

                    {/* USANDO LA VARIABLE: Mostramos info si hay uno seleccionado */}
                    {proyectoSeleccionado && (
                        <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center gap-3">
                            <CheckCircle size={16} className="text-blue-400" />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-tighter">Sector Activo</p>
                                <p className="text-sm text-white truncate">{proyectoSeleccionado.nombre}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Menú de Navegación */}
                <div className="space-y-1">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-600/10 text-blue-400 font-semibold border border-blue-600/20">
                        <MapIcon size={20}/> Visor de Red
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <Users size={20}/> Clientes
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20}/> Reportes
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button 
                    onClick={logout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-bold"
                >
                    <LogOut size={20}/> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;