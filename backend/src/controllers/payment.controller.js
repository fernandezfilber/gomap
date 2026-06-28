const paymentService = require('../services/payment.service');

// 1. Crear Orden
exports.createOrder = async (req, res) => {
    try {
        const order = await paymentService.createOrder(req.body);
        res.json(order);
    } catch (error) {
        const paypalError = error.response?.data;
        console.error('❌ ERROR PAYPAL DETALLADO:', JSON.stringify(paypalError || error.message, null, 2));
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor de pagos',
            debug: paypalError || error.message
        });
    }
};

// 2. Capturar Pago y Activar Cuenta
exports.captureOrder = async (req, res) => {
    try {
        const result = await paymentService.captureOrder(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error PayPal Capture:', error.message);
        res.status(error.status || 500).json({ success: false, message: error.message || 'Error al procesar el pago' });
    }
};
