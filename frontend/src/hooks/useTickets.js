import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import fvApi from '../api/fvApi';

const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTickets = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await fvApi.get('/averias');
            if (data.success) {
                setTickets(data.averias);
            }
        } catch (error) {
            console.error("Error al obtener tickets:", error);
            toast.error("Error al obtener tickets");
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTicketEstado = async (id, nuevoEstado, tecnicoId = null) => {
        try {
            const { data } = await fvApi.put(`/averias/${id}/estado`, { estado: nuevoEstado, tecnicoId });
            if (data.success) {
                toast.success(`Ticket movido a ${nuevoEstado}`);
                // Update local state
                setTickets(prev => prev.map(t => t.id === id ? { ...t, estado: nuevoEstado, tecnicoId: tecnicoId || t.tecnicoId, resueltoEn: nuevoEstado === 'RESUELTA' ? new Date().toISOString() : t.resueltoEn } : t));
                return true;
            }
        } catch (error) {
            console.error("Error al actualizar ticket:", error);
            toast.error("No se pudo actualizar el ticket");
            return false;
        }
    };

    const crearTicket = async (ticketData) => {
        try {
            const { data } = await fvApi.post('/averias', ticketData);
            if (data.averia) {
                toast.success("Ticket creado correctamente");
                setTickets(prev => [...prev, data.averia]);
                return true;
            }
        } catch (error) {
            console.error("Error al crear ticket:", error);
            toast.error("No se pudo crear el ticket");
            return false;
        }
    };

    return {
        tickets,
        loading,
        getTickets,
        updateTicketEstado,
        crearTicket
    };
};

export default useTickets;
