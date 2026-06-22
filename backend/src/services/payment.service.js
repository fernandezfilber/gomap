const axios = require('axios');
const { prisma } = require('../config/db');

/**
 * Servicio de Pagos (PayPal)
 */

// Configuración de PayPal (En producción usar .env)
const PAYPAL_CLIENT_ID = 'AfUnH02UYtkQA37IHjbAXahkAscIgR9NGwCQyCR__3ooakMQwXeJJyOU7ehF1WPflTbt_1HNgyNEzlFU';
const PAYPAL_SECRET = 'EHvNbLd5jr3wdQsPcf0Cza4lsxk0OJpYbxGwiQ0JO7wy0AcYYDRO434KMhGDT5VUcDNhfOI42UiH6e64';
const PAYPAL_API = 'https://api-m.paypal.com'; // MODO PRODUCCIÓN ACTIVADO

// Obtener Token de Acceso
const getAccessToken = async () => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const { data } = await axios({
        url: `${PAYPAL_API}/v1/oauth2/token`,
        method: 'post',
        data: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    return data.access_token;
};

exports.createOrder = async (data) => {
    const { planId } = data;
    
    // Precios exactos en SOLES (PEN)
    const prices = {
        'NORMAL': '25.00',
        'PREMIUM': '35.00'
    };

    const price = prices[planId] || '25.00';
    const accessToken = await getAccessToken();

    const response = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'PEN', // SOLES
                    value: price,
                },
                description: `Suscripción GoMap - Plan ${planId}`
            }],
        },
    });

    return response.data;
};

exports.captureOrder = async (data) => {
    const { orderID, empresaId } = data;
    const accessToken = await getAccessToken();

    const response = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.data.status === 'COMPLETED') {
        // ¡PAGO EXITOSO! -> Automatizar desbloqueo
        const fechaFin = new Date();
        fechaFin.setDate(fechaFin.getDate() + 30); // Añadir 30 días

        await prisma.empresa.update({
            where: { id: empresaId },
            data: {
                bloqueado: false,
                motivoBloqueo: null,
                activo: true,
                finSuscripcion: fechaFin
            }
        });

        return { 
            success: true, 
            message: 'Pago completado y cuenta activada con éxito.' 
        };
    }

    throw { status: 400, message: 'El pago no se pudo completar' };
};
