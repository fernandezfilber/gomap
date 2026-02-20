import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getCajas, getMufas, crearCaja, eliminarCaja } from '../api/redApi';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

const CajaManager = () => {
  const [cajas, setCajas] = useState([]);
  const [mufas, setMufas] = useState([]);
  const [cargando, setCargando] = useState(false); // Corregido: antes faltaba el valor 'cargando'
  const [enviando, setEnviando] = useState(false);
  const [mufaSel, setMufaSel] = useState(null);
  const [coords, setCoords] = useState({ lat: -11.935, lng: -76.705 });
  const [modalMapa, setModalMapa] = useState(false);

  // --- CARGA DE DATOS ---
  const cargarInventario = useCallback(async () => {
    setCargando(true);
    try {
      const [resC, resM] = await Promise.all([getCajas(), getMufas()]);
      
      // IMPORTANTE: Verifica que los datos lleguen como array
      // resM.data debería contener la lista que viste en Postman
      setCajas(resC.data || []);
      setMufas(resM.data || []); 
      
      console.log("Mufas cargadas con éxito:", resM.data);
    } catch (e) {
      console.error("🚨 Error cargando inventario:", e.response?.data || e.message);
      // Si el error es 401, redirigir al login o limpiar token
      if (e.response?.status === 401) {
        alert("Sesión expirada. Por favor, inicia sesión de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarInventario();
  }, [cargarInventario]);

  // LÓGICA DE SPLITTER: 16 Salidas físicas por mufa
  const salidasSplitterLibres = useMemo(() => {
    if (!mufaSel) return [];
    
    // Filtramos las cajas que ya pertenecen a la mufa seleccionada
    const ocupados = cajas
      .filter(c => c.mufaId === mufaSel.id)
      .map(c => c.puertoMufa);

    return Array.from({ length: 16 }, (_, i) => i + 1)
      .filter(n => !ocupados.includes(n));
  }, [cajas, mufaSel]);

  // --- MAPA Y GPS ---
  const capturarGps = () => {
    if (!navigator.geolocation) return alert("Tu navegador no soporta GPS");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => err(),alert("Error al obtener ubicación GPS"),
      { enableHighAccuracy: true }
    );
  };

  const RecenterMap = ({ pos }) => {
    const map = useMap();
    useEffect(() => { if (pos) map.flyTo([pos.lat, pos.lng], 18); }, [pos, map]);
    return null;
  };

  const ClickMapa = () => {
    useMapEvents({ click(e) { setCoords({ lat: e.latlng.lat, lng: e.latlng.lng }); } });
    return <Marker position={[coords.lat, coords.lng]} />;
  };

  // --- ENVÍO ---
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
      puertosTotales: parseInt(rawData.capacidadNap)
    };

    try {
      await crearCaja(dataFinal);
      alert("✅ Caja NAP registrada con éxito");
      cargarInventario();
      e.target.reset();
      setMufaSel(null);
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Error al registrar"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 text-white p-4 font-sans relative">
      
      {/* MODAL MAPA GRANDE */}
      {modalMapa && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-[#161b22] rounded-3xl overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0d1117]">
              <h3 className="text-green-400 font-black italic">UBICACIÓN TÉCNICA NAP</h3>
              <button onClick={() => setModalMapa(false)} className="bg-green-600 px-6 py-2 rounded-xl font-bold hover:bg-green-500 transition-colors">CONFIRMAR</button>
            </div>
            <div className="h-[70vh] w-full">
              <MapContainer center={[coords.lat, coords.lng]} zoom={16} style={{height:'100%'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickMapa /><RecenterMap pos={coords} />
              </MapContainer>
            </div>
          </div>
        </div>
      )}

      {/* FORMULARIO */}
      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-2xl relative">
        <h2 className="text-xl font-black mb-6 text-green-400 italic">📡 NUEVA TERMINAL NAP</h2>
        
        {cargando && <p className="text-[10px] text-yellow-500 animate-pulse mb-2">Cargando infraestructura de red...</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Mufa (Splitter 1x16)</label>
            <select 
              name="mufaId" 
              required 
              className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl outline-none focus:border-green-500 text-sm"
              onChange={e => setMufaSel(mufas.find(m => m.id === e.target.value))}
            >
              <option value="">-- {mufas.length > 0 ? 'Seleccionar Mufa' : 'No hay mufas cargadas'} --</option>
              {mufas.map(m => (
                <option key={m.id} value={m.id}>
                  {m.codigo} ({m.hilosLibres || 16} libres)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Salida Splitter</label>
              <select name="puertoMufa" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs text-green-400 font-bold">
                <option value="">-- Hilo --</option>
                {salidasSplitterLibres.map(n => <option key={n} value={n}>Salida {n}</option>)}
                {mufaSel && salidasSplitterLibres.length === 0 && <option disabled>Splitter Lleno</option>}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Capacidad NAP</label>
              <select name="capacidadNap" className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs">
                <option value="8">8 Puertos</option>
                <option value="16">16 Puertos</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Ruta OLT (Lógica)</label>
            <input name="puertoOlt" placeholder="Ej: 1/7/1:10" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl font-mono text-green-400 text-sm placeholder:opacity-30" />
          </div>

          <div className="flex flex-col gap-2">
            <button type="button" onClick={capturarGps} className="w-full bg-green-600/10 text-green-400 py-3 rounded-xl text-[10px] font-bold border border-green-500/30">📍 GPS ACTUAL</button>
            <button type="button" onClick={() => setModalMapa(true)} className="w-full bg-blue-600/10 text-blue-400 py-3 rounded-xl text-[10px] font-bold border border-blue-500/30">🗺️ MAPA GRANDE</button>
          </div>

          <button 
            disabled={enviando || !mufaSel} 
            className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-2xl font-black uppercase tracking-widest disabled:bg-gray-800 transition-all shadow-lg shadow-green-900/20"
          >
            {enviando ? 'SINCRONIZANDO...' : 'REGISTRAR CAJA'}
          </button>
        </form>
      </div>

      {/* INVENTARIO */}
      <div className="lg:col-span-2 bg-[#161b22] p-6 rounded-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-black italic">Inventario de Cajas ({cajas.length})</h2>
           {cargando && <span className="text-[10px] text-green-500 animate-pulse font-mono">ACTUALIZANDO RED...</span>}
        </div>
        <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
          <table className="w-full text-left text-sm border-separate border-spacing-y-2">
            <thead className="text-gray-500 uppercase text-[10px]">
              <tr><th>Código / OLT</th><th className="text-center">Salida Splitter</th><th className="text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {cajas.map(c => (
                <tr key={c.id} className="bg-[#0d1117] group hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 rounded-l-xl border-y border-l border-gray-800">
                    <p className="text-green-400 font-bold font-mono text-lg tracking-tighter">{c.codigo}</p>
                    <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Ruta: {c.puertoOlt || 'S/N'}</span>
                  </td>
                  <td className="p-4 text-center border-y border-gray-800">
                    <span className="bg-gray-800 px-4 py-1 rounded-full text-[10px] font-bold border border-gray-700">P-{c.puertoMufa}</span>
                  </td>
                  <td className="p-4 text-right rounded-r-xl border-y border-r border-gray-800">
                    <button onClick={() => { if(window.confirm('¿Eliminar esta caja?')) eliminarCaja(c.id).then(cargarInventario); }} className="text-red-900 group-hover:text-red-500 font-black text-[10px] uppercase transition-colors">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mufas.length === 0 && !cargando && <p className="text-center py-10 text-gray-600 italic">No hay infraestructura disponible.</p>}
        </div>
      </div>
    </div>
  );
};

export default CajaManager;