import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // Para navegar entre login y registro

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(nombre, email, password);
        } catch (err) {
            console.error("Fallo al registrar técnico:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl transition-all hover:border-blue-900/50">
                
                {/* Logo y Encabezado */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-900/20">
                        <span className="text-2xl font-black text-white italic">FV</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Alta de Personal</h1>
                    <p className="text-slate-400 mt-1 text-xs uppercase tracking-widest font-semibold">Nodo Chosica - Registro</p>
                </div>

                {/* Mensaje de Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 animate-shake">
                        <span className="text-red-500 text-sm font-medium">⚠️ {error}</span>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Nombre Completo</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800 border border-slate-700 p-3.5 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Ingeniero / Técnico"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Email Corporativo</label>
                        <input 
                            type="email" 
                            className="w-full bg-slate-800 border border-slate-700 p-3.5 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                            className="w-full bg-slate-800 border border-slate-700 p-3.5 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : 'Crear Cuenta'}
                    </button>
                </form>

                {/* Switch a Login */}
                <p className="mt-6 text-center text-slate-400 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-500 font-bold hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;