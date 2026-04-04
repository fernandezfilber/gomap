import React, { useState } from 'react';
import { 
  X, MapPin, Box, GitCommit, Plus, Trash2, 
  Scissors, Info, Settings, Database 
} from 'lucide-react';

const DetalleEquipo = ({ equipo, tipo, onUpdate, onDelete, onClose, ejecutarAccion }) => {
  const [tab, setTab] = useState('INFO');

  // Identificamos si el elemento seleccionado es un poste (contenedor principal)
  const esPoste = tipo === 'postes';

  // --- MANEJADORES DE ACCIONES ---
  const handleAddMufa = () => {
    const ratio = prompt("Ratio de Splitteo (ej: 1:8, 1:16):", "1:16");
    if (ratio) ejecutarAccion('AGREGAR_MUFA', { posteId: equipo.id, ratioSplitteo: ratio });
  };

  const handleAddCaja = () => {
    const nombre = prompt("Nombre o Código de la Caja NAP:");
    if (nombre) ejecutarAccion('AGREGAR_CAJA', { posteId: equipo.id, nombre });
  };

  const handleSplitHilos = (mufaId) => {
    const hilo = prompt("Número de hilo de la TRONCAL a dividir (1-48):");
    if (hilo) {
      ejecutarAccion('SPLITTEAR_HILO', { 
        mufaId, 
        hiloEntrada: parseInt(hilo), 
        ratio: "1:16" // Valor por defecto o del objeto mufa
      });
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        {/* CABECERA */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={styles.iconBadge}>
              {esPoste ? <MapPin size={20} color="#ef4444" /> : <Database size={20} color="#3b82f6" />}
            </div>
            <div>
              <h2 style={styles.title}>{esPoste ? `Poste: ${equipo.codigo}` : 'Detalle de Red'}</h2>
              <span style={styles.status}>Nodo Chosica - Activo</span>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn}><X size={20} /></button>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div style={styles.tabContainer}>
          <button onClick={() => setTab('INFO')} style={tab === 'INFO' ? styles.tabActive : styles.tab}>
            <Info size={14} /> Información
          </button>
          {esPoste && (
            <button onClick={() => setTab('EQUIPOS')} style={tab === 'EQUIPOS' ? styles.tabActive : styles.tab}>
              <Settings size={14} /> Gestión de Equipos
            </button>
          )}
        </div>

        {/* CUERPO DEL MODAL */}
        <div style={styles.body}>
          {tab === 'INFO' ? (
            <div style={styles.infoContent}>
              <div style={styles.infoRow}>
                <span>Coordenadas:</span>
                <strong>{equipo.latitud.toFixed(6)}, {equipo.longitud.toFixed(6)}</strong>
              </div>
              <div style={styles.infoRow}>
                <span>Tipo de Estructura:</span>
                <strong>{equipo.tipo || 'CONCRETO'}</strong>
              </div>
              <div style={styles.dangerZone}>
                <button onClick={onDelete} style={styles.deleteFullBtn}>
                  <Trash2 size={16} /> Eliminar del Mapa
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.equiposContent}>
              <div style={styles.actionHeader}>
                <h3 style={styles.subTitle}>Hardware Instalado</h3>
                <div style={styles.actionButtons}>
                  <button onClick={handleAddMufa} style={styles.addBtnMufa}><Plus size={14}/> Mufa</button>
                  <button onClick={handleAddCaja} style={styles.addBtnCaja}><Plus size={14}/> Caja</button>
                </div>
              </div>

              {/* LISTADO DE EQUIPOS DINÁMICO */}
              <div style={styles.scrollList}>
                {/* Render de Mufas */}
                {equipo.mufas?.map(m => (
                  <div key={m.id} style={styles.card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <GitCommit color="#f59e0b" size={18} />
                      <div>
                        <p style={styles.cardTitle}>Mufa de Distribución</p>
                        <p style={styles.cardSub}>Ratio: {m.ratioSplitteo}</p>
                      </div>
                    </div>
                    <div style={styles.cardTools}>
                      <button onClick={() => handleSplitHilos(m.id)} style={styles.toolBtn} title="Dividir Hilos">
                        <Scissors size={14} />
                      </button>
                      <button onClick={() => ejecutarAccion('ELIMINAR_MUFA', m.id)} style={styles.toolBtnDel}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Render de Cajas NAP */}
                {equipo.cajas?.map(c => (
                  <div key={c.id} style={styles.card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box color="#3b82f6" size={18} />
                      <div>
                        <p style={styles.cardTitle}>Caja NAP: {c.nombre}</p>
                        <p style={styles.cardSub}>Clientes: {c._count?.clientes || 0} / 16</p>
                      </div>
                    </div>
                    <button onClick={() => ejecutarAccion('ELIMINAR_CAJA', c.id)} style={styles.toolBtnDel}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                {(!equipo.mufas?.length && !equipo.cajas?.length) && (
                  <p style={styles.emptyMsg}>No hay equipos registrados en este poste.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS PROFESIONALES (TIPO DASHBOARD DARK) ---
const styles = {
  overlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' },
  modal: { backgroundColor: '#161b22', width: '420px', borderRadius: '24px', border: '1px solid #30363d', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  header: { padding: '20px', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  iconBadge: { backgroundColor: '#0d1117', padding: '10px', borderRadius: '12px', border: '1px solid #30363d' },
  title: { color: 'white', fontSize: '18px', margin: 0, fontWeight: '800' },
  status: { color: '#238636', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' },
  closeBtn: { background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' },
  tabContainer: { display: 'flex', padding: '0 20px', gap: '20px', borderBottom: '1px solid #30363d' },
  tab: { background: 'none', border: 'none', color: '#8b949e', padding: '12px 0', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' },
  tabActive: { background: 'none', border: 'none', color: '#58a6ff', padding: '12px 0', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', borderBottom: '2px solid #58a6ff', display: 'flex', alignItems: 'center', gap: '6px' },
  body: { padding: '20px', minHeight: '250px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#c9d1d9' },
  dangerZone: { marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed #30363d' },
  deleteFullBtn: { width: '100%', backgroundColor: '#442726', color: '#f85149', border: '1px solid #f8514933', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  actionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  subTitle: { fontSize: '14px', color: '#8b949e', margin: 0 },
  actionButtons: { display: 'flex', gap: '8px' },
  addBtnMufa: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  addBtnCaja: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  scrollList: { maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' },
  card: { backgroundColor: '#0d1117', padding: '12px', borderRadius: '16px', border: '1px solid #30363d', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#f0f6fc' },
  cardSub: { margin: 0, fontSize: '11px', color: '#8b949e' },
  cardTools: { display: 'flex', gap: '6px' },
  toolBtn: { backgroundColor: '#30363d', border: 'none', color: '#58a6ff', padding: '6px', borderRadius: '8px', cursor: 'pointer' },
  toolBtnDel: { backgroundColor: '#30363d', border: 'none', color: '#f85149', padding: '6px', borderRadius: '8px', cursor: 'pointer' },
  emptyMsg: { textAlign: 'center', color: '#484f58', fontSize: '13px', marginTop: '40px' }
};

export default DetalleEquipo;