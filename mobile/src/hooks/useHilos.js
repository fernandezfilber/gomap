import { useState, useEffect, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useHilos = (troncalId = null) => {
  const [hilos, setHilos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHilos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = troncalId ? `/hilos?troncalId=${troncalId}` : '/hilos';
      const { data } = await fvApi.get(url);
      setHilos(data.hilos || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar hilos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [troncalId]);

  useEffect(() => {
    fetchHilos();
  }, [fetchHilos]);

  const stats = {
    total: hilos.length,
    libres: hilos.filter(h => h.estado === 'LIBRE').length,
    ocupados: hilos.filter(h => h.estado === 'OCUPADO').length,
    averiados: hilos.filter(h => h.estado === 'AVERIADO').length,
    reservados: hilos.filter(h => h.estado === 'RESERVADO').length
  };

  return {
    hilos,
    loading,
    error,
    stats,
    fetchHilos
  };
};

export default useHilos;
