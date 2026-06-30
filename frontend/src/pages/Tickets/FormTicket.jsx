import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import useClientes from '../../hooks/useClientes';

const FormTicket = ({ onClose, onSuccess, team, crearTicket }) => {
    const [form, setForm] = useState({
        clienteId: '',
        tipo: 'NUEVA_INSTALACION', // o AVERIA
        prioridad: 'MEDIA',
        descripcion: '',
        tecnicoId: '',
        // Campos para instalación
        dni: '',
        nombre: '',
        direccion: '',
        telefono: '',
        plan: ''
    });

    const [loading, setLoading] = useState(false);
    const { clientes, fetchClientes } = useClientes();

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let dataToSend = { ...form };
        
        if (form.tipo === 'NUEVA_INSTALACION') {
            // Empaquetar los datos en la descripción
            const extraData = `\n\n[DNI:${form.dni}] [Nombre:${form.nombre}] [Dir:${form.direccion}] [Tel:${form.telefono}] [Plan:${form.plan}]`;
            dataToSend.descripcion = (form.descripcion || 'Instalación nueva') + extraData;
            dataToSend.clienteId = ''; // No hay cliente creado aun
        }

        const success = await crearTicket(dataToSend);
        if (success) {
            onSuccess();
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Nuevo Ticket</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-500 text-sm font-bold mb-2">Tipo</label>
                            <select 
                                value={form.tipo}
                                onChange={e => setForm({...form, tipo: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            >
                                <option value="NUEVA_INSTALACION">Instalación (Nuevo Cliente)</option>
                                <option value="CORTE_FIBRA">Avería: Corte de Fibra</option>
                                <option value="ATENUACION_ALTA">Avería: Atenuación</option>
                                <option value="PROBLEMA_CLIENTE">Avería: Problema Cliente</option>
                                <option value="OTRO">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-500 text-sm font-bold mb-2">Prioridad</label>
                            <select 
                                value={form.prioridad}
                                onChange={e => setForm({...form, prioridad: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            >
                                <option value="BAJA">Baja</option>
                                <option value="MEDIA">Media</option>
                                <option value="ALTA">Alta</option>
                                <option value="CRITICA">Crítica</option>
                            </select>
                        </div>
                    </div>

                    {form.tipo !== 'NUEVA_INSTALACION' ? (
                        <div>
                            <label className="block text-slate-500 text-sm font-bold mb-2">Cliente Existente *</label>
                            <select 
                                required
                                value={form.clienteId}
                                onChange={e => setForm({...form, clienteId: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            >
                                <option value="">Seleccionar cliente...</option>
                                {clientes.map(c => (
                                    <option key={c.id} value={c.id}>{c.nombre} {c.dni ? `(${c.dni})` : ''}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                            <div className="md:col-span-2">
                                <h3 className="font-bold text-indigo-800 text-sm mb-3">Datos del Nuevo Cliente</h3>
                            </div>
                            <div>
                                <label className="block text-slate-500 text-xs font-bold mb-1">DNI *</label>
                                <input type="text" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} className="w-full rounded-lg px-3 py-2 border-slate-200 focus:border-indigo-500" placeholder="Ej. 12345678" />
                            </div>
                            <div>
                                <label className="block text-slate-500 text-xs font-bold mb-1">Teléfono</label>
                                <input type="text" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} className="w-full rounded-lg px-3 py-2 border-slate-200 focus:border-indigo-500" placeholder="Ej. 999888777" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-slate-500 text-xs font-bold mb-1">Nombre Completo *</label>
                                <input type="text" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="w-full rounded-lg px-3 py-2 border-slate-200 focus:border-indigo-500" placeholder="Ej. Juan Pérez" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-slate-500 text-xs font-bold mb-1">Dirección Referencial</label>
                                <input type="text" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} className="w-full rounded-lg px-3 py-2 border-slate-200 focus:border-indigo-500" placeholder="Av. Principal 123" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-slate-500 text-xs font-bold mb-1">Plan Contratado</label>
                                <input type="text" value={form.plan} onChange={e => setForm({...form, plan: e.target.value})} className="w-full rounded-lg px-3 py-2 border-slate-200 focus:border-indigo-500" placeholder="Ej. 50 Mbps" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-slate-500 text-sm font-bold mb-2">Técnico Asignado (Opcional)</label>
                        <select 
                            value={form.tecnicoId}
                            onChange={e => setForm({...form, tecnicoId: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                            <option value="">Sin asignar</option>
                            {team.map(t => (
                                <option key={t.id} value={t.id}>{t.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-500 text-sm font-bold mb-2">Descripción</label>
                        <textarea 
                            rows={4}
                            required
                            value={form.descripcion}
                            onChange={e => setForm({...form, descripcion: e.target.value})}
                            placeholder="Detalles del ticket..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                        ></textarea>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-200"
                    >
                        {loading ? 'Guardando...' : 'Crear Ticket'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormTicket;
