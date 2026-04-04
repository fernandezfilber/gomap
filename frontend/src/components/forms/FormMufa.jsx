import { useState } from 'react';
import { X, Save, Database, Trash2, GitMerge, Info } from 'lucide-react';
import useMufas from '../../hooks/useMufas';

const FormMufa = ({ data, onCancel }) => {
    const { crearMufa, actualizarMufa, eliminarMufa } = useMufas();
    
    // Colores estándar TIA/EIA-598 (Azul, Naranja, Verde, Marrón, Gris, Blanco, Rojo, Negro, Amarillo, Violeta, Rosa, Aqua)
    const coloresTIA = [
        '#2563eb', '#f97316', '#22c55e', '#78350f', '#64748b', '#f8fafc',
        '#ef4444', '#18181b', '#eab308', '#a855f7', '#ec4899', '#06b6d4'
    ];

    const [mufa, setMufa] = useState(() => {
        if (data && !data.isNew && data.data) return data.data;
        return {
            codigo: '',
            capacidad: 24,
            tipo: 'SANGRIENTA', // O DERIVACIÓN
            estado: 'OPERATIVO',
            posteId: data?.posteId || null,
            latitud: data?.coords?.lat || 0,
            longitud: data?.coords?.lng || 0
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data.isNew ? await crearMufa(mufa) : await actualizarMufa(mufa.id, mufa);
            alert("🛠️ Mufa registrada y configurada.");
            onCancel();
        } catch (error) { alert(error.message); }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[400px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Header Naranja (Identificativo de Mufas) */}
            <div className={`p-5 text-white flex justify-between items-center ${data.isNew ? 'bg-orange-600' : 'bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                    <Database size={20} />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm">Organizador de Mufa</h3>
                        <p className="text-[9px] text-orange-200 font-bold tracking-widest uppercase">Punto de Empalme FO</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-black/20 p-2 rounded-full transition-all">
                    <X size={18}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Código de Mufa</label>
                        <input 
                            placeholder="M-JIC-001" 
                            className="input-fv mt-1"
                            value={mufa.codigo}
                            onChange={(e) => setMufa({...mufa, codigo: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Capacidad Total</label>
                        <select 
                            className="input-fv mt-1"
                            value={mufa.capacidad}
                            onChange={(e) => setMufa({...mufa, capacidad: Number(e.target.value)})}
                        >
                            <option value={12}>12 Hilos</option>
                            <option value={24}>24 Hilos</option>
                            <option value={48}>48 Hilos</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Tipo Cierre</label>
                        <select 
                            className="input-fv mt-1"
                            value={mufa.tipo}
                            onChange={(e) => setMufa({...mufa, tipo: e.target.value})}
                        >
                            <option value="SANGRIENTA">Sangría (Paso)</option>
                            <option value="DERIVACION">Derivación (Final)</option>
                        </select>
                    </div>
                </div>

                {/* 🌈 MATRIZ DE HILOS (Visualización de Fibras) */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <GitMerge size={12} /> Mapa de Fusión (Hilos)
                        </h4>
                        <Info size={12} className="text-slate-600" />
                    </div>
                    
                    <div className="grid grid-cols-6 gap-2">
                        {coloresTIA.slice(0, mufa.capacidad > 12 ? 12 : mufa.capacidad).map((color, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <button 
                                    type="button"
                                    title={`Hilo ${i+1}`}
                                    className="h-8 w-8 rounded-lg border-2 border-slate-700 hover:scale-110 hover:border-white transition-all shadow-inner"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-[8px] font-bold text-slate-500">{i+1}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[9px] text-slate-500 mt-4 text-center italic">
                        Colores basados en estándar TIA-598-C
                    </p>
                </div>

                {/* Botones CRUD */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> {data.isNew ? 'Registrar Mufa' : 'Actualizar Datos'}
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={() => { if(window.confirm("¿Eliminar mufa?")) eliminarMufa(mufa.id); onCancel(); }}
                            className="bg-red-50 text-red-600 px-5 rounded-2xl hover:bg-red-100 transition-colors"
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