const paymentService = require('../services/payment.service');

// 1. Crear Orden
exports.createOrder = async (req, res) => {
    try {
        const order = await paymentService.createOrder(req.body);
        res.json(order);
    } catch (error) {
        console.error('❌ ERROR PAYPAL DETALLADO:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor de pagos',
            debug: error.response?.data?.message || error.message
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
