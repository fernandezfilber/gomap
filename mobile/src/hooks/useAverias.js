import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useAverias = (estado = null) => {
  const [averias, setAverias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAverias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = estado ? `/averias?estado=${estado}` : '/averias';
      const { data } = await fvApi.get(url);
      setAverias(data.averias || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar averías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [estado]);

  useEffect(() => {
    fetchAverias();
  }, [fetchAverias]);

  const summary = {
    total: averias.length,
    reportadas: averias.filter(a => a.estado === 'REPORTADA').length,
    enReparacion: averias.filter(a => a.estado === 'EN_REPARACION').length,
    resueltas: averias.filter(a => a.estado === 'RESUELTA').length
  };

  return {
    averias,
    loading,
    error,
    summary,
    fetchAverias
  };
};

export default useAverias;
