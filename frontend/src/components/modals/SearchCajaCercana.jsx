import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { X, MapPin, Navigation, PenTool, AlertCircle, ChevronRight, RefreshCw, ZoomIn } from 'lucide-react';
import fvApi from '../../api/fvApi';
import { useNavigate } from 'react-router-dom';
import logoFull from '../../assets/logoGOmap.png';

const SearchCajaCercana = ({ onClose, initialCoordinates = null, autoSearch = false, onSelectCaja = null }) => {
  const navigate = useNavigate();
  const [coordenadasInput, setCoordenadasInput] = useState(initialCoordinates ? `${initialCoordinates.lat}, ${initialCoordinates.lng}` : '');
  const [radio, setRadio] = useState('500'); // metros
  const [resultados, setResultados] = useState([]);
  const [resultadosCroquis, setResultadosCroquis] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [autoSearchTriggered, setAutoSearchTriggered] = useState(false);

  const extraerCoordenadas = (input) => {
    if (!input) return null;

    const buscadores = [
      /(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
      /@(-?\d+\.\d+),(-?\d+\.\d+)/,
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
      /(-?\d+\.\d+)\s+(-?\d+\.\d+)/
    ];

    for (const regex of buscadores) {
      const match = input.match(regex);
      if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }

    const numbers = input.match(/-?\d+(?:\.\d+)?/g) || [];
    for (let i = 0; i + 1 < numbers.length; i += 1) {
      const lat = parseFloat(numbers[i]);
      const lng = parseFloat(numbers[i + 1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
    }
    return null;
  };

  const realizarBusqueda = async ({ lat, lng }, radioPersonalizado = null) => {
    const radioFinal = parseInt(radioPersonalizado || radio, 10);
    setResultados([]);
    setResultadosCroquis([]);
    setBusquedaRealizada(false);
    setCargando(true);

    try {
      const res = await Promise.allSettled([
        fvApi.get('/cajas/cercanas', {
          params: { latitud: lat, longitud: lng, radio: radioFinal },
        }),
        fvApi.get('/croquis/cajas-cercanas', {
          params: { latitud: lat, longitud: lng, radio: radioFinal },
        })
      ]);

      const mapaResult = res[0];
      const croquisResult = res[1];

      let listaMapa = [];
      let listaCroquis = [];

      if (mapaResult.status === 'fulfilled' && mapaResult.value.data?.success) {
        listaMapa = mapaResult.value.data.cajas || [];
        setResultados(listaMapa);
      }

      if (croquisResult.status === 'fulfilled' && croquisResult.value.data?.success) {
        listaCroquis = croquisResult.value.data.cajas || [];
        setResultadosCroquis(listaCroquis);
      }

      setBusquedaRealizada(true);

      const totalEncontrado = listaMapa.length + listaCroquis.length;
      if (totalEncontrado > 0) {
        toast.success(`Se encontraron ${totalEncontrado} cajas cercanas`);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      toast.error(error.response?.data?.message || 'Error al buscar cajas');
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!coordenadasInput) {
      toast.error('Ingresa coordenadas o pega un link');
      return;
    }

    const decoded = decodeURIComponent(coordenadasInput.trim());
    const coords = extraerCoordenadas(decoded);

    if (!coords) {
      toast.error('Formato inválido. Usa lat, lng o un link de Google Maps');
      return;
    }

    await realizarBusqueda(coords);
  };

  const handleMiUbicacion = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocalización no soportada en tu navegador');
      return;
    }

    setCargando(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCoordenadasInput(`${coords.lat}, ${coords.lng}`);
        realizarBusqueda(coords);
      },
      () => {
        setCargando(false);
        toast.error('No se pudo obtener la ubicación GPS actual');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleAmpliarRadio = (nuevoRadio) => {
    setRadio(String(nuevoRadio));
    const decoded = decodeURIComponent((coordenadasInput || '').trim());
    const coords = extraerCoordenadas(decoded);
    if (coords) {
      realizarBusqueda(coords, nuevoRadio);
    } else {
      handleMiUbicacion();
    }
  };

  useEffect(() => {
    if (autoSearch && initialCoordinates && !autoSearchTriggered) {
      setCoordenadasInput(`${initialCoordinates.lat}, ${initialCoordinates.lng}`);
      realizarBusqueda(initialCoordinates);
      setAutoSearchTriggered(true);
    }
  }, [autoSearch, initialCoordinates, autoSearchTriggered]);

  const handleSeleccionarCajaMapa = (caja) => {
    if (onSelectCaja) {
      onSelectCaja(caja);
    } else {
      const event = new window.CustomEvent('cajaSeleccionada', { detail: caja });
      window.dispatchEvent(event);
      onClose();
    }
  };

  const handleSeleccionarCajaCroquis = (caja) => {
    try {
      localStorage.setItem('croquisCajaTarget', JSON.stringify({
        lat: caja.latitud,
        lng: caja.longitud,
        id: caja.id,
        label: caja.label
      }));
    } catch {}
    navigate(`/dashboard/croquis/${caja.croquisId}`);
    onClose();
  };

  const sinResultados = busquedaRealizada && resultados.length === 0 && resultadosCroquis.length === 0;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-[1500] p-4">
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[92dvh] overflow-y-auto custom-scrollbar flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Cabecera idéntica al Login */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img src={logoFull} alt="GoMap" className="h-8 w-auto" />
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase">
                BUSCAR CAJAS CERCANAS
              </h3>
              <p className="text-[9px] font-black tracking-[0.25em] text-slate-400 uppercase">
                RADAR GIS DE COBERTURA
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleBuscar} className="space-y-4 my-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 px-2">
              Coordenadas o Link de Google Maps
            </label>
            <input
              type="text"
              value={coordenadasInput}
              onChange={(e) => setCoordenadasInput(e.target.value)}
              placeholder="-12.0124, -76.8690 ó link..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-full px-5 py-3.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-xs"
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 px-2">
                Radio de Búsqueda
              </label>
              <select
                value={radio}
                onChange={(e) => setRadio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-full px-4 py-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-xs"
              >
                <option value="300">300 metros</option>
                <option value="500">500 metros (Estándar)</option>
                <option value="1000">1,000 metros (1 Km)</option>
                <option value="2000">2,000 metros (2 Km)</option>
                <option value="5000">5,000 metros (5 Km)</option>
              </select>
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={handleMiUbicacion}
                disabled={cargando}
                className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs uppercase px-4 py-3.5 rounded-full flex items-center gap-1.5 border border-slate-200/80 transition-all shadow-xs"
                title="Tomar ubicación GPS actual"
              >
                <Navigation size={15} className="text-cyan-600" />
                <span className="hidden sm:inline">Mi GPS</span>
              </button>
            </div>
          </div>

          {/* Botón de Acción Principal Cyan */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] hover:from-[#00D4EB] hover:to-[#0EA5E9] text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 active:scale-95 transition-all disabled:opacity-50"
          >
            {cargando ? (
              <>
                <RefreshCw size={16} className="animate-spin text-slate-950" />
                <span>Buscando en proyectos y croquis...</span>
              </>
            ) : (
              <span>Buscar Cajas Cercanas</span>
            )}
          </button>
        </form>

        {/* VENTANA CUANDO NO HAY CAJAS CERCA */}
        {sinResultados && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-[2rem] p-6 text-center space-y-3.5 my-2 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle size={26} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                No hay cajas cerca a tu ubicación
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto font-medium">
                No se encontraron cajas de fibra óptica registradas en un radio de <span className="font-bold text-amber-700">{radio} metros</span>.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleAmpliarRadio(1000)}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-xs active:scale-95 transition-all"
              >
                + Buscar a 1 Km
              </button>
              <button
                type="button"
                onClick={() => handleAmpliarRadio(2500)}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-xs active:scale-95 transition-all"
              >
                + Buscar a 2.5 Km
              </button>
            </div>
          </div>
        )}

        {/* LISTA DE RESULTADOS ENCONTRADOS */}
        {(resultados.length > 0 || resultadosCroquis.length > 0) && (
          <div className="space-y-4 max-h-[45vh] overflow-y-auto custom-scrollbar pr-1 pt-2 border-t border-slate-100">
            
            {/* Resultados en Mapa Principal */}
            {resultados.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-1.5">
                    <MapPin size={13} /> En Red Principal ({resultados.length})
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    Toca para ver tendido
                  </span>
                </div>

                <div className="space-y-2">
                  {resultados.map((caja, idx) => (
                    <div
                      key={`mapa-${caja.id || idx}`}
                      onClick={() => handleSeleccionarCajaMapa(caja)}
                      className="group bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between shadow-xs active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                          📦
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-black text-slate-900 group-hover:text-emerald-950 uppercase truncate">
                            Caja {caja.codigo}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Distancia: <b className="text-emerald-700">{caja.distancia_metros}m</b> · Sector: <span className="font-semibold text-slate-700">{caja.proyectoNombre || 'Red'}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-black text-emerald-600 pl-2 shrink-0">
                        <span className="hidden sm:inline">VER EN MAPA</span>
                        <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resultados en Croquis */}
            {resultadosCroquis.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600 flex items-center gap-1.5">
                    <PenTool size={13} /> En Bloc de Notas / Croquis ({resultadosCroquis.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {resultadosCroquis.map((caja, idx) => (
                    <div
                      key={`croquis-${caja.id || idx}`}
                      onClick={() => handleSeleccionarCajaCroquis(caja)}
                      className="group bg-slate-50 hover:bg-violet-50/60 border border-slate-200/80 hover:border-violet-300 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between shadow-xs active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-violet-600 flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-violet-500 group-hover:text-white transition-colors shrink-0">
                          📝
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-black text-slate-900 group-hover:text-violet-950 uppercase truncate">
                            {caja.label || 'Caja en Croquis'}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Distancia: <b className="text-violet-700">{caja.distancia_metros}m</b> · Bloc: <span className="font-semibold text-slate-700">{caja.croquisNombre}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-black text-violet-600 pl-2 shrink-0">
                        <span className="hidden sm:inline">VER CROQUIS</span>
                        <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Botón Cerrar */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchCajaCercana;
