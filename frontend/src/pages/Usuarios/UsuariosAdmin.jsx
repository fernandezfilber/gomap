import React, { useState, useEffect } from 'react';
import fvApi from '../../api/fvApi';
import { Users, UserPlus, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UsuariosAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Only Admin can view this
    if (user && user.rol !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
    fetchTeam();
  }, [user]);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fvApi.get('/auth/team');
      if (res.data.success) {
        setTeam(res.data.team);
      }
    } catch (error) {
      console.error("Error fetching team", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fvApi.post('/auth/register-tecnico', formData);
      setShowForm(false);
      setFormData({ nombre: '', email: '', password: '' });
      fetchTeam();
      alert("Técnico registrado exitosamente");
    } catch (error) {
      console.error("Error creating technician", error);
      alert(error.response?.data?.message || "Ocurrió un error al registrar el técnico");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600" />
            Mi Equipo
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona los técnicos y personal de tu empresa.
          </p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          {showForm ? 'Cancelar' : 'Añadir Técnico'}
        </button>
      </div>

      {/* Formulario de Creación */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Registrar Nuevo Técnico</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="juan@empresa.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Inicial</label>
              <input 
                type="password" 
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div className="md:col-span-3 flex justify-end mt-2">
              <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm"
              >
                Guardar Técnico
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600">Usuario</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Rol</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Último Acceso</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {member.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.nombre}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={12} /> {member.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    member.rol === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Shield size={12} />
                    {member.rol}
                  </span>
                </td>
                <td className="p-4">
                  {member.activo ? (
                    <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                      <CheckCircle size={16} /> Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-red-500 font-medium">
                      <XCircle size={16} /> Inactivo
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {member.ultimoLogin ? new Date(member.ultimoLogin).toLocaleDateString() : 'Nunca'}
                </td>
              </tr>
            ))}
            
            {team.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No hay usuarios registrados en tu equipo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
