import { useState } from 'react';
import { X, Save, Zap, Trash2, Activity, Database } from 'lucide-react';
import useTroncales from '../../hooks/useTroncales';

const FormTroncal = ({ data, onCancel }) => {
    const { crearTroncal, actualizarTroncal, eliminarTroncal } = useTroncales();

    const [troncal, setTroncal] = useState(() => {
        if (data && !data.isNew && data.data) return data.data;
        return {
            nombre: '',
            codigo: '',
            capacidadTotal: 48,
            tipoFibra: 'G.652.D',
            estado: 'OPERATIVO',
            proyectoId: data?.proyectoId || null,
            path: data?.path || [] 
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data.isNew ? await crearTroncal(troncal) : await actualizarTroncal(troncal.id, troncal);
            alert("🛰️ Troncal de alta capacidad registrada.");
            onCancel();
        } catch (error) { alert(error.message); }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-96 bg-slate-900 shadow-2xl rounded-3xl border border-slate-800 overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Cabecera Premium para Troncales */}
            <div className="p-5 bg-gradient-to-r from-indigo-600 to-violet-700 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                        <Zap size={20} className="text-yellow-300 fill-yellow-300" />
                    </div>
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm">Red Troncal</h3>
                        <p className="text-[9px] text-indigo-200 font-bold tracking-widest uppercase">High Capacity Backbone</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-white/20 p-1 rounded-full transition-all">
                    <X size={20}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nombre de la Ruta</label>
                        <input 
                            placeholder="Ej: Backbone Central - Jicamarca" 
                            className="w-full mt-1 p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={troncal.nombre}
                            onChange={(e) => setTroncal({...troncal, nombre: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Capacidad (Hilos)</label>
                        <select 
                            className="w-full mt-1 p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white outline-none"
                            value={troncal.capacidadTotal}
                            onChange={(e) => setTroncal({...troncal, capacidadTotal: Number(e.target.value)})}
                        >
                            <option value={48}>48 Fibras</option>
                            <option value={96}>96 Fibras</option>
                            <option value={144}>144 Fibras</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Estado de Red</label>
                        <div className="flex items-center gap-2 mt-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                            <Activity size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-500 uppercase">Operativo</span>
                        </div>
                    </div>
                </div>

                {/* Detalle Técnico de Fibra */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase">
                        <Database size={12} /> Especificaciones G.652
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        Esta troncal utiliza fibra monomodo de baja dispersión para enlaces de larga distancia en el Nodo Chosica.
                    </p>
                </div>

                {/* Botones */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-900/40 transition-all active:scale-95"
                    >
                        {data.isNew ? 'REGISTRAR TRONCAL' : 'ACTUALIZAR'}
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={() => { if(window.confirm("¿Eliminar troncal principal?")) eliminarTroncal(troncal.id); onCancel(); }}
                            className="bg-slate-800 text-red-500 px-5 rounded-2xl hover:bg-red-500/10 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormTroncal;