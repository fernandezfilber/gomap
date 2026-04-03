import { useState } from 'react';
import axios from 'axios';

export const useFibra = (API_URL) => {
    const [puntosCable, setPuntosCable] = useState([]);
    const [trazando, setTrazando] = useState(false);

    const iniciarTrazo = () => {
        setPuntosCable([]);
        setTrazando(true);
    };

    const agregarPunto = (latlng) => {
        if (trazando) {
            setPuntosCable([...puntosCable, latlng]);
        }
    };

    const finalizarTrazo = async (datosExtra) => {
        if (puntosCable.length < 2) return;
        try {
            const nuevoTramo = {
                ...datosExtra,
                path: puntosCable,
                metraje: 0 // Aquí podrías calcular la distancia real
            };
            await axios.post(API_URL, nuevoTramo);
            setTrazando(false);
            setPuntosCable([]);
            alert("🚀 Fibra desplegada correctamente");
        } catch (err) {
            alert("❌ Error al guardar tramo");
        }
    };

    return { puntosCable, trazando, iniciarTrazo, agregarPunto, finalizarTrazo };
};