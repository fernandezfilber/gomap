import { useState, useCallback } from 'react';
import fvApi from '../api/fvApi';

const useClientes = (proyectoId) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. LISTAR: Traer abonados del sector actual
    const fetchClientes = useCallback(async () => {
        if (!proyectoId) return;
        setLoading(true);
        try {
            const { data } = await fvApi.get(`/clientes?proyectoId=${proyectoId}`);
            setClientes(data);
        } finally {
            setLoading(false);
        }
    }, [proyectoId]);

    // 2. CREAR: Registrar alta de nuevo servicio (Provisionamiento)
    const crearCliente = async (datos) => {
        // El backend usará el DNI y la cajaId para descontar el puerto en la transacción
        const payload = {
            ...datos,
            proyectoId,
            estadoServicio: datos.estadoServicio || "ACTIVO"
        };
        
        const { data } = await fvApi.post('/clientes', payload);
        setClientes((prev) => [data, ...prev]);
        return data;
    };

    // 3. ACTUALIZAR: Cambiar plan, dirección o suspender servicio
    const actualizarCliente = async (id, datosActualizados) => {
        const { data } = await fvApi.put(`/clientes/${id}`, datosActualizados);
        setClientes((prev) => 
            prev.map((c) => (c.id === id ? data : c))
        );
        return data;
    };

    // 4. ELIMINAR: Baja del servicio (Libera el puerto en la Caja NAP)
    const eliminarCliente = async (id) => {
        await fvApi.delete(`/clientes/${id}`);
        setClientes((prev) => prev.filter((c) => c.id !== id));
    };

    return {
        clientes,
        loading,
        fetchClientes,
        crearCliente,
        actualizarCliente,
        eliminarCliente
    };
};

export default useClientes;