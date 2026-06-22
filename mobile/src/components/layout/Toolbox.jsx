import { MapPin, Share2, Box, Database, MousePointer2 as MousePointer, Ruler, Printer } from 'lucide-react';

const tools = [
    { id: 'select',  name: 'Navegar',        icon: <MousePointer size={20} />,  activeColor: 'bg-slate-600' },
    { id: 'poste',   name: 'Nuevo Poste',    icon: <MapPin size={20} />,        activeColor: 'bg-blue-600' },
    { id: 'tramo',   name: 'Jalar Fibra',    icon: <Share2 size={20} />,        activeColor: 'bg-violet-600' },
    { id: 'mufa',    name: 'Instalar Mufa',  icon: <Database size={20} />,      activeColor: 'bg-orange-600' },
    { id: 'caja',    name: 'Instalar Caja',  icon: <Box size={20} />,           activeColor: 'bg-emerald-600' },
];

const Toolbox = ({ modo, setModo, medirDistancia, setMedirDistancia, onPrint }) => {
    return (
        <>
            {/* ===================================================================
                DESKTOP: barra vertical a la izquierda del mapa
            ==================================================================== */}
            <div className="hidden lg:flex absolute top-6 left-6 z-[1001]
                            bg-slate-950/80 backdrop-blur-2xl border border-white/10
                            shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-3
                            flex-col gap-2 items-center">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setModo(tool.id)}
                        title={tool.name}
                        className={`group relative w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all duration-300 ${
                            modo === tool.id
                                ? `${tool.activeColor} text-white shadow-xl scale-110`
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {tool.icon}
                        <span className="absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap shadow-2xl">
                            {tool.name}
                        </span>
                    </button>
                ))}

                <div className="w-8 h-px bg-white/10 my-1" />

                {/* Medir distancia */}
                <button
                    onClick={() => setMedirDistancia(!medirDistancia)}
                    title="Medir Distancia"
                    className={`group relative w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all duration-300 border ${
                        medirDistancia
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl scale-110'
                            : 'text-slate-400 hover:bg-emerald-600/20 hover:text-emerald-400 border-white/5'
                    }`}
                >
                    <Ruler size={20} />
                    <span className="absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-2xl">
                        Medir Distancia
                    </span>
                </button>

                {/* Exportar PDF */}
                <button
                    onClick={() => { const e = new window.CustomEvent('imprimirTodoElSector'); window.dispatchEvent(e); }}
                    title="Exportar PDF"
                    className="group relative w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all duration-300 border border-white/5 text-slate-400 hover:bg-[#FF4500]/20 hover:text-[#FF4500]"
                >
                    <Printer size={20} />
                    <span className="absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-2xl">
                        Exportar PDF
                    </span>
                </button>
            </div>

            {/* ===================================================================
                MÓVIL: barra horizontal fija sobre la bottom tab bar
                - Botones más grandes (52px) para dedos
                - Posicionada con margen para no tapar la tab bar (68px aprox)
            ==================================================================== */}
            <div
                className="lg:hidden absolute left-1/2 -translate-x-1/2 z-[1001]
                           bg-slate-950/90 backdrop-blur-2xl border border-white/10
                           shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-2xl p-1.5
                           flex flex-row gap-1 items-center"
                style={{
                    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)', // encima del bottom tab bar
                }}
            >
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setModo(tool.id)}
                        title={tool.name}
                        aria-label={tool.name}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${
                            modo === tool.id
                                ? `${tool.activeColor} text-white shadow-lg`
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                        style={{ minHeight: 'unset' }}
                    >
                        {tool.icon}
                    </button>
                ))}

                {/* Separador */}
                <div className="w-px h-8 bg-white/10 mx-0.5" />

                {/* Medir */}
                <button
                    onClick={() => setMedirDistancia(!medirDistancia)}
                    aria-label="Medir distancia"
                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${
                        medirDistancia
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'text-slate-400 hover:text-emerald-400'
                    }`}
                    style={{ minHeight: 'unset' }}
                >
                    <Ruler size={20} />
                </button>
            </div>
        </>
    );
};

export default Toolbox;