import { useState, useCallback } from "react";
import fvApi from "../api/fvApi";

const useRed = (proyectoId) => {
  const [mapaCompleto, setMapaCompleto] = useState(null);
  const [resultadoFactibilidad, setResultadoFactibilidad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Obtener mapa completo
  const fetchMapaRed = useCallback(async () => {
    if (!proyectoId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await fvApi.get(`/red/mapa?proyectoId=${proyectoId}`);
      setMapaCompleto(data);
      return data;
    } catch (err) {
      console.error("Error al cargar mapa:", err);
      setError("No se pudo cargar el mapa de la red");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [proyectoId]);

  // 2. Verificar factibilidad (versión actualizada)
  // 2. Verificar factibilidad (mejorado)
  const verificarCobertura = async (latitud, longitud) => {
    if (!proyectoId) throw new Error("proyectoId es requerido");

    setLoading(true);
    setError(null);

    try {
      const { data } = await fvApi.post("/redes/factibilidad", {
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        proyectoId,
      });

      setResultadoFactibilidad(data);

      // Extraemos la caja más cercana si existe
      const cajaMasCercana = data.cajas?.[0] || null;

      return {
        ...data,
        cajaMasCercana, // ? Nueva propiedad útil
      };
    } catch (err) {
      console.error("Error en factibilidad:", err);
      const mensaje =
        err.response?.data?.error || "Error al verificar cobertura";
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    mapaCompleto,
    resultadoFactibilidad,
    loading,
    error,
    fetchMapaRed,
    verificarCobertura,
    limpiarFactibilidad: () => setResultadoFactibilidad(null),
  };
};

export default useRed;
