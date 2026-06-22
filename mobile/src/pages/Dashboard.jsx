import { useState } from 'react';
import { Menu, X, LogOut, Map, Settings } from 'lucide-react';
import useAuth from '../hooks/useAuth';

import Sidebar from '../components/layout/Sidebar';
import Toolbox from '../components/layout/Toolbox';
import MapaPrincipal from '../components/map/MapaPrincipal';
import GoMapLogo from '../components/layout/GoMapLogo';

import FormPoste from '../components/forms/FormPoste';
import FormMufa from '../components/forms/FormMufa';
import FormCaja from '../components/forms/FormCaja';
import { useProyectoContext } from '../context/ProyectoContext';
import useMufas from '../hooks/useMufas';

const Dashboard = () => {
    const { logout } = useAuth();
    const { proyectoSeleccionado } = useProyectoContext();
    const { mufas } = useMufas(proyectoSeleccionado?.id);
    const [modo, setModo] = useState('select');
    const [formAbierto, setFormAbierto] = useState(false);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [medirDistancia, setMedirDistancia] = useState(false);
    const [activeTab, setActiveTab] = useState('mapa');

    const abrirFormulario = (tipo, datos = {}) => {
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
        <div
            className="bg-slate-950 overflow-hidden flex flex-col"
            style={{ height: '100dvh' }}
        >
            {/* ===== HEADER (con safe area top para notch/Dynamic Island) ===== */}
            <div
                className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 flex justify-between items-center z-[1002] flex-shrink-0"
                style={{
                    paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
                    paddingBottom: '12px',
                    paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 16px)',
                    paddingRight: 'calc(env(safe-area-inset-right, 0px) + 16px)',
                }}
            >
                <GoMapLogo className="h-6 w-6" textClassName="text-base" />

                <div className="flex items-center gap-2">
                    {/* Indicador de proyecto activo */}
                    {proyectoSeleccionado && (
                        <div className="flex items-center gap-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-3 py-1.5 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                            <span className="text-[9px] font-black text-[#00E5FF] uppercase tracking-wider max-w-[100px] truncate">
                                {proyectoSeleccionado.nombre}
                            </span>
                        </div>
                    )}

                    {/* Botón hamburguesa */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 rounded-xl transition-colors border border-white/5 active:bg-slate-700"
                        style={{ minHeight: 'unset' }}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* ===== ÁREA CENTRAL (Mapa + Sidebar drawer) ===== */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Sidebar desde la izquierda */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Mapa */}
                <div className="flex-1 relative">
                    <MapaPrincipal
                        onAbrirFormulario={abrirFormulario}
                        modo={modo}
                        setModo={setModo}
                        medirDistancia={medirDistancia}
                        setMedirDistancia={setMedirDistancia}
                    />

                    {/* Toolbox flotante sobre el mapa */}
                    <Toolbox
                        modo={modo}
                        setModo={setModo}
                        medirDistancia={medirDistancia}
                        setMedirDistancia={setMedirDistancia}
                        onPrint={() => window.print()}
                    />
                </div>
            </div>

            {/* ===== BOTTOM TAB BAR (con safe area bottom para gesto iOS) ===== */}
            <div
                className="mobile-nav-bar flex-shrink-0"
                style={{
                    paddingLeft: 'env(safe-area-inset-left, 0px)',
                    paddingRight: 'env(safe-area-inset-right, 0px)',
                }}
            >
                <div className="flex items-center px-4 pt-2 pb-1 gap-1">

                    {/* Tab: Mapa */}
                    <button
                        id="tab-mapa"
                        onClick={() => setActiveTab('mapa')}
                        className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                            activeTab === 'mapa' ? 'text-[#00E5FF]' : 'text-slate-500'
                        }`}
                        style={{ minHeight: 'unset' }}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'mapa' ? 'bg-[#00E5FF]/15' : ''}`}>
                            <Map size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-wider">Mapa</span>
                    </button>

                    {/* Tab: Sector (abre sidebar) */}
                    <button
                        id="tab-sector"
                        onClick={() => setSidebarOpen(true)}
                        className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-slate-500 transition-all active:text-[#00E5FF]"
                        style={{ minHeight: 'unset' }}
                    >
                        <div className="p-1.5 rounded-xl">
                            <Settings size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-wider">Sector</span>
                    </button>

                    {/* Tab: Salir */}
                    <button
                        id="tab-salir"
                        onClick={() => { if (window.confirm('¿Cerrar sesión?')) logout(); }}
                        className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-slate-600 transition-all active:text-red-500"
                        style={{ minHeight: 'unset' }}
                    >
                        <div className="p-1.5 rounded-xl">
                            <LogOut size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-wider">Salir</span>
                    </button>
                </div>

                {/* Espacio para el home indicator de iOS */}
                <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
            </div>

            {/* ===== FORMULARIOS FLOTANTES ===== */}
            {formAbierto && formType && (
                <>
                    {formType === 'poste' && <FormPoste data={formData} onCancel={cerrarFormulario} />}
                    {formType === 'mufa' && <FormMufa data={formData} onCancel={cerrarFormulario} />}
                    {formType === 'caja' && <FormCaja data={formData} onCancel={cerrarFormulario} mufas={mufas} />}
                </>
            )}
        </div>
    );
};

export default Dashboard;