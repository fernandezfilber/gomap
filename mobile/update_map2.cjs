const fs = require('fs');
let text = fs.readFileSync('src/components/map/MapaPrincipal.jsx', 'utf8');

// 1. Add actualizarMufa to FormMufa
text = text.replace(
    "crearMufa={crearMufa}\n                        />",
    "crearMufa={crearMufa}\n                            actualizarMufa={actualizarMufa}\n                        />"
);

// 2. Add actualizarCaja to FormCaja
text = text.replace(
    "crearCaja={crearCaja}\n                            mufas={mufas}\n                        />",
    "crearCaja={crearCaja}\n                            actualizarCaja={actualizarCaja}\n                            mufas={mufas}\n                        />"
);

// 3. Edit button for Caja
const cajaButtonOriginal = `<button
                            onClick={() => handleEliminarCaja(caja.id)}
                            className="mt-3 text-red-600 hover:text-red-700 flex items-center gap-1 mx-auto"
                        >
                            <Trash2 size={16} /> Eliminar Caja
                        </button>`;

const cajaButtonNew = `<div className="flex gap-4 justify-center mt-4">
                            <button
                                onClick={() => setModal({ show: true, type: 'caja', data: caja })}
                                className="text-blue-500 hover:text-blue-400 font-medium"
                            >
                                Editar Caja
                            </button>
                            <button
                                onClick={() => handleEliminarCaja(caja.id)}
                                className="text-red-500 hover:text-red-400 flex items-center gap-1 font-medium"
                            >
                                <Trash2 size={16} /> Eliminar
                            </button>
                        </div>`;

text = text.replace(cajaButtonOriginal, cajaButtonNew);

// 4. Edit button for Mufa
const mufaButtonOriginal = `<button
                                                onClick={() => handleEliminarMufa(m.id)}
                                                className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-1 mx-auto"
                                            >
                                                <Trash2 size={16} /> Eliminar Mufa
                                            </button>`;

const mufaButtonNew = `<div className="flex gap-4 justify-center mt-4">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setModal({ show: true, type: 'mufa', data: m }); }}
                                                    className="text-blue-500 hover:text-blue-400 font-medium"
                                                >
                                                    Editar Mufa
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarMufa(m.id)}
                                                    className="text-red-500 hover:text-red-400 flex items-center gap-1 font-medium"
                                                >
                                                    <Trash2 size={16} /> Eliminar
                                                </button>
                                            </div>`;

text = text.replace(mufaButtonOriginal, mufaButtonNew);

fs.writeFileSync('src/components/map/MapaPrincipal.jsx', text);
console.log("Updated MapaPrincipal.jsx successfully");
