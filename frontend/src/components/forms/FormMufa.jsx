import { useState, useEffect } from 'react';
import { X, Save, Database, Trash2, GitMerge, Info, Share2 } from 'lucide-react';
import useMufas from '../../hooks/useMufas';
import useProyectos from '../../hooks/useProyectos'; // Para el proyectoId si fuera necesario

const FormMufa = ({ data, onCancel }) => {
    const { crearMufa, actualizarMufa, eliminarMufa } = useMufas();
    
    // Necesitaremos las troncales para elegir de dónde viene el internet
    // const { troncales } = useTroncales(); 

    const [mufa, setMufa] = useState({
        codigo: data?.data?.codigo || '',
        troncalId: data?.data?.troncalId || '', // 👈 OBLIGATORIO PARA EL BACK
        bufferEntrada: data?.data?.bufferEntrada || 'AZUL',
        hiloEntrada: data?.data?.hiloEntrada || 1,
        ratioSplitteo: data?.data?.ratioSplitteo || '1:16',
        posteId: data?.posteId || data?.data?.posteId || null,
        latitud: data?.coords?.latitud || data?.data?.latitud || 0,
        longitud: data?.coords?.longitud || data?.data?.longitud || 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🛡️ VALIDACIÓN ANTES DE ENVIAR
        if (!mufa.troncalId) {
            alert("❌ Debes seleccionar una Troncal de origen para alimentar esta Mufa.");
            return;
        }

        try {
            // Ajustamos el payload al esquema exacto del Backend
            const payload = {
                ...mufa,
                hiloEntrada: parseInt(mufa.hiloEntrada),
                latitud: parseFloat(mufa.latitud),
                longitud: parseFloat(mufa.longitud)
            };

            data.isNew ? await crearMufa(payload) : await actualizarMufa(data.data.id, payload);
            alert("✅ Mufa registrada. Se ha descontado 1 hilo de la troncal.");
            onCancel();
        } catch (error) { 
            alert("Error Backend: " + error.message); 
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[400px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300 ring-1 ring-black/5">
            {/* Header Naranja (Identificativo de Mufas) */}
            <div className={`p-5 text-white flex justify-between items-center ${data.isNew ? 'bg-orange-600' : 'bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                    <Database size={20} />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm">Organizador de Mufa</h3>
                        <p className="text-[9px] text-orange-200 font-bold tracking-widest uppercase italic">Forward Vision Network</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-black/20 p-2 rounded-full transition-all"><X size={18}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                
                {/* SELECTOR DE TRONCAL (Crítico para el Backend) */}
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                        <Share2 size={12}/> Troncal de Alimentación
                    </label>
                    <select 
                        required
                        className="w-full mt-1 p-3 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500 transition-all"
                        value={mufa.troncalId}
                        onChange={(e) => setMufa({...mufa, troncalId: e.target.value})}
                    >
                        <option value="">-- Seleccionar Troncal --</option>
                        {/* Aquí mapearías tus troncales: troncales.map(...) */}
                        <option value="ID_TRONCAL_EJEMPLO">Troncal Jicamarca Principal</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Buffer Entrada</label>
                        <select 
                            className="w-full mt-1 p-3 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none"
                            value={mufa.bufferEntrada}
                            onChange={(e) => setMufa({...mufa, bufferEntrada: e.target.value})}
                        >
                            <option value="AZUL">Azul</option>
                            <option value="NARANJA">Naranja</option>
                            <option value="VERDE">Verde</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Hilo de Entrada</label>
                        <input 
                            type="number"
                            className="w-full mt-1 p-3 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none"
                            value={mufa.hiloEntrada}
                            onChange={(e) => setMufa({...mufa, hiloEntrada: e.target.value})}
                        />
                    </div>
                </div>

                {/* CÓDIGO Y RATIO */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Código ID</label>
                        <input 
                            required
                            placeholder="M-JIC-001" 
                            className="w-full mt-1 p-3 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500"
                            value={mufa.codigo}
                            onChange={(e) => setMufa({...mufa, codigo: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Splitter Ratio</label>
                        <select 
                            className="w-full mt-1 p-3 bg-slate-100 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-900"
                            value={mufa.ratioSplitteo}
                            onChange={(e) => setMufa({...mufa, ratioSplitteo: e.target.value})}
                        >
                            <option value="1:16">1:16 (NAP Estándar)</option>
                            <option value="1:32">1:32 (Alta Densidad)</option>
                        </select>
                    </div>
                </div>

                {/* 🌈 MATRIZ DE HILOS (Visualización Estética) */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <GitMerge size={12} /> Salidas de Splitter (Hilos Libres)
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className="h-6 w-6 rounded-md bg-orange-600/20 border border-orange-600/30 shadow-[0_0_10px_rgba(234,88,12,0.1)]" />
                                <span className="text-[7px] font-bold text-slate-600">{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones */}
                <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-2 mt-2">
                    <Save size={18} /> {data.isNew ? 'Registrar Mufa en Troncal' : 'Actualizar'}
                </button>
            </form>
        </div>
    );
};

export default FormMufa;