import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Building2, User, ShieldCheck } from 'lucide-react';
import fvApi from '../api/fvApi';

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
        <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-3xl flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/30">
                        <span className="text-4xl font-black text-white">FM</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">FiberMap</h1>
                    <p className="text-slate-400 mt-1">Registro de Nueva Empresa</p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 md:p-14 shadow-2xl">
                    {success ? (
                        <div className="text-center py-16">
                            <ShieldCheck size={80} className="text-green-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">¡Registro Exitoso!</h2>
                            <p className="text-slate-400 text-lg">Tu empresa ha sido creada correctamente.<br />Redirigiendo al login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Datos de la Empresa */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Building2 size={22} /> Información de la Empresa
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Nombre de la Empresa</label>
                                        <input
                                            type="text"
                                            name="nombreEmpresa"
                                            value={formData.nombreEmpresa}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                            placeholder="Mi ISP Fiber SAC"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">RUC</label>
                                        <input
                                            type="text"
                                            name="ruc"
                                            value={formData.ruc}
                                            onChange={handleChange}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                            placeholder="20601234567"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <label className="block text-sm text-slate-400 mb-2">Dirección / Sede</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                        placeholder="Av. Principal 123, Lima"
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-slate-800 my-4"></div>

                            {/* Datos del Administrador */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <User size={22} /> Administrador Principal
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="nombreAdmin"
                                            value={formData.nombreAdmin}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                            placeholder="Juan Pérez"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                            placeholder="admin@tuisp.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none"
                                                placeholder="Crea una contraseña segura"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-70 mt-6"
                            >
                                {loading ? "Creando cuenta..." : "Crear Mi Empresa en FiberMap"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-center mt-8 text-slate-500">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-500 font-medium">
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;