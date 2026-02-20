import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getMufas, crearMufa, eliminarMufa, getTroncales } from '../api/redApi';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

const COLORES = ["Azul", "Naranja", "Verde", "Marrón", "Gris", "Blanco", "Rojo", "Negro", "Amarillo", "Violeta", "Rosa", "Turquesa"];

const MufaManager = () => {
  const [mufas, setMufas] = useState([]);
  const [troncales, setTroncales] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [troncalSel, setTroncalSel] = useState("");
  const [bufferSel, setBufferSel] = useState("Azul");
  const [coords, setCoords] = useState({ lat: -11.935, lng: -76.705 });
  const [modalMapa, setModalMapa] = useState(false); // Modal para mapa grande

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    try {
      const [resM, resT] = await Promise.all([getMufas(), getTroncales()]);
      setMufas(resM.data || []);
      setTroncales(resT.data || []);
    } catch (e) { console.error(e); } finally { setCargando(false); }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  const hilosLibres = useMemo(() => {
    if (!troncalSel) return [];
    const ocupados = mufas
      .filter(m => m.troncalId === troncalSel && m.bufferColor === bufferSel)
      .map(m => m.hiloColor);
    return COLORES.filter(c => !ocupados.includes(c));
  }, [mufas, troncalSel, bufferSel]);

  const capturarGps = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    }, (err) => alert("Error GPS: " + err.message), { enableHighAccuracy: true });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const data = { 
        ...Object.fromEntries(new FormData(e.target)), 
        latitud: parseFloat(coords.lat), 
        longitud: parseFloat(coords.lng) 
    };

    try {
      await crearMufa(data);
      alert("✅ Mufa (Sangría) registrada con éxito");
      cargarDatos();
      e.target.reset();
    } catch (err) { alert("❌ " + (err.response?.data?.error || "Error")); }
    finally { setEnviando(false); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 text-white p-4 font-sans relative">
      
      {/* MODAL MAPA GRANDE */}
      {modalMapa && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-[#161b22] rounded-3xl overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-blue-400 font-black italic">UBICACIÓN DE SANGRÍA (MUFA)</h3>
              <button onClick={() => setModalMapa(false)} className="bg-blue-600 px-6 py-2 rounded-xl font-bold">CONFIRMAR</button>
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

      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-xl relative">
        {enviando && <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center rounded-2xl font-bold italic animate-pulse">SINCRONIZANDO...</div>}
        <h2 className="text-xl font-black mb-6 text-blue-400 italic flex items-center gap-2"><span>📂</span> NUEVA SANGRÍA MUFA</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-[10px] text-gray-500 font-bold uppercase">Troncal de Red</label>
          <select name="troncalId" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl outline-none focus:border-blue-500" onChange={e => setTroncalSel(e.target.value)}>
            <option value="">-- Seleccionar Troncal --</option>
            {troncales.map(t => <option key={t.id} value={t.id}>{t.nombre} ({t.prefijo})</option>)}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Color Buffer</label>
              <select name="bufferColor" value={bufferSel} className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs" onChange={e => setBufferSel(e.target.value)}>
                {COLORES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Hilo Sangrado</label>
              <select name="hiloColor" required className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-xl text-xs text-blue-400 font-bold">
                <option value="">-- Libres --</option>
                {hilosLibres.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button type="button" onClick={capturarGps} className="w-full bg-blue-600/10 text-blue-400 py-3 rounded-xl text-[10px] font-bold border border-blue-500/30">📍 GPS ACTUAL</button>
            <button type="button" onClick={() => setModalMapa(true)} className="w-full bg-slate-600/10 text-slate-400 py-3 rounded-xl text-[10px] font-bold border border-slate-500/30">🗺️ SELECCIONAR EN MAPA</button>
          </div>

          <button disabled={enviando || !troncalSel} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black uppercase tracking-widest transition-all">Registrar Mufa</button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-[#161b22] p-6 rounded-2xl border border-gray-800 relative">
        {cargando && <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center rounded-2xl text-blue-500 font-mono animate-pulse">LEYENDO RED...</div>}
        <h2 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Inventario de Sangrías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar">
          {mufas.map(m => (
            <div key={m.id} className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl flex justify-between items-center group hover:border-blue-500/50 transition-all">
              <div>
                <p className="font-mono text-blue-400 font-bold text-lg">{m.codigo}</p>
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Buffer {m.bufferColor} / Hilo {m.hiloColor}</p>
              </div>
              <button onClick={() => { if(window.confirm('¿Eliminar mufa?')) eliminarMufa(m.id).then(cargarDatos); }} className="text-red-900 group-hover:text-red-500 text-[10px] font-black uppercase">Borrar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MufaManager;