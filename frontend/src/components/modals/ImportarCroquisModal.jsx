import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { X, UploadCloud, Map } from 'lucide-react';
import fvApi from '../../api/fvApi';
import { useNavigate } from 'react-router-dom';

const ImportarCroquisModal = ({ isOpen, onClose, croquisId, croquisData }) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetchProyectos();
        }
    }, [isOpen]);

    const fetchProyectos = async () => {
        try {
            const { data } = await fvApi.get('/proyectos');
            if (data.success) {
                setProyectos(data.proyectos || []);
            }
        } catch (error) {
            console.error('Error fetching proyectos:', error);
            toast.error('Error al cargar proyectos');
        }
    };

    const handleImportar = async () => {
        if (!proyectoSeleccionado) {
            toast.error('Selecciona un proyecto destino');
            return;
        }

        if (!window.confirm('¿Estás seguro de importar los datos de este croquis al proyecto seleccionado? Se crearán postes virtuales, cajas, mufas y tramos de forma permanente en el mapa.')) {
            return;
        }

        setLoading(true);
        try {
            const { data } = await fvApi.post(`/croquis/${croquisId}/importar`, {
                proyectoId: proyectoSeleccionado
            });

            if (data.success) {
                toast.success(data.message || 'Importación exitosa');
                onClose();
                // Navegar al mapa principal y seleccionar el proyecto
                navigate('/dashboard/mapa', { state: { proyectoId: proyectoSeleccionado } });
            }
        } catch (error) {
            console.error('Error importando croquis:', error);
            toast.error(error.response?.data?.message || 'Error al importar croquis');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const numCajas = (croquisData?.nodos || []).filter(n => n.type === 'caja').length;
    const numMufas = (croquisData?.nodos || []).filter(n => n.type === 'mufa').length;
    const numTramos = (croquisData?.tramos || []).length;

    return (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UploadCloud size={24} />
                        Importar al Mapa Principal
                    </h2>
                    <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6">
                    <p className="text-slate-600 mb-6 text-sm">
                        Selecciona el proyecto donde deseas importar los elementos dibujados en este croquis.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-2">
                        <h3 className="font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">Resumen de Importación</h3>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Cajas a crear:</span>
                            <span className="font-bold text-emerald-600">{numCajas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Mufas a crear:</span>
                            <span className="font-bold text-orange-600">{numMufas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Tramos a crear:</span>
                            <span className="font-bold text-indigo-600">{numTramos}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Proyecto Destino</label>
                            <div className="relative">
                                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-violet-500 outline-none appearance-none"
                                    value={proyectoSeleccionado}
                                    onChange={(e) => setProyectoSeleccionado(e.target.value)}
                                >
                                    <option value="">-- Seleccionar Proyecto --</option>
                                    {proyectos.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={handleImportar}
                            disabled={loading || !proyectoSeleccionado}
                            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Importando...
                                </>
                            ) : (
                                <>
                                    <UploadCloud size={20} />
                                    Confirmar Importación
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportarCroquisModal;
