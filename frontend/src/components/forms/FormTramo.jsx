import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const FormTramo = ({ data, onSubmit, onCancel }) => {
    const [nombre, setNombre] = useState(data?.nombre || `Tramo-${Date.now().toString().slice(-4)}`);
    const [capacidadHilos, setCapacidadHilos] = useState(data?.capacidadHilos || 48);
    const [colorVisual, setColorVisual] = useState(data?.colorVisual || '#8b5cf6');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...data,
            nombre,
            capacidadHilos: parseInt(capacidadHilos),
            colorVisual
        });
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 text-white">
            <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1 transition-colors">
                <X size={20} />
            </button>
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse"></div>
                {data?.id ? 'Editar Tramo' : 'Nuevo Tramo de Fibra'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre del Tramo / Cable</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Capacidad (Hilos Totales)</label>
                    <select 
                        value={capacidadHilos} 
                        onChange={(e) => setCapacidadHilos(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                        <option value="6">6 Hilos</option>
                        <option value="8">8 Hilos</option>
                        <option value="12">12 Hilos</option>
                        <option value="24">24 Hilos</option>
                        <option value="48">48 Hilos</option>
                        <option value="96">96 Hilos</option>
                        <option value="144">144 Hilos</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Color Visual en Mapa</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="color" 
                            value={colorVisual} 
                            onChange={(e) => setColorVisual(e.target.value)}
                            className="w-12 h-12 rounded cursor-pointer bg-slate-950 border border-slate-700"
                        />
                        <span className="text-sm font-mono text-slate-300">{colorVisual}</span>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors text-slate-300">
                        Cancelar
                    </button>
                    <button type="submit" className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/20">
                        <Check size={18} /> Confirmar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormTramo;
