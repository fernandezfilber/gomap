import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Clock, AlertTriangle, PenTool, CheckCircle, Search, Plus, Filter, Printer, ArrowLeft } from 'lucide-react';
import useTickets from '../../hooks/useTickets';
import useTeam from '../../hooks/useTeam';
import FormTicket from './FormTicket';
import TicketDetailModal from './TicketDetailModal';

const TicketsDashboard = () => {
    const { tickets, loading, getTickets, updateTicketEstado, crearTicket } = useTickets();
    const { team, getTeam } = useTeam();

    const [filtroTab, setFiltroTab] = useState('TODOS'); // TODOS, AVERIAS, INSTALACIONES
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        getTickets();
        getTeam();
    }, [getTickets, getTeam]);

    // Calcular demora
    const calcularDemora = (inicio, fin) => {
        const start = new Date(inicio);
        const end = fin ? new Date(fin) : new Date();
        const diffMs = end - start;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHrs}h ${diffMins}m`;
    };

    // Agrupar tickets por estado (Columnas del Kanban)
    const columns = useMemo(() => {
        const filtered = tickets.filter(t => {
            const matchSearch = t.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                t.codigo?.toLowerCase().includes(searchTerm.toLowerCase());
            const esInstalacion = t.tipo === 'INSTALACION' || t.tipo === 'NUEVA_INSTALACION';
            const matchTab = filtroTab === 'TODOS' || 
                             (filtroTab === 'INSTALACIONES' && esInstalacion) ||
                             (filtroTab === 'AVERIAS' && !esInstalacion);
            return matchSearch && matchTab;
        });

        return {
            'REPORTADA': { name: 'Nuevos / Pendientes', items: filtered.filter(t => t.estado === 'REPORTADA' || t.estado === 'PENDIENTE') },
            'EN_REPARACION': { name: 'En Progreso (Asignados)', items: filtered.filter(t => t.estado === 'EN_REPARACION' || t.estado === 'ASIGNADA') },
            'RESUELTA': { name: 'Resueltos', items: filtered.filter(t => t.estado === 'RESUELTA') },
        };
    }, [tickets, searchTerm, filtroTab]);

    const onDragEnd = async (result, columns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const nuevoEstado = destination.droppableId;
            // Optimistic update podría ir aquí
            await updateTicketEstado(draggableId, nuevoEstado);
            getTickets(); // Refresh
        }
    };

    return (
        <div className="p-4 lg:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                            <PenTool className="text-indigo-600" /> Control de Operaciones
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Gestiona instalaciones y averías en tiempo real.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/dashboard" className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors">
                            <ArrowLeft size={18} /> Volver
                        </Link>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200"
                        >
                            <Plus size={18} /> Nuevo Ticket
                        </button>
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                        {['TODOS', 'AVERIAS', 'INSTALACIONES'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFiltroTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                    filtroTab === tab ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar cliente o código..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Kanban Board */}
                <DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
                    <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
                        {Object.entries(columns).map(([columnId, column], index) => {
                            return (
                                <div key={columnId} className="flex-1 min-w-[320px]">
                                    <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                                        <div className="flex justify-between items-center mb-4 px-2">
                                            <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                                {columnId === 'REPORTADA' && <AlertTriangle size={18} className="text-amber-500"/>}
                                                {columnId === 'EN_REPARACION' && <PenTool size={18} className="text-blue-500"/>}
                                                {columnId === 'RESUELTA' && <CheckCircle size={18} className="text-emerald-500"/>}
                                                {column.name}
                                            </h2>
                                            <span className="bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                                {column.items.length}
                                            </span>
                                        </div>

                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className={`min-h-[500px] space-y-3 transition-colors ${
                                                        snapshot.isDraggingOver ? 'bg-slate-200/50 rounded-xl' : ''
                                                    }`}
                                                >
                                                    {column.items.map((item, index) => {
                                                        const demora = calcularDemora(item.creadoEn, item.resueltoEn);
                                                        const esInstalacion = item.tipo === 'INSTALACION' || item.tipo === 'NUEVA_INSTALACION';
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        onClick={() => setSelectedTicket(item)}
                                                                        className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all ${
                                                                            snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500/50' : ''
                                                                        }`}
                                                                        style={{...provided.draggableProps.style}}
                                                                    >
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                                                                esInstalacion ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                                                            }`}>
                                                                                {esInstalacion ? 'Instalación' : 'Avería'}
                                                                            </span>
                                                                            <span className="text-xs font-bold text-slate-400">{item.codigo}</span>
                                                                        </div>
                                                                        <h3 className="font-bold text-slate-800 text-sm mb-1">{item.cliente?.nombre || 'Sin Cliente'}</h3>
                                                                        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{item.descripcion}</p>
                                                                        
                                                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                                                            <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                                                                                <Clock size={12} className={item.estado === 'RESUELTA' ? 'text-emerald-500' : 'text-amber-500'} /> 
                                                                                {demora}
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                {item.tecnico ? (
                                                                                    <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold" title={item.tecnico.nombre}>
                                                                                        {item.tecnico.nombre.charAt(0)}
                                                                                    </div>
                                                                                ) : (
                                                                                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-lg">Sin Asignar</span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>

            {/* Modals */}
            {showForm && (
                <FormTicket 
                    onClose={() => setShowForm(false)} 
                    onSuccess={() => { setShowForm(false); getTickets(); }}
                    team={team}
                    crearTicket={crearTicket}
                />
            )}

            {selectedTicket && (
                <TicketDetailModal 
                    ticket={selectedTicket} 
                    onClose={() => setSelectedTicket(null)}
                    onUpdate={() => { setSelectedTicket(null); getTickets(); }}
                    team={team}
                    updateTicketEstado={updateTicketEstado}
                />
            )}
        </div>
    );
};

export default TicketsDashboard;
