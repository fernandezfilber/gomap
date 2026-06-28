const axios = require('axios');
const { prisma } = require('../config/db');

/**
 * Servicio de Pagos (PayPal)
 */

// Configuración de PayPal (desde variables de entorno)
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET    = process.env.PAYPAL_SECRET;
const PAYPAL_API       = process.env.PAYPAL_API || 'https://api-m.paypal.com';

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
    
    // Precios en USD
    const prices = {
        'MENSUAL': '6.99',   // ~25 soles
        'ANUAL':   '9.99'    // ~35 soles
    };

    const price = prices[planId] || '6.99';
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
                    currency_code: 'USD',
                    value: price,
                },
                description: `GoMap Suscripción - Plan ${planId}`
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
        const { planId } = data;

        const fechaFin = new Date();
        // MENSUAL = 30 días, ANUAL = 365 días
        const dias = planId === 'ANUAL' ? 365 : 30;
        fechaFin.setDate(fechaFin.getDate() + dias);

        await prisma.empresa.update({
            where: { id: empresaId },
            data: {
                bloqueado:     false,
                motivoBloqueo: null,
                activo:        true,
                plan:          planId === 'ANUAL' ? 'ANUAL' : 'MENSUAL',
                finSuscripcion: fechaFin
            }
        });

        return { 
            success: true, 
            message: `Pago completado. Suscripción ${planId} activada hasta ${fechaFin.toLocaleDateString('es-PE')}.` 
        };
    }

    throw { status: 400, message: 'El pago no se pudo completar' };
};
