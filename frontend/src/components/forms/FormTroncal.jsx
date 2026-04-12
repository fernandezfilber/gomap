import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import useTroncales from '../../hooks/useTroncales';

const FormTroncal = ({ data, onCancel }) => {
    const { crearTroncal, actualizarTroncal, loading } = useTroncales();
    const isNew = data?.isNew || false;

    const [troncal, setTroncal] = useState({
        nombre: data?.nombre || '',
        bufferColor: data?.bufferColor || '#3b82f6',
        cantHilos: data?.cantHilos || 96,
        descripcion: data?.descripcion || '',
        ruta: data?.ruta || '',
        proyectoId: data?.proyectoId || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!troncal.nombre || !troncal.proyectoId) {
            alert("Nombre y Proyecto son obligatorios");
            return;
        }

        try {
            if (isNew) {
                await crearTroncal(troncal);
            } else {
                await actualizarTroncal(data.id, troncal);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar la troncal");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
            <div className="bg-violet-600 px-6 py-5 text-white flex justify-between items-center">
                <h3 className="font-black tracking-tight">{isNew ? 'NUEVA TRONCAL' : 'EDITAR TRONCAL'}</h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre de la Troncal</label>
                    <input
                        type="text"
                        value={troncal.nombre}
                        onChange={(e) => setTroncal({ ...troncal, nombre: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-violet-500 outline-none"
                        placeholder="Troncal Principal Chosica"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color Buffer</label>
                        <input
                            type="color"
                            value={troncal.bufferColor}
                            onChange={(e) => setTroncal({ ...troncal, bufferColor: e.target.value })}
                            className="w-full h-12 bg-slate-100 border border-slate-300 rounded-2xl cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cantidad de Hilos</label>
                        <input
                            type="number"
                            value={troncal.cantHilos}
                            onChange={(e) => setTroncal({ ...troncal, cantHilos: parseInt(e.target.value) })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-violet-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Descripción</label>
                    <textarea
                        value={troncal.descripcion}
                        onChange={(e) => setTroncal({ ...troncal, descripcion: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-violet-500 outline-none h-20"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'CREAR TRONCAL' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormTroncal;