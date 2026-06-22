import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useCircuitos = (clienteId = null) => {
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCircuitos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = clienteId ? `/circuitos?clienteId=${clienteId}` : '/circuitos';
      const { data } = await fvApi.get(url);
      setCircuitos(data.circuitos || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar circuitos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    fetchCircuitos();
  }, [fetchCircuitos]);

  return {
    circuitos,
    loading,
    error,
    fetchCircuitos
  };
};

export default useCircuitos;
