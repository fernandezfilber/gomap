import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useInventario = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventario = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fvApi.get('/inventario/items');
      setItems(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar inventario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventario();
  }, [fetchInventario]);

  const lowStockItems = items.filter(item => (item.stockTotal - item.stockReservado) <= item.stockMinimo);

  return {
    items,
    lowStockItems,
    loading,
    error,
    fetchInventario
  };
};

export default useInventario;
