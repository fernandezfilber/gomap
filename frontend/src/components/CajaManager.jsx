import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getCajas, getMufas, crearCaja, eliminarCaja, actualizarCaja } from '../api/redApi';
import { GoogleMap, Polyline, Marker, useJsApiLoader } from '@react-google-maps/api';

const CajaManager = () => {
  const [cajas, setCajas] = useState([]);
  const [mufas, setMufas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [editando, setEditando] = useState(null);

  // ESTADOS DE INFRAESTRUCTURA
  const [mufaSel, setMufaSel] = useState(null);
  const [coords, setCoords] = useState({ lat: -11.935, lng: -76.705 });
  
  // ESTADOS DEL MAPA LINEAL
  const [modalMapa, setModalMapa] = useState(false);
  const [rutaFibra, setRutaFibra] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const cargarInventario = useCallback(async () => {
    setCargando(true);
    try {
      const [resC, resM] = await Promise.all([getCajas(), getMufas()]);
      setCajas(resC.data || []);
      setMufas(resM.data || []);
    } catch (e) {
      console.error("🚨 Error:", e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargarInventario(); }, [cargarInventario]);

  // LÓGICA DE SPLITTER (16 Puertos)
  const salidasSplitterLibres = useMemo(() => {
    if (!mufaSel) return [];
    const ocupados = cajas
      .filter(c => c.mufaId === mufaSel.id && c.id !== editando?.id)
      .map(c => c.puertoMufa);

    return Array.from({ length: 16 }, (_, i) => i + 1).filter(n => !ocupados.includes(n));
  }, [cajas, mufaSel, editando]);

  const onMapClick = (e) => {
    const nuevoPunto = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    if (rutaFibra.length === 0) setCoords(nuevoPunto);
    setRutaFibra([...rutaFibra, nuevoPunto]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData);

    const dataFinal = {
      ...rawData,
      latitud: parseFloat(coords.lat),
      longitud: parseFloat(coords.lng),
      puertoMufa: parseInt(rawData.puertoMufa),
      puertosTotales: parseInt(rawData.capacidadNap),
      ruta: rutaFibra,
      detalles: rawData.detalles
    };

    try {
      if (editando) {
        await actualizarCaja(editando.id, dataFinal);
        alert("✅ Caja NAP y Ruta actualizadas");
      } else {
        await crearCaja(dataFinal);
        alert("✅ Caja NAP registrada con éxito");
      }
      cancelarEdicion();
      cargarInventario();
      e.target.reset();
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Error al procesar"));
    } finally {
      setEnviando(false);
    }
  };

  const prepararEdicion = (c) => {
    setEditando(c);
    const mufaPadre = mufas.find(m => m.id === c.mufaId);
    setMufaSel(mufaPadre);
    setCoords({ lat: c.latitud, lng: c.longitud });
    setRutaFibra(c.ruta || []);
    setModalMapa(true);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setMufaSel(null);
    setRutaFibra([]);
    setModalMapa(false);
  };

  return (
    <div className="relative grid lg:grid-cols-3 gap-6 text-white p-4 font-sans">
      
      {/* SPINNER GLOBAL */}
      {cargando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
          <p className="text-green-400 font-black italic animate-pulse">SINCRONIZANDO TERMINALES...</p>
        </div>
      )}

      {/* MODAL MAPA GOOGLE EXPANDIDO */}
      {modalMapa && isLoaded && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col p-4">
          <div className="bg-[#161b22] p-4 rounded-t-3xl border-t border-x border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-green-400 font-black italic uppercase">Trazado de Fibra: MUFA ➡️ CAJA</h3>
              <p className="text-[10px] text-gray-400">Clic 1: Ubicación NAP | Clics siguientes: Ruta por postes</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setRutaFibra([])} className="bg-red-900/30 text-red-500 px-6 py-2 rounded-xl text-xs font-bold border border-red-500/20">REINICIAR</button>
              <button onClick={() => setModalMapa(false)} className="bg-green-600 hover:bg-green-500 px-10 py-2 rounded-xl font-bold transition-all">CONFIRMAR</button>
            </div>
          </div>
          <div className="flex-1 border-x border-b border-gray-700 rounded-b-3xl overflow-hidden shadow-2xl">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={coords}
              zoom={18}
              onClick={onMapClick}
              options={{ mapTypeId: 'satellite', streetViewControl: true }}
            >
              <Marker position={coords} label={{ text: "NAP", color: "white", fontWeight: "bold" }} />
              <Polyline
                path={rutaFibra}
                options={{ strokeColor: '#22c55e', strokeOpacity: 0.9, strokeWeight: 4, editable: true }}
              />
            </GoogleMap>
          </div>
        </div>
      )}

      {/* FORMULARIO */}
      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-2xl relative h-fit">
        {enviando && <div className="absolute inset-0 bg-green-600/10 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-2xl">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-[10px] font-black italic text-green-400 uppercase">Enviando Datos...</p>
        </div>}

        <h2 className="text-xl font-black mb-6 text-green-400 italic uppercase flex items-center gap-2">
           <span>{editando ? "📝" : "📡"}</span> {editando ? "Editar Terminal" : "Nueva Terminal NAP"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Mufa de Origen (Splitter)</label>
            <select 
              name="mufaId" 
              value={mufaSel?.id || ""}
              required 
              className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl outline-none focus:border-green-500 text-sm"
              onChange={e => setMufaSel(mufas.find(m => m.id === e.target.value))}
            >
              <option value="">-- Seleccionar Mufa --</option>
              {mufas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Salida Splitter</label>
              <select name="puertoMufa" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs text-green-400 font-bold">
                <option value="">-- Puerto --</option>
                {salidasSplitterLibres.map(n => <option key={n} value={n}>Puerto {n}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Capacidad NAP</label>
              <select name="capacidadNap" defaultValue={editando?.puertosTotales || 16} className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs">
                <option value="8">8 Puertos</option>
                <option value="16">16 Puertos</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Ruta OLT / Lógica</label>
            <input name="puertoOlt" defaultValue={editando?.puertoOlt} placeholder="Ej: 1/7/1:10" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl font-mono text-green-400 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Notas de Instalación</label>
            <textarea name="detalles" defaultValue={editando?.detalles} className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs h-20" placeholder="Ej: Escalera 3 cuerpos, poste frente a mercado..." />
          </div>

          <button type="button" onClick={() => setModalMapa(true)} className="w-full bg-green-600/10 text-green-400 py-4 rounded-xl text-[10px] font-black border border-green-500/20 flex flex-col items-center gap-1">
            <span>🗺️</span>
            {rutaFibra.length > 0 ? `DIBUJO: ${rutaFibra.length} PUNTOS` : "DIBUJAR UBICACIÓN Y RUTA"}
          </button>

          <button disabled={enviando || !mufaSel} className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${editando ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500'}`}>
            {enviando ? 'Sincronizando...' : editando ? 'Actualizar Caja' : 'Registrar Caja'}
          </button>

          {editando && <button type="button" onClick={cancelarEdicion} className="w-full text-[10px] text-gray-500 uppercase font-bold underline">Cancelar</button>}
        </form>
      </div>

      {/* INVENTARIO */}
      <div className="lg:col-span-2 bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
        <h2 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Terminales en Red ({cajas.length})</h2>
        <div className="max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {cajas.map(c => (
            <div key={c.id} className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl mb-3 flex flex-col md:flex-row justify-between items-center group hover:border-green-500/40 transition-all">
              <div>
                <p className="font-mono text-green-400 font-black text-xl tracking-tighter">{c.codigo}</p>
                <div className="flex gap-2 mt-1">
                    <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-bold uppercase">Splitter P-{c.puertoMufa}</span>
                    <span className="text-[9px] bg-green-900/20 text-green-300 px-2 py-0.5 rounded font-bold uppercase">{c.ruta?.length > 0 ? '✅ Trazado' : '❌ Sin Ruta'}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 line-clamp-1 italic">{c.detalles || "Sin notas técnicas"}</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button onClick={() => prepararEdicion(c)} className="text-yellow-600 hover:text-yellow-400 text-[10px] font-black uppercase transition-all">Editar</button>
                <button onClick={() => { if(window.confirm('¿Eliminar?')) eliminarCaja(c.id).then(cargarInventario); }} className="text-red-900 group-hover:text-red-500 text-[10px] font-black uppercase transition-all">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CajaManager;