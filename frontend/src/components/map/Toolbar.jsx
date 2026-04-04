import React, { useState } from 'react';
import { 
  MousePointer2, 
  MapPin, 
  GitCommit, 
  Box, 
  Share2, 
  Save, 
  Trash2,
  Layers
} from 'lucide-react';

const Toolbar = ({ modo, setModo, onFinalizarTrazo, hayTrazoActivo, setColorTramo }) => {
  
  // Colores estándar para identificar ramificaciones de splitters
  const coloresFibra = ['#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];
  const [colorActivo, setColorActivo] = useState(coloresFibra[0]);

  const botones = [
    { id: 'VER', icon: <MousePointer2 size={18} />, label: 'Seleccionar', color: '#64748b' },
    { id: 'AGREGAR_POSTE', icon: <MapPin size={18} />, label: 'Nuevo Poste', color: '#ef4444' },
    { id: 'TRAZAR_FIBRA', icon: <Share2 size={18} />, label: 'Trazar Tramo', color: '#8b5cf6' },
  ];

  const handleColorChange = (color) => {
    setColorActivo(color);
    if (setColorTramo) setColorTramo(color); // Pasamos el color al hook useFibra
  };

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

      {/* --- NUEVO: SELECTOR DE COLOR PARA RAMIFICACIÓN --- */}
      {modo === 'TRAZAR_FIBRA' && (
        <div style={styles.section}>
          <p style={styles.subTitle}>COLOR RAMA</p>
          <div style={styles.colorGrid}>
            {coloresFibra.map(c => (
              <div 
                key={c}
                onClick={() => handleColorChange(c)}
                style={{
                  ...styles.colorCircle,
                  backgroundColor: c,
                  border: colorActivo === c ? '2px solid #1e293b' : '1px solid #e2e8f0',
                  transform: colorActivo === c ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Panel de Acciones Finales */}
      {modo === 'TRAZAR_FIBRA' && (
        <div style={styles.fiberActions}>
          <button 
            onClick={onFinalizarTrazo} 
            disabled={!hayTrazoActivo}
            style={styles.saveBtn}
          >
            <Save size={14} style={{ marginRight: 5 }} />
            Guardar
          </button>
          <button onClick={() => setModo('VER')} style={styles.cancelBtn}>
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Botón rápido para capas (Opcional) */}
      <div style={{ marginTop: '10px' }}>
         <button onClick={() => setModo('CAPAS')} style={styles.layersBtn}>
            <Layers size={14} style={{ marginRight: 5 }} /> Capas
         </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute', top: '20px', right: '20px', zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: '15px', borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    width: '110px', backdropFilter: 'blur(8px)',
  },
  title: {
    margin: '0 0 10px 0', fontSize: '9px', fontWeight: 'bold',
    color: '#94a3b8', textAlign: 'center', letterSpacing: '0.5px',
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr', gap: '8px',
  },
  button: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '38px', borderRadius: '10px', cursor: 'pointer',
    transition: 'all 0.2s ease', border: 'none'
  },
  section: {
    marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #f1f5f9'
  },
  subTitle: {
    fontSize: '8px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textAlign: 'center'
  },
  colorGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px'
  },
  colorCircle: {
    width: '18px', height: '18px', borderRadius: '50%', cursor: 'pointer', transition: '0.2s'
  },
  fiberActions: {
    marginTop: '12px', display: 'flex', gap: '4px'
  },
  saveBtn: {
    flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#10b981', color: 'white', border: 'none',
    padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fee2e2', color: '#ef4444', border: 'none',
    padding: '8px', borderRadius: '8px', cursor: 'pointer'
  },
  layersBtn: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #f1f5f9',
    padding: '6px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer'
  }
};

export default Toolbar;