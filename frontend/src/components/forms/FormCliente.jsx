import { useState } from 'react';
import { X, Save, User, Trash2, Home, Wifi } from 'lucide-react';
import useClientes from '../../hooks/useClientes';

const FormCliente = ({ data, onCancel }) => {
    const { crearCliente, actualizarCliente, eliminarCliente } = useClientes();

    const [cliente, setCliente] = useState(() => {
        if (data && !data.isNew && data.data) return data.data;
        return {
            nombre: '',
            dni: '',
            telefono: '',
            plan: '50MB',
            estado: 'ACTIVO',
            cajaId: data?.cajaId || null, // Se vincula a la caja si vienes de una
            latitud: data?.coords?.lat || 0,
            longitud: data?.coords?.lng || 0
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.isNew) {
                await crearCliente(cliente);
                alert("🏠 ¡Bienvenido a Forward Vision! Cliente registrado.");
            } else {
                await actualizarCliente(cliente.id, cliente);
                alert("✅ Datos del abonado actualizados.");
            }
            onCancel();
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-85 bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Cabecera Rosa (Identificativo de Clientes) */}
            <div className={`p-5 text-white flex justify-between items-center ${data.isNew ? 'bg-pink-600' : 'bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                    <User size={20} />
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-sm">Ficha del Cliente</h3>
                        <p className="text-[9px] text-pink-200 font-bold tracking-widest uppercase">Abonado Forward Vision</p>
                    </div>
                </div>
                <button onClick={onCancel} className="hover:bg-black/20 p-2 rounded-full transition-all">
                    <X size={18}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nombre Completo</label>
                    <input 
                        placeholder="Juan Pérez" 
                        className="input-fv mt-1"
                        value={cliente.nombre}
                        onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">DNI / RUC</label>
                        <input 
                            placeholder="7000..." 
                            className="input-fv mt-1"
                            value={cliente.dni}
                            onChange={(e) => setCliente({...cliente, dni: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Plan de Internet</label>
                        <select 
                            className="input-fv mt-1 font-bold text-indigo-600"
                            value={cliente.plan}
                            onChange={(e) => setCliente({...cliente, plan: e.target.value})}
                        >
                            <option value="50MB">50 Mbps</option>
                            <option value="100MB">100 Mbps</option>
                            <option value="200MB">200 Mbps (Fibra)</option>
                        </select>
                    </div>
                </div>

                {/* Info de Conexión Física */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                        <Wifi size={20} className="text-pink-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Estado de Servicio</p>
                        <p className="text-xs font-bold text-slate-700">Listo para Instalación</p>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2 pt-2">
                    <button 
                        type="submit"
                        className="flex-1 bg-pink-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-pink-700 shadow-lg shadow-pink-100 transition-all active:scale-95"
                    >
                        {data.isNew ? 'DAR DE ALTA' : 'GUARDAR CAMBIOS'}
                    </button>

                    {!data.isNew && (
                        <button 
                            type="button"
                            onClick={() => { if(window.confirm("¿Dar de baja al cliente?")) eliminarCliente(cliente.id); onCancel(); }}
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

// CRÍTICO: Esta es la línea que te falta para que el BUILD funcione
export default FormCliente;