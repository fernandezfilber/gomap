import React, { useRef } from 'react';
import { X, Printer, User, Clock, AlertTriangle, Calendar, PenTool } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const TicketDetailModal = ({ ticket, onClose, onUpdate, team, updateTicketEstado }) => {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Ticket_${ticket.codigo}`,
    });

    const esInstalacion = ticket.tipo === 'INSTALACION' || ticket.tipo === 'NUEVA_INSTALACION';

    const handleEstadoChange = async (e) => {
        const success = await updateTicketEstado(ticket.id, e.target.value);
        if (success) {
            onUpdate();
        }
    };

    const handleTecnicoChange = async (e) => {
        // En este diseño, updateTicketEstado también acepta tecnicoId
        const success = await updateTicketEstado(ticket.id, ticket.estado, e.target.value);
        if (success) {
            onUpdate();
        }
    };

    // Formatear fechas
    const fechaCreacion = new Date(ticket.creadoEn).toLocaleString();
    const fechaResolucion = ticket.resueltoEn ? new Date(ticket.resueltoEn).toLocaleString() : 'En curso';

    // Parsear datos del cliente si es NUEVA_INSTALACION
    const extraerDato = (texto, clave) => {
        if (!texto) return null;
        const regex = new RegExp(`\\[${clave}:(.*?)\\]`);
        const match = texto.match(regex);
        return match ? match[1].trim() : null;
    };

    let clienteNombre = ticket.cliente?.nombre || 'Desconocido';
    let clienteDireccion = ticket.cliente?.direccion || 'No registrada';
    let clienteTelefono = ticket.cliente?.telefono || 'No registrado';
    let descripcionLimpia = ticket.descripcion || '';

    if (ticket.tipo === 'NUEVA_INSTALACION') {
        const nom = extraerDato(ticket.descripcion, 'Nombre');
        if (nom) clienteNombre = `${nom} (NUEVO)`;
        const dir = extraerDato(ticket.descripcion, 'Dir');
        if (dir) clienteDireccion = dir;
        const tel = extraerDato(ticket.descripcion, 'Tel');
        if (tel) clienteTelefono = tel;

        // Limpiar la descripción para no mostrar los corchetes
        descripcionLimpia = ticket.descripcion.replace(/\[.*?\]/g, '').trim();
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        {esInstalacion ? <PenTool className="text-blue-500"/> : <AlertTriangle className="text-red-500"/>}
                        Ticket #{ticket.codigo}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="text-slate-500 hover:text-indigo-600 bg-white p-2 rounded-lg border border-slate-200 transition-colors shadow-sm">
                            <Printer size={20} />
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
                            <X size={24} />
                        </button>
                    </div>
                </div>
                
                <div className="p-6 overflow-y-auto" ref={printRef}>
                    {/* Header para impresión */}
                    <div className="hidden print:block mb-6 text-center border-b pb-4">
                        <h1 className="text-2xl font-black">ORDEN DE TRABAJO</h1>
                        <p className="text-sm text-gray-500">Ticket #{ticket.codigo}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Info Cliente */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <User size={16}/> Datos del Cliente
                            </h3>
                            <p className="text-sm text-slate-600 mb-1"><strong>Nombre:</strong> {clienteNombre}</p>
                            <p className="text-sm text-slate-600 mb-1"><strong>Dirección:</strong> {clienteDireccion}</p>
                            <p className="text-sm text-slate-600"><strong>Teléfono:</strong> {clienteTelefono}</p>
                        </div>

                        {/* Info Ticket */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Calendar size={16}/> Detalles del Ticket
                            </h3>
                            <p className="text-sm text-slate-600 mb-1"><strong>Tipo:</strong> {ticket.tipo}</p>
                            <p className="text-sm text-slate-600 mb-1"><strong>Creado:</strong> {fechaCreacion}</p>
                            <p className="text-sm text-slate-600"><strong>Resuelto:</strong> {fechaResolucion}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-slate-700 mb-2">Descripción del Trabajo</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm whitespace-pre-wrap border border-slate-100">
                            {descripcionLimpia}
                        </div>
                    </div>

                    <div className="mb-6 print:hidden grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div>
                            <label className="block text-indigo-900 text-xs font-bold mb-1 uppercase tracking-wider">Estado Actual</label>
                            <select 
                                value={ticket.estado} 
                                onChange={handleEstadoChange}
                                className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="REPORTADA">Reportada / Pendiente</option>
                                <option value="EN_REPARACION">En Reparación / Asignada</option>
                                <option value="RESUELTA">Resuelta</option>
                                <option value="CANCELADA">Cancelada</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-indigo-900 text-xs font-bold mb-1 uppercase tracking-wider">Técnico Asignado</label>
                            <select 
                                value={ticket.tecnicoId || ''} 
                                onChange={handleTecnicoChange}
                                className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="">Seleccionar técnico...</option>
                                {team.map(t => (
                                    <option key={t.id} value={t.id}>{t.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Espacio para firmas en impresión */}
                    <div className="hidden print:flex justify-between mt-20 pt-10 border-t-2 border-dashed border-gray-300">
                        <div className="text-center w-48">
                            <div className="border-t border-gray-800 pt-2 font-bold text-sm">Firma del Técnico</div>
                            <div className="text-xs text-gray-500 mt-1">{ticket.tecnico?.nombre || '_________________'}</div>
                        </div>
                        <div className="text-center w-48">
                            <div className="border-t border-gray-800 pt-2 font-bold text-sm">Firma del Cliente</div>
                            <div className="text-xs text-gray-500 mt-1">Conformidad de trabajo</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailModal;
