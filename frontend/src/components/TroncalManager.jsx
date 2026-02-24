import React, { useEffect, useState, useCallback } from 'react';
import { getTroncales, crearTroncal, actualizarTroncal, eliminarTroncal } from '../api/redApi';
import MapaDibujoTroncal from './MapaDibujoTroncal';

const TroncalManager = () => {
  const [troncales, setTroncales] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [editando, setEditando] = useState(null);

  // ESTADOS PARA EL MAPA EXPANDIBLE
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [rutaTemporal, setRutaTemporal] = useState([]);
  const [troncalParaMapa, setTroncalParaMapa] = useState(null);

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

  // FUNCIÓN PARA ABRIR EL DIBUJADOR DE FIBRA
  const abrirDibujador = (troncal) => {
    setTroncalParaMapa(troncal);
    setRutaTemporal(troncal?.ruta || []);
    setMostrarMapa(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Adjuntamos la ruta que se dibujó en el mapa
    data.ruta = rutaTemporal;

    try {
      if (editando) {
        await actualizarTroncal(editando.id, data);
        alert("✅ Troncal y Ruta actualizadas correctamente");
      } else {
        await crearTroncal(data);
        alert("✅ Nueva Troncal creada con éxito");
      }
      setEditando(null);
      setRutaTemporal([]);
      e.target.reset();
      cargarTroncales();
    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.error || "Fallo en la operación"));
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("⚠️ ¡PELIGRO! Borrar la troncal eliminará todas las mufas y cajas asociadas en Chosica. ¿Confirmar?")) {
      return;
    }
    setCargando(true);
    try {
      await eliminarTroncal(id);
      cargarTroncales();
    } catch (error) {
      error("")
      alert("❌ Error al eliminar la infraestructura");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative grid md:grid-cols-3 gap-6 text-white p-2">

      {/* SPINNER DE CARGA GLOBAL */}
      {cargando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-blue-400 font-mono animate-pulse uppercase">Sincronizando Red...</p>
          </div>
        </div>
      )}

      {/* FORMULARIO DE REGISTRO / EDICIÓN */}
      <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-xl h-fit">
        <h2 className="text-xl font-bold mb-4 text-blue-400 font-mono italic uppercase">
          {editando ? "📝 Editando Troncal" : "🚀 Nueva Troncal"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase">Nombre de la Zona</label>
            <input
              name="nombre"
              defaultValue={editando?.nombre}
              className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase">Prefijo</label>
              <input
                name="prefijo"
                defaultValue={editando?.prefijo}
                className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm uppercase"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase">Capacidad</label>
              <select name="capacidad" defaultValue={editando?.capacidad || 96} className="w-full bg-[#0d1117] border border-gray-700 p-2 rounded text-sm">
                <option value={48}>48 Hilos</option>
                <option value={96}>96 Hilos</option>
                <option value={144}>144 Hilos</option>
              </select>
            </div>
          </div>

          {/* BOTÓN PARA ABRIR DIBUJADOR */}
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase">Trazado Lineal (Calles)</label>
            <button
              type="button"
              onClick={() => abrirDibujador(editando)}
              className="w-full bg-[#0d1117] border border-dashed border-blue-900/50 p-4 rounded-lg text-xs hover:border-blue-500 transition-all flex flex-col items-center gap-2"
            >
              <span className="text-blue-400 text-lg">📍</span>
              {rutaTemporal.length > 0 ? `${rutaTemporal.length} Puntos marcados` : "Haz clic aquí para dibujar la ruta"}
            </button>
          </div>

          <button
            disabled={enviando}
            className={`w-full py-3 rounded-lg font-bold transition-all ${editando ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {enviando ? "ENVIANDO..." : editando ? "ACTUALIZAR CAMBIOS" : "GUARDAR TRONCAL"}
          </button>

          {editando && (
            <button type="button" onClick={() => { setEditando(null); setRutaTemporal([]); }} className="w-full text-xs text-gray-500 underline mt-2">
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* LISTADO DE TRONCALES */}
      <div className="md:col-span-2 bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-xl relative">
        <h2 className="text-xl font-bold mb-6">Inventario de Troncales (Raíces)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {troncales.map(t => (
            <div key={t.id} className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-900/30 text-blue-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">{t.prefijo}</span>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditando(t); setRutaTemporal(t.ruta || []); }} className="hover:scale-125">✏️</button>
                  <button onClick={() => handleEliminar(t.id)} className="hover:scale-125 text-red-500">🗑️</button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{t.nombre}</h3>
              <p className="text-[10px] text-gray-400 mb-3 uppercase">
                {t.ruta?.length > 0 ? `✅ Ruta Dibujada (${t.ruta.length} pts)` : "❌ Sin trazado lineal"}
              </p>

              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500">CAPACIDAD</p>
                  <p className="text-sm font-bold">{t.capacidad}F</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500">MUFAS</p>
                  <p className="text-sm font-bold text-blue-400">{t._count?.mufas || 0}</p>
                </div>
                <button
                  onClick={() => abrirDibujador(t)}
                  className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded border border-blue-600/50"
                >
                  VER RUTA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE MAPA GIGANTE PARA DIBUJAR */}
      {mostrarMapa && (
        <div className="fixed inset-0 z-[110] bg-black p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 bg-[#161b22] p-4 rounded-xl border border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white uppercase">Trazado de Fibra: {troncalParaMapa?.nombre || "Nueva Zona"}</h3>
              <p className="text-xs text-gray-400">Haz clic en los postes/calles para dibujar. Arrastra los puntos para corregir.</p>
            </div>
            <button
              onClick={() => setMostrarMapa(false)}
              className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-900/20"
            >
              LISTO - GUARDAR RUTA
            </button>
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-800">
            <MapaDibujoTroncal
              puntos={rutaTemporal}
              setPuntos={setRutaTemporal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TroncalManager;