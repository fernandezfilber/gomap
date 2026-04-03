import React from 'react';
import { 
  MousePointer2, 
  MapPin, 
  GitCommit, 
  Box, 
  Share2, 
  Save, 
  Trash2 
} from 'lucide-react';

const Toolbar = ({ modo, setModo, onFinalizarTrazo, hayTrazoActivo }) => {
  
  const botones = [
    { id: 'VER', icon: <MousePointer2 size={20} />, label: 'Seleccionar', color: '#3b82f6' },
    { id: 'AGREGAR_POSTE', icon: <MapPin size={20} />, label: 'Poste', color: '#ef4444' },
    { id: 'AGREGAR_MUFA', icon: <GitCommit size={20} />, label: 'Mufa', color: '#10b981' },
    { id: 'AGREGAR_CAJA', icon: <Box size={20} />, label: 'Caja NAP', color: '#f59e0b' },
    { id: 'TRAZAR_FIBRA', icon: <Share2 size={20} />, label: 'Jalar Fibra', color: '#8b5cf6' },
  ];

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>HERRAMIENTAS GIS</h4>
      <div style={styles.grid}>
        {botones.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setModo(btn.id)}
            title={btn.label}
            style={{
              ...styles.button,
              backgroundColor: modo === btn.id ? btn.color : '#f8fafc',
              color: modo === btn.id ? '#fff' : '#64748b',
              border: `1px solid ${modo === btn.id ? btn.color : '#e2e8f0'}`,
            }}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Panel de Control de Fibra (Solo aparece si estás trazando) */}
      {modo === 'TRAZAR_FIBRA' && (
        <div style={styles.fiberActions}>
          <button 
            onClick={onFinalizarTrazo} 
            disabled={!hayTrazoActivo}
            style={styles.saveBtn}
          >
            <Save size={16} style={{ marginRight: 5 }} />
            Guardar Tramo
          </button>
          <button onClick={() => setModo('VER')} style={styles.cancelBtn}>
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '120px',
    backdropFilter: 'blur(5px)',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: '1px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  fiberActions: {
    marginTop: '15px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '10px',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '5px'
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    color: '#ef4444',
    border: 'none',
    padding: '5px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Toolbar;