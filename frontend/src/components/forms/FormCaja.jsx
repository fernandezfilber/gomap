import { useState } from 'react';
import { X, Save, Box, Trash2, PieChart, Network } from 'lucide-react';
import useCajas from '../../hooks/useCajas';

const FormCaja = ({ data, onCancel }) => {
    const { crearCaja, actualizarCaja, eliminarCaja } = useCajas();

    const [caja, setCaja] = useState(() => {
        if (data && !data.isNew && data.data) return data.data;
        return {
            codigo: '',
            capacidad: 8,
            puertosLibres: 8,
            splitter: '1x8',
            estado: 'ACTIVA',
            posteId: data?.posteId || null,
            latitud: data?.coords?.lat || 0,
            longitud: data?.coords?.lng || 0
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data.isNew ? await crearCaja(caja) : await actualizarCaja(caja.id, caja);
            alert("📡 Caja NAP configurada y lista para abonados.");
            onCancel();
        } catch (error) { alert(error.message); }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-80 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300 font-sans">
            {/* Cabecera Verde (Identificativo de Cajas/Clientes) */}
            <div className={`p-5 text-white flex justify-between items-center ${data.isNew ? 'bg-emerald-600' : 'bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                    <Box size={20} />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm">Caja de Distribución</h3>
                        <p className="text-[9px] text-emerald-200 font-bold tracking-widest uppercase">Punto de Acceso NAP</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-black/20 p-2 rounded-full transition-all">
                    <X size={18}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Info Básica */}
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Código NAP</label>
                    <input 
                        placeholder="NAP-JIC-01" 
                        className="input-fv mt-1"
                        value={caja.codigo}
                        onChange={(e) => setCaja({...caja, codigo: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Capacidad</label>
                        <select 
                            className="input-fv mt-1"
                            value={caja.capacidad}
                            onChange={(e) => setCaja({...caja, capacidad: Number(e.target.value), puertosLibres: Number(e.target.value)})}
                        >
                            <option value={8}>8 Puertos</option>
                            <option value={16}>16 Puertos</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Splitter</label>
                        <div className="flex items-center gap-2 mt-1 bg-slate-50 border p-2.5 rounded-xl text-xs font-bold text-slate-600">
                            <Network size={14} className="text-emerald-500"/>
                            {caja.capacidad === 8 ? '1x8 PLC' : '1x16 PLC'}
                        </div>
                    </div>
                </div>

                {/* VISUALIZADOR DE SATURACIÓN */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                            <PieChart size={12} /> Estado de Puertos
                        </h4>
                    </div>
                    
                    <div className="flex items-end gap-1 h-12">
                        {[...Array(caja.capacidad)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`flex-1 rounded-t-sm transition-all ${i < (caja.capacidad - caja.puertosLibres) ? 'bg-emerald-500 h-full' : 'bg-emerald-200 h-1/3'}`}
                                title={i < (caja.capacidad - caja.puertosLibres) ? 'Ocupado' : 'Libre'}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] font-bold text-emerald-800">
                        <span>OCUPADOS: {caja.capacidad - caja.puertosLibres}</span>
                        <span>LIBRES: {caja.puertosLibres}</span>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> {data.isNew ? 'Instalar Caja' : 'Actualizar NAP'}
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={() => { if(window.confirm("¿Eliminar esta caja? Se perderán los vínculos con los clientes.")) eliminarCaja(caja.id); onCancel(); }}
                            className="bg-red-50 text-red-600 px-5 rounded-2xl hover:bg-red-100 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormCaja;