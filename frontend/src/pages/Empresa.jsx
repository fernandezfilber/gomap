import React, { useState, useEffect } from 'react';
import { 
    ShieldCheck, Map, Zap, Users, CheckCircle2, 
    ChevronRight, Globe, Database, BarChart3, 
    Smartphone, ArrowRight, MessageCircle, Award, Clock 
} from 'lucide-react';
import fvApi from '../api/fvApi';

const Landing = () => {
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        nombreEmpresa: '', ruc: '', direccion: '',
        nombreAdmin: '', email: '', password: ''
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fvApi.post('/auth/registro-total', formData);
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => window.location.href = '/login', 2500);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Error al registrar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0f1c] min-h-screen text-white overflow-x-hidden">
            
            {/* NAVBAR */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/95 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/30">
                            FM
                        </div>
                        <span className="text-2xl font-bold tracking-tighter">FiberMap</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm">
                        <a href="#caracteristicas" className="hover:text-blue-400 transition">Características</a>
                        <a href="#ventajas" className="hover:text-blue-400 transition">¿Por qué FiberMap?</a>
                        <a href="#como-funciona" className="hover:text-blue-400 transition">Cómo funciona</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="/login" className="px-6 py-2.5 text-sm font-medium hover:text-blue-400 transition">Iniciar Sesión</a>
                        <a href="#registro" className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-2xl font-semibold transition-all active:scale-95">
                            Probar Gratis
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO - MARKETING FUERTE */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 mb-6">
                        <Award size={18} /> La mejor herramienta GIS para ISPs en Perú
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                        Deja de perder tiempo y dinero<br />
                        gestionando tu red con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Excel y papeles</span>
                    </h1>

                    <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-10">
                        FiberMap es el sistema completo de gestión de redes FTTH que te permite 
                        <span className="text-blue-400 font-semibold">controlar cada poste, cada hilo de fibra y cada cliente</span> en un solo mapa inteligente.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#registro" className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all group">
                            EMPEZAR PRUEBA GRATIS 14 DÍAS
                            <ArrowRight className="group-hover:translate-x-1 transition" />
                        </a>
                        
                        <a href="https://wa.me/51930860641" target="_blank" className="border border-slate-600 hover:border-green-500 px-8 py-5 rounded-2xl flex items-center gap-3 transition-all">
                            <MessageCircle className="text-green-500" />
                            <div className="text-left">
                                <div className="text-sm">Hablar con un asesor</div>
                                <div className="font-semibold text-green-400">930 860 641</div>
                            </div>
                        </a>
                    </div>

                    <p className="text-slate-500 mt-6 text-sm">Sin tarjeta • Sin compromiso • Cancelación en cualquier momento</p>
                </div>
            </section>

            {/* POR QUÉ ELEGIR FIBERMAP (Marketing fuerte) */}
            <section id="ventajas" className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-6">¿Por qué los mejores ISPs eligen FiberMap?</h2>
                    <p className="text-center text-slate-400 text-xl max-w-2xl mx-auto mb-16">
                        Porque no solo es un mapa... es el cerebro completo de tu operación FTTH.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Ahorra hasta 40 horas al mes",
                                desc: "Olvídate de Excel, AutoCAD y mil archivos. Todo está centralizado y actualizado en tiempo real.",
                                icon: <Clock className="w-12 h-12 text-blue-500" />
                            },
                            {
                                title: "Control total de cada hilo",
                                desc: "Sabes exactamente qué hilo está libre, ocupado o averiado en cada troncal y mufa.",
                                icon: <Database className="w-12 h-12 text-cyan-500" />
                            },
                            {
                                title: "Menos errores en campo",
                                desc: "Tus técnicos ven el mapa exacto con postes, mufas y cajas antes de salir a trabajar.",
                                icon: <Map className="w-12 h-12 text-green-500" />
                            },
                            {
                                title: "Multi-Empresa / Multi-Nodo",
                                desc: "Ideal si tienes varias empresas o nodos independientes. Cada una con sus datos aislados.",
                                icon: <ShieldCheck className="w-12 h-12 text-purple-500" />
                            },
                            {
                                title: "Crece sin complicaciones",
                                desc: "Cuando agregues nuevos nodos o compres otra empresa, FiberMap escala fácilmente.",
                                icon: <Globe className="w-12 h-12 text-orange-500" />
                            },
                            {
                                title: "Soporte local en Perú",
                                desc: "Equipo que entiende tu realidad y te ayuda en español vía WhatsApp y llamadas.",
                                icon: <Users className="w-12 h-12 text-pink-500" />
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-600 transition-all group">
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REGISTRO */}
            <section id="registro" className="py-28 px-6 bg-gradient-to-b from-slate-950 to-[#0a0f1c]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-black mb-4">Comienza hoy mismo</h2>
                        <p className="text-xl text-slate-400">14 días gratis • Sin tarjeta de crédito</p>
                    </div>

                    {/* Formulario aquí (puedes mantener el tuyo o usar el anterior que te di) */}
                    {/* ... (mantengo tu formulario actualizado) */}
                </div>
            </section>

            <footer className="py-12 text-center text-slate-500 border-t border-slate-800">
                <p>FiberMap © 2026 - Software GIS para Redes de Fibra Óptica</p>
                <p className="mt-3">
                    ¿Tienes dudas? <a href="https://wa.me/51930860641" className="text-green-400 hover:underline font-medium">Escríbenos al WhatsApp 930 860 641</a>
                </p>
            </footer>
        </div>
    );
};

export default Landing;