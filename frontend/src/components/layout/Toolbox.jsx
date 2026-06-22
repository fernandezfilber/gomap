import { MapPin, Share2, Box, Database, MousePointer2 as MousePointer, Ruler, Printer, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Toolbox = ({ modo, setModo, medirDistancia, setMedirDistancia, onPrint }) => {
    const { logout } = useAuth();
    const tools = [
        { 
            id: 'select', 
            name: 'Navegar', 
            icon: <MousePointer size={22} />, 
            color: 'hover:bg-slate-100' 
        },
        { 
            id: 'poste', 
            name: 'Nuevo Poste', 
            icon: <MapPin size={22} />, 
            color: 'hover:bg-blue-600 hover:text-white' 
        },
        { 
            id: 'tramo', 
            name: 'Jalar Fibra', 
            icon: <Share2 size={22} />, 
            color: 'hover:bg-violet-600 hover:text-white' 
        },
        { 
            id: 'mufa', 
            name: 'Instalar Mufa', 
            icon: <Database size={22} />, 
            color: 'hover:bg-orange-600 hover:text-white' 
        },
        { 
            id: 'caja', 
            name: 'Instalar Caja', 
            icon: <Box size={22} />, 
            color: 'hover:bg-emerald-600 hover:text-white' 
        },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] lg:absolute lg:top-6 lg:left-6 lg:bottom-auto lg:translate-x-0 lg:w-auto lg:max-w-none z-[1001] bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] lg:rounded-[2.5rem] p-2 lg:p-3 flex flex-row lg:flex-col gap-2 items-center">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setModo(tool.id)}
                    className={`group relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.5rem] transition-all duration-300 ${
                        modo === tool.id 
                            ? 'bg-[#00E5FF] text-slate-900 shadow-xl shadow-[#00E5FF]/40 scale-110' 
                            : `text-slate-400 hover:bg-white/5 hover:text-white`
                    }`}
                    title={tool.name}
                >
                    {tool.icon}

                    <span className="hidden lg:block absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap shadow-2xl">
                        {tool.name}
                    </span>
                </button>
            ))}

            <div className="w-px h-6 lg:w-8 lg:h-px bg-white/10 self-center lg:mx-0"></div>

            <button
                onClick={() => setMedirDistancia(!medirDistancia)}
                className={`group relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.5rem] transition-all duration-300 border ${
                    medirDistancia 
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-600/30 scale-110' 
                        : 'text-slate-400 hover:bg-emerald-600/20 hover:text-emerald-400 border-white/5'
                }`}
                title="Medir Distancia"
            >
                <Ruler size={20} />
            </button>

            <button
                onClick={() => {
                    const event = new window.CustomEvent('imprimirTodoElSector');
                    window.dispatchEvent(event);
                }}
                className="group relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.5rem] transition-all duration-300 border border-white/5 text-slate-400 hover:bg-[#FF4500]/20 hover:text-[#FF4500]"
                title="Exportar PDF"
            >
                <Printer size={20} />
            </button>

            <button
                onClick={() => {
                    if (window.confirm("¿Cerrar sesión?")) logout();
                }}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 active:bg-red-500 active:text-white transition-all ml-auto"
                title="Salir"
            >
                <LogOut size={20} />
            </button>
        </div>
    );
};

export default Toolbox;