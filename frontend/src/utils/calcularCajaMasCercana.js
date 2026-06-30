// utils/calcularCajaMasCercana.js
export const calcularCajaMasCercana = (lat, lng, cajas) => {
    if (!lat || !lng || !cajas || cajas.length === 0) return null;

    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    let masCercana = null;
    let distanciaMinima = Infinity;

    cajas.forEach(caja => {
        if (!caja.latitud || !caja.longitud) return;

        const R = 6371; // Radio de la Tierra en km
        const dLat = toRadians(caja.latitud - lat);
        const dLon = toRadians(caja.longitud - lng);

        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat)) * Math.cos(toRadians(caja.latitud)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = R * c; // distancia en kilómetros

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            masCercana = caja;
        }
    });

    return masCercana;
};

export const calcularDistanciasCajas = (lat, lng, cajas) => {
    if (!lat || !lng || !cajas || cajas.length === 0) return cajas;

    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km

    const cajasConDistancia = cajas.map(caja => {
        if (!caja.latitud || !caja.longitud) return { ...caja, distanciaMetros: Infinity };

        const dLat = toRadians(caja.latitud - lat);
        const dLon = toRadians(caja.longitud - lng);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat)) * Math.cos(toRadians(caja.latitud)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanciaMetros = R * c * 1000; // a metros

        return { ...caja, distanciaMetros };
    });

    return cajasConDistancia.sort((a, b) => a.distanciaMetros - b.distanciaMetros);
};