import React, { useEffect, useState } from 'react';
import { Users, Building2, ShieldAlert, ShieldCheck, Trash2, Calendar, Phone, Search } from 'lucide-react';
import fvApi from '../api/fvApi';

const AdminPanel = () => {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    const cargarEmpresas = async () => {
        try {
            const res = await fvApi.get('/admin/empresas');
            setEmpresas(res.data.empresas);
        } catch (error) {
            console.error("Error cargando empresas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEmpresas();
    }, []);

    const handleBloqueo = async (id, estadoActual) => {
        const motivo = !estadoActual ? prompt("Motivo del bloqueo:", "Incumplimiento de pago") : null;
        if (!estadoActual && !motivo) return;

        try {
            await fvApi.patch(`/admin/empresas/${id}/bloqueo`, { 
                bloqueado: !estadoActual,
                motivoBloqueo: motivo
            });
            cargarEmpresas();
        } catch (error) {
            alert("Error al cambiar estado");
        }
    };

    const handleSuscripcion = async (id, planActual) => {
        const nuevoPlan = planActual === 'MENSUAL' ? 'ANUAL' : 'MENSUAL';
        const confirmar = window.confirm(`¿Cambiar plan a ${nuevoPlan}?`);
        if (!confirmar) return;

        try {
            await fvApi.patch(`/admin/empresas/${id}/suscripcion`, { 
                plan: nuevoPlan,
                finSuscripcion: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // 1 año por defecto para simplificar
            });
            cargarEmpresas();
        } catch (error) {
            alert("Error al actualizar suscripción");
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿ELIMINAR DEFINITIVAMENTE ESTA EMPRESA? Esta acción no se puede deshacer.")) return;
        try {
            await fvApi.delete(`/admin/empresas/${id}`);
            cargarEmpresas();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const filtradas = empresas.filter(e => 
        e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        e.ruc?.includes(busqueda)
    );

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">Panel Maestro <span className="text-blue-500">GoMap</span></h1>
                        <p className="text-slate-400">Control total de empresas, suscripciones y accesos.</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            type="text"
                            placeholder="Buscar por nombre o RUC..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-6 py-4 w-full md:w-80 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500 animate-pulse">Cargando base de datos central...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filtradas.map(empresa => (
                            <div key={empresa.id} className={`bg-slate-900 border ${empresa.bloqueado ? 'border-red-500/30' : 'border-slate-800'} rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all hover:border-slate-700`}>
                                <div className="flex items-start gap-5">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${empresa.bloqueado ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        <Building2 size={32} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-bold truncate">{empresa.nombre}</h2>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${empresa.plan === 'ANUAL' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                {empresa.plan}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-400">
                                            <span className="flex items-center gap-1.5"><Users size={16} /> {empresa._count?.usuarios || 0} Usuarios</span>
                                            <span className="flex items-center gap-1.5 font-mono">RUC: {empresa.ruc || 'N/A'}</span>
                                            <span className="flex items-center gap-1.5"><Calendar size={16} /> {new Date(empresa.creadoEn).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button 
                                        onClick={() => handleSuscripcion(empresa.id, empresa.plan)}
                                        className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        Cambiar Plan
                                    </button>

                                    <button 
                                        onClick={() => handleBloqueo(empresa.id, empresa.bloqueado)}
                                        className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
                                            empresa.bloqueado 
                                                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30' 
                                                : 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-600 hover:text-white'
                                        }`}
                                    >
                                        {empresa.bloqueado ? <ShieldAlert size={16}/> : <ShieldCheck size={16}/>}
                                        {empresa.bloqueado ? 'Desbloquear' : 'Bloquear'}
                                    </button>

                                    <button 
                                        onClick={() => handleEliminar(empresa.id)}
                                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filtradas.length === 0 && (
                            <div className="text-center py-20 bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-800">
                                <p className="text-slate-500">No se encontraron empresas con esos criterios.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Soporte Directo */}
            <div className="fixed bottom-10 right-10 flex items-center gap-4 bg-blue-600 px-6 py-4 rounded-full shadow-2xl animate-bounce">
                <Phone size={20} />
                <span className="font-black">Soporte: 930860641</span>
            </div>
        </div>
    );
};

export default AdminPanel;
