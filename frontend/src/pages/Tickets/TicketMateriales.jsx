import React, { useState } from 'react';
import { Package, Plus, Trash2, Save } from 'lucide-react';
import useInventario from '../../hooks/useInventario';
import fvApi from '../../api/fvApi';
import toast from 'react-hot-toast';

const TicketMateriales = ({ ticketId, clienteId, onSaved }) => {
    const { items, loading } = useInventario();
    const [selectedItems, setSelectedItems] = useState([]);
    const [saving, setSaving] = useState(false);

    const addItem = () => {
        setSelectedItems([...selectedItems, { itemId: '', cantidad: 1 }]);
    };

    const removeItem = (index) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...selectedItems];
        newItems[index][field] = value;
        setSelectedItems(newItems);
    };

    const handleSave = async () => {
        if (selectedItems.length === 0) return toast.error('Agrega al menos un material');
        
        for (const item of selectedItems) {
            if (!item.itemId) return toast.error('Selecciona el material');
            if (item.cantidad <= 0) return toast.error('La cantidad debe ser mayor a 0');
        }

        setSaving(true);
        try {
            await fvApi.post('/inventario/consumo-ticket', {
                averiaId: ticketId,
                clienteId: clienteId || null,
                items: selectedItems
            });
            toast.success('Materiales registrados y descontados');
            setSelectedItems([]);
            if (onSaved) onSaved();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error al registrar materiales');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-sm text-slate-500">Cargando almacén...</div>;

    return (
        <div className="mb-6 border-2 border-dashed border-emerald-200 rounded-xl p-3 sm:p-4 bg-emerald-50/30" data-html2canvas-ignore="true">
            <h3 className="font-black text-emerald-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <Package size={14} /> Materiales Usados
            </h3>
            
            {selectedItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
                    <select 
                        value={item.itemId} 
                        onChange={(e) => updateItem(index, 'itemId', e.target.value)}
                        className="flex-1 bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2"
                    >
                        <option value="">Seleccionar Material...</option>
                        {items.filter(i => i.stockTotal > 0).map(i => (
                            <option key={i.id} value={i.id}>
                                {i.nombre} ({i.stockTotal} {i.unidadMedida} disp.)
                            </option>
                        ))}
                    </select>
                    
                    <input 
                        type="number" 
                        min="0.1" 
                        step="0.1"
                        value={item.cantidad}
                        onChange={(e) => updateItem(index, 'cantidad', e.target.value)}
                        className="w-full sm:w-24 bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2"
                        placeholder="Cant."
                    />
                    
                    <button 
                        onClick={() => removeItem(index)}
                        className="p-2 w-full sm:w-auto flex justify-center items-center text-red-500 hover:bg-red-100 rounded-lg transition-colors border border-red-200 sm:border-none bg-white sm:bg-transparent"
                    >
                        <Trash2 size={18} /> <span className="sm:hidden ml-2 font-bold text-sm">Quitar</span>
                    </button>
                </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                <button 
                    onClick={addItem}
                    className="flex items-center justify-center w-full sm:w-auto gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 border-2 border-emerald-200 hover:border-emerald-300 bg-white py-2 px-4 rounded-xl transition-colors"
                >
                    <Plus size={16} /> Agregar Material
                </button>

                {selectedItems.length > 0 && (
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center justify-center w-full sm:w-auto gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-xl text-sm transition-all disabled:opacity-50 shadow-lg"
                    >
                        {saving ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Descontando...</>
                        ) : (
                            <><Save size={16} /> Confirmar Descuento</>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TicketMateriales;
