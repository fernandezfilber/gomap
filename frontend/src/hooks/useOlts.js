import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useOlts = (proyectoId = null) => {
  const [olts, setOlts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOlts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = proyectoId ? `/olts?proyectoId=${proyectoId}` : '/olts';
      const { data } = await fvApi.get(url);
      setOlts(data.olts || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar OLTS');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [proyectoId]);

  useEffect(() => {
    fetchOlts();
  }, [fetchOlts]);

  return {
    olts,
    loading,
    error,
    fetchOlts
  };
};

export default useOlts;
