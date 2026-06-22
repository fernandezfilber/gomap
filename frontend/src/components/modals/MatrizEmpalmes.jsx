import React, { useState, useEffect } from 'react';
import { X, Save, GitMerge, AlertCircle } from 'lucide-react';
import fvApi from '../../api/fvApi';

const MatrizEmpalmes = ({ nodoId, tipoNodo, onCancel }) => {
    const [loading, setLoading] = useState(true);
    const [conexiones, setConexiones] = useState([]);
    const [splitters, setSplitters] = useState([]);
    
    // Aquí cargaríamos los Tramos que llegan y salen de este Nodo
    // Por ahora pondremos un estado de ejemplo o vacío para la maqueta
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch de conexiones de este nodo
                const res = await fvApi.get(`/fusiones?nodoId=${nodoId}&tipoNodo=${tipoNodo}`);
                if (res.data.success) {
                    setConexiones(res.data.conexiones);
                    setSplitters(res.data.splitters);
                }
            } catch (error) {
                console.error("Error cargando fusiones", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [nodoId, tipoNodo]);

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500">
                            <GitMerge size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">Matriz de Empalmes</h2>
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Configuración Lógica de Fibra</p>
                        </div>
                    </div>
                    <button onClick={onCancel} className="text-slate-500 hover:text-white bg-slate-800 p-2 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 text-white flex flex-col lg:flex-row gap-6">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <>
                            {/* Panel Izquierdo: Fibras Entrantes */}
                            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4">
                                <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Cables Entrantes (IN)</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-medium">Hilo 1 (Azul) - Troncal Principal</span>
                                        </div>
                                        <span className="text-xs text-slate-500">Sin conexión</span>
                                    </div>
                                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                            <span className="text-sm font-medium">Hilo 2 (Naranja) - Troncal Principal</span>
                                        </div>
                                        <span className="text-xs text-slate-500">Sin conexión</span>
                                    </div>
                                    {/* WIP: Aquí se listarán dinámicamente los hilos */}
                                </div>
                            </div>

                            {/* Panel Central: Splitters */}
                            <div className="w-full lg:w-64 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center">
                                <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Splitters</h3>
                                <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Splitter 1:8</p>
                                    <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                                    <p className="text-[10px] text-slate-400">IN: Libre</p>
                                    <p className="text-[10px] text-slate-400">OUT: 0/8 conectados</p>
                                </div>
                            </div>

                            {/* Panel Derecho: Fibras Salientes */}
                            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4">
                                <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Cables Salientes (OUT)</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-medium">Hilo 1 (Azul) - Tramo 12</span>
                                        </div>
                                        <span className="text-xs text-slate-500">Sin conexión</span>
                                    </div>
                                    {/* WIP */}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-yellow-500">
                        <AlertCircle size={16} />
                        <span className="text-xs font-medium">El gestor visual está en versión Preview.</span>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                        <Save size={18} /> Guardar Empalmes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatrizEmpalmes;
