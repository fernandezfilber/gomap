import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fvApi from '../../api/fvApi';
import { PenTool, Search, Plus, Trash2, Calendar, MapPin, User, FileText, ArrowLeft, Filter } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const CroquisList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [croquisList, setCroquisList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtros y Ordenamiento
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('fecha'); // 'fecha', 'nombre', 'tecnico'
    
    useEffect(() => {
        fetchCroquis();
    }, []);

    const fetchCroquis = async () => {
        try {
            setLoading(true);
            const res = await fvApi.get(`/croquis`);
            if (res.data.success) {
                setCroquisList(res.data.croquis);
            }
        } catch (error) {
            console.error('Error fetching croquis:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if(!window.confirm("¿Seguro que deseas eliminar este croquis?")) return;
        try {
            await fvApi.delete(`/croquis/${id}`);
            fetchCroquis();
        } catch (error) {
            alert('Error eliminando el croquis');
        }
    };

    const filteredList = croquisList.filter(c => {
        const term = searchQuery.toLowerCase();
        return (
            (c.nombre || '').toLowerCase().includes(term) ||
            (c.destinatario || '').toLowerCase().includes(term) ||
            (c.lugar || '').toLowerCase().includes(term)
        );
    }).sort((a, b) => {
        if (sortBy === 'nombre') return (a.nombre || '').localeCompare(b.nombre || '');
        if (sortBy === 'tecnico') return (a.destinatario || '').localeCompare(b.destinatario || '');
        // default: fecha (más reciente primero)
        return new Date(b.creadoEn) - new Date(a.creadoEn);
    });

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto animate-in fade-in zoom-in duration-300">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-violet-600 font-bold mb-6 transition-colors">
                <ArrowLeft size={20} />
                Volver al Panel Principal
            </button>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
                        <PenTool className="text-violet-600" size={36} />
                        Bloc de Notas Gráfico
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Borradores y planificaciones rápidas de red</p>
                </div>
                
                <button 
                    onClick={() => navigate('/dashboard/croquis/nuevo')}
                    className="w-full md:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
                >
                    <Plus size={24} />
                    Nuevo Croquis
                </button>
            </div>

            <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Buscar por nombre, técnico o lugar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full md:w-auto bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-8 text-slate-700 font-medium focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer appearance-none"
                        >
                            <option value="fecha">Ordenar por Fecha</option>
                            <option value="nombre">Ordenar por Nombre</option>
                            <option value="tecnico">Ordenar por Técnico</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>
                ) : filteredList.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <PenTool className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="text-slate-500 font-medium text-lg">No se encontraron croquis</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredList.map(croquis => (
                            <div 
                                key={croquis.id}
                                onClick={() => navigate(`/dashboard/croquis/${croquis.id}`)}
                                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-violet-300 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl text-slate-800 line-clamp-1">{croquis.nombre}</h3>
                                    {['ADMIN', 'SUPERADMIN'].includes(user?.rol) && (
                                        <button onClick={(e) => handleDelete(e, croquis.id)} className="text-slate-400 hover:text-red-500 p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="space-y-3 text-sm text-slate-600">
                                    {croquis.destinatario && (
                                        <div className="flex items-center gap-2"><User size={16} className="text-violet-500"/> <span>Técnico: <b>{croquis.destinatario}</b></span></div>
                                    )}
                                    {croquis.lugar && (
                                        <div className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500"/> <span className="line-clamp-1">{croquis.lugar}</span></div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-500"/> 
                                        <span>{new Date(croquis.creadoEn).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    
                                    {croquis.creadoPor && (
                                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold flex items-center gap-1 w-fit">
                                                📝 Autor: {croquis.creadoPor.nombre} ({croquis.creadoPor.rol})
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-violet-600">
                                        <span>Abrir Editor</span>
                                        <FileText size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CroquisList;
