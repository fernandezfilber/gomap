import React, { useState, useEffect } from 'react';
import fvApi from '../../api/fvApi';
import { Users, Search, History as HistoryIcon, MapPin, Map, Phone, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClientesDashboard() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [historial, setHistorial] = useState({ instalacion: [], averias: [] });
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await fvApi.get('/clientes');
      if (res.data.success) {
        setClientes(res.data.clientes);
      }
    } catch (error) {
      console.error("Error fetching clientes", error);
    } finally {
      setLoading(false);
    }
  };

  const openClienteProfile = async (cliente) => {
    setSelectedCliente(cliente);
    setLoadingHistorial(true);
    try {
      const res = await fvApi.get(`/clientes/${cliente.id}/historial`);
      if (res.data.success) {
        setHistorial(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching historial", error);
      setHistorial({ instalacion: [], averias: [] });
    } finally {
      setLoadingHistorial(false);
    }
  };

  const filteredClientes = clientes.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.dni.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-bold mb-4 transition-colors">
            <span className="text-xl">←</span> Volver al Mapa
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-500" />
            Gestión de Clientes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Administra tus clientes, planes, y revisa su historial de instalaciones y averías.
          </p>
        </div>
        <div className="w-full md:w-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Buscar cliente o DNI..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Ubicación</th>
                  <th className="p-4 font-semibold">Plan</th>
                  <th className="p-4 font-semibold">Caja (NAP)</th>
                  <th className="p-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClientes.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">No se encontraron clientes.</td></tr>
                ) : (
                  filteredClientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{cliente.nombre}</div>
                        <div className="text-xs text-gray-500">DNI: {cliente.dni}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-700">{cliente.direccion || 'Sin dirección'}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-bold">
                          {cliente.plan || 'Sin plan'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-semibold text-gray-700">{cliente.caja?.codigo}</div>
                        <div className="text-xs text-gray-500">Puerto: {cliente.puerto || '-'}</div>
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        <button 
                          onClick={() => openClienteProfile(cliente)} 
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                        >
                          <HistoryIcon size={14} /> Historial
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Historial de Cliente */}
      {selectedCliente && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCliente.nombre}</h2>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={14}/> {selectedCliente.direccion || 'N/A'}</span>
                  <span className="flex items-center gap-1"><Phone size={14}/> {selectedCliente.telefono || 'N/A'}</span>
                  <span className="flex items-center gap-1"><Briefcase size={14}/> Plan: {selectedCliente.plan || 'N/A'}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCliente(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            {loadingHistorial ? (
              <div className="flex-1 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div></div>
            ) : (
              <div className="overflow-y-auto flex-1 space-y-6">
                
                {/* Instalación */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Historial de Instalación</h3>
                  {historial.instalacion.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay registros de instalación para este cliente.</p>
                  ) : (
                    <div className="space-y-3">
                      {historial.instalacion.map((mov, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">{mov.motivo}</div>
                            <div className="text-xs text-gray-500">{mov.item.nombre || mov.item.tipo} x{mov.cantidad}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-indigo-600">{mov.usuario.nombre} <span className="text-xs font-normal text-gray-500">({mov.usuario.rol})</span></div>
                            <div className="text-xs text-gray-400">{new Date(mov.fecha).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Averías */}
                <div>
                  <h3 className="text-lg font-bold text-red-600 border-b border-red-100 pb-2 mb-3">Historial de Averías (Fallas)</h3>
                  {historial.averias.length === 0 ? (
                    <p className="text-sm text-gray-500">Este cliente no ha reportado averías.</p>
                  ) : (
                    <div className="space-y-3">
                      {historial.averias.map((av, i) => (
                        <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-100 flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-red-800">Cód: {av.codigo} - {av.tipo}</div>
                              <div className="text-sm text-red-600 mt-1">{av.descripcion}</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${av.estado === 'RESUELTA' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                              {av.estado}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-red-100/50 pt-2 mt-1">
                            <div>
                              <span className="font-bold text-gray-700">Técnico que atendió: </span>
                              {av.tecnico ? `${av.tecnico.nombre} (${av.tecnico.rol})` : 'Sin asignar'}
                            </div>
                            <div>{new Date(av.creadoEn).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
