const nodemailer = require('nodemailer');

// Configuración del transportador (utiliza un servicio como Gmail o SMTP personalizado)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio como Outlook o tu propio servidor SMTP
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Contraseña o App Password (si usas Gmail)
    },
});

// Función para enviar correos
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to, // Dirección del destinatario
            subject, // Asunto del correo
            text, // Texto del correo
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};

module.exports = sendEmail;
