import { useMemo, useState } from 'react';
import { Search, Layers, RefreshCcw, ArrowRight, Zap, Router } from 'lucide-react';

const FiberManager = ({
    items = [],
    tramos = [],
    circuitos = [],
    activePathId,
    onSelectPath,
    visibleLayers,
    setVisibleLayers,
    onReset
}) => {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [selectedPaths, setSelectedPaths] = useState([]);

    const opciones = useMemo(() => {
        return items.map(item => `${item.tipo} / ${item.codigo}`);
    }, [items]);

    const buscarTramos = () => {
        const findItem = (text) => {
            if (!text) return null;
            return items.find(item => item.codigo === text || `${item.tipo} / ${item.codigo}` === text);
        };

        const itemA = findItem(origen);
        const itemZ = findItem(destino);

        if (!itemA || !itemZ) {
            setSearchMessage('Selecciona ambas ubicaciones con códigos existentes.');
            return;
        }

        const matches = tramos.filter(tramo => {
            const endpoints = [tramo.posteInicioId, tramo.posteFinId, tramo.mufaOrigenId, tramo.cajaDestinoId];
            return endpoints.includes(itemA.id) && endpoints.includes(itemZ.id);
        });

        if (matches.length > 0) {
            onSelectPath(matches[0]);
            setSearchMessage(`Trazado encontrado: ${matches[0].nombre || matches[0].id}`);
            return;
        }

        const partial = tramos.filter(tramo => {
            const endpoints = [tramo.posteInicioId, tramo.posteFinId, tramo.mufaOrigenId, tramo.cajaDestinoId];
            return endpoints.includes(itemA.id) || endpoints.includes(itemZ.id);
        });

        if (partial.length > 0) {
            onSelectPath(partial[0]);
            setSearchMessage('No hay una ruta directa, se muestra el primer tramo relacionado.');
            return;
        }

        setSearchMessage('No se encontró ningún tramo conectado entre esos puntos.');
    };

    const fiberPaths = useMemo(() => {
        return tramos
            .slice(0, 10)
            .map(tramo => ({
                id: tramo.id,
                label: tramo.nombre || tramo.id,
                description: `${tramo.tipoCable || 'Fibra'} • ${tramo.path?.length || 0} puntos`
            }));
    }, [tramos]);

    return (
        <div className="absolute top-24 left-6 z-[1002] w-[360px] max-h-[85vh] overflow-hidden rounded-[28px] border border-white/20 bg-slate-950/95 shadow-2xl backdrop-blur-xl text-slate-100">
            <div className="px-5 py-4 border-b border-white/10 bg-slate-900/80">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500 font-semibold">Fiber Manager</p>
                        <h2 className="text-lg font-black tracking-tight">Trazado de fibra</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-300 hover:bg-slate-700"
                    >
                        <RefreshCcw size={14} /> Reset
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[68vh]">
                <div className="space-y-3 rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-[0.24em] font-semibold">
                        <Search size={14} /> Buscar punto A / Z
                    </div>
                    <label className="text-[11px] uppercase tracking-[0.24em] text-slate-500">A</label>
                    <input
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                        list="fiber-items"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)}
                        placeholder="Ej. Poste / CO-00000203"
                    />
                    <label className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Z</label>
                    <input
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                        list="fiber-items"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        placeholder="Ej. Mufa / MH-00000329"
                    />
                    <datalist id="fiber-items">
                        {opciones.map(option => (
                            <option key={option} value={option} />
                        ))}
                    </datalist>
                    <button
                        type="button"
                        onClick={buscarTramos}
                        className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400"
                    >
                        Buscar trazado
                    </button>
                    <p className="text-xs text-slate-400 min-h-[1.25rem]">{searchMessage}</p>
                </div>

                <div className="space-y-3 rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                    <div className="flex items-center justify-between gap-2 text-slate-400 text-xs uppercase tracking-[0.24em] font-semibold">
                        <span><Layers size={14} /> Capas visibles</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(visibleLayers).map(([key, value]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setVisibleLayers(prev => ({ ...prev, [key]: !prev[key] }))}
                                className={`rounded-2xl border px-3 py-2 text-left text-[13px] font-semibold transition ${value ? 'border-cyan-400/40 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-600'}`}
                            >
                                {key.replace(/([A-Z])/g, ' $1')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                    <div className="flex items-center justify-between gap-2 text-slate-400 text-xs uppercase tracking-[0.24em] font-semibold">
                        <span><Zap size={14} /> Fiber Paths</span>
                        <span className="text-slate-500 text-[11px]">{fiberPaths.length} recientes</span>
                    </div>
                    <div className="space-y-2">
                        {fiberPaths.map(path => (
                            <button
                                key={path.id}
                                type="button"
                                onClick={() => onSelectPath(tramos.find(t => t.id === path.id))}
                                className={`w-full rounded-3xl border px-4 py-3 text-left transition ${activePathId === path.id ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-600'}`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <p className="font-bold text-sm truncate">{path.label}</p>
                                    <ArrowRight size={16} />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{path.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500 font-semibold">Circuitos activos</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                        {circuitos.slice(0, 4).map(circuito => (
                            <div key={circuito.id} className="rounded-2xl bg-slate-950/80 p-3 border border-slate-800">
                                <p className="font-semibold truncate">{circuito.nombre}</p>
                                <p className="text-slate-500">{circuito.estado || 'ACTIVO'}</p>
                            </div>
                        ))}
                        {circuitos.length === 0 && <p className="text-slate-500">No hay circuitos registrados.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiberManager;
