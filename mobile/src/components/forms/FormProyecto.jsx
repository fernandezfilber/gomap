import { useState } from 'react';
import { X, Save, Loader2, FolderPlus } from 'lucide-react';

const FormProyecto = ({ onCancel, onSave }) => {
    const [proyecto, setProyecto] = useState({
        nombre: '',
        descripcion: '',
        estado: 'PLANIFICACION'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!proyecto.nombre.trim()) {
            alert("El nombre del proyecto es obligatorio");
            return;
        }

        setLoading(true);
        try {
            await onSave(proyecto);
            onCancel();
        } catch (error) {
            alert("Error al crear el proyecto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[1003] flex items-center justify-center">
            <div className="w-[420px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
                
                {/* Header */}
                <div className="bg-blue-600 px-6 py-5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderPlus size={22} />
                        <div>
                            <h3 className="font-black tracking-tight">NUEVO PROYECTO</h3>
                            <p className="text-xs opacity-75">FiberMap • Forward Vision</p>
                        </div>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Nombre */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre del Proyecto</label>
                        <input
                            type="text"
                            required
                            value={proyecto.nombre}
                            onChange={(e) => setProyecto({ ...proyecto, nombre: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                            placeholder="Ej: Proyecto Lima Norte"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Descripción (Opcional)</label>
                        <textarea
                            value={proyecto.descripcion}
                            onChange={(e) => setProyecto({ ...proyecto, descripcion: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none resize-none"
                            rows={3}
                            placeholder="Descripción del proyecto..."
                        />
                    </div>

                    {/* Estado */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estado Inicial</label>
                        <select
                            value={proyecto.estado}
                            onChange={(e) => setProyecto({ ...proyecto, estado: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                        >
                            <option value="PLANIFICACION">Planificación</option>
                            <option value="EN_EJECUCION">En Ejecución</option>
                            <option value="INSTALADO">Instalado</option>
                            <option value="FINALIZADO">Finalizado</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mt-6"
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        CREAR PROYECTO
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormProyecto;