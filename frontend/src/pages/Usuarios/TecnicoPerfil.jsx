import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fvApi from '../../api/fvApi';
import toast from 'react-hot-toast';
import { User, MapPin, Briefcase, Camera as CameraIcon, CheckCircle, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TecnicoPerfil() {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

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
