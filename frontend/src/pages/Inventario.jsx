import React from 'react';
import { useMapData } from '../hooks/useMapData';

const Inventario = () => {
    const { postes, troncales } = useMapData();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Inventario de Red</h1>
            <h3>Troncales</h3>
            <ul>
                {troncales.map(t => <li key={t.id}>{t.nombre} - {t.capacidad} Hilos</li>)}
            </ul>
            <h3>Postes Activos</h3>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr><th>Código</th><th>Coordenadas</th><th>Tipo</th></tr>
                </thead>
                <tbody>
                    {postes.map(p => (
                        <tr key={p.id}>
                            <td>{p.codigo}</td>
                            <td>{p.latitud}, {p.longitud}</td>
                            <td>{p.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventario;