import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            // El error ya lo captura el hook y se muestra en la UI abajo
            console.error("Fallo en el Nodo Chosica:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            {/* Tarjeta de Login */}
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl transition-all hover:border-blue-900/50">
                
                {/* Logo y Encabezado */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-900/20">
                        <span className="text-3xl font-black text-white italic">FV</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Forward Vision</h1>
                    <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-semibold">Gestión de Fibra Óptica</p>
                </div>

                {/* Mensaje de Error (Si existe) */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 animate-shake">
                        <span className="text-red-500 text-sm font-medium">⚠️ {error}</span>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Email Corporativo</label>
                        <input 
                            type="email" 
                            autoComplete="email"
                            className="w-full bg-slate-800 border border-slate-700 p-3.5 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="ejemplo@fv.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Contraseña</label>
                        <input 
                            type="password" 
                            autoComplete="current-password"
                            className="w-full bg-slate-800 border border-slate-700 p-3.5 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Verificando...</span>
                            </div>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>

                {/* Footer del Login */}
                <p className="mt-8 text-center text-slate-500 text-xs">
                    &copy; 2026 Forward Vision S.A.C. <br/>
                    Nodo Chosica - Acceso Restringido
                </p>
            </div>
        </div>
    );
};

export default Login;