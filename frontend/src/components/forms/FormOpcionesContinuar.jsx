import React, { useState } from 'react';
import { X, ArrowRight, GitMerge } from 'lucide-react';
import FormTramo from './FormTramo';

const FormOpcionesContinuar = ({ data, onCancel, onExtender, onPonerMufa }) => {
    // data: { tramoBase, nuevosPuntos, nuevoFin }
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null); // 'extender' | 'mufa'

    if (opcionSeleccionada === 'mufa_pase' || opcionSeleccionada === 'mufa_splitter') {
        // Mostramos el formulario de tramo nuevo, pero con un callback especial
        return <FormTramo 
            data={{ ...data, colorVisual: data.tramoBase.colorVisual, capacidadHilos: data.tramoBase.capacidadHilos }} 
            onCancel={() => setOpcionSeleccionada(null)} 
            onSubmit={(datosNuevoTramo) => onPonerMufa(datosNuevoTramo, opcionSeleccionada)} 
        />;
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-[1003] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-5 bg-slate-950 border-b border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold text-white">Continuar Cableado</h2>
                        <p className="text-xs text-slate-400 mt-1">Cable Base: {data.tramoBase.id}</p>
                    </div>
                    <button onClick={onCancel} className="text-slate-500 hover:text-white bg-slate-800 p-2 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-300 mb-4">Has trazado una continuación desde el poste donde terminaba este cable. ¿Qué deseas hacer?</p>
                    
                    <button onClick={() => onExtender()} className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 transition-all group flex items-start gap-4">
                        <div className="bg-emerald-500/20 text-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                            <ArrowRight size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Extender el mismo cable</h3>
                            <p className="text-xs text-slate-400 mt-1">El trazo se añadirá al cable original. Físicamente seguirá siendo un solo hilo continuo sin empalmes en este punto.</p>
                        </div>
                    </button>

                    <button onClick={() => setOpcionSeleccionada('mufa_pase')} className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 transition-all group flex items-start gap-4">
                        <div className="bg-blue-500/20 text-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                            <GitMerge size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Poner Mufa de Pase</h3>
                            <p className="text-xs text-slate-400 mt-1">Corta el cable y planta una Mufa de Pase (sin splitter). Útil para fusionar hilos 1 a 1 y crear una nueva ramificación.</p>
                        </div>
                    </button>

                    <button onClick={() => setOpcionSeleccionada('mufa_splitter')} className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 transition-all group flex items-start gap-4">
                        <div className="bg-orange-500/20 text-orange-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                            <GitMerge size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Poner Mufa de Splitter</h3>
                            <p className="text-xs text-slate-400 mt-1">Planta una Mufa con un divisor óptico. El nuevo trazo será la fibra de distribución (salida del splitter).</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormOpcionesContinuar;
