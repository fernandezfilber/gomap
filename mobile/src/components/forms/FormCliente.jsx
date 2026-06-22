// src/components/forms/FormCliente.jsx
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

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
        snMac: data.snMac || '',
        latitud: data.latitud || '',
        longitud: data.longitud || '',
        cajaId: data.cajaId || data.caja?.id || '',
        estadoServicio: data.estadoServicio || 'ACTIVO',
        puerto: data.puerto || ''
    });

    const [cajaSeleccionada, setCajaSeleccionada] = useState(null);
    const [loadingCaja, setLoadingCaja] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Solo calcular caja más cercana cuando se está CREANDO
    useEffect(() => {
        if (isEditMode) return;

        const calcularCaja = async () => {
            if (!data.latitud || !data.longitud || !cajas.length || !calcularCajaMasCercana) return;

            setLoadingCaja(true);
            try {
                const cajaCercana = calcularCajaMasCercana(
                    parseFloat(data.latitud), 
                    parseFloat(data.longitud)
                );

                if (cajaCercana) {
                    setCajaSeleccionada(cajaCercana);
                    setForm(prev => ({ ...prev, cajaId: cajaCercana.id }));
                }
            } catch (error) {
                console.error("Error al calcular caja más cercana:", error);
            } finally {
                setLoadingCaja(false);
            }
        };

        calcularCaja();
    }, [data.latitud, data.longitud, cajas, calcularCajaMasCercana, isEditMode]);

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
                    cajaId: form.cajaId
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
                    puerto: form.puerto ? parseInt(form.puerto) : null,
                    cajaId: form.cajaId
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
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 w-full max-w-lg mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                {isEditMode ? `?? Editar Cliente` : '?? Nuevo Cliente desde Mapa'}
            </h2>

            {/* Info de caja más cercana (solo en creación) */}
            {loadingCaja && (
                <div className="mb-6 p-4 bg-slate-800 rounded-xl text-slate-400 text-sm">
                    Buscando caja más cercana...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    <label className="block text-slate-400 text-sm mb-1">Caja NAP *</label>
                    <select
                        value={form.cajaId}
                        onChange={(e) => setForm({ ...form, cajaId: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                        required
                    >
                        <option value="">Seleccionar caja</option>
                        {cajas.map((caja) => (
                            <option key={caja.id} value={caja.id}>
                                {caja.codigo} — {caja.puertosLibres || 0} puertos libres
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">SN / MAC (ONU)</label>
                    <input
                        type="text"
                        value={form.snMac}
                        onChange={(e) => setForm({ ...form, snMac: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                    />
                </div>

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