import React, { useState } from 'react';

const DetalleEquipo = ({ equipo, tipo, onUpdate, onDelete, onClose }) => {
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({ ...equipo });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onUpdate(tipo, equipo.id, form);
        setEditando(false);
    };

    return (
        <div style={styles.modal}>
            <h3>Detalles de {tipo.toUpperCase()}</h3>
            <button onClick={onClose} style={styles.closeBtn}>X</button>
            
            <div style={styles.content}>
                <label>Código:</label>
                <input 
                    name="codigo" 
                    value={form.codigo} 
                    onChange={handleChange} 
                    disabled={!editando} 
                />

                <label>Observaciones:</label>
                <textarea 
                    name="observaciones" 
                    value={form.observaciones || ''} 
                    onChange={handleChange} 
                    disabled={!editando} 
                />

                <div style={styles.actions}>
                    {!editando ? (
                        <>
                            <button onClick={() => setEditando(true)} style={styles.editBtn}>Editar</button>
                            <button onClick={() => onDelete(tipo, equipo.id)} style={styles.deleteBtn}>Eliminar</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSave} style={styles.saveBtn}>Guardar</button>
                            <button onClick={() => setEditando(false)}>Cancelar</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    modal: { position: 'absolute', bottom: '20px', left: '20px', zIndex: 2000, backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.2)', width: '300px' },
    content: { display: 'flex', flexDirection: 'column', gap: '10px' },
    actions: { marginTop: '15px', display: 'flex', gap: '10px' },
    deleteBtn: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', cursor: 'pointer' },
    editBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' },
    saveBtn: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' },
    closeBtn: { position: 'absolute', top: '10px', right: '10px', border: 'none', cursor: 'pointer' }
};

export default DetalleEquipo;