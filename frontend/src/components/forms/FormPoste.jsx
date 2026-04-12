import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import usePostes from '../../hooks/usePostes';

const FormPoste = ({ data, onCancel }) => {
    const { crearPoste, actualizarPoste, loading } = usePostes();
    const isNew = data?.isNew || false;

    const [poste, setPoste] = useState({
        codigo: data?.codigo || `P-${Date.now().toString().slice(-5)}`,
        latitud: data?.latitud || data?.coords?.latitud || 0,
        longitud: data?.longitud || data?.coords?.longitud || 0,
        tipo: data?.tipo || 'CONCRETO',
        altura: data?.altura || '8m'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isNew) {
                await crearPoste(poste);
            } else {
                await actualizarPoste(data.id, poste);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar el poste");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[400px] bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-5 text-white flex justify-between">
                <h3 className="font-black">{isNew ? 'NUEVO POSTE' : 'EDITAR POSTE'}</h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código del Poste</label>
                    <input
                        type="text"
                        value={poste.codigo}
                        onChange={(e) => setPoste({ ...poste, codigo: e.target.value })}
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'CREAR POSTE' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormPoste;