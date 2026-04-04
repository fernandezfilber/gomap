import { useState } from 'react';
import { X, Save, PlusCircle, Trash2, Map as MapIcon } from 'lucide-react';
import useProyectos from '../../hooks/useProyectos';

const FormProyecto = ({ data, onCancel }) => {
    const { crearProyecto, actualizarProyecto, eliminarProyecto } = useProyectos();
    
    // Estado inicial: Si 'data' trae información, estamos editando.
    const [proyecto, setProyecto] = useState({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        latitud: -11.935, // Por defecto Chosica
        longitud: -76.701
    });

    

    const handleChange = (e) => {
        setProyecto({ ...proyecto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data?.isNew) {
                await crearProyecto(proyecto);
                alert("🚀 ¡Nuevo Sector creado con éxito!");
            } else {
                await actualizarProyecto(proyecto.id, proyecto);
                alert("✅ Sector actualizado correctamente");
            }
            onCancel(); // Cerrar ventana
        } catch (error) {
            alert("❌ Error: " + error.message);
        }
    };

    const handleEliminar = async () => {
        if (window.confirm("¿Estás seguro? Se borrarán todos los postes y cables de este sector.")) {
            await eliminarProyecto(proyecto.id);
            onCancel();
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-96 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Cabecera Estilo toq.life */}
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <PlusCircle className="text-indigo-400" size={24} />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-lg">
                            {data?.isNew ? 'Nuevo Proyecto' : 'Configurar Proyecto'}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Forward Vision GIS</p>
                    </div>
                </div>
                <button onClick={onCancel} className="bg-white/10 p-2 rounded-full hover:bg-red-500 transition-all">
                    <X size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Nombre del Proyecto */}
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nombre del Sector</label>
                    <input 
                        name="nombre"
                        value={proyecto.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Jicamarca Anexo 22" 
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>

                {/* Ubicación y Descripción */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Ciudad / Distrito</label>
                        <input 
                            name="ubicacion"
                            value={proyecto.ubicacion}
                            onChange={handleChange}
                            placeholder="Lurigancho-Chosica" 
                            className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Notas Técnicas</label>
                        <textarea 
                            name="descripcion"
                            value={proyecto.descripcion}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Detalles sobre el Nodo o Central..." 
                            className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Coordenadas de Inicio del Mapa */}
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                        <MapIcon size={12} /> Punto de Origen (GIS)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <input 
                            name="latitud"
                            type="number" step="any"
                            value={proyecto.latitud}
                            onChange={handleChange}
                            className="p-2 bg-white rounded-lg text-xs font-mono border border-indigo-200"
                        />
                        <input 
                            name="longitud"
                            type="number" step="any"
                            value={proyecto.longitud}
                            onChange={handleChange}
                            className="p-2 bg-white rounded-lg text-xs font-mono border border-indigo-200"
                        />
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> {data?.isNew ? 'Crear Proyecto' : 'Guardar Cambios'}
                    </button>
                    
                    {!data?.isNew && (
                        <button 
                            type="button"
                            onClick={handleEliminar}
                            className="bg-red-50 text-red-600 px-4 rounded-2xl hover:bg-red-100 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormProyecto;