import React, { useState, useEffect } from 'react';
import fvApi from '../../api/fvApi';
import { Package, Plus, ArrowDown, ArrowUp, Edit, History, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InventarioDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  
  const [formData, setFormData] = useState({ tipo: 'CABLE_FIBRA', nombre: '', codigo: '', stockTotal: 0, unidadMedida: 'METROS', ubicacion: '', capacidadHilos: 12 });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fvApi.get('/inventario/items');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching inventory", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setIsEditMode(false);
    setEditItemId(null);
    setFormData({ tipo: 'CABLE_FIBRA', nombre: '', codigo: '', stockTotal: 0, unidadMedida: 'METROS', ubicacion: '', capacidadHilos: 12 });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setEditItemId(item.id);
    setFormData({
      tipo: item.tipo,
      nombre: item.nombre,
      codigo: item.codigo,
      stockTotal: item.stockTotal,
      unidadMedida: item.unidadMedida,
      ubicacion: item.ubicacion || '',
      capacidadHilos: item.capacidadHilos || 12
    });
    setShowModal(true);
  };

  const handleCreateOrEditItem = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      const res = isEditMode 
        ? await fvApi.put(`/inventario/items/${editItemId}`, formData)
        : await fvApi.post('/inventario/items', formData);
        
      if (res.data.success) {
        setShowModal(false);
        setFormData({ tipo: 'CABLE_FIBRA', nombre: '', codigo: '', stockTotal: 0, unidadMedida: 'METROS', ubicacion: '', capacidadHilos: 12 });
        fetchItems();
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || (isEditMode ? 'Error al actualizar item' : 'Error al crear item'));
    }
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fvApi.get('/inventario/historial');
      if (res.data.success) {
        setHistoryData(res.data.data);
        setShowHistory(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-bold mb-4 transition-colors">
            <span className="text-xl">←</span> Volver al Mapa
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-orange-500" />
            Almacén e Inventario
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona bobinas de fibra, routers, mufas y equipos.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={fetchHistory} className="flex-1 md:flex-none items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg transition-colors font-semibold flex">
            <History size={18} /> Auditoría
          </button>
          <button onClick={openNewModal} className="flex-1 md:flex-none items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-bold flex">
            <Plus size={18} /> Nuevo Item
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Item</th>
                  <th className="p-4 font-semibold">Tipo</th>
                  <th className="p-4 font-semibold text-right">Stock Total</th>
                  <th className="p-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-gray-400">No hay items en el inventario.</td></tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{item.nombre || item.tipo}</div>
                        <div className="text-xs text-gray-500">Cod: {item.codigo}</div>
                      </td>
                      <td className="p-4 flex flex-col gap-1 items-start">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                          {item.tipo}
                        </span>
                        {(item.tipo === 'CABLE_FIBRA' || item.tipo === 'FIBRA_DROP') && item.capacidadHilos && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-bold">
                            {item.capacidadHilos} Hilos
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className={`font-black text-lg ${item.stockTotal <= item.stockMinimo ? 'text-red-500' : 'text-emerald-600'}`}>
                          {parseFloat(Number(item.stockTotal).toFixed(2))} <span className="text-xs font-normal text-gray-500">{item.unidadMedida}</span>
                        </div>
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        <button onClick={() => openEditModal(item)} className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg tooltip" title="Editar Item">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg tooltip" title="Ingreso (Comprar)">
                          <ArrowDown size={16} />
                        </button>
                        <button className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg tooltip" title="Salida (Entregar)">
                          <ArrowUp size={16} />
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

      {/* Modal Nuevo / Editar Item */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Editar Item' : 'Registrar Nuevo Item'}</h2>
            {errorMsg && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-bold">{errorMsg}</div>}
            <form onSubmit={handleCreateOrEditItem} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Item</label>
                <select value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg">
                  <option value="CABLE_FIBRA">Bobina de Fibra (Tendido)</option>
                  <option value="FIBRA_DROP">Bobina Drop (Instalación)</option>
                  <option value="ROUTER">Router / ONU</option>
                  <option value="MUFA">Mufa</option>
                  <option value="CAJA_NAP">Caja NAP</option>
                  <option value="PATCHCORD">Patchcord</option>
                  <option value="MICRONODO">Micronodo</option>
                  <option value="HERRAMIENTA">Herramienta</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre (ej. Bobina Drop 1 Hilo)</label>
                <input required type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Código / Nro Serie</label>
                <input required type="text" value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock Inicial</label>
                  <input type="number" step="0.01" value={formData.stockTotal} onChange={e => setFormData({...formData, stockTotal: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50" disabled={isEditMode} />
                  {isEditMode && <p className="text-xs text-gray-500 mt-1">El stock se modifica mediante Ingresos/Salidas en la tabla principal.</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Medida</label>
                  <select value={formData.unidadMedida} onChange={e => setFormData({...formData, unidadMedida: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg">
                    <option value="METROS">Metros</option>
                    <option value="UNIDADES">Unidades</option>
                    <option value="KILOMETROS">Kilometros</option>
                  </select>
                </div>
              </div>
              
              {(formData.tipo === 'CABLE_FIBRA' || formData.tipo === 'FIBRA_DROP') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Capacidad (Cantidad de Hilos)</label>
                  <select value={formData.capacidadHilos} onChange={e => setFormData({...formData, capacidadHilos: parseInt(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg">
                    <option value={1}>1 Hilo</option>
                    <option value={2}>2 Hilos</option>
                    <option value={4}>4 Hilos</option>
                    <option value={6}>6 Hilos</option>
                    <option value={8}>8 Hilos</option>
                    <option value={12}>12 Hilos</option>
                    <option value={24}>24 Hilos</option>
                    <option value={48}>48 Hilos</option>
                    <option value={96}>96 Hilos</option>
                    <option value={144}>144 Hilos</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm font-bold">{isEditMode ? 'Guardar Cambios' : 'Guardar Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Historial / Auditoría */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><History className="text-indigo-600"/> Auditoría de Inventario</h2>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div className="overflow-y-auto flex-1 border rounded-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="sticky top-0 bg-slate-50 text-slate-500 uppercase tracking-wider z-10 shadow-sm">
                  <tr>
                    <th className="p-3 font-semibold">Fecha</th>
                    <th className="p-3 font-semibold">Usuario</th>
                    <th className="p-3 font-semibold">Item</th>
                    <th className="p-3 font-semibold">Movimiento</th>
                    <th className="p-3 font-semibold">Motivo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historyData.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-400">No hay movimientos registrados.</td></tr>
                  ) : (
                    historyData.map((mov) => (
                      <tr key={mov.id} className="hover:bg-slate-50">
                        <td className="p-3 text-gray-600 whitespace-nowrap">{new Date(mov.fecha).toLocaleString()}</td>
                        <td className="p-3 font-medium">
                          {mov.usuario.nombre}
                          <span className="block text-xs text-gray-400">{mov.usuario.rol}</span>
                        </td>
                        <td className="p-3 font-semibold text-indigo-700">{mov.item.nombre || mov.item.tipo}</td>
                        <td className="p-3 font-bold text-gray-900">
                          {mov.tipo.includes('INGRESO') ? '+' : '-'}{mov.cantidad} <span className="text-xs text-gray-500 font-normal">{mov.item.unidadMedida}</span>
                        </td>
                        <td className="p-3 text-gray-600 text-xs">{mov.motivo}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
