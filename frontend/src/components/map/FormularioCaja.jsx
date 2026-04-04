import React, { useState } from 'react';

const FormularioCaja = ({ posteId, mufasDisponibles, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        mufaId: '',
        puertoMufa: 1,
        puertosTotales: 16
    });

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Configurar Caja NAP</h3>
                <label>Seleccionar Mufa de Origen:</label>
                <select onChange={(e) => setFormData({...formData, mufaId: e.target.value})}>
                    <option value="">-- Seleccione --</option>
                    {mufasDisponibles.map(m => (
                        <option key={m.id} value={m.id}>{m.codigo}</option>
                    ))}
                </select>

                <label>Puerto en Splitter Mufa (1-16):</label>
                <input type="number" min="1" max="16" onChange={(e) => setFormData({...formData, puertoMufa: e.target.value})} />

                <div style={styles.actions}>
                    <button onClick={() => onSave(formData)} style={styles.saveBtn}>Guardar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' },
    saveBtn: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px', borderRadius: '4px' }
};

export default FormularioCaja;