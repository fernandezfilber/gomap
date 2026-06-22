const fs = require('fs');

let content = fs.readFileSync('src/components/map/MapaPrincipal.jsx', 'utf8');

const oldPoly1 = `<LayerGroup>
                            {tramos.map((tramo) => (
                                <Polyline
                                    key={\`tramo-\${tramo.id}\`}
                                    positions={tramo.path}
                                    pathOptions={{
                                        color: '#ef4444',
                                        weight: 5,
                                        opacity: 0.9,
                                        lineCap: 'round',
                                        lineJoin: 'round'
                                    }}
                                    eventHandlers={{
                                        contextmenu: (e) => {
                                            L.DomEvent.stopPropagation(e);
                                            L.DomEvent.preventDefault(e);
                                            handleEliminarTramo(tramo.id);
                                        }
                                    }}
                                />
                            ))}
                        </LayerGroup>`;

const newPoly1 = `<LayerGroup>
                            {tramos.map((tramo) => (
                                <Polyline
                                    key={\`tramo-\${tramo.id}\`}
                                    positions={tramo.path}
                                    pathOptions={{
                                        color: '#ef4444',
                                        weight: 5,
                                        opacity: 0.9,
                                        lineCap: 'round',
                                        lineJoin: 'round'
                                    }}
                                >
                                    <Popup>
                                        <div className="text-center min-w-[150px]">
                                            <p className="font-bold mb-2">Tramo: {tramo.nombre || \`Tramo \${tramo.id}\`}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEliminarTramo(tramo.id);
                                                }}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm flex items-center justify-center gap-2 mx-auto w-full"
                                            >
                                                <Trash2 size={16} /> Eliminar Tramo
                                            </button>
                                        </div>
                                    </Popup>
                                </Polyline>
                            ))}
                        </LayerGroup>`;

content = content.replace(oldPoly1, newPoly1);

// Now remove the second block with the overlay and all
const regexToRemove = /<LayersControl\.Overlay checked name="[^"]*Tramos de Cable">\s*<LayerGroup>\s*\{tramos\.map\(\(tramo\) => \(\s*<Polyline[\s\S]*?<\/LayerGroup>\s*<\/LayersControl\.Overlay>/g;

const matches = content.match(regexToRemove);
if (matches && matches.length > 1) {
    // Only remove the second one
    content = content.replace(matches[1], '');
}

fs.writeFileSync('src/components/map/MapaPrincipal.jsx', content);
console.log("File updated successfully");
