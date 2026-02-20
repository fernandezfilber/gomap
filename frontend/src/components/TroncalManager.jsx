import React, { useEffect, useState, useCallback } from 'react';
import { getTroncales, crearTroncal, actualizarTroncal, eliminarTroncal } from '../api/redApi';

const TroncalManager = () => {
  const [troncales, setTroncales] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [editando, setEditando] = useState(null);

  const cargarTroncales = useCallback(async () => {
    setCargando(true);
    try {
      const res = await getTroncales();
      setTroncales(res.data || []);
    } catch (error) {
      console.error("Error al cargar troncales:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarTroncales();
  }, [cargarTroncales]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const data = Object.fromEntries(new FormData(e.target));
    
    try {
      if (editando) {
        await actualizarTroncal(editando.id, data);
        alert("✅ Troncal actualizada");
      } else {
        await crearTroncal(data);
        alert("✅ Troncal creada exitosamente");
      }
      setEditando(null);
      e.target.reset();
      cargarTroncales();
    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.error || "Fallo en la operación"));
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¡CUIDADO! Eliminar una troncal borrará todas sus mufas y cajas vinculadas. ¿Proceder?")) return;
    try {
      await eliminarTroncal(id);
      cargarTroncales();
    } catch (error) {
        error("")
      alert("Error al eliminar");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 text-white p-2">
      {/* Formulario de Troncales */}
      <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-xl h-fit">
        <h2 className="text-xl font-bold mb-4 text-blue-400 font-mono italic uppercase">
          {editando ? "Editar Zona" : "Nueva Troncal"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase">Nombre de la Zona</label>
            <input 
              name="nombre" 
              placeholder="Ej: Troncal Huachipa" 
              defaultValue={editando?.nombre}
              className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase">Prefijo (3 Letras)</label>
              <input 
                name="prefijo" 
                placeholder="HUA" 
                maxLength={4}
                defaultValue={editando?.prefijo}
                className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm uppercase" 
                required 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase">Hilos Totales</label>
              <select name="capacidad" defaultValue={editando?.capacidad || 96} className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm">
                <option value={48}>48 Hilos</option>
                <option value={96}>96 Hilos</option>
                <option value={144}>144 Hilos</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase">Descripción</label>
            <textarea 
              name="descripcion" 
              defaultValue={editando?.descripcion}
              className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm h-20" 
              placeholder="Notas sobre el recorrido..."
            ></textarea>
          </div>

          <button 
            disabled={enviando} 
            className={`w-full py-3 rounded-lg font-bold transition-all ${editando ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {enviando ? "PROCESANDO..." : editando ? "ACTUALIZAR ZONA" : "CREAR TRONCAL"}
          </button>
          
          {editando && (
            <button 
              type="button" 
              onClick={() => setEditando(null)} 
              className="w-full text-xs text-gray-500 underline mt-2"
            >
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* Listado de Troncales */}
      <div className="md:col-span-2 bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-xl relative">
        {cargando && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">Cargando...</div>}
        <h2 className="text-xl font-bold mb-6">Mapa de Troncales Activas</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {troncales.map(t => (
            <div key={t.id} className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-900/30 text-blue-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  {t.prefijo}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditando(t)} className="text-yellow-500 hover:scale-110">✏️</button>
                  <button onClick={() => handleEliminar(t.id)} className="text-red-500 hover:scale-110">🗑️</button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{t.nombre}</h3>
              <p className="text-xs text-gray-500 line-clamp-1 mb-3">{t.descripcion || "Sin descripción"}</p>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Capacidad</p>
                  <p className="text-sm font-bold">{t.capacidad} F</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Mufas</p>
                  <p className="text-sm font-bold text-blue-400">{t._count?.mufas || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Estado</p>
                  <p className="text-[10px] text-green-500 font-bold">OPERATIVO</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TroncalManager;