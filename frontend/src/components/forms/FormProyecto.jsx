import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import useProyectos from '../../hooks/useProyectos';

const FormProyecto = ({ data, onCancel }) => {
    const { crearProyecto, actualizarProyecto, loading } = useProyectos();
    const isNew = data?.isNew || false;

    const [proyecto, setProyecto] = useState({
        nombre: data?.nombre || '',
        descripcion: data?.descripcion || '',
        estado: data?.estado || 'PLANIFICACION'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!proyecto.nombre) return alert("El nombre es obligatorio");

        try {
            if (isNew) {
                await crearProyecto(proyecto);
            } else {
                await actualizarProyecto(data.id, proyecto);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar el proyecto");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-5 text-white flex justify-between items-center">
                <h3 className="font-black tracking-tight">{isNew ? 'NUEVO PROYECTO' : 'EDITAR PROYECTO'}</h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre del Proyecto</label>
                    <input
                        type="text"
                        value={proyecto.nombre}
                        onChange={(e) => setProyecto({ ...proyecto, nombre: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none"
                        placeholder="Nodo Chosica - Fase 2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Descripción</label>
                    <textarea
                        value={proyecto.descripcion}
                        onChange={(e) => setProyecto({ ...proyecto, descripcion: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none h-24"
                        placeholder="Proyecto de expansión en zona Chosica..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estado</label>
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'CREAR PROYECTO' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormProyecto;