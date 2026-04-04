import { MapPin, Share2, Box, Database, MousePointer2 as MousePointer, Ruler } from 'lucide-react';

const Toolbox = ({ modoActivo, setModo }) => {
    const tools = [
        { id: 'select', name: 'Navegar', icon: <MousePointer size={20}/>, color: 'bg-slate-700' },
        { id: 'poste', name: 'Nuevo Poste', icon: <MapPin size={20}/>, color: 'bg-blue-600' },
        { id: 'mufa', name: 'Agregar Mufa', icon: <Database size={20}/>, color: 'bg-orange-600' },
        { id: 'caja', name: 'Poner Caja', icon: <Box size={20}/>, color: 'bg-emerald-600' },
        { id: 'tramo', name: 'Cablear', icon: <Share2 size={20}/>, color: 'bg-violet-600' },
        { id: 'medir', name: 'Medir Distancia', icon: <Ruler size={20}/>, color: 'bg-pink-600' },
    ];

    return (
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white flex flex-col gap-2">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setModo(tool.id)}
                    className={`group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                        modoActivo === tool.id 
                        ? `${tool.color} text-white scale-110 shadow-lg` 
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    {tool.icon}
                    
                    {/* Tooltip al pasar el mouse */}
                    <span className="absolute right-14 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-bold uppercase tracking-tighter">
                        {tool.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default Toolbox;