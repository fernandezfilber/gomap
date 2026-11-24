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

/**
 * Extrae coordenadas de un texto o URL.
 * PRIORIDAD CRÍTICA:
 * El marcador/pin exacto (!3d, ?q=, /place/, títulos) SIEMPRE tiene prioridad
 * sobre la cámara/viewport (@lat,lng), ya que @lat,lng suele ser el centro del servidor o zoom.
 */
const extraerCoordenadasDeTexto = (input) => {
    if (!input || typeof input !== 'string') return null;

    let texto = safeDecode(input);
    texto = safeDecode(texto);

    // 1. PRIORIDAD MÁXIMA: Marcador 3D exacto (!3dlat!4dlng)
    // Es la ubicación exacta del pin seleccionado o compartido en Google Maps
    const bangMatch = texto.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/i);
    if (bangMatch) {
        const lat = parseFloat(bangMatch[1]);
        const lng = parseFloat(bangMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'pin_exacto' };
    }

    // 2. Parámetros de búsqueda o query de pin (?q=lat,lng o query=lat,lng)
    const queryMatch = texto.match(/[?&](?:q|query)=(-?\d+\.\d+)(?:[,\s+]|%2C)+(-?\d+\.\d+)/i);
    if (queryMatch) {
        const lat = parseFloat(queryMatch[1]);
        const lng = parseFloat(queryMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'query_pin' };
    }

    // 3. Formato /place/lat,lng o /search/lat,lng
    const placeMatch = texto.match(/\/(?:place|search)\/(-?\d+\.\d+)(?:[,\s+]|%2C)+(-?\d+\.\d+)/i);
    if (placeMatch) {
        const lat = parseFloat(placeMatch[1]);
        const lng = parseFloat(placeMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'place_pin' };
    }

    // 4. Parámetros de centro o ll (center=lat,lng o ll=lat,lng)
    const centerMatch = texto.match(/[?&](?:ll|center|sll)=(-?\d+\.\d+)(?:[,\s+]|%2C)+(-?\d+\.\d+)/i);
    if (centerMatch) {
        const lat = parseFloat(centerMatch[1]);
        const lng = parseFloat(centerMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'center_ll' };
    }

    // 5. Coordenadas explícitas con al menos 4 decimales en texto (típico de coordenadas reales de calles)
    // Ej: -12.012841, -76.902132
    const explicitMatch = texto.match(/(-?\d{1,2}\.\d{4,})[\s,]+(-?\d{1,3}\.\d{4,})/);
    if (explicitMatch) {
        const lat = parseFloat(explicitMatch[1]);
        const lng = parseFloat(explicitMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'coordenada_escrita' };
    }

    // 6. ÚLTIMO RECURSO: Vista de cámara (@lat,lng)
    // Se usa solo si no hay marcador/pin específico
    const atMatch = texto.match(/@(-?\d+\.\d+)[,\s%2C]+(-?\d+\.\d+)/i);
    if (atMatch) {
        const lat = parseFloat(atMatch[1]);
        const lng = parseFloat(atMatch[2]);
        if (esCoordenadaValida(lat, lng)) return { lat, lng, tipo: 'camara_viewport' };
    }

    return null;
};

const resolverCoordenadasDesdeUrl = async (inputUrl) => {
    if (!inputUrl || typeof inputUrl !== 'string') return null;

    let targetUrl = inputUrl.trim();

    // Extraer URL si viene dentro de texto (ej. "Ubicación: https://maps.app.goo.gl/...")
    const urlExtraida = targetUrl.match(/(https?:\/\/[^\s]+)/i);
    if (urlExtraida) {
        targetUrl = urlExtraida[1];
    } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    // Si ya viene con el marcador !3d o ?q en el texto original
    const coordsDirectas = extraerCoordenadasDeTexto(targetUrl);
    if (coordsDirectas && coordsDirectas.tipo !== 'camara_viewport') {
        console.log(`📍 [GEO] Marcador exacto encontrado en URL: ${coordsDirectas.lat}, ${coordsDirectas.lng}`);
        return { lat: coordsDirectas.lat, lng: coordsDirectas.lng, urlOriginal: inputUrl, urlResuelta: targetUrl };
    }

    console.log(`🌐 [GEO] Resolviendo enlace de Google Maps: ${targetUrl}`);

    // =========================================================================
    // PASO 1: Petición HTTP rápida atrapando el Header Location del 302
    // =========================================================================
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

            // Buscar marcador en continue=... si existe
            const continueMatch = locationHeader.match(/[?&]continue=([^&]+)/i);
            if (continueMatch) {
                const continueUrl = safeDecode(continueMatch[1]);
                const coordsContinue = extraerCoordenadasDeTexto(continueUrl);
                if (coordsContinue && coordsContinue.tipo !== 'camara_viewport') {
                    console.log(`✅ [GEO] Marcador extraído de continue URL: ${coordsContinue.lat}, ${coordsContinue.lng}`);
                    return { lat: coordsContinue.lat, lng: coordsContinue.lng, urlOriginal: inputUrl, urlResuelta: continueUrl };
                }
            }

            // Buscar marcador exacto en el Location Header
            const coordsLoc = extraerCoordenadasDeTexto(locationHeader);
            if (coordsLoc && coordsLoc.tipo !== 'camara_viewport') {
                console.log(`✅ [GEO] Marcador extraído de Location Header: ${coordsLoc.lat}, ${coordsLoc.lng}`);
                return { lat: coordsLoc.lat, lng: coordsLoc.lng, urlOriginal: inputUrl, urlResuelta: locationHeader };
            }
        }
    } catch (err) {
        console.log(`⚠️ [GEO] Info paso 1: ${err.message}`);
    }

    // =========================================================================
    // PASO 2: Petición HTTP completa siguiendo redirecciones
    // =========================================================================
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
        const html = typeof fullResp.data === 'string' ? fullResp.data : '';

        console.log(`📍 [GEO] URL final tras redirecciones: ${finalUrl}`);

        // A) PRIMERA OPCIÓN: Buscar coordenadas en el <title> o <meta property="og:title">
        // Google Maps titula las ubicaciones compartidas con las coordenadas exactas: "-12.012841, -76.902132"
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
            const coordsTitle = extraerCoordenadasDeTexto(titleMatch[1]);
            if (coordsTitle) {
                console.log(`✅ [GEO] Coordenadas extraídas del <title>: ${coordsTitle.lat}, ${coordsTitle.lng}`);
                return { lat: coordsTitle.lat, lng: coordsTitle.lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
            }
        }

        const ogTitleMatch = html.match(/<meta[^>]*?property=["']og:title["'][^>]*?content=["']([^"']+)["']/i) ||
                             html.match(/<meta[^>]*?content=["']([^"']+)["'][^>]*?property=["']og:title["']/i);
        if (ogTitleMatch && ogTitleMatch[1]) {
            const coordsOgTitle = extraerCoordenadasDeTexto(ogTitleMatch[1]);
            if (coordsOgTitle) {
                console.log(`✅ [GEO] Coordenadas extraídas de og:title: ${coordsOgTitle.lat}, ${coordsOgTitle.lng}`);
                return { lat: coordsOgTitle.lat, lng: coordsOgTitle.lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
            }
        }

        // B) SEGUNDA OPCIÓN: Marcador exacto !3d o ?q en la URL final
        let coordsUrl = extraerCoordenadasDeTexto(finalUrl);
        if (coordsUrl && coordsUrl.tipo !== 'camara_viewport') {
            console.log(`✅ [GEO] Marcador extraído de URL final: ${coordsUrl.lat}, ${coordsUrl.lng}`);
            return { lat: coordsUrl.lat, lng: coordsUrl.lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
        }

        // C) TERCERA OPCIÓN: og:url
        const ogUrlMatch = html.match(/<meta[^>]*?property=["']og:url["'][^>]*?content=["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]*?content=["']([^"']+)["'][^>]*?property=["']og:url["']/i);
        if (ogUrlMatch && ogUrlMatch[1]) {
            const coordsOgUrl = extraerCoordenadasDeTexto(ogUrlMatch[1]);
            if (coordsOgUrl && coordsOgUrl.tipo !== 'camara_viewport') {
                console.log(`✅ [GEO] Coordenadas extraídas de og:url: ${coordsOgUrl.lat}, ${coordsOgUrl.lng}`);
                return { lat: coordsOgUrl.lat, lng: coordsOgUrl.lng, urlOriginal: inputUrl, urlResuelta: ogUrlMatch[1] };
            }
        }

        // D) CUARTA OPCIÓN: Imagen estática de Google Maps (center=lat%2Clng)
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

        // E) QUINTA OPCIÓN: Script de inicialización de Google Maps
        // Busca arrays como [null,null,-12.012841,-76.902132]
        const appStateMatch = html.match(/window\.APP_INITIALIZATION_STATE\s*=\s*(.+?);/);
        if (appStateMatch && appStateMatch[1]) {
            const scriptMatches = appStateMatch[1].matchAll(/(-?\d{1,2}\.\d{5,})[\s,]+(-?\d{1,3}\.\d{5,})/g);
            for (const m of scriptMatches) {
                const lat = parseFloat(m[1]);
                const lng = parseFloat(m[2]);
                if (esCoordenadaValida(lat, lng)) {
                    console.log(`✅ [GEO] Coordenadas encontradas en APP_INITIALIZATION_STATE: ${lat}, ${lng}`);
                    return { lat, lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
                }
            }
        }

        // F) ÚLTIMA OPCIÓN: Si solo existía cámara (@lat,lng) en la URL final
        if (coordsUrl) {
            console.log(`⚠️ [GEO] Usando centro de cámara como último recurso: ${coordsUrl.lat}, ${coordsUrl.lng}`);
            return { lat: coordsUrl.lat, lng: coordsUrl.lng, urlOriginal: inputUrl, urlResuelta: finalUrl };
        }

    } catch (error) {
        console.error('❌ [GEO] Error al seguir redirecciones:', error.message);
    }

    return null;
};

module.exports = {
    esCoordenadaValida,
    extraerCoordenadasDeTexto,
    resolverCoordenadasDesdeUrl
};
