import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getMufas, crearMufa, eliminarMufa, getTroncales, actualizarMufa } from '../api/redApi';
import { GoogleMap, Polyline, Marker, useJsApiLoader } from '@react-google-maps/api';

const COLORES = ["Azul", "Naranja", "Verde", "Marrón", "Gris", "Blanco", "Rojo", "Negro", "Amarillo", "Violeta", "Rosa", "Turquesa"];

const MufaManager = () => {
  const [mufas, setMufas] = useState([]);
  const [troncales, setTroncales] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [editando, setEditando] = useState(null);

  // ESTADOS DE INFRAESTRUCTURA
  const [troncalSel, setTroncalSel] = useState("");
  const [bufferSel, setBufferSel] = useState("Azul");
  const [coords, setCoords] = useState({ lat: -11.935, lng: -76.705 });

  // ESTADOS DEL MAPA LINEAL
  const [modalMapa, setModalMapa] = useState(false);
  const [rutaFibra, setRutaFibra] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    try {
      const [resM, resT] = await Promise.all([getMufas(), getTroncales()]);
      setMufas(resM.data || []);
      setTroncales(resT.data || []);
    } catch (e) {
      console.error("Error al cargar datos:", e);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  const hilosLibres = useMemo(() => {
    if (!troncalSel) return [];
    const ocupados = mufas
      .filter(m => m.troncalId === troncalSel && m.bufferColor === bufferSel && m.id !== editando?.id)
      .map(m => m.hiloColor);
    return COLORES.filter(c => !ocupados.includes(c));
  }, [mufas, troncalSel, bufferSel, editando]);

  const onMapClick = (e) => {
    const nuevoPunto = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    if (rutaFibra.length === 0) {
      setCoords(nuevoPunto);
    }
    setRutaFibra([...rutaFibra, nuevoPunto]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData),
      latitud: parseFloat(coords.lat),
      longitud: parseFloat(coords.lng),
      ruta: rutaFibra,
      detalles: formData.get("detalles")
    };

    try {
      if (editando) {
        await actualizarMufa(editando.id, data);
        alert("✅ Mufa y Ruta actualizadas correctamente");
      } else {
        await crearMufa(data);
        alert("✅ Mufa registrada con ruta de fibra");
      }
      cancelarEdicion();
      cargarDatos();
      e.target.reset();
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Error al procesar solicitud"));
    } finally {
      setEnviando(false);
    }
  };

  const prepararEdicion = (m) => {
    setEditando(m);
    setTroncalSel(m.troncalId);
    setBufferSel(m.bufferColor);
    setCoords({ lat: m.latitud, lng: m.longitud });
    setRutaFibra(m.ruta || []);
    setModalMapa(true);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setRutaFibra([]);
    setTroncalSel("");
    setModalMapa(false);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('⚠️ ¿Seguro que deseas eliminar esta mufa? Se perderán las conexiones a cajas NAP.')) return;
    setCargando(true);
    try {
      await eliminarMufa(id);
      cargarDatos();
    } catch (e) {
      e("")
      alert("Error al eliminar");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative grid lg:grid-cols-3 gap-6 text-white p-4 font-sans">

      {/* SPINNER GLOBAL DE CARGA */}
      {cargando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p className="text-blue-400 font-black italic animate-pulse">CARGANDO INFRAESTRUCTURA...</p>
        </div>
      )}

      {/* MODAL MAPA GOOGLE EXPANDIDO */}
      {modalMapa && isLoaded && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col p-4">
          <div className="bg-[#161b22] p-4 rounded-t-3xl border-t border-x border-gray-700 flex justify-between items-center shadow-2xl">
            <div>
              <h3 className="text-blue-400 font-black italic uppercase tracking-wider">Trazado de Fibra hacia Mufa</h3>
              <p className="text-[10px] text-gray-400 uppercase">Punto 1: Ubicación Física | Puntos Siguientes: Recorrido de Calles</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setRutaFibra([])} className="bg-red-900/30 text-red-500 px-6 py-2 rounded-xl text-xs font-bold border border-red-500/20 hover:bg-red-900/50 transition-all">REINICIAR</button>
              <button onClick={() => setModalMapa(false)} className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all">LISTO</button>
            </div>
          </div>
          <div className="flex-1 border-x border-b border-gray-700 rounded-b-3xl overflow-hidden shadow-2xl">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={coords}
              zoom={17}
              onClick={onMapClick}
              options={{
                mapTypeId: 'satellite',
                tilt: 45,
                streetViewControl: true
              }}
            >
              <Marker position={coords} label={{ text: "MUFA", color: "white", fontWeight: "bold" }} />
              <Polyline
                path={rutaFibra}
                options={{
                  strokeColor: '#3b82f6',
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                  editable: true,
                  geodesic: true
                }}
              />
            </GoogleMap>
          </div>
        </div>
      )}

      {/* FORMULARIO DE REGISTRO */}
      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden h-fit">
        {enviando && (
          <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-md z-20 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-xs font-black italic text-blue-400 animate-pulse uppercase">Sincronizando...</p>
          </div>
        )}

        <h2 className="text-xl font-black mb-6 text-blue-400 italic uppercase flex items-center gap-2">
          <span>{editando ? "📝" : "📂"}</span> {editando ? "Editar Sangría" : "Nueva Sangría"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Troncal Principal</label>
            <select name="troncalId" value={troncalSel} required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl outline-none focus:border-blue-500 transition-all" onChange={e => setTroncalSel(e.target.value)}>
              <option value="">-- Seleccionar Troncal --</option>
              {troncales.map(t => <option key={t.id} value={t.id}>{t.nombre} ({t.prefijo})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Color Buffer</label>
              <select name="bufferColor" value={bufferSel} className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs" onChange={e => setBufferSel(e.target.value)}>
                {COLORES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Hilo Disponible</label>
              <select name="hiloColor" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs text-blue-400 font-bold">
                <option value="">-- Libres --</option>
                {hilosLibres.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Detalles del Poste / Ubicación</label>
            <textarea name="detalles" defaultValue={editando?.detalles} className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs h-20 outline-none focus:border-blue-500 transition-all" placeholder="Ej: Poste C-45, altura 8m, requiere escalera de 3 cuerpos..." />
          </div>

          <button type="button" onClick={() => setModalMapa(true)} className="w-full bg-blue-600/5 hover:bg-blue-600/10 text-blue-400 py-4 rounded-xl text-[10px] font-black border border-blue-500/20 transition-all flex flex-col items-center justify-center gap-1">
            <span className="text-lg">🗺️</span>
            {rutaFibra.length > 0 ? `RUTA TRAZADA CON ${rutaFibra.length} PUNTOS` : "DIBUJAR UBICACIÓN Y RUTA DE FIBRA"}
          </button>

          <button disabled={enviando || !troncalSel} className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg ${editando ? 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'}`}>
            {enviando ? "PROCESANDO..." : editando ? "ACTUALIZAR SANGRÍA" : "REGISTRAR SANGRÍA"}
          </button>

          {editando && (
            <button type="button" onClick={cancelarEdicion} className="w-full text-[10px] text-gray-500 uppercase font-bold hover:text-white transition-all underline">
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* INVENTARIO DE MUFAS */}
      <div className="lg:col-span-2 bg-[#161b22] p-6 rounded-2xl border border-gray-800 relative shadow-xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Inventario de Sangrías (Mufas)</h2>
          <span className="text-[10px] bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full font-bold border border-blue-500/20">TOTAL: {mufas.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
          {mufas.map(m => (
            <div key={m.id} className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl flex flex-col gap-3 group hover:border-blue-500/40 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-blue-400 font-black text-xl tracking-tighter">{m.codigo}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-bold uppercase">BUF: {m.bufferColor}</span>
                    <span className="text-[9px] bg-blue-900/20 text-blue-300 px-2 py-0.5 rounded font-bold uppercase">HILO: {m.hiloColor}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => prepararEdicion(m)} className="text-yellow-600 hover:text-yellow-400 text-[10px] font-black uppercase transition-all">Editar</button>
                  <button onClick={() => handleEliminar(m.id)} className="text-red-900 group-hover:text-red-500 text-[10px] font-black uppercase transition-all">Borrar</button>
                </div>
              </div>

              <div className="border-t border-gray-800/50 pt-2">
                <p className="text-[10px] text-gray-400 italic line-clamp-2 min-h-[20px] mb-2">
                  {m.detalles || "Sin detalles técnicos registrados."}
                </p>
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${m.ruta?.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-[9px] font-black text-gray-500 uppercase">
                    {m.ruta?.length > 0 ? `Fibra Trazada (${m.ruta.length} pts)` : "Falta Trazado de Calle"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {mufas.length === 0 && !cargando && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-800 rounded-3xl">
              <p className="text-gray-600 font-black italic uppercase">No hay sangrías registradas en esta zona</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MufaManager;