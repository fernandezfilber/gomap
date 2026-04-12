import { useProyectoContext } from '../context/ProyectoContext';

const useProyectos = () => {
    return useProyectoContext();
};

export default useProyectos;
