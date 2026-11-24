const axios = require('axios');

const esCoordenadaValida = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};

const extraerCoordenadasDeTexto = (input) => {
    if (!input || typeof input !== 'string') return null;

    const texto = decodeURIComponent(input);

    // 1. Patrones con etiquetas específicas de Google Maps
    // Formato @lat,lng
    const atMatch = texto.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
        const lat = parseFloat(atMatch[1]);
        const lng = parseFloat(atMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // Formato !3dlat!4dlng (embed de Google Maps)
    const bangMatch = texto.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (bangMatch) {
        const lat = parseFloat(bangMatch[1]);
        const lng = parseFloat(bangMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // Formato ?q=lat,lng o &q=lat,lng o query=lat,lng o ll=lat,lng
    const queryMatch = texto.match(/[?&](?:q|query|ll|center)=(-?\d+\.\d+)[,\s+](-?\d+\.\d+)/i);
    if (queryMatch) {
        const lat = parseFloat(queryMatch[1]);
        const lng = parseFloat(queryMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // Formato /place/lat,lng o /place/lat+lng
    const placeMatch = texto.match(/\/place\/(-?\d+\.\d+)[,+]+(-?\d+\.\d+)/i);
    if (placeMatch) {
        const lat = parseFloat(placeMatch[1]);
        const lng = parseFloat(placeMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // Formato simple: -12.0123, -76.8765
    const simpleMatch = texto.match(/(-?\d+\.\d+)[\s,]+(-?\d+\.\d+)/);
    if (simpleMatch) {
        const lat = parseFloat(simpleMatch[1]);
        const lng = parseFloat(simpleMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    return null;
};

const resolverCoordenadasDesdeUrl = async (inputUrl) => {
    if (!inputUrl || typeof inputUrl !== 'string') return null;

    let targetUrl = inputUrl.trim();

    // Extraer URL si está dentro de un texto más largo (ej. mensaje de WhatsApp)
    const urlExtraida = targetUrl.match(/(https?:\/\/[^\s]+)/i);
    if (urlExtraida) {
        targetUrl = urlExtraida[1];
    } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    // 1. Verificación directa en el texto de la URL
    const coordsDirectas = extraerCoordenadasDeTexto(targetUrl);
    if (coordsDirectas) {
        return { ...coordsDirectas, urlOriginal: inputUrl, urlResuelta: targetUrl };
    }

    // 2. Si es un link acortado (como maps.app.goo.gl o goo.gl/maps), hacer petición HTTP para seguir redirecciones
    try {
        console.log(`🌐 [GEO] Resolviendo link de Google Maps: ${targetUrl}`);

        const response = await axios.get(targetUrl, {
            maxRedirects: 10,
            timeout: 12000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
            }
        });

        const finalUrl = response.request?.res?.responseUrl || response.config?.url || '';
        console.log(`📍 [GEO] URL final tras redirección: ${finalUrl}`);

        // Intentar extraer de la URL final
        let coords = extraerCoordenadasDeTexto(finalUrl);
        if (coords) {
            return { ...coords, urlOriginal: inputUrl, urlResuelta: finalUrl };
        }

        const html = typeof response.data === 'string' ? response.data : '';

        // Búsqueda en meta tags (og:url)
        const ogUrlMatch = html.match(/<meta[^>]*?property=["']og:url["'][^>]*?content=["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]*?content=["']([^"']+)["'][^>]*?property=["']og:url["']/i);
        if (ogUrlMatch && ogUrlMatch[1]) {
            coords = extraerCoordenadasDeTexto(ogUrlMatch[1]);
            if (coords) return { ...coords, urlOriginal: inputUrl, urlResuelta: ogUrlMatch[1] };
        }

        // Búsqueda en imagen estática de Google Maps (center=lat%2Clng)
        const imageMatch = html.match(/content=["'](https?:\/\/[^"']*?center=([^"&]+)[^"']*)["']/i);
        if (imageMatch && imageMatch[2]) {
            const centerDecoded = decodeURIComponent(imageMatch[2]);
            const parts = centerDecoded.split(',');
            if (parts.length === 2) {
                const lat = parseFloat(parts[0]);
                const lng = parseFloat(parts[1]);
                if (esCoordenadaValida(lat, lng)) {
                    return { lat, lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
                }
            }
        }

        // Búsqueda en estructuras JSON o variables de Google Maps en el HTML
        // Formatos tipo: window.APP_INITIALIZATION_STATE=[...[-12.0123456,-76.8765432]...]
        const matchesInHtml = html.matchAll(/(-?\d{1,2}\.\d{4,})[\s,]+(-?\d{1,3}\.\d{4,})/g);
        for (const m of matchesInHtml) {
            const lat = parseFloat(m[1]);
            const lng = parseFloat(m[2]);
            if (esCoordenadaValida(lat, lng)) {
                return { lat, lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
            }
        }

    } catch (error) {
        console.error('❌ [GEO] Error al resolver link acortado:', error.message);
    }

    return null;
};

module.exports = {
    esCoordenadaValida,
    extraerCoordenadasDeTexto,
    resolverCoordenadasDesdeUrl
};
