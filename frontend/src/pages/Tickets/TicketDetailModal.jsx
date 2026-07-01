import React, { useRef, useState } from 'react';
import { X, Printer, User, Clock, AlertTriangle, Calendar, PenTool, Check, Eraser, FileText, Share2, Save } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import SignatureCanvas from 'react-signature-canvas';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import fvApi from '../../api/fvApi';
import toast from 'react-hot-toast';
import { Camera as CameraIcon } from 'lucide-react';

const TicketDetailModal = ({ ticket, onClose, onUpdate, team, updateTicketEstado }) => {
    const printRef = useRef();
    const sigTecnicoRef = useRef(null);
    const sigClienteRef = useRef(null);
    const [showSignatures, setShowSignatures] = useState(false);
    const [firmaTecnicoData, setFirmaTecnicoData] = useState(ticket.firmaTecnico || null);
    const [firmaClienteData, setFirmaClienteData] = useState(ticket.firmaCliente || null);
    const [fotosData, setFotosData] = useState(ticket.fotos || []);
    const [guardando, setGuardando] = useState(false);
    const [generandoPdf, setGenerandoPdf] = useState(false);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Ticket_${ticket.codigo}`,
    });

    const esInstalacion = ticket.tipo === 'INSTALACION' || ticket.tipo === 'NUEVA_INSTALACION';

    const handleEstadoChange = async (e) => {
        const success = await updateTicketEstado(ticket.id, e.target.value);
        if (success) onUpdate();
    };

    const handleTecnicoChange = async (e) => {
        const success = await updateTicketEstado(ticket.id, ticket.estado, e.target.value);
        if (success) onUpdate();
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
        descripcionLimpia = ticket.descripcion.replace(/\[.*?\]/g, '').trim();
    }

    // Guardar firmas en la base de datos
    const handleGuardarFirmas = async () => {
        if (!sigTecnicoRef.current || !sigClienteRef.current) return;
        
        const firmaTec = sigTecnicoRef.current.isEmpty() ? firmaTecnicoData : sigTecnicoRef.current.toDataURL('image/png');
        const firmaCli = sigClienteRef.current.isEmpty() ? firmaClienteData : sigClienteRef.current.toDataURL('image/png');

        if (!firmaTec && !firmaCli) {
            toast.error('Dibuja al menos una firma antes de guardar');
            return;
        }

        setGuardando(true);
        try {
            await fvApi.put(`/averias/${ticket.id}/firmas`, {
                firmaTecnico: firmaTec,
                firmaCliente: firmaCli
            });
            setFirmaTecnicoData(firmaTec);
            setFirmaClienteData(firmaCli);
            toast.success('✅ Firmas guardadas correctamente');
            onUpdate();
        } catch (error) {
            console.error('Error guardando firmas:', error);
            toast.error('Error al guardar las firmas');
        } finally {
            setGuardando(false);
        }
    };

    // Tomar Foto
    const handleTomarFoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt // Let user choose camera or gallery
            });

            if (image && image.dataUrl) {
                setGuardando(true);
                const nuevasFotos = [image.dataUrl];
                
                await fvApi.put(`/averias/${ticket.id}/fotos`, {
                    fotos: nuevasFotos
                });
                
                setFotosData(prev => [...prev, image.dataUrl]);
                toast.success('📸 Foto guardada');
                onUpdate();
            }
        } catch (error) {
            console.error('Error tomando foto:', error);
            // Si el usuario cancela, no mostramos error
            if (error.message !== 'User cancelled photos app') {
                toast.error('Error al acceder a la cámara');
            }
        } finally {
            setGuardando(false);
        }
    };

    // Generar PDF
    const handleGenerarPDF = async () => {
        setGenerandoPdf(true);
        try {
            const element = printRef.current;
            if (!element) return;

            const imgData = await toPng(element, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                filter: (node) => {
                    if (node.getAttribute && node.getAttribute('data-html2canvas-ignore') === 'true') {
                        return false;
                    }
                    return true;
                }
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            // Calcular altura proporcional
            const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // En móvil: Guardar y compartir; en web: descargar
            if (window.Capacitor && window.Capacitor.isNativePlatform()) {
                // Obtener base64 string sin el data:application/pdf;base64,
                const pdfBase64 = pdf.output('datauristring').split(',')[1];
                const fileName = `Ticket_${ticket.codigo}.pdf`;
                
                // Guardar en cache del dispositivo
                const savedFile = await Filesystem.writeFile({
                    path: fileName,
                    data: pdfBase64,
                    directory: Directory.Cache
                });

                // Abrir menú de compartir nativo
                await Share.share({
                    title: `Orden de Trabajo - Ticket #${ticket.codigo}`,
                    text: 'Adjunto el ticket de trabajo',
                    url: savedFile.uri,
                    dialogTitle: 'Compartir Ticket PDF'
                });
            } else {
                pdf.save(`Ticket_${ticket.codigo}.pdf`);
            }

            toast.success('📄 PDF generado exitosamente');
        } catch (error) {
            console.error('Error generando PDF:', error);
            toast.error(`Error al generar el PDF: ${error.message || 'Desconocido'}`);
        } finally {
            setGenerandoPdf(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
                        {esInstalacion ? <PenTool className="text-blue-500" size={18}/> : <AlertTriangle className="text-red-500" size={18}/>}
                        <span className="truncate">Ticket #{ticket.codigo}</span>
                    </h2>
                    <div className="flex gap-1 sm:gap-2">
                        <button onClick={handleGenerarPDF} disabled={generandoPdf} className="text-slate-500 hover:text-emerald-600 bg-white p-2 rounded-lg border border-slate-200 transition-colors shadow-sm disabled:opacity-50" title="Generar PDF">
                            {generandoPdf ? <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div> : <FileText size={18} />}
                        </button>
                        <button onClick={handleTomarFoto} disabled={guardando} className="text-slate-500 hover:text-blue-600 bg-white p-2 rounded-lg border border-slate-200 transition-colors shadow-sm disabled:opacity-50" title="Tomar Foto">
                            <CameraIcon size={18} />
                        </button>
                        <button onClick={() => setShowSignatures(!showSignatures)} className={`p-2 rounded-lg border transition-colors shadow-sm ${showSignatures ? 'bg-indigo-100 text-indigo-600 border-indigo-300' : 'text-slate-500 hover:text-indigo-600 bg-white border-slate-200'}`} title="Firmas">
                            <PenTool size={18} />
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
                            <X size={22} />
                        </button>
                    </div>
                </div>
                
                {/* Body */}
                <div className="p-4 sm:p-6 overflow-y-auto" ref={printRef}>
                    {/* Header para PDF */}
                    <div className="mb-4 text-center border-b pb-3 border-slate-200">
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800">ORDEN DE TRABAJO</h1>
                        <p className="text-xs text-slate-500 mt-1">Ticket #{ticket.codigo} • {fechaCreacion}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        {/* Info Cliente */}
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm">
                                <User size={14}/> Datos del Cliente
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 mb-1"><strong>Nombre:</strong> {clienteNombre}</p>
                            <p className="text-xs sm:text-sm text-slate-600 mb-1"><strong>Dirección:</strong> {clienteDireccion}</p>
                            <p className="text-xs sm:text-sm text-slate-600"><strong>Teléfono:</strong> {clienteTelefono}</p>
                        </div>

                        {/* Info Ticket */}
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm">
                                <Calendar size={14}/> Detalles del Ticket
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 mb-1"><strong>Tipo:</strong> {ticket.tipo}</p>
                            <p className="text-xs sm:text-sm text-slate-600 mb-1"><strong>Creado:</strong> {fechaCreacion}</p>
                            <p className="text-xs sm:text-sm text-slate-600"><strong>Resuelto:</strong> {fechaResolucion}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-slate-700 mb-2 text-sm">Descripción del Trabajo</h3>
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl text-slate-600 text-xs sm:text-sm whitespace-pre-wrap border border-slate-100">
                            {descripcionLimpia}
                        </div>
                    </div>

                    {/* Controles de estado - ocultos al generar PDF */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-3 sm:p-4 rounded-xl border border-indigo-100" data-html2canvas-ignore="true">
                        <div>
                            <label className="block text-indigo-900 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Estado Actual</label>
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
                            <label className="block text-indigo-900 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Técnico Asignado</label>
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

                    {/* Sección de Firmas Digitales */}
                    {showSignatures && (
                        <div className="mb-6 border-2 border-dashed border-indigo-200 rounded-xl p-3 sm:p-4 bg-indigo-50/30" data-html2canvas-ignore="true">
                            <h3 className="font-black text-indigo-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                <PenTool size={14}/> Firmas Digitales
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Firma Técnico */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">Firma del Técnico</label>
                                        <button onClick={() => { sigTecnicoRef.current?.clear(); setFirmaTecnicoData(null); }} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                            <Eraser size={12}/> Limpiar
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-lg border-2 border-slate-300 overflow-hidden touch-none">
                                        {firmaTecnicoData && !sigTecnicoRef.current ? (
                                            <img src={firmaTecnicoData} alt="Firma técnico" className="w-full h-[120px] object-contain"/>
                                        ) : null}
                                        <SignatureCanvas
                                            ref={sigTecnicoRef}
                                            canvasProps={{
                                                className: 'w-full',
                                                style: { width: '100%', height: '120px', touchAction: 'none' }
                                            }}
                                            penColor="#1e293b"
                                            backgroundColor="rgba(255,255,255,1)"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 text-center">{ticket.tecnico?.nombre || 'Técnico'}</p>
                                </div>

                                {/* Firma Cliente */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">Firma del Cliente</label>
                                        <button onClick={() => { sigClienteRef.current?.clear(); setFirmaClienteData(null); }} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                            <Eraser size={12}/> Limpiar
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-lg border-2 border-slate-300 overflow-hidden touch-none">
                                        {firmaClienteData && !sigClienteRef.current ? (
                                            <img src={firmaClienteData} alt="Firma cliente" className="w-full h-[120px] object-contain"/>
                                        ) : null}
                                        <SignatureCanvas
                                            ref={sigClienteRef}
                                            canvasProps={{
                                                className: 'w-full',
                                                style: { width: '100%', height: '120px', touchAction: 'none' }
                                            }}
                                            penColor="#1e293b"
                                            backgroundColor="rgba(255,255,255,1)"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 text-center">Conformidad del Cliente</p>
                                </div>
                            </div>

                            <button 
                                onClick={handleGuardarFirmas} 
                                disabled={guardando}
                                className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                            >
                                {guardando ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Guardando...</>
                                ) : (
                                    <><Save size={16}/> Guardar Firmas</>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Firmas guardadas - visibles en el PDF */}
                    {(firmaTecnicoData || firmaClienteData) && (
                        <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-300">
                            <h3 className="font-bold text-slate-700 mb-3 text-xs uppercase tracking-wider text-center">Firmas de Conformidad</h3>
                            <div className="flex justify-around gap-4">
                                <div className="text-center flex-1">
                                    {firmaTecnicoData ? (
                                        <img src={firmaTecnicoData} alt="Firma técnico" className="mx-auto h-[80px] object-contain border-b-2 border-slate-800"/>
                                    ) : (
                                        <div className="h-[80px] border-b-2 border-slate-300"></div>
                                    )}
                                    <p className="font-bold text-xs mt-2 text-slate-800">Firma del Técnico</p>
                                    <p className="text-[10px] text-slate-500">{ticket.tecnico?.nombre || '_______________'}</p>
                                </div>
                                <div className="text-center flex-1">
                                    {firmaClienteData ? (
                                        <img src={firmaClienteData} alt="Firma cliente" className="mx-auto h-[80px] object-contain border-b-2 border-slate-800"/>
                                    ) : (
                                        <div className="h-[80px] border-b-2 border-slate-300"></div>
                                    )}
                                    <p className="font-bold text-xs mt-2 text-slate-800">Firma del Cliente</p>
                                    <p className="text-[10px] text-slate-500">Conformidad de trabajo</p>
                                </div>
                            </div>
                            {ticket.firmadoEn && (
                                <p className="text-center text-[10px] text-slate-400 mt-3">
                                    Firmado el {new Date(ticket.firmadoEn).toLocaleString()}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Evidencia Fotográfica */}
                    {fotosData && fotosData.length > 0 && (
                        <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-300">
                            <h3 className="font-bold text-slate-700 mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                                <CameraIcon size={14} /> Evidencia Fotográfica
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {fotosData.map((fotoUrl, index) => (
                                    <div key={index} className="rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                                        <img src={fotoUrl} alt={`Evidencia ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketDetailModal;
