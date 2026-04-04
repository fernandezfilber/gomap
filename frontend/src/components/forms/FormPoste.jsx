import { useState } from 'react';
import { X, Save, MapPin, Trash2, AlertTriangle } from 'lucide-react';
import usePostes from '../../hooks/usePostes';

const FormPoste = ({ data, onCancel }) => {
    const { crearPoste, actualizarPoste, eliminarPoste } = usePostes();

    const [poste, setPoste] = useState(() => {
        if (data && !data.isNew && data.data) return data.data;
        return {
            codigo: '',
            tipo: 'CONCRETO',
            altura: '8M',
            latitud: data?.coords?.lat || 0,
            longitud: data?.coords?.lng || 0
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.isNew) {
                await crearPoste(poste);
            } else {
                await actualizarPoste(poste.id, poste);
            }
            onCancel();
        } catch (error) { 
            alert("Error al procesar: " + error.message); 
        }
    };

    // FUNCIÓN PARA ELIMINAR EL POSTE
    const handleEliminar = async () => {
        const confirmar = window.confirm(
            `⚠️ ¿ESTÁS SEGURO?\n\nVas a eliminar el poste ${poste.codigo}.\nEsta acción no se puede deshacer y afectará a los cables conectados.`
        );

        if (confirmar) {
            try {
                await eliminarPoste(poste.id);
                alert("🗑️ Poste eliminado del Nodo Chosica.");
                onCancel(); // Cerramos el formulario tras eliminar
            } catch (error) {
                alert("No se pudo eliminar: " + error.message);
            }
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-80 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-200">
            {/* Cabecera dinámica */}
            <div className={`p-4 text-white flex justify-between items-center ${data.isNew ? 'bg-blue-600' : 'bg-slate-800'}`}>
                <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-tight">
                    <MapPin size={16}/> {data.isNew ? 'Nuevo Poste' : 'Editar Poste'}
                </h3>
                <button onClick={onCancel} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                    <X size={18}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Código de Poste</label>
                    <input 
                        placeholder="P-JIC-001" 
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={poste.codigo}
                        onChange={(e) => setPoste({...poste, codigo: e.target.value})}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Material</label>
                        <select 
                            className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                            value={poste.tipo}
                            onChange={(e) => setPoste({...poste, tipo: e.target.value})}
                        >
                            <option value="CONCRETO">Concreto</option>
                            <option value="MADERA">Madera</option>
                            <option value="FIERRO">Fierro</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Altura</label>
                        <select 
                            className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                            value={poste.altura}
                            onChange={(e) => setPoste({...poste, altura: e.target.value})}
                        >
                            <option value="8M">8 Metros</option>
                            <option value="12M">12 Metros</option>
                        </select>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
                    >
                        {data.isNew ? 'REGISTRAR' : 'ACTUALIZAR'}
                    </button>

                    {/* Botón Eliminar (Solo aparece si NO es nuevo) */}
                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={handleEliminar}
                            className="bg-red-50 text-red-600 px-4 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center"
                            title="Eliminar Poste"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormPoste;