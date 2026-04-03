import React, { useState } from 'react';
import fvApi from '../../api/fvApi';
import { toast } from 'react-hot-toast';

const FormularioCaja = ({ poste, alGuardar, alCancelar }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        codigo: '',
        puertosTotales: 8, // Valor por defecto común
        detalles: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Enviamos al backend el ID del poste para que herede las coordenadas
            const payload = {
                ...formData,
                posteId: poste.id,
                latitud: poste.latitud,
                longitud: poste.longitud
            };

            await fvApi.post('/cajas', payload);
            toast.success(`Caja ${formData.codigo} registrada con éxito`);
            alGuardar(); // Esta función recargará el mapa en la página principal
        } catch (error) {
            error
            // El errorHandler que hicimos antes ya se encarga del log, 
            // aquí solo detenemos el loading
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Código de Caja</label>
                <input 
                    required
                    type="text" 
                    className="w-full border-2 border-slate-200 p-2 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="Ej: NAP-CHOSICA-01"
                    value={formData.codigo}
                    onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Capacidad (Puertos)</label>
                <select 
                    className="w-full border-2 border-slate-200 p-2 rounded-lg"
                    value={formData.puertosTotales}
                    onChange={(e) => setFormData({...formData, puertosTotales: parseInt(e.target.value)})}
                >
                    <option value={8}>8 Puertos</option>
                    <option value={16}>16 Puertos</option>
                </select>
            </div>

            <div className="flex gap-3 pt-4">
                <button 
                    type="button"
                    onClick={alCancelar}
                    className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg font-semibold hover:bg-slate-200 transition"
                >
                    Cancelar
                </button>
                <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : 'Registrar Caja'}
                </button>
            </div>
        </form>
    );
};

export default FormularioCaja;