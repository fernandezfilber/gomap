const fs = require('fs');
let text = fs.readFileSync('src/components/map/MapaPrincipal.jsx', 'utf8');

text = text.replace(
    "const { mufas, crearMufa, eliminarMufa } = useMufas(proyectoSeleccionado?.id);",
    "const { mufas, crearMufa, eliminarMufa, actualizarMufa } = useMufas(proyectoSeleccionado?.id);"
);

text = text.replace(
    "const { cajas, crearCaja, eliminarCaja } = useCajas(proyectoSeleccionado?.id);",
    "const { cajas, crearCaja, eliminarCaja, actualizarCaja } = useCajas(proyectoSeleccionado?.id);"
);

fs.writeFileSync('src/components/map/MapaPrincipal.jsx', text);
console.log("Hooks destructurados actualizados correctamente");
