import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import useMufas from '../../hooks/useMufas';
import usePostes from '../../hooks/usePostes';
import useTroncales from '../../hooks/useTroncales';
import { useProyectoContext } from '../../context/ProyectoContext';

const FormMufaRapida = ({ coordenadas, onCancel }) => {
  const { proyectoSeleccionado } = useProyectoContext();
  const { crearMufa, loading } = useMufas(proyectoSeleccionado?.id);
  const { postes } = usePostes(proyectoSeleccionado?.id);
  const { troncales } = useTroncales(proyectoSeleccionado?.id);

  const [codigo, setCodigo] = useState(`MUF-${Date.now().toString().slice(-6)}`);
  const [posteId, setPosteId] = useState('');
  const [troncalId, setTroncalId] = useState('');
  const [ratioSplitteo, setRatioSplitteo] = useState('1:16');
  const [bufferEntrada, setBufferEntrada] = useState('AZUL');
  const [hiloEntrada, setHiloEntrada] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || !posteId || !troncalId) {
      toast.error('Completa código, poste y troncal');
      return;
    }
    try {
      await crearMufa({
        codigo,
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud,
        posteId,
        troncalId,
        bufferEntrada,
        hiloEntrada: parseInt(hiloEntrada),
        ratioSplitteo,
        hilosDisponibles: ratioSplitteo === '1:32' ? 32 : 16
      });
      toast.success('Mufa creada');
      onCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear mufa');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1003] flex items-center justify-center">
      <div className="w-[420px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
        <div className="bg-orange-600 px-6 py-5 text-white flex justify-between items-center">
          <h3 className="font-black tracking-tight">NUEVA MUFA</h3>
          <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Buffer</label>
              <select
                value={bufferEntrada}
                onChange={(e) => setBufferEntrada(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              >
                <option value="AZUL">Azul</option>
                <option value="NARANJA">Naranja</option>
                <option value="VERDE">Verde</option>
                <option value="MARRON">Marrón</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Troncal</label>
            <select
              value={troncalId}
              onChange={(e) => setTroncalId(e.target.value)}
              className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            >
              <option value="">-- Selecciona troncal --</option>
              {troncales?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} ({t.hilosLibres} libres)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Poste Base</label>
            <select
              value={posteId}
              onChange={(e) => setPosteId(e.target.value)}
              className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            >
              <option value="">-- Selecciona poste --</option>
              {postes?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.codigo}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hilo Entrada</label>
              <input
                type="number"
                min="1"
                max="96"
                value={hiloEntrada}
                onChange={(e) => setHiloEntrada(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Splitter</label>
              <select
                value={ratioSplitteo}
                onChange={(e) => setRatioSplitteo(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              >
                <option value="1:16">1:16</option>
                <option value="1:32">1:32</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? 'Creando...' : 'CREAR MUFA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormMufaRapida;
