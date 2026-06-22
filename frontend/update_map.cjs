const fs = require('fs');
let text = fs.readFileSync('src/components/map/MapaPrincipal.jsx', 'utf8');

// 1. Add colorTramoTemporal state
text = text.replace(
    "const [puntosTemporales, setPuntosTemporales] = useState([]);",
    "const [puntosTemporales, setPuntosTemporales] = useState([]);\n    const [colorTramoTemporal, setColorTramoTemporal] = useState('#ef4444');"
);

// 2. Add colorVisual inside finalizarTramo -> crearTramo
text = text.replace(
    "posteFinId: nodoFin.id,",
    "posteFinId: nodoFin.id,\n            colorVisual: colorTramoTemporal,"
);

// 3. Update the temporary polyline color
text = text.replace(
    "color: '#a855f7',        // Color violeta bonito",
    "color: colorTramoTemporal,"
);

// 4. Update the mapped polylines color
text = text.replace(
    "color: '#ef4444',",
    "color: tramo.colorVisual || '#ef4444',"
);

// 5. Add color picker in the UI
text = text.replace(
    `<span className="font-bold uppercase tracking-widest text-xs text-slate-400">TRAMO EN PROGRESO</span>`,
    `<span className="font-bold uppercase tracking-widest text-xs text-slate-400">TRAMO EN PROGRESO</span>
                    <input 
                        type="color" 
                        value={colorTramoTemporal} 
                        onChange={(e) => setColorTramoTemporal(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                        title="Color del Tramo"
                    />`
);

// 6. Reset colorTramoTemporal when finished or cancelled
text = text.replaceAll(
    "setNodoFin(null);",
    "setNodoFin(null);\n                            setColorTramoTemporal('#ef4444');"
);

fs.writeFileSync('src/components/map/MapaPrincipal.jsx', text);
console.log("Updated MapaPrincipal.jsx successfully");
