import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import useCajas from '../../hooks/useCajas';

const FormCaja = ({ data, onCancel }) => {
    const { crearCaja, actualizarCaja, loading } = useCajas();
    const isNew = data?.isNew || false;

    const [caja, setCaja] = useState({
        codigo: data?.data?.codigo || `NAP-${Date.now().toString().slice(-5)}`,
        mufaId: data?.data?.mufaId || data?.mufaId || '',
        posteId: data?.posteId || data?.data?.posteId || '',
        colorHiloCaja: data?.data?.colorHiloCaja || 'Azul',
        puertosLibres: data?.data?.puertosLibres || 16,
        latitud: data?.coords?.latitud || data?.data?.latitud || 0,
        longitud: data?.coords?.longitud || data?.data?.longitud || 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!caja.mufaId || !caja.posteId) {
            alert("Mufa y Poste son obligatorios");
            return;
        }

        try {
            const payload = {
                ...caja,
                puertosLibres: parseInt(caja.puertosLibres),
                latitud: parseFloat(caja.latitud),
                longitud: parseFloat(caja.longitud)
            };

            if (isNew) {
                await crearCaja(payload);
            } else {
                await actualizarCaja(data.data.id, payload);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar la caja");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
            <div className="bg-emerald-600 px-6 py-5 text-white flex justify-between items-center">
                <h3 className="font-black tracking-tight">{isNew ? 'NUEVA CAJA NAP' : 'EDITAR CAJA'}</h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código de Caja</label>
                    <input
                        type="text"
                        value={caja.codigo}
                        onChange={(e) => setCaja({ ...caja, codigo: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none font-mono"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color de Hilo</label>
                        <select
                            value={caja.colorHiloCaja}
                            onChange={(e) => setCaja({ ...caja, colorHiloCaja: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none"
                        >
                            <option value="Azul">Azul</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Verde">Verde</option>
                            <option value="Amarillo">Amarillo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Puertos Libres</label>
                        <input
                            type="number"
                            min="0"
                            max="32"
                            value={caja.puertosLibres}
                            onChange={(e) => setCaja({ ...caja, puertosLibres: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mt-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'INSTALAR CAJA' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormCaja;