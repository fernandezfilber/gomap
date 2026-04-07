import { useState } from 'react';

const ModalNuevoProyecto = ({ onSave, onClose }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ nombre }); // Enviamos el nombre al hook
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                <h3 className="text-white font-black uppercase text-sm mb-6 tracking-widest text-center">Registrar Nuevo Sector</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        autoFocus
                        className="w-full bg-slate-800 p-4 rounded-2xl text-white font-bold outline-none border-2 border-transparent focus:border-blue-600 transition-all"
                        placeholder="Nombre del Proyecto..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 text-slate-500 font-bold text-xs uppercase">Cancelar</button>
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg shadow-blue-900/40">Crear Proyecto</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// ✅ Esto permite que el Sidebar pueda "leer" el componente
export default ModalNuevoProyecto;