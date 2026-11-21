import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, LogOut, ArrowLeft, Maximize, Minimize, FolderGit2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';

import Sidebar from '../components/layout/Sidebar';
import Toolbox from '../components/layout/Toolbox';
import MapaPrincipal from '../components/map/MapaPrincipal';
import GoMapLogo from '../components/layout/GoMapLogo';
import HubHerramientas from '../components/dashboard/HubHerramientas';
import SearchCajaCercana from '../components/modals/SearchCajaCercana';
import ModalNuevoProyecto from '../components/modals/ModalNuevoProyecto';

import FormPoste from '../components/forms/FormPoste';
import FormMufa from '../components/forms/FormMufa';
import FormCaja from '../components/forms/FormCaja';
import { useProyectoContext } from '../context/ProyectoContext';
import useMufas from '../hooks/useMufas';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const { 
        proyectos, 
        proyectoSeleccionado, 
        setProyectoSeleccionado, 
        crearProyecto 
    } = useProyectoContext();
    
    const { mufas } = useMufas(proyectoSeleccionado?.id);
    const [modo, setModo] = useState('select');
    const [formAbierto, setFormAbierto] = useState(false);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [medirDistancia, setMedirDistancia] = useState(false);

    // Modales del Hub
    const [mostrarBusquedaCajas, setMostrarBusquedaCajas] = useState(false);
    const [busquedaInicialCoords, setBusquedaInicialCoords] = useState(null);
    const [autoSearchCajas, setAutoSearchCajas] = useState(false);
    const [modalNuevoProyectoOpen, setModalNuevoProyectoOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Refs para evitar loops en popstate
    const stateRef = useRef({
        formAbierto,
        mostrarBusquedaCajas,
        modalNuevoProyectoOpen,
        sidebarOpen,
        proyectoSeleccionado
    });

    useEffect(() => {
        stateRef.current = {
            formAbierto,
            mostrarBusquedaCajas,
            modalNuevoProyectoOpen,
            sidebarOpen,
            proyectoSeleccionado
        };
    }, [formAbierto, mostrarBusquedaCajas, modalNuevoProyectoOpen, sidebarOpen, proyectoSeleccionado]);

    // ==================== GESTIÓN DEL BOTÓN REGRESAR (MÓVIL / WEB) ====================
    // Permite que al presionar "Atrás" en el celular, retroceda a la pantalla anterior sin salir de GoMap
    useEffect(() => {
        const handlePopState = (e) => {
            const current = stateRef.current;
            
            if (current.formAbierto) {
                setFormAbierto(false);
                setFormType(null);
                setFormData(null);
                return;
            }
            if (current.mostrarBusquedaCajas) {
                setMostrarBusquedaCajas(false);
                return;
            }
            if (current.modalNuevoProyectoOpen) {
                setModalNuevoProyectoOpen(false);
                return;
            }
            if (current.sidebarOpen) {
                setSidebarOpen(false);
                return;
            }
            if (current.proyectoSeleccionado) {
                // Volver del mapa al menú de herramientas
                setProyectoSeleccionado(null);
                localStorage.removeItem('proyectoId');
                return;
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [setProyectoSeleccionado]);

    // Función para pushear estado al historial cuando se entra a un proyecto o modal
    const pushHistoryStep = useCallback((stepName) => {
        try {
            window.history.pushState({ gomapStep: stepName, timestamp: Date.now() }, '');
        } catch {
            // Ignorar errores en navegadores restrictivos
        }
    }, []);

    // Fullscreen Toggle
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    await document.documentElement.webkitRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch (err) {
            console.log('Error fullscreen:', err);
        }
    };

    // ==================== HANDLERS ====================
    const handleSeleccionarProyecto = (proyecto) => {
        pushHistoryStep(`proyecto-${proyecto.id}`);
        setProyectoSeleccionado(proyecto);
        localStorage.setItem('proyectoId', proyecto.id);
    };

    const handleVolverAlMenu = () => {
        setProyectoSeleccionado(null);
        localStorage.removeItem('proyectoId');
    };

    const handleAbrirBusquedaPorRadio = () => {
        pushHistoryStep('busqueda-radio');
        setBusquedaInicialCoords(null);
        setAutoSearchCajas(false);
        setMostrarBusquedaCajas(true);
    };

    const handleBuscarGPS = () => {
        if (!navigator.geolocation) {
            alert('Tu dispositivo o navegador no soporta geolocalización');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                pushHistoryStep('busqueda-gps');
                setBusquedaInicialCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setAutoSearchCajas(true);
                setMostrarBusquedaCajas(true);
            },
            (err) => {
                console.error("GPS error:", err);
                alert('No se pudo obtener la ubicación GPS actual. Verifica que tengas el GPS activado.');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleAbrirCrearProyecto = () => {
        pushHistoryStep('nuevo-proyecto');
        setModalNuevoProyectoOpen(true);
    };

    const handleSaveNuevoProyecto = async (datos) => {
        try {
            const nuevo = await crearProyecto(datos);
            handleSeleccionarProyecto(nuevo);
            setModalNuevoProyectoOpen(false);
            alert(`Sector "${nuevo.nombre}" creado exitosamente.`);
        } catch (error) {
            console.error('Error al crear proyecto:', error);
            alert(error?.message || "Error al crear el proyecto");
        }
    };

    // Formularios
    const abrirFormulario = (tipo, datos = {}) => {
        pushHistoryStep(`form-${tipo}`);
        setFormType(tipo);
        setFormData(datos);
        setFormAbierto(true);
    };

    const cerrarFormulario = () => {
        setFormAbierto(false);
        setFormType(null);
        setFormData(null);
    };

    return (
        <div className="h-[100dvh] w-screen bg-slate-950 overflow-hidden flex flex-col">
            
            {/* Navbar Superior (Móvil) */}
            <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex justify-between items-center z-[1002] pt-[env(safe-area-inset-top)]">
                <div className="flex items-center gap-2">
                    <GoMapLogo className="h-7 w-7" textClassName="text-lg" />
                </div>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFullscreen}
                        className="text-slate-400 hover:text-[#00E5FF] p-2 hover:bg-slate-800 rounded-xl transition-colors"
                        title="Pantalla Completa"
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>

                    <button 
                        onClick={() => {
                            if (window.confirm("¿Cerrar sesión?")) {
                                logout();
                            }
                        }}
                        className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-500/20 active:bg-red-500 active:text-white transition-all"
                    >
                        <LogOut size={14} /> Salir
                    </button>
                    
                    <button 
                        onClick={() => {
                            if (!sidebarOpen) pushHistoryStep('sidebar');
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                
                {/* Sidebar Izquierdo */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Área de Contenido Principal: O bien el Mapa del Proyecto, o bien el Menú Interactivo de Herramientas */}
                {proyectoSeleccionado ? (
                    <div className="flex-1 relative flex flex-col">
                        
                        {/* Barra Superior del Mapa con botón para Volver al Menú */}
                        <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between z-[400] shadow-md">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleVolverAlMenu}
                                    className="flex items-center gap-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 active:scale-95 text-[#00E5FF] border border-[#00E5FF]/30 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                                    title="Regresar al Menú de Herramientas"
                                >
                                    <ArrowLeft size={16} /> Menú Principal
                                </button>
                                
                                <div className="hidden sm:flex items-center gap-2 text-white">
                                    <FolderGit2 size={16} className="text-[#00E5FF]" />
                                    <span className="text-xs font-bold text-slate-300">Sector:</span>
                                    <span className="text-xs font-black text-white">{proyectoSeleccionado.nombre}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="sm:hidden text-[11px] font-bold text-slate-300 truncate max-w-[120px]">
                                    {proyectoSeleccionado.nombre}
                                </span>
                                <button
                                    onClick={toggleFullscreen}
                                    className="hidden lg:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                                    title="Pantalla Completa"
                                >
                                    {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                                    <span>{isFullscreen ? 'Salir Fullscreen' : 'Pantalla Completa'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Mapa del Proyecto Seleccionado */}
                        <div className="flex-1 relative">
                            <MapaPrincipal 
                                onAbrirFormulario={abrirFormulario} 
                                modo={modo}
                                setModo={setModo}
                                medirDistancia={medirDistancia}
                                setMedirDistancia={setMedirDistancia}
                            />

                            {/* Toolbox Flotante sobre el mapa */}
                            <Toolbox 
                                modo={modo} 
                                setModo={setModo} 
                                medirDistancia={medirDistancia}
                                setMedirDistancia={setMedirDistancia}
                                onPrint={() => window.print()}
                            />
                        </div>

                    </div>
                ) : (
                    /* Menú Interactivo de Herramientas (Rápido, Liviano y sin Mapa pesado) */
                    <HubHerramientas 
                        proyectos={proyectos}
                        onSeleccionarProyecto={handleSeleccionarProyecto}
                        onCrearProyecto={handleAbrirCrearProyecto}
                        onBuscarPorRadio={handleAbrirBusquedaPorRadio}
                        onBuscarGPS={handleBuscarGPS}
                    />
                )}

            </div>

            {/* MODAL DE BÚSQUEDA DE CAJA CERCANA */}
            {mostrarBusquedaCajas && (
                <SearchCajaCercana
                    onClose={() => setMostrarBusquedaCajas(false)}
                    initialCoordinates={busquedaInicialCoords}
                    autoSearch={autoSearchCajas}
                />
            )}

            {/* MODAL PARA CREAR PROYECTO NUEVO */}
            {modalNuevoProyectoOpen && (
                <ModalNuevoProyecto 
                    onSave={handleSaveNuevoProyecto}
                    onClose={() => setModalNuevoProyectoOpen(false)}
                />
            )}

            {/* FORMULARIOS FLOTANTES */}
            {formAbierto && formType && (
                <>
                    {formType === 'poste' && (
                        <FormPoste data={formData} onCancel={cerrarFormulario} />
                    )}
                    {formType === 'mufa' && (
                        <FormMufa data={formData} onCancel={cerrarFormulario} />
                    )}
                    {formType === 'caja' && (
                        <FormCaja data={formData} onCancel={cerrarFormulario} mufas={mufas} />
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
