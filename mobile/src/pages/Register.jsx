import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building2, User, ShieldCheck } from 'lucide-react';
import fvApi from '../api/fvApi';
import logoFull from '../assets/logoGOmap.png';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        nombreEmpresa: '',
        ruc: '',
        direccion: '',
        nombreAdmin: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fvApi.post('/auth/registro-total', formData);
            
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2800);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar la empresa");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden font-['Inter']">
            {/* Luces de fondo decorativas sutiles */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF4500]/5 rounded-full blur-[120px]"></div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10">
                    <img src={logoFull} alt="GoMap Logo" className="h-16 w-auto mb-4" />
                    <p className="text-slate-400 text-[10px] font-black tracking-[0.5em] uppercase mt-2">Nueva Terminal de Red</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50">
                    {success ? (
                        <div className="text-center py-16">
                            <ShieldCheck size={60} className="text-[#00E5FF] mx-auto mb-6" />
                            <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tighter">¡Registro Exitoso!</h2>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Empresa creada correctamente.<br />Redirigiendo...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            {/* Datos de la Empresa */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                                    <Building2 size={18} className="text-[#FF4500]" />
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Información Corporativa</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Razón Social</label>
                                        <input
                                            type="text"
                                            name="nombreEmpresa"
                                            value={formData.nombreEmpresa}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                            placeholder="MI ISP FIBER SAC"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">RUC Fiscal</label>
                                        <input
                                            type="text"
                                            name="ruc"
                                            value={formData.ruc}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                            placeholder="20601234567"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sede Central</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                        placeholder="AV. PRINCIPAL 123, LIMA"
                                    />
                                </div>
                            </div>

                            {/* Datos del Administrador */}
                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                                    <User size={18} className="text-[#FF4500]" />
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Credenciales de Acceso</h3>
                                </div>
                                
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Representante Legal</label>
                                        <input
                                            type="text"
                                            name="nombreAdmin"
                                            value={formData.nombreAdmin}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                            placeholder="JUAN PÉREZ"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                            placeholder="ADMIN@TUISP.COM"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Clave de Seguridad</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all placeholder:text-slate-300 text-sm"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00E5FF]"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-900 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-[0.98] disabled:opacity-50 mt-6 shadow-xl shadow-[#00E5FF]/20"
                            >
                                {loading ? "Procesando..." : "Registrar Terminal de Red"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-center mt-10">
                    <Link to="/login" className="text-slate-300 hover:text-[#FF4500] text-[10px] font-black uppercase tracking-[0.3em] transition-colors">
                        ¿Ya tienes cuenta? Ingresar aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
