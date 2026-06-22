import React, { useState } from 'react';
import { ShieldAlert, Phone, Mail, ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import fvApi from '../api/fvApi';
import toast from 'react-hot-toast';
import logoFull from '../assets/logoGOmap.png';

const Blocked = () => {
    const navigate = useNavigate();
    const [paid, setPaid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('NORMAL');

    const motivo = localStorage.getItem('motivoBloqueo') || 'Falta de pago o incumplimiento de términos.';
    const empresaId = localStorage.getItem('empresaIdBloqueada');

    const handleCapture = async (orderID) => {
        setLoading(true);
        try {
            const { data } = await fvApi.post('/payments/capture-order', {
                orderID,
                empresaId
            });

            if (data.success) {
                setPaid(true);
                toast.success("¡Pago recibido! Tu cuenta ha sido reactivada.");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.error("Error capturando pago:", error);
            toast.error("Error al procesar el pago. Contacta a soporte.");
        } finally {
            setLoading(false);
        }
    };

    if (paid) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
                <div className="space-y-6 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">¡Pago Exitoso!</h2>
                    <p className="text-slate-400">Tu cuenta ha sido activada. Redirigiendo al login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-['Inter']">
            {/* Fondo decorativo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-xl w-full relative z-10 text-center">
                <img src={logoFull} alt="GoMap" className="h-16 mx-auto mb-12 opacity-50 grayscale" />
                
                <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/20 p-10 rounded-[3rem] shadow-2xl">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={32} className="text-red-500" />
                    </div>

                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                        Acceso Restringido
                    </h1>
                    
                    <p className="text-slate-400 text-xs mb-8 px-4">
                        Tu acceso ha sido suspendido por: <span className="text-red-400 font-bold italic">"{motivo}"</span>
                    </p>

                    {/* SELECTOR DE PLANES */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button 
                            onClick={() => setSelectedPlan('NORMAL')}
                            className={`p-6 rounded-[2rem] border transition-all ${selectedPlan === 'NORMAL' ? 'bg-white/10 border-[#00E5FF] shadow-lg shadow-[#00E5FF]/10' : 'bg-transparent border-white/5 opacity-50'}`}
                        >
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-2">Plan Normal</p>
                            <p className="text-white font-black text-2xl">S/ 25</p>
                        </button>
                        <button 
                            onClick={() => setSelectedPlan('PREMIUM')}
                            className={`p-6 rounded-[2rem] border transition-all ${selectedPlan === 'PREMIUM' ? 'bg-white/10 border-[#00E5FF] shadow-lg shadow-[#00E5FF]/10' : 'bg-transparent border-white/5 opacity-50'}`}
                        >
                            <p className="text-[8px] font-black uppercase tracking-widest text-amber-500 mb-2">Sin Límites</p>
                            <p className="text-white font-black text-2xl">S/ 35</p>
                        </button>
                    </div>

                    <div className="space-y-6 mb-10">
                        <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                            <p className="text-[10px] font-black text-[#00E5FF] uppercase tracking-[0.3em] mb-6">Pagar con PayPal</p>
                            
                            {/* BOTÓN DE PAYPAL */}
                            <div className="relative z-0">
                                <PayPalButtons 
                                    key={selectedPlan} // Forzamos re-render si cambia el plan
                                    style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                                    createOrder={async () => {
                                        const { data } = await fvApi.post('/payments/create-order', { planId: selectedPlan });
                                        return data.id;
                                    }}
                                    onApprove={async (data) => {
                                        await handleCapture(data.orderID);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Otras Consultas</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <a href="https://wa.me/51930860641" className="flex items-center justify-center gap-3 bg-green-500/5 hover:bg-green-500/10 text-green-500 p-3 rounded-2xl border border-green-500/10 transition-all">
                                <Phone size={14} />
                                <span className="font-black text-[9px] uppercase tracking-widest">Soporte</span>
                            </a>
                            <div className="flex items-center justify-center gap-3 bg-white/5 text-slate-400 p-3 rounded-2xl border border-white/5">
                                <Mail size={14} />
                                <span className="font-black text-[9px] uppercase tracking-widest">Facturación</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest">
                            <ArrowLeft size={12} /> Volver al Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blocked;
