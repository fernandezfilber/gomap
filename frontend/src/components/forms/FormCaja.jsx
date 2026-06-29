import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const coloresDisponibles = [
    "Azul", "Naranja", "Verde", "Marrón", "Gris", "Blanco", 
    "Rojo", "Negro", "Amarillo", "Violeta", "Rosa", "Aqua"
];

const FormCaja = ({ 
    data, 
    onCancel, 
    onSuccess, 
    crearCaja, 
    actualizarCaja,
    mufas,
    cajas 
}) => {
    
    const [formData, setFormData] = useState({
        posteId: null,
        mufaId: null,
        codigo: '',
        colorHiloCaja: 'Azul',
        capacidadTotal: 16,
    });

    const [loading, setLoading] = useState(false);
    const [coloresUsados, setColoresUsados] = useState([]);

    // Inicializar datos al abrir el formulario
    useEffect(() => {
        if (data) {
            setFormData({
                posteId: data.posteId || null,
                mufaId: data.mufaId || null,
                codigo: data.codigo || `NAP-${Date.now().toString().slice(-6)}`,
                colorHiloCaja: data.colorHiloCaja || 'Azul',
                capacidadTotal: data.capacidadTotal || 16,
            });
        }
    }, [data]);

    // Calcular colores usados en la mufa seleccionada
    useEffect(() => {
        if (formData.mufaId && cajas) {
            const cajasEnMufa = cajas.filter(c => c.mufaId === formData.mufaId && c.id !== data?.id);
            const usados = cajasEnMufa.map(c => c.colorHiloCaja).filter(Boolean);
            setColoresUsados(usados);
            
            // Si el color actual ya está usado y estamos creando, auto-seleccionar el primero libre
            if (!data?.id && usados.includes(formData.colorHiloCaja)) {
                const primerDisponible = coloresDisponibles.find(c => !usados.includes(c));
                if (primerDisponible) {
                    setFormData(prev => ({ ...prev, colorHiloCaja: primerDisponible }));
                }
            }
        } else {
            setColoresUsados([]);
        }
    }, [formData.mufaId, cajas, data, formData.colorHiloCaja]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacidadTotal' ? parseInt(value) || 16 : value
        }));
    };

    const handleMufaSelect = (mufaId) => {
        setFormData(prev => ({ 
            ...prev, 
            mufaId: mufaId ? String(mufaId) : null 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.posteId) return alert("El Poste es obligatorio");
        if (!formData.mufaId) return alert("Debes seleccionar una Mufa");

        setLoading(true);

        try {
            const payload = {
                codigo: formData.codigo,
                capacidadTotal: formData.capacidadTotal,
                posteId: formData.posteId,
                mufaId: formData.mufaId,
                estado: "ACTIVO",
                colorHiloCaja: formData.colorHiloCaja,
            };

            if (data?.id) {
                await actualizarCaja(data.id, payload);
                alert("✓ Caja actualizada correctamente");
            } else {
                await crearCaja(payload);
                alert("✓ Caja instalada correctamente");
            }

            onSuccess?.();
            onCancel();

        } catch (error) {
            console.error("❌ Error al guardar caja:", error);
            alert(error.message || "Error al guardar la caja");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[1003] flex items-end sm:items-center justify-center">
            <div className="bg-slate-900 border border-slate-700 w-full sm:w-[420px] sm:rounded-3xl h-[90vh] sm:h-auto overflow-hidden flex flex-col">

                {/* Header */}
                <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between bg-slate-950">
                    <h2 className="text-xl font-bold text-white">{data?.id ? 'EDITAR CAJA' : 'NUEVA CAJA NAP'}</h2>
                    <button 
                        onClick={onCancel}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">

                
                {/* Seleccionar Mufa */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        SELECCIONAR MUFA *
                    </label>
                    <select
                        value={formData.mufaId || ''}
                        onChange={(e) => handleMufaSelect(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 focus:outline-none focus:border-emerald-600"
                    >
                        <option value="">Seleccionar mufa...</option>
                        {mufas?.map((mufa) => (
                            <option key={mufa.id} value={mufa.id}>
                                {mufa.codigo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Código */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        CÓDIGO DE CAJA
                    </label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 focus:outline-none focus:border-emerald-600"
                        placeholder="NAP-XXXXXX"
                    />
                </div>

                {/* Capacidad */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        CAPACIDAD TOTAL (PUERTOS)
                    </label>
                    <input
                        type="number"
                        name="capacidadTotal"
                        value={formData.capacidadTotal}
                        onChange={handleChange}
                        min="4"
                        max="64"
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 focus:outline-none focus:border-emerald-600"
                    />
                </div>

                {/* Color de Hilo */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        COLOR DE HILO {coloresUsados.length > 0 && <span className="text-red-400 ml-2">({coloresUsados.length} en uso)</span>}
                    </label>
                    <select
                        name="colorHiloCaja"
                        value={formData.colorHiloCaja}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 focus:outline-none focus:border-emerald-600"
                    >
                        {coloresDisponibles.map(color => {
                            const isUsed = coloresUsados.includes(color);
                            return (
                                <option key={color} value={color} disabled={isUsed} className={isUsed ? 'text-slate-500 line-through bg-slate-900' : ''}>
                                    {color} {isUsed ? '(En Uso)' : ''}
                                </option>
                            );
                        })}
                    </select>
                    {coloresUsados.length >= coloresDisponibles.length && (
                        <p className="text-red-400 text-xs mt-2">No hay colores disponibles en esta mufa.</p>
                    )}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    disabled={loading || !formData.mufaId || !formData.posteId || coloresUsados.length >= coloresDisponibles.length}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 font-medium border border-emerald-700 flex items-center justify-center gap-2 transition-colors"
                >
                    {loading ? 'GUARDANDO CAJA...' : (data?.id ? 'ACTUALIZAR CAJA' : 'INSTALAR CAJA')}
                </button>
            </form>
        </div>
    </div>
    );
};

export default FormCaja;