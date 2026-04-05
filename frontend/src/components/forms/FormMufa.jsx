import { useState, useEffect } from 'react';
import { X, Save, Database, Trash2, GitMerge, Info, Share2, Loader2, AlertTriangle } from 'lucide-react';
import useMufas from '../../hooks/useMufas';
import useTroncales from '../../hooks/useTroncales'; // Asegúrate de tener este hook

const FormMufa = ({ data, onCancel }) => {
    const { crearMufa, actualizarMufa, eliminarMufa, loading: mufaLoading } = useMufas();
    const { troncales, loading: troncalesLoading } = useTroncales();

    const [mufa, setMufa] = useState({
        codigo: data?.data?.codigo || `MUF-${Date.now().toString().slice(-4)}`,
        troncalId: data?.data?.troncalId || '',
        bufferEntrada: data?.data?.bufferEntrada || 'AZUL',
        hiloEntrada: data?.data?.hiloEntrada || 1,
        ratioSplitteo: data?.data?.ratioSplitteo || '1:16',
        posteId: data?.posteId || data?.data?.posteId || null,
        latitud: data?.coords?.latitud || data?.data?.latitud || 0,
        longitud: data?.coords?.longitud || data?.data?.longitud || 0
    });

    // 🔍 Monitor de Troncal seleccionada
    const troncalActual = troncales?.find(t => t.id === mufa.troncalId);
    const hilosSobrantes = troncalActual ? (troncalActual.hilosLibres) : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!mufa.troncalId) {
            alert("❌ Debes seleccionar una Troncal de alimentación.");
            return;
        }

        try {
            const payload = {
                ...mufa,
                hiloEntrada: parseInt(mufa.hiloEntrada),
                latitud: parseFloat(mufa.latitud),
                longitud: parseFloat(mufa.longitud)
            };

            if (data.isNew) {
                await crearMufa(payload);
            } else {
                await actualizarMufa(data.data.id, payload);
            }
            onCancel();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[400px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300 ring-1 ring-black/5 font-sans">
            
            {/* HEADER DINÁMICO */}
            <div className={`p-5 text-white flex justify-between items-center ${data.isNew ? 'bg-orange-600' : 'bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                    <Database size={20} className="text-white" />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm text-white">Organizador de Mufa</h3>
                        <p className="text-[9px] text-orange-200 font-bold tracking-widest uppercase italic">Forward Vision Network</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-black/20 p-2 rounded-full transition-all text-white">
                    <X size={18}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                
                {/* SELECTOR DE TRONCAL */}
                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-2 mb-1">
                        <Share2 size={12} className="text-orange-600"/> Troncal de Alimentación
                    </label>
                    <select 
                        required
                        className="w-full p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500 focus:bg-white transition-all shadow-inner"
                        value={mufa.troncalId}
                        onChange={(e) => setMufa({...mufa, troncalId: e.target.value})}
                    >
                        <option value="">-- Seleccionar Troncal --</option>
                        {troncales?.map(t => (
                            <option key={t.id} value={t.id}>{t.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* 📊 PANEL DE TELEMETRÍA DE TRONCAL */}
                {troncalActual && (
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 animate-in zoom-in duration-300 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Info size={12} className="text-orange-400" /> Estado de Troncal
                            </h4>
                            <span className="text-[9px] font-black text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full uppercase">Sincronizado</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
                                <p className="text-[7px] font-bold text-slate-500 uppercase">Capacidad</p>
                                <p className="text-xs font-black text-white">{troncalActual.cantHilos}</p>
                            </div>
                            <div className={`p-2 rounded-xl text-center border ${hilosSobrantes > 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                <p className="text-[7px] font-bold text-slate-500 uppercase">Sobrantes</p>
                                <p className={`text-xs font-black ${hilosSobrantes > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{hilosSobrantes}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
                                <p className="text-[7px] font-bold text-slate-500 uppercase">Hilos Usados</p>
                                <p className="text-xs font-black text-white">{troncalActual.cantHilos - troncalActual.hilosLibres}</p>
                            </div>
                        </div>
                        {hilosSobrantes === 0 && (
                            <div className="mt-3 flex items-center gap-2 text-red-400 text-[9px] font-bold bg-red-400/10 p-2 rounded-lg border border-red-400/20">
                                <AlertTriangle size={14} /> TRONCAL SIN HILOS DISPONIBLES
                            </div>
                        )}
                    </div>
                )}

                {/* BUFFER E HILO */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Buffer Entrada</label>
                        <select 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500 shadow-inner cursor-pointer"
                            value={mufa.bufferEntrada}
                            onChange={(e) => setMufa({...mufa, bufferEntrada: e.target.value})}
                        >
                            <option value="AZUL">Azul</option>
                            <option value="NARANJA">Naranja</option>
                            <option value="VERDE">Verde</option>
                            <option value="MARRON">Marrón</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Hilo de Entrada</label>
                        <input 
                            type="number"
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500 shadow-inner"
                            value={mufa.hiloEntrada}
                            onChange={(e) => setMufa({...mufa, hiloEntrada: e.target.value})}
                        />
                    </div>
                </div>

                {/* CÓDIGO Y RATIO */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Código de Mufa</label>
                        <input 
                            required
                            placeholder="M-JIC-001" 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-black text-slate-900 outline-none focus:border-orange-500 shadow-inner"
                            value={mufa.codigo}
                            onChange={(e) => setMufa({...mufa, codigo: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider italic">Splitter Ratio</label>
                        <select 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 shadow-inner cursor-pointer"
                            value={mufa.ratioSplitteo}
                            onChange={(e) => setMufa({...mufa, ratioSplitteo: e.target.value})}
                        >
                            <option value="1:16">1:16 (NAP Estándar)</option>
                            <option value="1:32">1:32 (Alta Densidad)</option>
                        </select>
                    </div>
                </div>

                {/* 🌈 MATRIZ DE HILOS (Visualización Estética) */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <GitMerge size={12} className="text-orange-400" /> Salidas de Splitter (Hilos Libres)
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className="h-6 w-6 rounded-md bg-orange-600/10 border border-orange-600/30 shadow-[0_0_8px_rgba(234,88,12,0.1)] transition-all" />
                                <span className="text-[7px] font-bold text-slate-600">{i+1}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[8px] text-slate-600 mt-4 text-center italic font-bold">Monitor de Red Forward Vision GIS</p>
                </div>

                {/* BOTONERA */}
                <div className="flex gap-3 pt-2">
                    <button 
                        type="submit" 
                        disabled={mufaLoading || hilosSobrantes === 0}
                        className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all active:scale-95 disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        {mufaLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        <span className="text-white">{data.isNew ? 'Registrar Mufa' : 'Guardar Cambios'}</span>
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button" 
                            onClick={() => { if(window.confirm("¿Eliminar Mufa?")) eliminarMufa(data.data.id).then(onCancel); }}
                            className="bg-red-50 text-red-600 px-5 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormMufa;