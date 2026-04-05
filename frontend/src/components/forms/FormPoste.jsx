import { useState } from 'react'; // ❌ Quitamos useEffect, ya no es necesario
import { X, Save, Trash2, MapPin, Loader2 } from 'lucide-react';
import usePostes from '../../hooks/usePostes';

const FormPoste = ({ data, onCancel }) => {
    const { actualizarPoste, eliminarPoste, loading } = usePostes();

    // ✅ Inicializamos el estado una sola vez. 
    // Como usaremos un 'key' externo, este estado se reseteará solo al cambiar de poste.
    const [poste, setPoste] = useState(data?.data || null);

    if (!data || data.isNew || !poste) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarPoste(poste.id, poste);
            onCancel();
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    return (
        <div className="absolute top-24 left-6 z-[1002] w-80 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-400"/>
                    <span className="font-black text-[10px] uppercase tracking-widest">Editar: {poste.codigo}</span>
                </div>
                <button onClick={onCancel} className="hover:bg-white/20 p-1 rounded-full"><X size={18}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase">Identificador</label>
                    <input 
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                        value={poste.codigo || ''}
                        onChange={(e) => setPoste({...poste, codigo: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Material</label>
                        <select 
                            className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                            value={poste.tipo || 'CONCRETO'}
                            onChange={(e) => setPoste({...poste, tipo: e.target.value})}
                        >
                            <option value="CONCRETO">Concreto</option>
                            <option value="MADERA">Madera</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Altura</label>
                        <select 
                            className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                            value={poste.altura || '8M'}
                            onChange={(e) => setPoste({...poste, altura: e.target.value})}
                        >
                            <option value="8M">8 Metros</option>
                            <option value="12M">12 Metros</option>
                        </select>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>}
                    GUARDAR CAMBIOS
                </button>
                
                <button 
                    type="button" 
                    onClick={() => eliminarPoste(poste.id).then(onCancel)}
                    className="w-full py-2 text-red-500 text-[10px] font-bold"
                >
                    ELIMINAR POSTE
                </button>
            </form>
        </div>
    );
};

export default FormPoste;