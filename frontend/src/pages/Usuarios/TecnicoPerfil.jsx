import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fvApi from '../../api/fvApi';
import toast from 'react-hot-toast';
import { User, MapPin, Briefcase, Camera as CameraIcon, CheckCircle, Package } from 'lucide-react';

export default function TecnicoPerfil() {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const [filtroMateriales, setFiltroMateriales] = useState('TODO');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const isOwnProfile = !id || id === currentUser?.id;
    const targetId = id || currentUser?.id;

    useEffect(() => {
        fetchPerfil();
    }, [targetId]);

    const fetchPerfil = async () => {
        try {
            setLoading(true);
            const res = await fvApi.get(`/auth/perfil/${targetId}`);
            if (res.data.success) {
                setPerfil(res.data.perfil);
            }
        } catch (error) {
            console.error('Error fetching perfil', error);
            toast.error('No se pudo cargar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = reader.result;
            try {
                toast.loading('Actualizando foto...', { id: 'foto' });
                await fvApi.post('/auth/perfil/foto', { fotoBase64: base64 });
                setPerfil({ ...perfil, fotoPerfil: base64 });
                toast.success('Foto actualizada', { id: 'foto' });
            } catch (err) {
                toast.error('Error al actualizar foto', { id: 'foto' });
            }
        };
    };

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
    if (!perfil) return <div className="p-8 text-center text-gray-500">Perfil no encontrado.</div>;

    const getMaterialesFiltrados = () => {
        if (!perfil?.historial?.materiales) return [];
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
        
        const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        
        return perfil.historial.materiales.filter(mov => {
            const fecha = new Date(mov.fecha);
            if (filtroMateriales === 'HOY') {
                return fecha >= hoy;
            } else if (filtroMateriales === 'ESTE_MES') {
                return fecha >= primerDiaMes;
            } else if (filtroMateriales === 'CUSTOM') {
                const inicio = fechaInicio ? new Date(fechaInicio) : null;
                const fin = fechaFin ? new Date(fechaFin) : null;
                if (fin) fin.setHours(23, 59, 59, 999);
                
                if (inicio && fin) return fecha >= inicio && fecha <= fin;
                if (inicio) return fecha >= inicio;
                if (fin) return fecha <= fin;
                return true;
            }
            return true;
        });
    };

    const materialesFiltrados = getMaterialesFiltrados();
    
    const resumenMateriales = materialesFiltrados.reduce((acc, mov) => {
        const key = mov.item.nombre || mov.item.tipo;
        if (!acc[key]) {
            acc[key] = { cantidad: 0, unidad: mov.item.unidadMedida };
        }
        acc[key].cantidad += mov.cantidad;
        return acc;
    }, {});

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <button onClick={() => navigate(-1)} className="text-indigo-600 font-bold hover:underline">← Volver</button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center">
                        {perfil.fotoPerfil ? (
                            <img src={perfil.fotoPerfil} alt={perfil.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <User size={64} className="text-slate-300" />
                        )}
                    </div>
                    {isOwnProfile && (
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                        >
                            <CameraIcon size={16} />
                        </button>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-black text-slate-800">{perfil.nombre}</h1>
                    <p className="text-slate-500 font-medium mb-4">{perfil.email}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">{perfil.rol}</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                            Registrado: {new Date(perfil.fechaRegistro).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Resumen de Materiales */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Package className="text-indigo-500" /> Resumen de Materiales
                    </h2>
                    <div className="flex flex-wrap gap-2 items-center">
                        <select 
                            value={filtroMateriales} 
                            onChange={(e) => setFiltroMateriales(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="TODO">Historial Completo</option>
                            <option value="HOY">El Día de Hoy</option>
                            <option value="ESTE_MES">Este Mes</option>
                            <option value="CUSTOM">Rango de Fechas</option>
                        </select>
                        {filtroMateriales === 'CUSTOM' && (
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="date" 
                                    value={fechaInicio} 
                                    onChange={(e) => setFechaInicio(e.target.value)} 
                                    className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700"
                                />
                                <span className="text-slate-400">-</span>
                                <input 
                                    type="date" 
                                    value={fechaFin} 
                                    onChange={(e) => setFechaFin(e.target.value)} 
                                    className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {Object.keys(resumenMateriales).length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">No hay materiales registrados para este periodo.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(resumenMateriales).map(([nombre, { cantidad, unidad }]) => (
                            <div key={nombre} className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex flex-col justify-between items-center text-center">
                                <span className="text-sm font-semibold text-slate-600 mb-2">{nombre}</span>
                                <div className="text-3xl font-black text-indigo-600 mb-1">{cantidad}</div>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">{unidad || 'Unidades'}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Averias Resueltas */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 border-b pb-2">
                        <CheckCircle className="text-emerald-500" /> Tickets Resueltos
                    </h2>
                    {perfil.historial.tickets.length === 0 ? (
                        <p className="text-slate-500 text-sm">No hay tickets resueltos.</p>
                    ) : (
                        <div className="space-y-3 h-80 overflow-y-auto pr-2">
                            {perfil.historial.tickets.map(ticket => (
                                <div key={ticket.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <div className="flex justify-between items-start">
                                        <div className="font-bold text-slate-700">{ticket.tipo}</div>
                                        <div className="text-xs text-slate-400">{new Date(ticket.resueltoEn).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-sm text-slate-600 mt-1">{ticket.cliente?.nombre || 'Sin Cliente'}</div>
                                    <div className="text-xs text-emerald-600 font-semibold mt-1">Ticket #{ticket.codigo}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Materiales Consumidos */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 border-b pb-2">
                        <Package className="text-blue-500" /> Materiales Usados
                    </h2>
                    {perfil.historial.materiales.length === 0 ? (
                        <p className="text-slate-500 text-sm">No hay materiales registrados.</p>
                    ) : (
                        <div className="space-y-3 h-80 overflow-y-auto pr-2">
                            {perfil.historial.materiales.map(mov => (
                                <div key={mov.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-700">{mov.item.nombre}</div>
                                        <div className="text-xs text-slate-500">Cliente: {mov.cliente?.nombre || 'N/A'}</div>
                                        <div className="text-xs text-blue-600 font-semibold mt-1">{mov.motivo}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-slate-800 text-lg">x{mov.cantidad}</div>
                                        <div className="text-[10px] text-slate-400 uppercase">{mov.item.unidadMedida}</div>
                                        <div className="text-[10px] text-slate-400 mt-1">{new Date(mov.fecha).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
