import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';
import fvApi from '../api/fvApi';
import { TrendingUp, Users, MapPin, Zap, Box, Layers, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#00E5FF', '#FF4500', '#a78bfa', '#34d399', '#f59e0b'];

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${color}20` }}>
            <Icon size={20} style={{ color }} />
        </div>
        <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
            <p className="text-2xl font-black text-white leading-none">{value}</p>
        </div>
    </div>
);

const Estadisticas = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalPostes: 0,
        totalTramos: 0,
        totalClientes: 0,
        totalMufas: 0,
        totalCajas: 0,
        totalTroncales: 0,
        clientesPorMes: [],
        postesPorTipo: [],
        tramosPorEstado: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postesRes, tramosRes, clientesRes, mufasRes, cajasRes, troncalesRes] = await Promise.all([
                    fvApi.get('/postes'),
                    fvApi.get('/tramos'),
                    fvApi.get('/clientes'),
                    fvApi.get('/mufas'),
                    fvApi.get('/cajas'),
                    fvApi.get('/troncales')
                ]);

                const postes = postesRes.data?.postes || postesRes.data || [];
                const tramos = tramosRes.data?.tramos || tramosRes.data || [];
                const clientes = clientesRes.data?.clientes || clientesRes.data || [];
                const mufas = mufasRes.data?.mufas || mufasRes.data || [];
                const cajas = cajasRes.data?.cajas || cajasRes.data || [];
                const troncales = troncalesRes.data?.troncales || troncalesRes.data || [];

                const postesPorTipo = Array.isArray(postes) ? postes.reduce((acc, p) => {
                    const tipo = p.tipo || 'Otro';
                    acc[tipo] = (acc[tipo] || 0) + 1;
                    return acc;
                }, {}) : {};

                const tramosPorEstado = Array.isArray(tramos) ? tramos.reduce((acc, t) => {
                    const estado = t.estado || 'Activo';
                    acc[estado] = (acc[estado] || 0) + 1;
                    return acc;
                }, {}) : {};

                const clientesPorMes = Array.isArray(clientes) ? clientes.reduce((acc, c) => {
                    const mes = new Date(c.creadoEn || c.createdAt).getMonth();
                    acc[mes] = (acc[mes] || 0) + 1;
                    return acc;
                }, Array(12).fill(0)) : Array(12).fill(0);

                setStats({
                    totalPostes: Array.isArray(postes) ? postes.length : 0,
                    totalTramos: Array.isArray(tramos) ? tramos.length : 0,
                    totalClientes: Array.isArray(clientes) ? clientes.length : 0,
                    totalMufas: Array.isArray(mufas) ? mufas.length : 0,
                    totalCajas: Array.isArray(cajas) ? cajas.length : 0,
                    totalTroncales: Array.isArray(troncales) ? troncales.length : 0,
                    clientesPorMes: clientesPorMes.map((count, i) => ({
                        mes: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i],
                        clientes: count
                    })),
                    postesPorTipo: Object.entries(postesPorTipo).map(([tipo, count]) => ({ tipo, count })),
                    tramosPorEstado: Object.entries(tramosPorEstado).map(([estado, count]) => ({ estado, count }))
                });
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div
            className="bg-slate-900 text-white overflow-y-auto"
            style={{
                height: '100dvh',
                paddingTop: 'env(safe-area-inset-top, 0px)',
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3 z-10">
                <button
                    id="btn-volver-estadisticas"
                    onClick={() => navigate('/dashboard')}
                    className="w-10 h-10 flex items-center justify-center bg-slate-800/60 rounded-xl border border-white/5 text-slate-400 active:text-white"
                    style={{ minHeight: 'unset' }}
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-base font-black uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#00E5FF]" />
                        Inteligencia
                    </h1>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Red activa · Estadísticas</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin" />
                </div>
            ) : (
                <div className="px-4 py-6 space-y-6">

                    {/* ===== KPI CARDS ===== */}
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">Resumen de Red</p>
                        <div className="grid grid-cols-2 gap-3">
                            <StatCard icon={MapPin} label="Postes" value={stats.totalPostes} color="#34d399" />
                            <StatCard icon={Zap} label="Tramos" value={stats.totalTramos} color="#f59e0b" />
                            <StatCard icon={Users} label="Clientes" value={stats.totalClientes} color="#00E5FF" />
                            <StatCard icon={Box} label="Mufas" value={stats.totalMufas} color="#a78bfa" />
                            <StatCard icon={Box} label="Cajas NAP" value={stats.totalCajas} color="#FF4500" />
                            <StatCard icon={Layers} label="Troncales" value={stats.totalTroncales} color="#00E5FF" />
                        </div>
                    </div>

                    {/* Resumen total */}
                    <div className="bg-slate-800/60 border border-[#00E5FF]/20 rounded-2xl p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Totales</p>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs font-bold text-slate-400">Elementos en Red</span>
                                <span className="font-black text-[#00E5FF]">
                                    {stats.totalPostes + stats.totalTramos + stats.totalMufas + stats.totalCajas + stats.totalTroncales}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs font-bold text-slate-400">Clientes Activos</span>
                                <span className="font-black text-[#34d399]">{stats.totalClientes}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs font-bold text-slate-400">Cobertura Est.</span>
                                <span className="font-black text-[#f59e0b]">{Math.round(stats.totalTramos * 0.5)} km</span>
                            </div>
                        </div>
                    </div>

                    {/* ===== GRÁFICO: Clientes por mes ===== */}
                    {stats.clientesPorMes.some(d => d.clientes > 0) && (
                        <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                                Clientes por Mes
                            </p>
                            {/* ResponsiveContainer hace el gráfico 100% ancho */}
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={stats.clientesPorMes} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="mes"
                                        stroke="#475569"
                                        tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        tick={{ fontSize: 10, fill: '#64748b' }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                                    />
                                    <Line type="monotone" dataKey="clientes" stroke="#00E5FF" strokeWidth={2.5} dot={{ r: 4, fill: '#00E5FF' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* ===== GRÁFICO: Postes por tipo ===== */}
                    {stats.postesPorTipo.length > 0 && (
                        <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                                Postes por Tipo
                            </p>
                            <div className="flex items-center gap-4">
                                <div style={{ flex: '0 0 160px' }}>
                                    <PieChart width={160} height={160}>
                                        <Pie
                                            data={stats.postesPorTipo}
                                            cx={75}
                                            cy={75}
                                            innerRadius={45}
                                            outerRadius={70}
                                            paddingAngle={3}
                                            dataKey="count"
                                        >
                                            {stats.postesPorTipo.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 12, fontSize: 12 }}
                                        />
                                    </PieChart>
                                </div>
                                {/* Leyenda vertical */}
                                <div className="flex-1 space-y-2">
                                    {stats.postesPorTipo.map((entry, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-[10px] font-bold text-slate-400 truncate">{entry.tipo}</span>
                                            <span className="text-[10px] font-black text-white ml-auto">{entry.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== GRÁFICO: Tramos por estado ===== */}
                    {stats.tramosPorEstado.length > 0 && (
                        <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                                Estado de Tramos
                            </p>
                            <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={stats.tramosPorEstado} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="estado"
                                        stroke="#475569"
                                        tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        tick={{ fontSize: 10, fill: '#64748b' }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                                    />
                                    <Bar dataKey="count" fill="#00E5FF" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Estadisticas;