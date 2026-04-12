import { useState, useEffect } from 'react';
import { X, Save, Loader2, AlertTriangle, Database, Share2 } from 'lucide-react';
import useMufas from '../../hooks/useMufas';
import useTroncales from '../../hooks/useTroncales';

const FormMufa = ({ data, onCancel }) => {
    const { crearMufa, actualizarMufa, eliminarMufa, loading: mufaLoading } = useMufas();
    const { troncales, loading: troncalesLoading } = useTroncales();

    const isNew = data?.isNew || false;

    // Inicialización correcta (solo se ejecuta una vez)
    const [mufa, setMufa] = useState({
        codigo: data?.data?.codigo || `MUF-${Date.now().toString().slice(-6)}`,
        troncalId: data?.data?.troncalId || '',
        bufferEntrada: data?.data?.bufferEntrada || 'AZUL',
        hiloEntrada: data?.data?.hiloEntrada || 1,
        ratioSplitteo: data?.data?.ratioSplitteo || '1:16',
        posteId: data?.posteId || data?.data?.posteId || null,
        latitud: data?.coords?.latitud || data?.data?.latitud || 0,
        longitud: data?.coords?.longitud || data?.data?.longitud || 0,
    });

    // Debug (puedes quitar después)
    useEffect(() => {
        console.log("📌 Datos recibidos en FormMufa:", data);
        console.log("📌 Troncales cargadas:", troncales?.length || 0);
    }, [data, troncales]);

    const troncalActual = troncales?.find(t => t.id === mufa.troncalId);
    const hilosLibres = troncalActual?.hilosLibres || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mufa.troncalId) {
            alert("❌ Debes seleccionar una troncal de alimentación.");
            return;
        }

        if (isNew && hilosLibres <= 0) {
            alert("❌ La troncal seleccionada no tiene hilos disponibles.");
            return;
        }

        try {
            const payload = {
                codigo: mufa.codigo,
                troncalId: mufa.troncalId,
                posteId: mufa.posteId,
                bufferEntrada: mufa.bufferEntrada,
                hiloEntrada: parseInt(mufa.hiloEntrada),
                latitud: parseFloat(mufa.latitud),
                longitud: parseFloat(mufa.longitud),
                ratioSplitteo: mufa.ratioSplitteo,
                hilosDisponibles: mufa.ratioSplitteo === "1:32" ? 32 : 16
            };

            if (isNew) {
                await crearMufa(payload);
            } else {
                await actualizarMufa(data.data.id, payload);
            }

            onCancel(); // Cerrar formulario
        } catch (error) {
            console.error(error);
            const mensaje = error.response?.data?.message || error.message || "Error desconocido";
            alert(`⚠️ Error: ${mensaje}`);
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className={`px-6 py-5 text-white flex items-center justify-between ${isNew ? 'bg-orange-600' : 'bg-slate-800'}`}>
                <div className="flex items-center gap-3">
                    <Database size={22} />
                    <div>
                        <h3 className="font-black tracking-tight">{isNew ? 'NUEVA MUFA' : 'EDITAR MUFA'}</h3>
                        <p className="text-xs opacity-75">FiberMap • Forward Vision</p>
                    </div>
                </div>
                <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                {/* Troncal */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Troncal de Alimentación</label>
                    <select
                        required
                        value={mufa.troncalId}
                        onChange={(e) => setMufa({ ...mufa, troncalId: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-orange-500 outline-none text-sm"
                    >
                        <option value="">-- Selecciona una troncal --</option>
                        {troncales?.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.nombre} ({t.hilosLibres} hilos libres)
                            </option>
                        ))}
                    </select>
                </div>

                {troncalActual && (
                    <div className={`p-4 rounded-2xl border ${hilosLibres > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-1">Estado de Troncal</p>
                        <p className={`text-lg font-black ${hilosLibres > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {hilosLibres} hilos libres
                        </p>
                    </div>
                )}

                {/* Código y Buffer */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código Mufa</label>
                        <input
                            type="text"
                            value={mufa.codigo}
                            onChange={(e) => setMufa({ ...mufa, codigo: e.target.value.toUpperCase() })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-orange-500 outline-none font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Buffer</label>
                        <select
                            value={mufa.bufferEntrada}
                            onChange={(e) => setMufa({ ...mufa, bufferEntrada: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-orange-500 outline-none"
                        >
                            <option value="AZUL">Azul</option>
                            <option value="NARANJA">Naranja</option>
                            <option value="VERDE">Verde</option>
                            <option value="MARRON">Marrón</option>
                        </select>
                    </div>
                </div>

                {/* Hilo y Ratio */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hilo de Entrada</label>
                        <input
                            type="number"
                            min="1"
                            max="96"
                            value={mufa.hiloEntrada}
                            onChange={(e) => setMufa({ ...mufa, hiloEntrada: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-orange-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Splitter</label>
                        <select
                            value={mufa.ratioSplitteo}
                            onChange={(e) => setMufa({ ...mufa, ratioSplitteo: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-orange-500 outline-none"
                        >
                            <option value="1:16">1:16 (16 puertos)</option>
                            <option value="1:32">1:32 (32 puertos)</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={mufaLoading || (isNew && hilosLibres <= 0)}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mt-6"
                >
                    {mufaLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    {isNew ? 'INSTALAR MUFA' : 'ACTUALIZAR MUFA'}
                </button>
            </form>
        </div>
    );
};

export default FormMufa;