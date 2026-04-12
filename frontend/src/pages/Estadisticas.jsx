import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import fvApi from '../api/fvApi';
import { TrendingUp, Users, MapPin, Zap } from 'lucide-react';

const Estadisticas = () => {
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

                const postes = postesRes.data;
                const tramos = tramosRes.data;
                const clientes = clientesRes.data;
                const mufas = mufasRes.data;
                const cajas = cajasRes.data;
                const troncales = troncalesRes.data;

                // Procesar datos para gráficos
                const postesPorTipo = postes.reduce((acc, poste) => {
                    const tipo = poste.tipo || 'Desconocido';
                    acc[tipo] = (acc[tipo] || 0) + 1;
                    return acc;
                }, {});

                const tramosPorEstado = tramos.reduce((acc, tramo) => {
                    const estado = tramo.estado || 'Activo';
                    acc[estado] = (acc[estado] || 0) + 1;
                    return acc;
                }, {});

                const clientesPorMes = clientes.reduce((acc, cliente) => {
                    const mes = new Date(cliente.createdAt).getMonth();
                    acc[mes] = (acc[mes] || 0) + 1;
                    return acc;
                }, Array(12).fill(0));

                setStats({
                    totalPostes: postes.length,
                    totalTramos: tramos.length,
                    totalClientes: clientes.length,
                    totalMufas: mufas.length,
                    totalCajas: cajas.length,
                    totalTroncales: troncales.length,
                    clientesPorMes: clientesPorMes.map((count, index) => ({
                        mes: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][index],
                        clientes: count
                    })),
                    postesPorTipo: Object.entries(postesPorTipo).map(([tipo, count]) => ({ tipo, count })),
                    tramosPorEstado: Object.entries(tramosPorEstado).map(([estado, count]) => ({ estado, count }))
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="p-6 bg-slate-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="text-blue-500" />
                    Estadísticas del Sistema
                </h1>

                {/* Cards de resumen */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-green-500" />
                            <h3 className="text-lg font-semibold">Postes</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">{stats.totalPostes}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="text-yellow-500" />
                            <h3 className="text-lg font-semibold">Tramos</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-400">{stats.totalTramos}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="text-blue-500" />
                            <h3 className="text-lg font-semibold">Clientes</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-400">{stats.totalClientes}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-purple-500 rounded"></div>
                            <h3 className="text-lg font-semibold">Mufas</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-400">{stats.totalMufas}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-red-500 rounded"></div>
                            <h3 className="text-lg font-semibold">Cajas</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-400">{stats.totalCajas}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-cyan-500 rounded"></div>
                            <h3 className="text-lg font-semibold">Troncales</h3>
                        </div>
                        <p className="text-3xl font-bold text-cyan-400">{stats.totalTroncales}</p>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Clientes por mes */}
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4">Clientes Registrados por Mes</h3>
                        <LineChart width={400} height={300} data={stats.clientesPorMes}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="mes" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                            <Line type="monotone" dataKey="clientes" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </div>

                    {/* Postes por tipo */}
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4">Distribución de Postes por Tipo</h3>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={stats.postesPorTipo}
                                cx={200}
                                cy={150}
                                labelLine={false}
                                label={({ tipo, percent }) => `${tipo} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {stats.postesPorTipo.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                        </PieChart>
                    </div>

                    {/* Tramos por estado */}
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4">Estado de Tramos</h3>
                        <BarChart width={400} height={300} data={stats.tramosPorEstado}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="estado" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                            <Bar dataKey="count" fill="#10B981" />
                        </BarChart>
                    </div>

                    {/* Resumen general */}
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4">Resumen General</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Total de Elementos en Red:</span>
                                <span className="font-bold text-blue-400">
                                    {stats.totalPostes + stats.totalTramos + stats.totalMufas + stats.totalCajas + stats.totalTroncales}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Clientes Activos:</span>
                                <span className="font-bold text-green-400">{stats.totalClientes}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cobertura Estimada:</span>
                                <span className="font-bold text-yellow-400">{Math.round(stats.totalTramos * 0.5)} km</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;