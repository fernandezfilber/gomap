import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import fvApi from '../api/fvApi';
import logoFull from '../assets/logoGOmap.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // Modos de vista
    const [forgotMode, setForgotMode] = useState(false);
    const [resetMode, setResetMode] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [resetData, setResetData] = useState({ code: '', newPassword: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleResetChange = (e) => {
        setResetData({ ...resetData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fvApi.post('/auth/login', formData);
            if (res.data.success && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                window.location.href = '/dashboard';
            }
        } catch (err) {
            if (err.response?.status === 403) {
                const msg = err.response.data.message;
                if (msg.includes('bloqueado')) {
                    // Guardamos el motivo y el ID para el pago
                    localStorage.setItem('motivoBloqueo', msg.split(': ')[1] || msg);
                    if (err.response.data.empresaId) {
                        localStorage.setItem('empresaIdBloqueada', err.response.data.empresaId);
                    }
                    navigate('/blocked');
                    return;
                }
                if (msg.includes('verifica')) {
                    setNeedsVerification(true);
                    setError('Tu cuenta no ha sido verificada. Ingresa el código enviado.');
                } else {
                    setError(msg);
                }
            } else {
                setError(err.response?.data?.message || "Credenciales incorrectas");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fvApi.post('/auth/forgot-password', { email: formData.email });
            setForgotMode(false);
            setResetMode(true);
            setError('Código de recuperación enviado a tu correo.');
        } catch (err) {
            setError(err.response?.data?.message || "Error al solicitar código");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fvApi.post('/auth/reset-password', {
                email: formData.email,
                code: resetData.code,
                newPassword: resetData.newPassword
            });
            setResetMode(false);
            setError('¡Contraseña actualizada! Ya puedes entrar.');
        } catch (err) {
            setError(err.response?.data?.message || "Código incorrecto");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fvApi.post('/auth/verify-email', { email: formData.email, token: verificationCode });
            setNeedsVerification(false);
            setError('¡Cuenta verificada! Ya puedes entrar.');
        } catch (err) {
            setError(err.response?.data?.message || "Código inválido");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            await fvApi.post('/auth/resend-code', { email: formData.email });
            setError('Nuevo código enviado.');
        } catch (err) {
            setError('Error al reenviar.');
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        if (forgotMode) return "Recuperar Acceso";
        if (resetMode) return "Nueva Contraseña";
        if (needsVerification) return "Verificar Cuenta";
        return "Acceso Seguro";
    };

    return (
        <div
            className="bg-[#F8FAFC] flex items-start justify-center p-6 relative overflow-y-auto font-['Inter']"
            style={{
                minHeight: '100dvh',
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)',
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
                paddingLeft: 'max(env(safe-area-inset-left, 0px), 24px)',
                paddingRight: 'max(env(safe-area-inset-right, 0px), 24px)',
            }}
        >
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF4500]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                <div className="flex flex-col items-center mb-12">
                    <img src={logoFull} alt="GoMap Logo" className="h-16 w-auto mb-4" />
                    <p className="text-slate-400 text-[10px] font-black tracking-[0.5em] uppercase mt-2">Enterprise Network Manager</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50">
                    <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest text-center">
                        {getTitle()}
                    </h2>

                    {error && (
                        <div className={`border px-4 py-3 rounded-xl mb-6 text-[10px] font-bold uppercase tracking-widest text-center ${
                            error.includes('enviado') || error.includes('actualizada') || error.includes('verificada')
                                ? "bg-green-500/10 border-green-500/20 text-green-500"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}>
                            <span>{error}</span>
                        </div>
                    )}

                    {!needsVerification && !forgotMode && !resetMode && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identificador</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all text-sm"
                                    placeholder="USUARIO@GOMAP.DIGITAL"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clave</label>
                                    <button 
                                        type="button" 
                                        onClick={() => setForgotMode(true)}
                                        className="text-[9px] font-bold text-[#FF4500] uppercase tracking-wider hover:underline"
                                    >
                                        ¿Olvidaste tu clave?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all text-sm"
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-900 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#00E5FF]/20"
                            >
                                {loading ? "Entrando..." : "Entrar al Sistema"}
                            </button>
                        </form>
                    )}

                    {forgotMode && (
                        <form onSubmit={handleForgotPassword} className="space-y-6">
                            <p className="text-[11px] text-slate-500 text-center px-4 mb-4">Ingresa tu correo para enviarte un código de recuperación.</p>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-slate-900 focus:border-[#00E5FF] outline-none transition-all text-sm"
                                    placeholder="USUARIO@GOMAP.DIGITAL"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-[#FF4500] text-white py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                                {loading ? "Enviando..." : "Enviar Código"}
                            </button>
                            <button type="button" onClick={() => setForgotMode(false)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Volver</button>
                        </form>
                    )}

                    {resetMode && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Código de 6 dígitos</label>
                                    <input
                                        type="text"
                                        name="code"
                                        maxLength="6"
                                        value={resetData.code}
                                        onChange={handleResetChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-center text-xl font-bold tracking-widest"
                                        placeholder="000000"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={resetData.newPassword}
                                        onChange={handleResetChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-[#00E5FF] text-slate-900 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                                {loading ? "Guardando..." : "Cambiar Contraseña"}
                            </button>
                        </form>
                    )}

                    {needsVerification && (
                        <form onSubmit={handleVerifyCode} className="space-y-6">
                            <div className="text-center mb-6">
                                <Mail className="mx-auto text-[#00E5FF] mb-2" size={32} />
                                <p className="text-[11px] text-slate-500 font-medium">Código enviado a: <br /><b>{formData.email}</b></p>
                            </div>
                            <input
                                type="text"
                                maxLength="6"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-center text-2xl font-black tracking-[0.5em]"
                                placeholder="000000"
                            />
                            <button type="submit" disabled={loading} className="w-full bg-[#FF4500] text-white py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                                {loading ? "Validando..." : "Verificar Ahora"}
                            </button>
                            <div className="text-center">
                                <button type="button" onClick={handleResendCode} className="text-slate-400 hover:text-[#00E5FF] text-[10px] font-black uppercase tracking-widest">Reenviar código</button>
                            </div>
                        </form>
                    )}

                    <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                        <Link to="/register" className="text-slate-400 hover:text-[#FF4500] text-[10px] font-black uppercase tracking-widest transition-colors">
                            Solicitar Registro
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
