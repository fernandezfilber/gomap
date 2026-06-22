import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import usePostes from '../../hooks/usePostes';
import { useProyectoContext } from '../../context/ProyectoContext';

const FormPosteRapido = ({ coordenadas, onSubmit, onCancel }) => {
  const { proyectoSeleccionado } = useProyectoContext();
  const { crearPoste, loading } = usePostes(proyectoSeleccionado?.id);
  const [codigo, setCodigo] = useState(`P-${Date.now().toString().slice(-5)}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || !coordenadas) {
      toast.error('Ingresa código y coordenadas');
      return;
    }
    try {
      await crearPoste({
        codigo,
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud,
        proyectoId: proyectoSeleccionado?.id
      });
      toast.success('Poste creado');
      onSubmit?.();
      onCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear poste');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1003] flex items-center justify-center">
      <div className="w-[400px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 px-6 py-5 text-white flex justify-between items-center">
          <h3 className="font-black tracking-tight">NUEVO POSTE</h3>
          <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código del Poste</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="P-001"
              className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:border-blue-500 outline-none font-mono"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Latitud</label>
              <input
                type="number"
                step="0.000001"
                value={coordenadas?.latitud || ''}
                disabled
                className="w-full p-4 bg-slate-200 border border-slate-300 rounded-2xl text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Longitud</label>
              <input
                type="number"
                step="0.000001"
                value={coordenadas?.longitud || ''}
                disabled
                className="w-full p-4 bg-slate-200 border border-slate-300 rounded-2xl text-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            {loading ? 'Creando...' : 'CREAR POSTE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPosteRapido;
