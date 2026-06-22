import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
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

    // Función para abrir formularios desde el mapa o toolbox
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
        <div className="h-screen w-screen bg-slate-950 overflow-hidden flex flex-col">
            
            {/* Navbar Superior (Móvil) */}
            <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center z-[1002]">
                <GoMapLogo className="h-7 w-7" textClassName="text-lg" />
                
                <div className="flex items-center gap-2">
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
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                
                {/* Sidebar Izquierdo */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Área del Mapa */}
                <div className="flex-1 relative">
                    
                    {/* Mapa Principal */}
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