import fvApi from './fvApi';

export const redService = {
    // Obtener toda la infraestructura
    getPostes: () => fvApi.get('/postes').then(res => res.data),
    getTramos: () => fvApi.get('/tramos').then(res => res.data),
    getTroncales: () => fvApi.get('/troncales').then(res => res.data),
    
    // Crear infraestructura con ID de sesión automático
    crearPoste: (data) => fvApi.post('/postes', data).then(res => res.data),
    crearMufa: (data) => fvApi.post('/mufas', data).then(res => res.data),
    crearCaja: (data) => fvApi.post('/cajas', data).then(res => res.data),
    crearTramo: (data) => fvApi.post('/tramos', data).then(res => res.data),
};