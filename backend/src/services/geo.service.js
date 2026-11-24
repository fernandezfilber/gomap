const axios = require('axios');

const esCoordenadaValida = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};

const safeDecode = (str) => {
    if (!str || typeof str !== 'string') return '';
    try {
        return decodeURIComponent(str);
    } catch {
        return str;
    }
};

const extraerCoordenadasDeTexto = (input) => {
    if (!input || typeof input !== 'string') return null;

    // Normalizar string y decodificar dos veces si viene doblemente codificado (ej: %252C)
    let texto = safeDecode(input);
    texto = safeDecode(texto);

    // 1. Formato @lat,lng
    const atMatch = texto.match(/@(-?\d+\.\d+)[,\s%2C]+(-?\d+\.\d+)/i);
    if (atMatch) {
        const lat = parseFloat(atMatch[1]);
        const lng = parseFloat(atMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // 2. Formato !3dlat!4dlng (embeds de Google Maps)
    const bangMatch = texto.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/i);
    if (bangMatch) {
        const lat = parseFloat(bangMatch[1]);
        const lng = parseFloat(bangMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // 3. Formato ?q=lat,lng o &q=lat,lng o query=lat,lng o ll=lat,lng o center=lat,lng
    const queryMatch = texto.match(/[?&](?:q|query|ll|center|sll)=(-?\d+\.\d+)(?:[,\s+]|%2C)+(-?\d+\.\d+)/i);
    if (queryMatch) {
        const lat = parseFloat(queryMatch[1]);
        const lng = parseFloat(queryMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // 4. Formato /place/lat,lng o /place/lat+lng
    const placeMatch = texto.match(/\/place\/(-?\d+\.\d+)(?:[,\s+]|%2C)+(-?\d+\.\d+)/i);
    if (placeMatch) {
        const lat = parseFloat(placeMatch[1]);
        const lng = parseFloat(placeMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    // 5. Coordenadas explícitas con al menos 3 decimales (para no confundir con IDs o números de rutas)
    // Ej: -12.01234, -76.87654
    const explicitMatch = texto.match(/(-?\d{1,2}\.\d{3,})[\s,]+(-?\d{1,3}\.\d{3,})/);
    if (explicitMatch) {
        const lat = parseFloat(explicitMatch[1]);
        const lng = parseFloat(explicitMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng };
    }

    return null;
};

const resolverCoordenadasDesdeUrl = async (inputUrl) => {
    if (!inputUrl || typeof inputUrl !== 'string') return null;

    let targetUrl = inputUrl.trim();

    // Extraer URL si viene dentro de texto (ej. "Te mando la ubicación: https://maps.app.goo.gl/...")
    const urlExtraida = targetUrl.match(/(https?:\/\/[^\s]+)/i);
    if (urlExtraida) {
        targetUrl = urlExtraida[1];
    } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    // 1. Verificación directa si la URL ya contiene las coordenadas escritas
    const coordsDirectas = extraerCoordenadasDeTexto(targetUrl);
    if (coordsDirectas) {
        console.log(`📍 [GEO] Coordenadas directas encontradas en URL: ${coordsDirectas.lat}, ${coordsDirectas.lng}`);
        return { ...coordsDirectas, urlOriginal: inputUrl, urlResuelta: targetUrl };
    }

    console.log(`🌐 [GEO] Resolviendo link de Google Maps: ${targetUrl}`);

    // 2. PASO 1: Petición HTTP rápida sin seguir redirecciones (maxRedirects: 0)
    // Google Maps devuelve inmediatamente un 302 con el header 'location' que contiene la URL final con las coordenadas
    try {
        const initialResp = await axios.get(targetUrl, {
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400,
            timeout: 8000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });

        const locationHeader = initialResp.headers?.location;
        if (locationHeader) {
            console.log(`📍 [GEO] Location Header detectado: ${locationHeader}`);
            
            // Intentar extraer del header location directamente
            let coordsLoc = extraerCoordenadasDeTexto(locationHeader);
            if (coordsLoc) {
                console.log(`✅ [GEO] Coordenadas extraídas del Location Header: ${coordsLoc.lat}, ${coordsLoc.lng}`);
                return { ...coordsLoc, urlOriginal: inputUrl, urlResuelta: locationHeader };
            }

            // Si el header location redirige a un parámetro continue=...
            const continueMatch = locationHeader.match(/[?&]continue=([^&]+)/i);
            if (continueMatch) {
                const continueUrl = safeDecode(continueMatch[1]);
                coordsLoc = extraerCoordenadasDeTexto(continueUrl);
                if (coordsLoc) {
                    console.log(`✅ [GEO] Coordenadas extraídas de continue URL: ${coordsLoc.lat}, ${coordsLoc.lng}`);
                    return { ...coordsLoc, urlOriginal: inputUrl, urlResuelta: continueUrl };
                }
            }
        }
    } catch (err) {
        console.log(`⚠️ [GEO] Intento de captura de 302: ${err.message}`);
    }

    // 3. PASO 2: Si el header inicial no fue suficiente, seguir todas las redirecciones hasta el final
    try {
        const fullResp = await axios.get(targetUrl, {
            maxRedirects: 10,
            timeout: 12000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
            }
        });

        const finalUrl = fullResp.request?.res?.responseUrl || fullResp.config?.url || '';
        console.log(`📍 [GEO] URL final tras redirecciones completas: ${finalUrl}`);

        let coords = extraerCoordenadasDeTexto(finalUrl);
        if (coords) {
            console.log(`✅ [GEO] Coordenadas extraídas de URL final: ${coords.lat}, ${coords.lng}`);
            return { ...coords, urlOriginal: inputUrl, urlResuelta: finalUrl };
        }

        const html = typeof fullResp.data === 'string' ? fullResp.data : '';

        // Búsqueda en <meta property="og:url" content="...">
        const ogUrlMatch = html.match(/<meta[^>]*?property=["']og:url["'][^>]*?content=["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]*?content=["']([^"']+)["'][^>]*?property=["']og:url["']/i);
        if (ogUrlMatch && ogUrlMatch[1]) {
            coords = extraerCoordenadasDeTexto(ogUrlMatch[1]);
            if (coords) {
                console.log(`✅ [GEO] Coordenadas extraídas de og:url: ${coords.lat}, ${coords.lng}`);
                return { ...coords, urlOriginal: inputUrl, urlResuelta: ogUrlMatch[1] };
            }
        }

        // Búsqueda en imagen estática de Google Maps (center=lat%2Clng)
        const imageMatch = html.match(/content=["'](https?:\/\/[^"']*?center=([^"&]+)[^"']*)["']/i);
        if (imageMatch && imageMatch[2]) {
            const centerDecoded = safeDecode(imageMatch[2]);
            const parts = centerDecoded.split(',');
            if (parts.length === 2) {
                const lat = parseFloat(parts[0]);
                const lng = parseFloat(parts[1]);
                if (esCoordenadaValida(lat, lng)) {
                    console.log(`✅ [GEO] Coordenadas extraídas de imagen estática: ${lat}, ${lng}`);
                    return { lat, lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
                }
            }
        }

        // Búsqueda en el cuerpo del script de Google Maps (APP_INITIALIZATION_STATE o arrays de coordenadas)
        const matchesInHtml = html.matchAll(/(-?\d{1,2}\.\d{4,})[\s,]+(-?\d{1,3}\.\d{4,})/g);
        for (const m of matchesInHtml) {
            const lat = parseFloat(m[1]);
            const lng = parseFloat(m[2]);
            if (esCoordenadaValida(lat, lng)) {
                console.log(`✅ [GEO] Coordenadas encontradas en HTML: ${lat}, ${lng}`);
                return { lat, lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
            }
        }

    } catch (error) {
        console.error('❌ [GEO] Error al seguir redirecciones completas:', error.message);
    }

    return null;
};

module.exports = {
    esCoordenadaValida,
    extraerCoordenadasDeTexto,
    resolverCoordenadasDesdeUrl
};
