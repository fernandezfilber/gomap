const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationEmail = async (email, token, customSubject = null) => {
    const isReset = customSubject !== null;
    const subject = customSubject || 'Verifica tu cuenta en GoMap';
    const title = isReset ? 'Recuperar Contraseña' : '¡Bienvenido a GoMap!';
    const message = isReset 
        ? 'Has solicitado restablecer tu contraseña. Usa el siguiente código para completar el proceso:' 
        : 'Para activar tu cuenta y comenzar a mapear tu red de fibra óptica, usa el siguiente código de verificación:';

    await transporter.sendMail({
        from: `"GoMap Digital" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 20px;">
                <h2 style="color: #1A73E8; text-align: center;">${title}</h2>
                <p>Hola,</p>
                <p>${message}</p>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; background-color: #f1f5f9; color: #1e293b; padding: 15px 30px; border-radius: 12px; font-size: 32px; font-weight: 900; letter-spacing: 10px; border: 2px solid #e2e8f0;">
                        ${token}
                    </div>
                </div>
                <p style="color: #64748b; font-size: 14px; text-align: center;">Si no has solicitado esto, puedes ignorar este correo con seguridad.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                <p style="text-align: center; color: #94a3b8; font-size: 12px;">© 2026 GoMap Digital - Gestión de Redes</p>
            </div>
        `
    });
};
