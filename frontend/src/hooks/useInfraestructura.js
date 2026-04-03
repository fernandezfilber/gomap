import { useState } from 'react';
import axios from 'axios';

export const useInfraestructura = (API_BASE_URL) => {
    const [loading, setLoading] = useState(false);

    const agregarEquipo = async (tipo, posteId) => {
        setLoading(true);
        try {
            // tipo puede ser 'mufas' o 'cajas'
            const url = `${API_BASE_URL}/${tipo}`;
            const res = await axios.post(url, { 
                posteId, 
                codigo: `${tipo.toUpperCase()}-${Date.now()}` 
            });
            alert(`✅ ${tipo} agregada al poste`);
            return res.data;
        } catch (err) {
            console.error(err);
            alert("❌ Error al conectar con Hostinger");
        } finally {
            setLoading(false);
        }
    };

    return { agregarEquipo, loading };
};