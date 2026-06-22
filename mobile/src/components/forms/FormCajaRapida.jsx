import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import useCajas from '../../hooks/useCajas';
import usePostes from '../../hooks/usePostes';
import useMufas from '../../hooks/useMufas';
import { useProyectoContext } from '../../context/ProyectoContext';

const FormCajaRapida = ({ coordenadas, posteId: initialPosteId, onCancel }) => {
  const { proyectoSeleccionado } = useProyectoContext();
  const { crearCaja, loading } = useCajas(proyectoSeleccionado?.id);
  const { postes } = usePostes(proyectoSeleccionado?.id);
  const { mufas } = useMufas(proyectoSeleccionado?.id);

  const [codigo, setCodigo] = useState(`NAP-${Date.now().toString().slice(-5)}`);
  const [posteId, setPosteId] = useState(initialPosteId || '');
  const [mufaId, setMufaId] = useState('');
  const [puertos, setPuertos] = useState('16');
  const [colorHilo, setColorHilo] = useState('Azul');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || !posteId) {
      toast.error('Completa código y poste');
      return;
    }
    try {
      await crearCaja({
        codigo,
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud,
        posteId,
        mufaId: mufaId || null,
        puertosLibres: parseInt(puertos),
        colorHiloCaja: colorHilo
      });
      toast.success('Caja creada');
      onCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear caja');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1003] flex items-center justify-center">
      <div className="w-[420px] bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
        <div className="bg-emerald-600 px-6 py-5 text-white flex justify-between items-center">
          <h3 className="font-black tracking-tight">NUEVA CAJA NAP</h3>
          <button onClick={onCancel} className="p-2 hover:bg-black/20 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Poste</label>
            <select
              value={posteId}
              onChange={(e) => setPosteId(e.target.value)}
              className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            >
              <option value="">-- Selecciona poste --</option>
              {postes?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.codigo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mufa (Opcional)</label>
            <select
              value={mufaId}
              onChange={(e) => setMufaId(e.target.value)}
              className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            >
              <option value="">Sin mufa (conexión directa)</option>
              {mufas?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.codigo}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Puertos</label>
              <select
                value={puertos}
                onChange={(e) => setPuertos(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              >
                <option value="8">8 puertos</option>
                <option value="16">16 puertos</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color Hilo</label>
              <select
                value={colorHilo}
                onChange={(e) => setColorHilo(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              >
                <option value="Azul">Azul</option>
                <option value="Naranja">Naranja</option>
                <option value="Verde">Verde</option>
                <option value="Marrón">Marrón (Café)</option>
                <option value="Gris">Gris (Pizarra)</option>
                <option value="Blanco">Blanco</option>
                <option value="Rojo">Rojo</option>
                <option value="Negro">Negro</option>
                <option value="Amarillo">Amarillo</option>
                <option value="Violeta">Violeta (Morado)</option>
                <option value="Rosa">Rosa</option>
                <option value="Aqua">Aqua (Aguamarina)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? 'Creando...' : 'CREAR CAJA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCajaRapida;
