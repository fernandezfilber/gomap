// src/components/forms/FormMufa.jsx
import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import useTroncales from '../../hooks/useTroncales';

const coloresFibra = [
    "Azul", "Naranja", "Verde", "Marrón", "Gris", "Blanco", 
    "Rojo", "Negro", "Amarillo", "Violeta", "Rosa", "Aqua"
];

const FormMufa = ({ 
    data, 
    onCancel, 
    onSuccess, 
    crearMufa,
    actualizarMufa,
    cajas 
}) => {
    
    const [formData, setFormData] = useState({
        posteId: null,
        troncalId: '',
        codigo: '',
        tipo: '1:16',
        categoria: 'SPLITTER',
        color: 'Naranja',
    });

    const [loading, setLoading] = useState(false);
    const { troncales, loading: loadingTroncales } = useTroncales();

    // Calcular hilos ocupados automáticamente desde las cajas conectadas
    const cajasConectadas = (cajas || []).filter(c => c.mufaId === data?.id);
    const coloresEnUso = cajasConectadas.map(c => c.colorHiloCaja).filter(Boolean);
    const ratioNum = parseInt((formData.tipo || '1:16').split(':')[1]) || 16;
    const hilosOcupados = cajasConectadas.length;
    const hilosLibres = ratioNum - hilosOcupados;

    // Inicializar datos
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                posteId: data.posteId || null,
                codigo: data.codigo || `MUFA-${Date.now().toString().slice(-6)}`,
                troncalId: data.troncalId || '',
                tipo: data.ratioSplitteo || '1:16',
                categoria: data.categoria || 'SPLITTER',
                color: data.color || 'Naranja',
            }));
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.posteId) return alert("El poste es obligatorio");
        if (!formData.troncalId) return alert("Debes seleccionar una troncal");

        setLoading(true);

        try {
            const payload = {
                posteId: formData.posteId,
                troncalId: formData.troncalId,
                codigo: formData.codigo,
                ratioSplitteo: formData.tipo,
                color: formData.color,
                latitud: data?.coords?.latitud || data?.latitud,
                longitud: data?.coords?.longitud || data?.longitud,
            };

            if (data?.id) {
                await actualizarMufa(data.id, payload);
                alert("✓ Mufa actualizada correctamente");
            } else {
                await crearMufa(payload);
                alert("✓ Mufa creada correctamente");
            }

            onSuccess?.();
            onCancel();
        } catch (error) {
            console.error("❌ Error al guardar mufa:", error);
            alert(error.message || "Error al guardar la mufa");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[1003] flex items-end sm:items-center justify-center">
            <div className="bg-slate-900 border border-slate-700 w-full sm:w-[420px] sm:rounded-3xl h-[90vh] sm:h-auto overflow-hidden flex flex-col">

                {/* Header */}
                <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between bg-slate-950">
                    <h2 className="text-xl font-bold text-white">{data?.id ? 'EDITAR MUFA' : 'NUEVA MUFA'}</h2>
                    <button 
                        onClick={onCancel}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">

                
                {/* Troncal */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        TRONCAL ID *
                    </label>
                    <select
                        name="troncalId"
                        value={formData.troncalId}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-600"
                        required
                    >
                        <option value="">Seleccione una troncal...</option>
                        {loadingTroncales ? (
                            <option value="">Cargando troncales...</option>
                        ) : (
                            troncales.map(troncal => (
                                <option key={troncal.id} value={troncal.id}>
                                    {troncal.codigo} {troncal.nombre ? `- ${troncal.nombre}` : ''}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Código */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        CÓDIGO DE MUFA
                    </label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg"
                    />
                </div>

                {/* Tipo de Mufa */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        TIPO DE MUFA
                    </label>
                    <select
                        name="categoria"
                        value={formData.categoria || 'SPLITTER'}
                        onChange={(e) => setFormData(prev => ({...prev, categoria: e.target.value}))}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg mb-4"
                    >
                        <option value="PASE">Mufa de Pase (Sin Splitter)</option>
                        <option value="SPLITTER">Mufa de Splitter</option>
                    </select>
                </div>

                {/* Tipo de Splitter (Solo si es Mufa de Splitter) */}
                {formData.categoria !== 'PASE' && (
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                            TIPO DE SPLITTER
                        </label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg"
                        >
                            <option value="1:4">1:4</option>
                            <option value="1:8">1:8</option>
                            <option value="1:16">1:16</option>
                            <option value="1:32">1:32</option>
                        </select>
                    </div>
                )}

                {/* Estado del Splitter - AUTOMÁTICO */}
                {data?.id && (
                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Estado del Splitter</h3>
                        
                        {/* Barra de progreso */}
                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    hilosLibres <= 0 ? 'bg-red-500' : 
                                    hilosLibres <= 2 ? 'bg-yellow-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min((hilosOcupados / ratioNum) * 100, 100)}%` }}
                            />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-xs text-slate-500">Hilos Totales</p>
                                <p className="text-xl font-black text-white">{ratioNum}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Ocupados</p>
                                <p className={`text-xl font-black ${hilosOcupados >= ratioNum ? 'text-red-400' : 'text-orange-400'}`}>{hilosOcupados}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Libres</p>
                                <p className={`text-xl font-black ${hilosLibres <= 0 ? 'text-red-400' : 'text-emerald-400'}`}>{Math.max(hilosLibres, 0)}</p>
                            </div>
                        </div>

                        {/* Colores en uso */}
                        {coloresEnUso.length > 0 && (
                            <div>
                                <p className="text-xs text-slate-500 mb-2">Colores de hilo en uso:</p>
                                <div className="flex flex-wrap gap-1">
                                    {coloresEnUso.map((color, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-700 text-white text-[10px] font-bold rounded-lg uppercase">
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {hilosLibres <= 0 && (
                            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-2 rounded-lg">
                                <AlertTriangle size={14} />
                                <span className="font-bold">Splitter lleno — No se pueden agregar más cajas</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Color */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">COLOR</label>
                    <select
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg"
                    >
                        <option value="Naranja">Naranja</option>
                        <option value="Azul">Azul</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Verde">Verde</option>
                        <option value="Amarillo">Amarillo</option>
                    </select>
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-4 font-medium rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                    {loading ? 'GUARDANDO MUFA...' : (data?.id ? 'ACTUALIZAR MUFA' : 'INSTALAR MUFA')}
                </button>
            </form>
        </div>
    </div>
    );
};

export default FormMufa;