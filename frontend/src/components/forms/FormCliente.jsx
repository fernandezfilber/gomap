import { useState } from 'react';
import { X, Save, Loader2, User } from 'lucide-react';
import useClientes from '../../hooks/useClientes';

const FormCliente = ({ data, onCancel }) => {
    const { crearCliente, actualizarCliente, loading } = useClientes();
    const isNew = data?.isNew || false;

    const [cliente, setCliente] = useState({
        nombre: data?.data?.nombre || '',
        dni: data?.data?.dni || '',
        telefono: data?.data?.telefono || '',
        direccion: data?.data?.direccion || '',
        snMac: data?.data?.snMac || '',
        estadoServicio: data?.data?.estadoServicio || 'ACTIVO',
        cajaId: data?.cajaId || data?.data?.cajaId || '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cliente.nombre || !cliente.dni || !cliente.cajaId) {
            alert("Nombre, DNI y Caja son obligatorios");
            return;
        }

        try {
            if (isNew) {
                await crearCliente(cliente);
            } else {
                await actualizarCliente(data.data.id, cliente);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar el cliente");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
            <div className="bg-pink-600 px-6 py-5 text-white flex justify-between items-center">
                <h3 className="font-black tracking-tight flex items-center gap-2">
                    <User size={22} /> {isNew ? 'NUEVO CLIENTE' : 'EDITAR CLIENTE'}
                </h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre Completo</label>
                    <input
                        type="text"
                        value={cliente.nombre}
                        onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-pink-500 outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">DNI</label>
                        <input
                            type="text"
                            value={cliente.dni}
                            onChange={(e) => setCliente({ ...cliente, dni: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-pink-500 outline-none font-mono"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Teléfono</label>
                        <input
                            type="text"
                            value={cliente.telefono}
                            onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-pink-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">SN / MAC / ONU</label>
                    <input
                        type="text"
                        value={cliente.snMac}
                        onChange={(e) => setCliente({ ...cliente, snMac: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-pink-500 outline-none font-mono"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estado del Servicio</label>
                    <select
                        value={cliente.estadoServicio}
                        onChange={(e) => setCliente({ ...cliente, estadoServicio: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-pink-500 outline-none"
                    >
                        <option value="ACTIVO">Activo</option>
                        <option value="SUSPENDIDO">Suspendido</option>
                        <option value="CORTADO">Cortado</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mt-6"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'REGISTRAR CLIENTE' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormCliente;