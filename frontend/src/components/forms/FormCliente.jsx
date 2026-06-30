// src/components/forms/FormCliente.jsx
import { useState, useEffect } from 'react';
import { Trash2, Search, Loader2 } from 'lucide-react';
import { calcularDistanciasCajas } from '../../utils/calcularCajaMasCercana';
import fvApi from '../../api/fvApi';

const FormCliente = ({ 
    data = {},                    
    onCancel, 
    onSuccess, 
    crearCliente, 
    actualizarCliente,
    eliminarCliente, 
    cajas = [], 
    calcularCajaMasCercana        
}) => {

    // Mejor detección de modo edición (acepta id o _id)
    const isEditMode = !!(data?.id || data?._id);

    const [form, setForm] = useState({
        nombre: data.nombre || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        direccion: data.direccion || '',
        plan: data.plan || '',
        snMac: data.snMac || '',
        latitud: data.latitud || '',
        longitud: data.longitud || '',
        cajaId: data.cajaId || data.caja?.id || '',
        estadoServicio: data.estadoServicio || 'ACTIVO',
        puerto: data.puerto || '',
        dropMetros: '',
        router: data.snMac ? 1 : 0,
        patchcord: 0,
        micronodo: 0
    });

    const [cajasOrdenadas, setCajasOrdenadas] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    
    // Para buscar ticket
    const [dniSearch, setDniSearch] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [ticketId, setTicketId] = useState('');

    const handleBuscarTicket = async () => {
        if (!dniSearch.trim()) return;
        setLoadingSearch(true);
        try {
            const { data } = await fvApi.get(`/averias/buscar-instalacion/${dniSearch.trim()}`);
            if (data.success && data.instalacion) {
                const i = data.instalacion;
                setForm(prev => ({
                    ...prev,
                    nombre: i.nombre || prev.nombre,
                    dni: i.dni || prev.dni,
                    direccion: i.direccion || prev.direccion,
                    telefono: i.telefono || prev.telefono,
                    plan: i.plan || prev.plan
                }));
                setTicketId(i.ticketId);
                alert("¡Ticket encontrado! Datos autocompletados.");
            }
        } catch (error) {
            alert("No se encontró instalación pendiente para este DNI.");
        } finally {
            setLoadingSearch(false);
        }
    };

    useEffect(() => {
        if (!cajas.length) return;
        
        let sorted = cajas;
        if (data.latitud && data.longitud) {
            sorted = calcularDistanciasCajas(parseFloat(data.latitud), parseFloat(data.longitud), cajas);
        }

        setCajasOrdenadas(sorted);

        // Si es nuevo y no tiene caja asignada, auto-asignar la más cercana (la primera)
        if (!isEditMode && sorted.length > 0 && !form.cajaId) {
            setForm(prev => ({ ...prev, cajaId: sorted[0].id }));
        }
    }, [data.latitud, data.longitud, cajas, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre?.trim() || !form.dni?.trim() || !form.cajaId) {
            alert("Nombre, DNI y Caja NAP son obligatorios");
            return;
        }

        setLoadingSubmit(true);

        try {
            if (isEditMode) {
                const clienteId = data.id || data._id;
                await actualizarCliente(clienteId, {
                    nombre: form.nombre.trim(),
                    dni: form.dni.trim(),
                    telefono: form.telefono?.trim() || null,
                    direccion: form.direccion?.trim() || null,
                    snMac: form.snMac?.trim() || null,
                    latitud: parseFloat(form.latitud) || null,
                    longitud: parseFloat(form.longitud) || null,
                    estadoServicio: form.estadoServicio,
                    puerto: form.puerto ? parseInt(form.puerto) : null,
                    cajaId: form.cajaId,
                    materiales: {
                        dropMetros: form.dropMetros ? parseFloat(form.dropMetros) : 0,
                        router: form.router ? parseInt(form.router) : 0,
                        patchcord: form.patchcord ? parseInt(form.patchcord) : 0,
                        micronodo: form.micronodo ? parseInt(form.micronodo) : 0
                    }
                });
                alert("? Cliente actualizado correctamente");
            } else {
                await crearCliente({
                    nombre: form.nombre.trim(),
                    dni: form.dni.trim(),
                    telefono: form.telefono?.trim() || null,
                    direccion: form.direccion?.trim() || null,
                    snMac: form.snMac?.trim() || null,
                    latitud: parseFloat(form.latitud) || null,
                    longitud: parseFloat(form.longitud) || null,
                    estadoServicio: form.estadoServicio,
                    plan: form.plan,
                    ticketId: ticketId || undefined,
                    puerto: form.puerto ? parseInt(form.puerto) : null,
                    cajaId: form.cajaId,
                    materiales: {
                        dropMetros: form.dropMetros ? parseFloat(form.dropMetros) : 0,
                        router: form.router ? parseInt(form.router) : 0,
                        patchcord: form.patchcord ? parseInt(form.patchcord) : 0,
                        micronodo: form.micronodo ? parseInt(form.micronodo) : 0
                    }
                });
                alert("? Cliente creado correctamente");
            }

            onSuccess?.();
            onCancel();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error al guardar el cliente");
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleDelete = async () => {
        const clienteId = data.id || data._id;
        if (!clienteId) return;

        const confirmar = window.confirm(
            `¿Estás seguro de eliminar al cliente "${data.nombre || 'este cliente'}"?\n\nEsta acción es irreversible.`
        );

        if (!confirmar) return;

        setLoadingDelete(true);
        try {
            await eliminarCliente(clienteId);
            alert("??? Cliente eliminado correctamente");
            onSuccess?.();
            onCancel();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el cliente");
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div className="bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-700 w-full max-w-lg mx-auto shadow-2xl max-h-[90vh] flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 shrink-0">
                {isEditMode ? `✏️ Editar Cliente` : '👤 Nuevo Cliente desde Mapa'}
            </h2>

            {!isEditMode && (
                <div className="flex gap-2 mb-4 shrink-0 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <input
                        type="text"
                        value={dniSearch}
                        onChange={(e) => setDniSearch(e.target.value)}
                        placeholder="Buscar ticket por DNI..."
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
                    />
                    <button 
                        type="button"
                        onClick={handleBuscarTicket}
                        disabled={loadingSearch}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
                    >
                        {loadingSearch ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                        Buscar
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Nombre completo *</label>
                    <input
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">DNI *</label>
                        <input
                            type="text"
                            value={form.dni}
                            onChange={(e) => setForm({ ...form, dni: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Teléfono</label>
                        <input
                            type="text"
                            value={form.telefono}
                            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Dirección</label>
                    <input
                        type="text"
                        value={form.direccion}
                        onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Plan Contratado</label>
                    <select
                        value={form.plan}
                        onChange={(e) => setForm({ ...form, plan: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                    >
                        <option value="">Ninguno / Por Defecto</option>
                        <option value="Internet 50 Mbps">Internet 50 Mbps</option>
                        <option value="Internet 100 Mbps">Internet 100 Mbps</option>
                        <option value="Internet 200 Mbps">Internet 200 Mbps</option>
                        <option value="Internet 300 Mbps">Internet 300 Mbps</option>
                        <option value="Internet 500 Mbps">Internet 500 Mbps</option>
                        <option value="Internet 1 Gbps">Internet 1 Gbps</option>
                    </select>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Caja NAP *</label>
                    <select
                        value={form.cajaId}
                        onChange={(e) => setForm({ ...form, cajaId: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                        required
                    >
                        <option value="">Seleccionar caja</option>
                        {(cajasOrdenadas.length > 0 ? cajasOrdenadas : cajas).map((caja) => (
                            <option key={caja.id} value={caja.id}>
                                {caja.codigo} — {caja.puertosLibres || 0} puertos libres
                                {caja.distanciaMetros && caja.distanciaMetros !== Infinity 
                                    ? ` (A aprox. ${Math.round(caja.distanciaMetros)}m)` 
                                    : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">SN / MAC (ONU)</label>
                    <input
                        type="text"
                        value={form.snMac}
                        onChange={(e) => setForm({ ...form, snMac: e.target.value, router: e.target.value ? 1 : form.router })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                    />
                </div>

                {!isEditMode && (
<div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4 mt-4">
                        <h3 className="text-white font-bold text-sm border-b border-slate-700 pb-2 mb-2">Materiales (Descuento Auto)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-xs mb-1">Drop (Metros)</label>
                                <input type="number" value={form.dropMetros} onChange={(e) => setForm({ ...form, dropMetros: e.target.value })} className="w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs mb-1">Router (Unids)</label>
                                <input type="number" value={form.router} onChange={(e) => setForm({ ...form, router: e.target.value })} className="w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs mb-1">Patchcord (Unids)</label>
                                <input type="number" value={form.patchcord} onChange={(e) => setForm({ ...form, patchcord: e.target.value })} className="w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs mb-1">Micronodo (Unids)</label>
                                <input type="number" value={form.micronodo} onChange={(e) => setForm({ ...form, micronodo: e.target.value })} className="w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500" />
                            </div>
                        </div>
                    </div>
)}

                {/* Botones */}
                <div className="pt-6 space-y-3">
                    <button
                        type="submit"
                        disabled={loadingSubmit}
                        className="w-full bg-violet-600 hover:bg-violet-700 transition-all py-4 rounded-xl font-semibold text-white text-lg disabled:opacity-70"
                    >
                        {loadingSubmit ? 'Guardando...' : isEditMode ? '?? Guardar Cambios' : 'Crear Cliente'}
                    </button>

                    {isEditMode && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loadingDelete}
                            className="w-full bg-red-600 hover:bg-red-700 transition-all py-4 rounded-xl font-semibold text-white text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            <Trash2 size={22} />
                            {loadingDelete ? 'Borrando...' : '??? Borrar Cliente'}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl text-slate-300 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCliente;
