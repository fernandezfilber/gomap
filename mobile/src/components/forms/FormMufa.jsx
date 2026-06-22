// src/components/forms/FormMufa.jsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import useTroncales from '../../hooks/useTroncales';

const FormMufa = ({ 
    data, 
    onCancel, 
    onSuccess, 
    crearMufa,
    actualizarMufa 
}) => {
    
    const [formData, setFormData] = useState({
        posteId: null,
        troncalId: '',
        codigo: '',
        tipo: '1:16',
        hilosTotales: 16,
        hilosOcupados: 0,
        color: 'Naranja',
    });

    const [loading, setLoading] = useState(false);
    const { troncales, loading: loadingTroncales } = useTroncales();

    // Debug
    useEffect(() => {
        console.log("📥 Datos recibidos del mapa:", data);
    }, [data]);

    // Inicializar datos
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                posteId: data.posteId || null,
                codigo: data.codigo || `MUFA-${Date.now().toString().slice(-6)}`,
                troncalId: data.troncalId || '',
                tipo: data.ratioSplitteo || '1:16',
                hilosTotales: data.hilosTotales || 16,
                hilosOcupados: data.hilosOcupados || 0,
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

        if (!formData.posteId) return alert("❌ El poste es obligatorio");
        if (!formData.troncalId) return alert("❌ Debes seleccionar una troncal");

        setLoading(true);

        try {
            const payload = {
                posteId: formData.posteId,
                troncalId: formData.troncalId,           // ← Enviar como String (UUID)
                codigo: formData.codigo,
                ratioSplitteo: formData.tipo,            // ← Campo esperado en backend
                hilosTotales: Number(formData.hilosTotales),
                hilosOcupados: Number(formData.hilosOcupados),
                color: formData.color,
                latitud: data?.coords?.latitud || data?.latitud,
                longitud: data?.coords?.longitud || data?.longitud,
            };

            if (data?.id) {
                await actualizarMufa(data.id, payload);
                alert("✅ Mufa actualizada correctamente");
            } else {
                await crearMufa(payload);
                alert("✅ Mufa creada correctamente");
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

                {/* Tipo de Splitter */}
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

                {/* Hilos */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">HILOS TOTALES</label>
                        <input
                            type="number"
                            name="hilosTotales"
                            value={formData.hilosTotales}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">HILOS OCUPADOS</label>
                        <input
                            type="number"
                            name="hilosOcupados"
                            value={formData.hilosOcupados}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg"
                        />
                    </div>
                </div>

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