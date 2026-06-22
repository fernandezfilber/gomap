import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, Map, Zap, Globe,
    ShieldCheck, ArrowRight, CheckCircle2,
    Network, Menu, X, PlayCircle,
    Server, Cpu, Layers, HardDrive,
    MessageCircle, HelpCircle, CreditCard
} from 'lucide-react';

// Importando activos oficiales
import iconFibra from '../assets/icons/fibra-optica.png';
import iconEnergia from '../assets/icons/energia.png';
import iconCaja from '../assets/icons/caja-negra.png';
import iconProteccion from '../assets/icons/proteccion.png';
import logoIcon from '../assets/iconoGOmap.png';
import logoFull from '../assets/logoGOmap.png';

const Empresa = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            title: 'Inventario de Red',
            desc: 'Controla cada kilómetro de fibra. Gestiona cables troncales, sangrías y reservas técnicas.',
            icon: iconFibra
        },
        {
            title: 'Eficiencia Energética',
            desc: 'Supervisa el consumo y estado de nodos activos. Optimiza tu infraestructura de energía.',
            icon: iconEnergia
        },
        {
            title: 'Cajas de Dispersión',
            desc: 'Administra cajas NAP, mufas y splitter. Visualiza la ocupación de puertos en tiempo real.',
            icon: iconCaja
        },
        {
            title: 'Seguridad Blindada',
            desc: 'Toda tu información de red encriptada. Solo personal autorizado accede a los planos GIS.',
            icon: iconProteccion
        }
    ];

    const plans = [
        { 
            name: 'Plan Normal', 
            price: 'S/ 25', 
            period: 'mes', 
            features: ['Hasta 5,000 clientes', '5 Proyectos GIS (Sectores)', 'Soporte vía Ticket', 'Acceso App Móvil'] 
        },
        { 
            name: 'Sin Límites', 
            price: 'S/ 35', 
            period: 'mes', 
            features: ['Clientes ilimitados', 'Proyectos GIS Ilimitados', 'Auditoría avanzada', 'Soporte WhatsApp 24/7', 'Capacitación técnica'],
            popular: true 
        },
        { 
            name: 'Corporativo', 
            price: 'Consultar', 
            period: 'anual', 
            features: ['Instalación en Servidor Propio', 'API de Integración OMS', 'Módulo de Facturación', 'Consultoría de Red FTTH'] 
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-700 font-['Inter'] selection:bg-[#00E5FF]/30 selection:text-slate-900">
            
            {/* --- NAVBAR --- */}
            <nav className={`fixed w-full z-[1000] transition-all duration-500 ${
                scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-8'
            }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="group">
                        <img src={logoFull} alt="GoMap" className="h-20 w-auto group-hover:scale-105 transition-transform duration-300" />
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        <a href="#soluciones" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#00E5FF] transition-colors">Soluciones</a>
                        <a href="#precios" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#00E5FF] transition-colors">Precios</a>
                        <a href="#tecnico" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#00E5FF] transition-colors">Arquitectura</a>
                        <Link to="/login" className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase border border-slate-200 transition-all">
                            Acceso
                        </Link>
                        <Link to="/register" className="bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-lg shadow-[#00E5FF]/20 transition-all active:scale-95">
                            Empezar
                        </Link>
                    </div>

                    <button className="lg:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Menú Móvil Desplegable */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                        <a href="#soluciones" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-500">Soluciones</a>
                        <a href="#precios" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-500">Precios</a>
                        <a href="#tecnico" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-500">Arquitectura</a>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <Link to="/login" className="bg-slate-50 text-slate-900 px-6 py-4 rounded-full text-xs font-black uppercase border border-slate-200 text-center">
                            Acceso
                        </Link>
                        <Link to="/register" className="bg-[#00E5FF] text-slate-900 px-6 py-4 rounded-full text-xs font-black uppercase shadow-lg shadow-[#00E5FF]/20 text-center">
                            Empezar
                        </Link>
                    </div>
                )}
            </nav>

            {/* --- HERO --- */}
            <header className="relative pt-48 pb-32 overflow-hidden bg-[#F8FAFC]">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img 
                        src="/hero-network.png" 
                        alt="Hero Network" 
                        className="w-full h-full object-cover grayscale brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
                        <div className="inline-flex items-center gap-2 bg-[#FF4500]/10 border border-[#FF4500]/20 px-4 py-2 rounded-full mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF4500]">Infraestructura Crítica FTTH</span>
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 uppercase">
                            Digitaliza <br/>
                            <span className="text-[#00E5FF]">Tu Universo Óptico.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium">
                            Gestión GIS de alta precisión para ISPs modernos. Control total desde el nodo central hasta la última milla.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/register" className="group bg-[#00E5FF] hover:bg-[#00D4EB] text-slate-900 px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-[#00E5FF]/20 active:scale-95">
                                Empezar Ahora <ChevronRight size={18} />
                            </Link>
                            <a href="https://wa.me/51930860641" className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-slate-200 shadow-sm transition-all">
                                <MessageCircle size={18} className="text-[#FF4500]" /> Contacto Ventas
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SOLUTIONS --- */}
            <section id="soluciones" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, idx) => (
                            <div key={idx} className="group p-10 bg-white border border-slate-100 rounded-3xl hover:border-[#00E5FF]/30 hover:shadow-2xl hover:shadow-[#00E5FF]/10 transition-all duration-500">
                                <div className="mb-8 p-4 bg-slate-50 rounded-2xl inline-block group-hover:scale-110 group-hover:bg-[#00E5FF]/10 transition-all">
                                    <img src={f.icon} alt={f.title} className="w-12 h-12 object-contain" />
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tighter">{f.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ARQUITECTURA --- */}
            <section id="tecnico" className="py-32 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF4500] mb-6">Arquitectura de Red</h2>
                        <h3 className="text-6xl font-black text-slate-900 tracking-tighter mb-12 uppercase leading-[0.9]">Ingeniería de <br/> Precisión GIS.</h3>
                        
                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#00E5FF]/20 text-[#00E5FF]">
                                    <Server size={24} />
                                </div>
                                <div>
                                    <h5 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-2">Motor Backbone GoMap</h5>
                                    <p className="text-slate-500 text-sm font-medium">Base de datos espacial optimizada para cartografía de redes de fibra de alta densidad.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                        <img src={logoFull} alt="GoMap Technical" className="absolute -bottom-10 -right-10 opacity-5 w-64 grayscale" />
                        <h4 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-widest">Stack Tecnológico</h4>
                        <div className="space-y-4">
                            {[
                                { k: 'Backend', v: 'Node.js Enterprise' },
                                { k: 'Cartografía', v: 'Google Maps Premium' },
                                { k: 'Seguridad', v: 'Encriptación AES-256' }
                            ].map((spec, i) => (
                                <div key={i} className="flex justify-between py-4 border-b border-slate-50 text-[10px] font-black uppercase">
                                    <span className="text-slate-400 tracking-widest">{spec.k}</span>
                                    <span className="text-slate-900">{spec.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRECIOS --- */}
            <section id="precios" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((p, idx) => (
                        <div key={idx} className={`p-16 rounded-[2.5rem] border ${p.popular ? 'border-[#00E5FF] bg-white shadow-2xl shadow-[#00E5FF]/10' : 'border-slate-100 bg-white'} relative`}>
                            {p.popular && <span className="absolute top-0 right-10 -translate-y-1/2 bg-[#FF4500] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#FF4500]/20">Recomendado</span>}
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-slate-400">{p.name}</h4>
                            <div className="mb-10">
                                <span className="text-6xl font-black text-slate-900">{p.price}</span>
                                <span className="text-sm font-black uppercase text-slate-400 ml-2">/ {p.period}</span>
                            </div>
                            <ul className="space-y-4 mb-16">
                                {p.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <CheckCircle2 size={16} className="text-[#00E5FF]" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/register" className={`w-full py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${p.popular ? 'bg-[#00E5FF] text-slate-900 hover:bg-[#00D4EB]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                Adquirir Ahora
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
                    <img src={logoIcon} alt="GoMap Icon" className="h-16 w-16 shadow-2xl rounded-2xl" />
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        <a href="#" className="hover:text-[#00E5FF] transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-[#00E5FF] transition-colors">SLA de Red</a>
                        <a href="https://wa.me/51930860641" className="hover:text-[#FF4500] transition-colors">Soporte</a>
                    </div>
                    <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.8em]">
                        GOMAP DIGITAL CORE © 2026
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Empresa;
