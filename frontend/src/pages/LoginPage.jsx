import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, Loader2, Wifi } from 'lucide-react';
import { toast } from 'react-hot-toast';
import fvApi from '../api/fvApi';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Petición al Backend de Filber
            const { data } = await fvApi.post('/auth/login', formData);
            
            // 2. Guardar Token y datos de usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success(`¡Bienvenido, ${data.user.nombre}!`);
            
            // 3. Entrar al Mapa (MainLayout se encargará del resto)
            navigate('/mapa');
        } catch (error) {
            error
            // El errorHandler global ya muestra el mensaje, solo detenemos el loading
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0d1117] px-4">
            <div className="max-w-md w-full bg-[#161b22] p-10 rounded-3xl border border-slate-800 shadow-2xl">
                
                {/* Logo y Título */}
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-900/20">
                        <Wifi className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Forward <span className="text-blue-500">Vision</span></h1>
                    <p className="text-slate-500 text-sm mt-2">Sistema de Gestión de Fibra Óptica</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Correo Electrónico</label>
                        <input 
                            required
                            name="email"
                            type="email" 
                            className="w-full bg-[#0d1117] border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            placeholder="nombre@forward.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Contraseña</label>
                        <input 
                            required
                            name="password"
                            type="password" 
                            className="w-full bg-[#0d1117] border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
                        {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <ShieldCheck size={16} />
                    <span>Acceso restringido para personal autorizado</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;