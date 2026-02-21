import React, { useState } from 'react';
import { loginUsuario } from "../../api/redApi"; 

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ 
            ...credentials, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await loginUsuario(credentials);
            
            console.log("📥 Respuesta recibida en Login:", data);
            console.log("¿Tiene token?", !!data?.token);

            if (data && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user || data));
                
                console.log("✅ Token guardado correctamente!");
                onLoginSuccess(data.user || data);
            } else {
                console.warn("⚠️ Estructura sin token:", data);
                setError("Error: No se recibió un token válido del servidor.");
            }
        } catch (err) {
            console.error("🚨 Error completo en Login:", err);
            setError(err.response?.data?.message || "Credenciales incorrectas o servidor no responde");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4">
            <div className="w-full max-w-md bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                        Forward Vision 🚀
                    </h1>
                    <p className="text-gray-500 text-[10px] font-mono uppercase mt-2">
                        Lurigancho - Chosica // Acceso de Personal
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-xs text-center animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1 ml-2">Email del Técnico</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="admin@vision.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1 ml-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 mt-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                            loading 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                        }`}
                    >
                        {loading ? 'Verificando...' : 'Entrar al Sistema'}
                    </button>
                </form>

                <footer className="mt-8 text-center">
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest">
                        Red Sincronizada // Nodo Central 2026
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;