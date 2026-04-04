import React from 'react';

const CapasControl = ({ capas, toggleCapa }) => {
    return (
        <div style={styles.container}>
            <p style={{ fontSize: '10px', fontWeight: 'bold' }}>CAPAS</p>
            <label><input type="checkbox" checked={capas.postes} onChange={() => toggleCapa('postes')} /> Postes</label>
            <label><input type="checkbox" checked={capas.fibra} onChange={() => toggleCapa('fibra')} /> Fibra</label>
        </div>
    );
};

const styles = {
    container: { position: 'absolute', bottom: '20px', right: '20px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }
};

export default CapasControl;