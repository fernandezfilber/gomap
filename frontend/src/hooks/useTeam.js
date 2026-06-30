import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import fvApi from '../api/fvApi';

const useTeam = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTeam = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await fvApi.get('/auth/team');
            if (data.success) {
                setTeam(data.team || data.usuarios || []);
            }
        } catch (error) {
            console.error("Error al obtener el equipo técnico:", error);
            toast.error("Error al obtener técnicos");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        team,
        loading,
        getTeam
    };
};

export default useTeam;
