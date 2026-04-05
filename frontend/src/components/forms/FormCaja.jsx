import { useState, useEffect } from 'react';
import { X, Save, Box, Trash2, PieChart, Network, Loader2, Database, AlertCircle, Droplets } from 'lucide-react';
import useCajas from '../../hooks/useCajas';
import useMufas from '../../hooks/useMufas';
import useProyectos from '../../hooks/useProyectos'; 

const FormCaja = ({ data, onCancel }) => {
    const { crearCaja, actualizarCaja, eliminarCaja, loading } = useCajas();
    const { mufas } = useMufas();
    const { proyectoSeleccionado } = useProyectos();

    const coloresFibra = [
        { nombre: 'Azul', hex: '#2563eb' },
        { nombre: 'Naranja', hex: '#f97316' },
        { nombre: 'Verde', hex: '#22c55e' },
        { nombre: 'Marrón', hex: '#78350f' },
        { nombre: 'Gris', hex: '#64748b' },
        { nombre: 'Blanco', hex: '#f1f5f9' },
        { nombre: 'Rojo', hex: '#dc2626' },
        { nombre: 'Negro', hex: '#0f172a' },
    ];

    const [caja, setCaja] = useState({
        codigo: data?.data?.codigo || `NAP-${Date.now().toString().slice(-4)}`,
        capacidad: data?.data?.capacidad || 8,
        puertosLibres: data?.data?.puertosLibres || 8,
        colorHiloCaja: data?.data?.colorHiloCaja || 'Azul',
        mufaId: data?.mufaId || data?.data?.mufaId || '',
        // El proyectoId se mantiene en el estado local para la UI, 
        // aunque el backend use el posteId para las coordenadas.
        proyectoId: data?.proyectoId || proyectoSeleccionado?.id || localStorage.getItem('proyectoId') || ''
    });

    useEffect(() => {
        const idActual = proyectoSeleccionado?.id || localStorage.getItem('proyectoId');
        if (idActual && !caja.proyectoId) {
            setCaja(prev => ({ ...prev, proyectoId: idActual }));
        }
    }, [proyectoSeleccionado, data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🚩 EXTRACCIÓN DE IDs CRÍTICOS
        // El posteId viene del 'data' que envía el MapaPrincipal al hacer clic
        const posteId = data?.id || data?.data?.posteId || data?.posteId;
        const mufaId = caja.mufaId;

        // 🛡️ VALIDACIÓN PRE-ENVÍO (Para evitar el Error 400 del Backend)
        if (!mufaId || !posteId) {
            alert("❌ ERROR: Debes vincular una Mufa y asegurar que la caja esté en un Poste válido.");
            console.error("Faltan IDs:", { mufaId, posteId });
            return;
        }

        try {
            // 🚀 PAYLOAD EXACTO PARA EL CONTROLADOR BACKEND
            const payload = { 
                mufaId: mufaId,
                posteId: posteId, // Requerido por: const { posteId } = req.body
                codigo: caja.codigo,
                colorHiloCaja: caja.colorHiloCaja,
                puertosLibres: parseInt(caja.puertosLibres) || 16
            };

            console.log("📤 Enviando a Backend:", payload);

            if (data.isNew) {
                await crearCaja(payload);
            } else {
                await actualizarCaja(data.data.id, payload);
            }
            onCancel();
        } catch (error) {
            const msg = error.response?.data?.error || "Error al conectar con toq.life";
            alert(`Fallo: ${msg}`);
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-85 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300 ring-1 ring-black/5 font-sans text-slate-900">
            
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl border border-white/10 shadow-inner">
                        <Box size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-black uppercase text-base leading-tight tracking-tighter text-white">REGISTRAR CAJA NAP</h3>
                        <p className="text-[10px] text-emerald-100 font-extrabold tracking-widest uppercase opacity-80 italic">Forward Vision GIS</p>
                    </div>
                </div>
                <button onClick={onCancel} className="bg-white/10 hover:bg-red-500 p-2 rounded-full transition-all text-white shadow-sm">
                    <X size={20}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar">
                
                {/* INDICADOR DE PROYECTO SELECCIONADO */}
                {!caja.proyectoId && (
                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-[10px] font-black animate-pulse">
                        <AlertCircle size={16} className="text-amber-600" /> 
                        <span>SISTEMA: SELECCIONA EL SECTOR EN EL SIDEBAR.</span>
                    </div>
                )}

                {/* SELECTOR DE MUFA (ALIMENTACIÓN) */}
                <div>
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1 flex items-center gap-2 mb-1 tracking-wider">
                        <Database size={13} className="text-emerald-600"/> Mufa de Origen
                    </label>
                    <select 
                        className="w-full p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner cursor-pointer"
                        value={caja.mufaId}
                        onChange={(e) => setCaja({...caja, mufaId: e.target.value})}
                        required
                    >
                        <option value="">-- Seleccionar Mufa --</option>
                        {mufas?.map(m => (
                            <option key={m.id} value={m.id}>{m.codigo}</option>
                        ))}
                    </select>
                </div>

                {/* CÓDIGO NAP Y COLOR HILO */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Código NAP</label>
                        <input 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-black text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                            value={caja.codigo}
                            onChange={(e) => setCaja({...caja, codigo: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider flex items-center gap-1">
                             <Droplets size={12} className="text-blue-500"/> Color Hilo
                        </label>
                        <select 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 shadow-inner outline-none cursor-pointer"
                            value={caja.colorHiloCaja}
                            onChange={(e) => setCaja({...caja, colorHiloCaja: e.target.value})}
                        >
                            {coloresFibra.map(c => (
                                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* PUERTOS Y CAPACIDAD */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Puertos Libres</label>
                        <select 
                            className="w-full mt-1 p-3.5 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 shadow-inner outline-none cursor-pointer"
                            value={caja.puertosLibres}
                            onChange={(e) => setCaja({...caja, puertosLibres: Number(e.target.value)})}
                        >
                            <option value={8}>8 Puertos</option>
                            <option value={16}>16 Puertos</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider italic">Splitter</label>
                        <div className="flex items-center gap-2 mt-1 p-3.5 bg-emerald-50 rounded-2xl text-[11px] font-black text-emerald-800 border border-emerald-100">
                            <Network size={14}/> 1x{caja.puertosLibres} PLC
                        </div>
                    </div>
                </div>

                {/* MONITOR DE SATURACIÓN */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3 leading-none">
                        <PieChart size={14} /> Estado de Puertos
                    </h4>
                    <div className="flex gap-1.5 h-6">
                        {[...Array(Number(caja.puertosLibres))].map((_, i) => (
                            <div key={i} className="flex-1 rounded-md bg-slate-300 border border-black/5" />
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin text-white"/> : <Save size={18} className="text-white" />}
                        <span className="text-white">{data.isNew ? 'REGISTRAR CAJA' : 'GUARDAR CAMBIOS'}</span>
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={() => { if(window.confirm("¿Eliminar Caja?")) eliminarCaja(data.data.id).then(onCancel); }}
                            className="bg-red-50 text-red-600 px-5 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
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