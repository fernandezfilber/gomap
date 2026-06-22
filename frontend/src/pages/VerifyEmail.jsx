import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Loader2, ArrowRight, KeyRound } from 'lucide-react';
import fvApi from '../api/fvApi';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [manualCode, setManualCode] = useState(['', '', '', '', '', '']);
    const token = searchParams.get('token');

    const verify = async (codeToVerify) => {
        setStatus('loading');
        try {
            const res = await fvApi.get(`/auth/verify-email?code=${codeToVerify}`);
            if (res.data.success) {
                setStatus('success');
            }
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Código inválido o expirado.');
        }
    };

    useEffect(() => {
        if (token) {
            verify(token);
        }
    }, [token]);

    const handleCodeChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...manualCode];
        newCode[index] = value.slice(-1);
        setManualCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`).focus();
        }

        // Auto-verify if complete
        if (newCode.every(digit => digit !== '')) {
            verify(newCode.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !manualCode[index] && index > 0) {
            document.getElementById(`code-${index - 1}`).focus();
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-6 font-['Inter']">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl text-center relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>

                {status === 'success' ? (
                    <div className="flex flex-col items-center py-6">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
                            <ShieldCheck size={40} className="text-emerald-500" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">¡Cuenta Activada!</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">Tu correo ha sido verificado correctamente. Ya puedes acceder a todas las herramientas de GoMap.</p>
                        <Link 
                            to="/login" 
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-blue-600/30"
                        >
                            Ir al Login <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-4">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20">
                            <KeyRound size={32} />
                        </div>
                        
                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Verifica tu Cuenta</h2>
                        <p className="text-slate-400 text-sm mb-8">Ingresa el código de 6 dígitos que enviamos a tu correo.</p>

                        <div className="flex gap-2 mb-8">
                            {manualCode.map((digit, idx) => (
                                <input
                                    key={idx}
                                    id={`code-${idx}`}
                                    type="text"
                                    inputMode="numeric"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className={`w-12 h-14 bg-slate-800 border-2 rounded-xl text-center text-xl font-black text-white focus:outline-none transition-all ${
                                        status === 'error' ? 'border-red-500' : 'focus:border-blue-500 border-slate-700'
                                    }`}
                                    disabled={status === 'loading'}
                                />
                            ))}
                        </div>

                        {status === 'loading' && (
                            <div className="flex items-center gap-2 text-blue-400 font-bold animate-pulse">
                                <Loader2 size={18} className="animate-spin" />
                                Validando código...
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex flex-col items-center">
                                <p className="text-red-400 text-sm mb-4 font-bold flex items-center gap-1">
                                    <ShieldAlert size={16} /> {message}
                                </p>
                                <button 
                                    onClick={() => { setStatus('idle'); setManualCode(['','','','','','']); }}
                                    className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-widest"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        <div className="mt-10 pt-6 border-t border-slate-800 w-full">
                            <p className="text-slate-500 text-xs">
                                ¿No recibiste el código? <br/>
                                <span className="text-slate-400 italic">Revisa tu carpeta de spam o contacta a soporte.</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
