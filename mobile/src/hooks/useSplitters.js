import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useSplitters = (mufaId = null) => {
  const [splitters, setSplitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSplitters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = mufaId ? `/splitters?mufaId=${mufaId}` : '/splitters';
      const { data } = await fvApi.get(url);
      setSplitters(data.splitters || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar splitters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mufaId]);

  useEffect(() => {
    fetchSplitters();
  }, [fetchSplitters]);

  return {
    splitters,
    loading,
    error,
    fetchSplitters
  };
};

export default useSplitters;
