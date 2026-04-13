import { useState } from 'react';
import { X, Plus, Trash2, Signal } from 'lucide-react';

const ClientCircuitView = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('circuits');
    const [circuits, setCircuits] = useState([]);
    const [clients, setClients] = useState([]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1500]">
            <div className="bg-slate-950 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-slate-800 text-white">
                
                {/* Header */}
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500 font-semibold">Gestión de Servicios</p>
                        <h2 className="text-xl font-black tracking-tight">Circuitos y Clientes</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-slate-800 bg-slate-900/50">
                    <button
                        onClick={() => setActiveTab('circuits')}
                        className={`flex-1 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] border-b-2 transition ${
                            activeTab === 'circuits'
                                ? 'border-cyan-400 text-cyan-300'
                                : 'border-transparent text-slate-400 hover:text-white'
                        }`}
                    >
                        <Signal size={16} className="inline mr-2" />
                        Circuitos
                    </button>
                    <button
                        onClick={() => setActiveTab('clients')}
                        className={`flex-1 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] border-b-2 transition ${
                            activeTab === 'clients'
                                ? 'border-cyan-400 text-cyan-300'
                                : 'border-transparent text-slate-400 hover:text-white'
                        }`}
                    >
                        Clientes
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-4 space-y-3">
                    {activeTab === 'circuits' ? (
                        circuits.length > 0 ? (
                            circuits.map(circuit => (
                                <div
                                    key={circuit.id}
                                    className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-400/50 transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-bold text-white">{circuit.nombre}</p>
                                            <p className="text-xs text-slate-400 mt-1">{circuit.descripcion}</p>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded">
                                                    {circuit.estado}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {circuit.elementos?.length || 0} elementos
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-slate-500 hover:text-rose-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p className="text-sm">No hay circuitos registrados</p>
                                <p className="text-xs mt-2">Crea un circuito para comenzar a gestionar servicios</p>
                            </div>
                        )
                    ) : (
                        clients.length > 0 ? (
                            clients.map(client => (
                                <div
                                    key={client.id}
                                    className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-400/50 transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-bold text-white">{client.nombre}</p>
                                            <p className="text-xs text-slate-400 mt-1">{client.telefono || 'N/A'}</p>
                                            <p className="text-xs text-slate-500 mt-1">{client.direccion}</p>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-xs bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded">
                                                    {client.estado}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    Caja: {client.cajaId || 'Sin asignar'}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-slate-500 hover:text-rose-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p className="text-sm">No hay clientes registrados</p>
                                <p className="text-xs mt-2">Agrega clientes desde el mapa o formularios</p>
                            </div>
                        )
                    )}
                </div>

                {/* Footer Actions */}
                <div className="border-t border-slate-800 bg-slate-900/50 px-4 py-3 flex gap-2">
                    <button className="flex-1 rounded-2xl bg-cyan-500 text-slate-950 px-4 py-2 text-sm font-semibold hover:bg-cyan-400 flex items-center justify-center gap-2">
                        <Plus size={16} />
                        {activeTab === 'circuits' ? 'Nuevo Circuito' : 'Nuevo Cliente'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientCircuitView;
