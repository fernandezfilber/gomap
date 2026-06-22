import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import usePostes from '../../hooks/usePostes';
import { useProyectoContext } from '../../context/ProyectoContext';

const FormPoste = ({ data, onCancel }) => {
    const { proyectoSeleccionado } = useProyectoContext();
    const { crearPoste, actualizarPoste, loading } = usePostes(proyectoSeleccionado?.id);
    const isNew = data?.isNew || false;

    const [poste, setPoste] = useState({
        codigo: data?.data?.codigo || `P-${Date.now().toString().slice(-5)}`,
        latitud: data?.data?.latitud || data?.coords?.latitud || 0,
        longitud: data?.data?.longitud || data?.coords?.longitud || 0,
        tipo: data?.data?.tipo || 'CONCRETO',
        altura: data?.data?.altura || '8m',
        posteId: data?.data?.posteId || null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                codigo: poste.codigo,
                latitud: parseFloat(poste.latitud),
                longitud: parseFloat(poste.longitud),
                tipo: poste.tipo,
                altura: poste.altura,
                proyectoId: proyectoSeleccionado?.id
            };

            if (isNew) {
                await crearPoste(payload);
            } else {
                await actualizarPoste(data.data.id, payload);
            }
            onCancel();
        } catch (error) {
            console.error(error);
            const mensaje = error.response?.data?.message || error.message || "Error desconocido";
            alert(`⚠️ Error: ${mensaje}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[1003] flex items-end sm:items-center justify-center">
            <div className="w-full sm:w-[420px] bg-white shadow-2xl sm:rounded-3xl h-[90vh] sm:h-auto border border-slate-200 overflow-hidden flex flex-col">

                <div className={`${isNew ? 'bg-blue-600' : 'bg-slate-800'} px-6 py-5 text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        </div>
                        <div>
                            <h3 className="font-black tracking-tight">{isNew ? 'NUEVO POSTE' : 'EDITAR POSTE'}</h3>
                            <p className="text-xs opacity-75">FiberMap • Forward Vision</p>
                        </div>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código del Poste</label>
                        <input
                            type="text"
                            value={poste.codigo}
                            onChange={(e) => setPoste({ ...poste, codigo: e.target.value.toUpperCase() })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Latitud</label>
                            <input
                                type="number"
                                step="0.000001"
                                value={poste.latitud}
                                onChange={(e) => setPoste({ ...poste, latitud: parseFloat(e.target.value) })}
                                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Longitud</label>
                            <input
                                type="number"
                                step="0.000001"
                                value={poste.longitud}
                                onChange={(e) => setPoste({ ...poste, longitud: parseFloat(e.target.value) })}
                                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tipo</label>
                            <select
                                value={poste.tipo}
                                onChange={(e) => setPoste({ ...poste, tipo: e.target.value })}
                                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                            >
                                <option value="CONCRETO">Concreto</option>
                                <option value="MADERA">Madera</option>
                                <option value="METALICO">Metálico</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Altura</label>
                            <input
                                type="text"
                                value={poste.altura}
                                onChange={(e) => setPoste({ ...poste, altura: e.target.value })}
                                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mt-6"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isNew ? 'INSTALAR POSTE' : 'ACTUALIZAR POSTE'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormPoste;