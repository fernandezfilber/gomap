import React from 'react';
import { useMapData } from '../hooks/useMapData';

const Dashboard = () => {
    const { postes, tramos, troncales } = useMapData();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Panel de Control</h2>
            <div style={styles.grid}>
                <div style={styles.card}><h4>Postes</h4><p>{postes.length}</p></div>
                <div style={styles.card}><h4>Troncales</h4><p>{troncales.length}</p></div>
                <div style={styles.card}><h4>Kms de Fibra</h4><p>{(tramos.length * 0.1).toFixed(2)} km</p></div>
            </div>
        </div>
    );
};

const styles = {
    grid: { display: 'flex', gap: '20px' },
    card: { padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', minWidth: '150px', textAlign: 'center' }
};

export default Dashboard;