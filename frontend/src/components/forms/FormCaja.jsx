import { useState, useMemo } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import useCajas from '../../hooks/useCajas';

const FormCaja = ({ data, onCancel, mufas = [] }) => {
    const { crearCaja, actualizarCaja, loading } = useCajas();
    const isNew = data?.isNew || false;

    const [caja, setCaja] = useState({
        codigo: data?.data?.codigo || `NAP-${Date.now().toString().slice(-5)}`,
        mufaId: data?.data?.mufaId || data?.mufaId || '',
        posteId: data?.posteId || data?.data?.posteId || '',
        colorHiloCaja: data?.data?.colorHiloCaja || 'Azul',
        puertosLibres: data?.data?.puertosLibres || 16,
        latitud: data?.coords?.latitud || data?.data?.latitud || 0,
        longitud: data?.coords?.longitud || data?.data?.longitud || 0,
    });

    // Calcular distancia entre dos puntos (Haversine)
    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // Buscar mufas cercanas (dentro de 500m)
    const mufasCercanas = useMemo(() => {
        if (!data?.coords?.latitud || !data?.coords?.longitud || !mufas.length) {
            return mufas;
        }

        return mufas
            .map(mufa => ({
                ...mufa,
                distancia: calcularDistancia(
                    data.coords.latitud,
                    data.coords.longitud,
                    mufa.latitud,
                    mufa.longitud
                )
            }))
            .filter(mufa => mufa.distancia <= 0.5) // Máximo 500 metros
            .sort((a, b) => a.distancia - b.distancia);
    }, [mufas, data?.coords]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!caja.mufaId || !caja.posteId) {
            alert("Mufa y Poste son obligatorios");
            return;
        }

        try {
            const payload = {
                ...caja,
                puertosLibres: parseInt(caja.puertosLibres),
                latitud: parseFloat(caja.latitud),
                longitud: parseFloat(caja.longitud)
            };

            if (isNew) {
                await crearCaja(payload);
            } else {
                await actualizarCaja(data.data.id, payload);
            }
            onCancel();
        } catch (error) {
            alert("Error al guardar la caja");
        }
    };

    return (
        <div className="absolute top-20 left-6 z-[1002] w-[420px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
            <div className="bg-emerald-600 px-6 py-5 text-white flex justify-between items-center">
                <h3 className="font-black tracking-tight">{isNew ? 'NUEVA CAJA NAP' : 'EDITAR CAJA'}</h3>
                <button onClick={onCancel}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* SELECTOR DE MUFA CERCANA */}
                {mufasCercanas.length > 0 && (
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                            🔍 Mufas Cercanas ({mufasCercanas.length})
                        </label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {mufasCercanas.map(mufa => (
                                <button
                                    key={mufa.id}
                                    type="button"
                                    onClick={() => setCaja({ ...caja, mufaId: mufa.id })}
                                    className={`w-full text-left p-3 rounded-2xl border-2 transition ${
                                        caja.mufaId === mufa.id
                                            ? 'bg-emerald-100 border-emerald-500'
                                            : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                                    }`}
                                >
                                    <div className="font-semibold text-sm">{mufa.codigo}</div>
                                    <div className="text-xs text-slate-600">
                                        {mufa.distancia.toFixed(2)} km • Splitter: {mufa.ratioSplitteo} • {mufa.hilosDisponibles} hilos libres
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* CAMBIAR MUFA SI LO DESEA */}
                {mufas.length > 0 && (
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                            O selecciona otra mufa
                        </label>
                        <select
                            value={caja.mufaId}
                            onChange={(e) => setCaja({ ...caja, mufaId: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none text-sm"
                        >
                            <option value="">-- Selecciona una mufa --</option>
                            {mufas.map(mufa => (
                                <option key={mufa.id} value={mufa.id}>
                                    {mufa.codigo} • {mufa.ratioSplitteo} • {mufa.hilosDisponibles} hilos
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código de Caja</label>
                    <input
                        type="text"
                        value={caja.codigo}
                        onChange={(e) => setCaja({ ...caja, codigo: e.target.value })}
                        className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none font-mono"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color de Hilo</label>
                        <select
                            value={caja.colorHiloCaja}
                            onChange={(e) => setCaja({ ...caja, colorHiloCaja: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none"
                        >
                            <option value="Azul">Azul</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Verde">Verde</option>
                            <option value="Amarillo">Amarillo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Puertos Libres</label>
                        <input
                            type="number"
                            min="0"
                            max="32"
                            value={caja.puertosLibres}
                            onChange={(e) => setCaja({ ...caja, puertosLibres: e.target.value })}
                            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-emerald-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mt-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isNew ? 'INSTALAR CAJA' : 'GUARDAR CAMBIOS'}
                </button>
            </form>
        </div>
    );
};

export default FormCaja;