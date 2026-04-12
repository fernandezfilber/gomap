import React, { useState, useEffect } from 'react';
import { 
    ShieldCheck, Map, Zap, Users, CheckCircle2, 
    ChevronRight, Globe, Database, BarChart3, 
    Smartphone, Server, MonitorDot 
} from 'lucide-react';
import fvApi from '../api/fvApi';

const Empresa = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Efecto para el Navbar pegajoso
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [formData, setFormData] = useState({
        nombreEmpresa: '', ruc: '', direccion: '',
        nombreAdmin: '', email: '', password: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fvApi.post('/auth/registro-total', formData);
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => window.location.href = '/login', 3000);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Error al procesar el alta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black italic text-white shadow-lg shadow-blue-600/40">FV</div>
                        <span className="text-xl font-bold tracking-tighter text-white">FiberMap</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-blue-500 transition-colors">Características</a>
                        <a href="#demo" className="hover:text-blue-500 transition-colors">Demo</a>
                        <a href="#pricing" className="hover:text-blue-500 transition-colors">Planes</a>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        Probar Demo
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10 animate-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
                            <Zap size={14}/> NUEVA VERSIÓN 2.0 DISPONIBLE
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                            EL CEREBRO DE TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">ISP</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
                            Deja de usar Excel para tu red. FiberMap te da el control total de cada hilo de fibra, cada poste y cada cliente con precisión de milímetros.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#registro" className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all group">
                                EMPEZAR AHORA <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
                            </a>
                            <div className="flex -space-x-3 items-center">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold">ISP</div>
                                ))}
                                <span className="ml-4 text-xs text-slate-500 font-medium">+50 ISPs confían en nosotros</span>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview con Drop Shadow Neon */}
                    <div className="relative animate-in zoom-in duration-1000">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                                <div className="mx-auto bg-slate-950 px-3 py-1 rounded text-[10px] font-mono text-slate-500">app.fibermap.pro/dashboard</div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1551288049-bbda38a5f850?auto=format&fit=crop&q=80&w=800" alt="Dashboard Demo" className="w-full opacity-80" />
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SECCIÓN ESTADÍSTICAS --- */}
            <section className="py-20 border-y border-slate-900 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { lab: "Latencia Nodo", val: "12ms", ic: <Zap className="text-yellow-500"/> },
                        { lab: "Disponibilidad", val: "99.9%", ic: <Globe className="text-blue-500"/> },
                        { lab: "Postes Mapeados", val: "+25k", ic: <Map className="text-green-500"/> },
                        { lab: "Soporte", val: "24/7", ic: <Users className="text-purple-500"/> }
                    ].map((s, i) => (
                        <div key={i} className="text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex mb-2">{s.ic}</div>
                            <div className="text-3xl font-black text-white">{s.val}</div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{s.lab}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECCIÓN REGISTRO DUAL --- */}
            <section id="registro" className="max-w-6xl mx-auto py-32 px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-6 leading-tight">¿LISTO PARA ESCALAR TU <span className="text-blue-500">ISP</span> AL SIGUIENTE NIVEL?</h2>
                        <ul className="space-y-6">
                            {[
                                { t: "Georeferencia Inteligente", d: "Mapea tus NAP boxes y mufas con GPS de alta precisión.", ic: <Map/> },
                                { t: "Gestión de Hilos de Fibra", d: "Documenta cada fusión y reserva de hilo por color.", ic: <Database/> },
                                { t: "Reportes de Potencia", d: "Analiza la pérdida de dB desde la OLT al abonado.", ic: <BarChart3/> }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        {item.ic}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{item.t}</h4>
                                        <p className="text-slate-400 text-sm">{item.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* FORMULARIO CON DROP SHADOW NEON */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl">
                            {success ? (
                                <div className="text-center py-20">
                                    <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6 animate-bounce"/>
                                    <h3 className="text-3xl font-black text-white mb-2">¡NODO ACTIVADO!</h3>
                                    <p className="text-slate-400">Bienvenido Filber. El sistema FiberMap está listo para tu red.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Empresa ISP</label>
                                            <input name="nombreEmpresa" onChange={handleChange} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all outline-none" placeholder="Nombre de tu ISP"/>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">RUC Fiscal</label>
                                            <input name="ruc" onChange={handleChange} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="20..."/>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Sede Central</label>
                                            <input name="direccion" onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Ciudad"/>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-800 my-2"></div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Email Administrador</label>
                                            <input name="email" type="email" onChange={handleChange} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@isp.com"/>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Contraseña de Acceso</label>
                                            <input name="password" type="password" onChange={handleChange} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••"/>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/40 transition-all transform active:scale-95 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm">
                                        {loading ? 'Sincronizando con el VPS...' : 'DAR DE ALTA MI ISP'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Empresa;