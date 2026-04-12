import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import fvApi from '../api/fvApi';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
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
            const res = await fvApi.post('/auth/login', formData);
            
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                
                // Redirigir según rol o directamente al dashboard
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.response?.data?.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                {/* Logo y Título */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
                        <span className="text-4xl font-black text-white">FM</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">FiberMap</h1>
                    <p className="text-slate-400 mt-1">Gestión Inteligente de Redes FTTH</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Iniciar Sesión</h2>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="admin@tuisp.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-500 transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? "Iniciando sesión..." : "Ingresar al Sistema"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="text-blue-400 hover:text-blue-500 font-medium">
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Trust signals */}
                <div className="flex justify-center gap-8 mt-10 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Seguridad SSL
                    </div>
                    <div>© 2026 FiberMap</div>
                    <div>Perú</div>
                </div>
            </div>
        </div>
    );
};

export default Login;