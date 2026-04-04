import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const ConfirmDelete = ({ isOpen, tipo, nombre, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    // Colores dinámicos según la gravedad (Borrar una Troncal es más crítico que un Poste)
    const esCritico = tipo.toLowerCase() === 'troncal';

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <AlertTriangle color={esCritico ? "#ef4444" : "#f59e0b"} size={32} />
                    <button onClick={onCancel} style={styles.closeBtn}><X size={20} /></button>
                </div>

                <div style={styles.body}>
                    <h2 style={styles.title}>¿Confirmar Eliminación?</h2>
                    <p style={styles.text}>
                        Estás a punto de eliminar {tipo === 'tramos' ? 'el cable' : 'la'} 
                        <strong style={{ color: '#1e293b' }}> {nombre}</strong>.
                    </p>
                    
                    {esCritico && (
                        <div style={styles.warningBox}>
                            ⚠️ <strong>ATENCIÓN:</strong> Al borrar una Troncal se eliminarán todas las 
                            Mufas, Cajas y Clientes asociados a esta ruta.
                        </div>
                    )}

                    <p style={styles.subText}>Esta acción no se puede deshacer.</p>
                </div>

                <div style={styles.footer}>
                    <button onClick={onCancel} style={styles.cancelBtn}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={styles.confirmBtn}>
                        <Trash2 size={16} style={{ marginRight: 8 }} />
                        Eliminar permanentemente
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 3000, backdropFilter: 'blur(4px)'
    },
    modal: {
        backgroundColor: 'white', padding: '24px', borderRadius: '16px',
        width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'
    },
    title: { fontSize: '20px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' },
    text: { color: '#64748b', fontSize: '14px', lineHeight: '1.5' },
    subText: { color: '#94a3b8', fontSize: '12px', marginTop: '10px', fontStyle: 'italic' },
    warningBox: {
        backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#991b1b',
        padding: '12px', borderRadius: '8px', fontSize: '12px', marginTop: '12px'
    },
    footer: {
        display: 'flex', gap: '12px', marginTop: '24px'
    },
    cancelBtn: {
        flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0',
        backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: '600'
    },
    confirmBtn: {
        flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px', borderRadius: '8px', border: 'none',
        backgroundColor: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: '600'
    },
    closeBtn: { background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }
};

export default ConfirmDelete;