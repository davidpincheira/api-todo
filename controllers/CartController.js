const db = require('../models');
const { Order, orderItem } = db;
const nodemailer = require('nodemailer');

const emailCodes = new Map();

module.exports = {
    async createCart_step1(req, res) {
        try {
            const { 
                orderDate, 
                deliveryAddress, 
                email, 
                name, 
                phone, 
                zip_code, 
                totalPrice, 
                finalPrice, 
                statusId, 
                active, 
                user,
                orderItems, // Array de productos del carrito
                shippingType,
                shippingCost
            } = req.body;
            
            // Crear la orden principal
            const newOrder = await Order.create({ 
                orderDate, 
                deliveryAddress, 
                email, 
                name, 
                phone, 
                zip_code, 
                totalPrice, 
                finalPrice, 
                statusId, 
                active, 
                user,
                shippingType,
                shippingCost
            });
            
            // Si se enviaron items del carrito, guardarlos en orderItem
            if (orderItems && orderItems.length > 0) {
                const orderItemsToCreate = orderItems.map(item => {
                    return {
                        orderId: newOrder.id,
                        productId: item.id,
                        price: item.price,
                        // Si necesitas agregar campos adicionales como quantity, tendrías que añadirlos al modelo
                    };
                });
                
                // Crear todos los items de la orden
                await orderItem.bulkCreate(orderItemsToCreate);
            }
            
            res.status(201).send({ 
                success: true,
                message: 'Orden creada exitosamente', 
                orderId: newOrder.id 
            });
                    
        } catch (error) {
            console.error('Error al crear la orden:', error);
            
            res.status(500).send({ 
                success: false,
                message: 'Error al crear la orden',
                error: error.message 
            });
        }
    },

    async sendVerificationCode(req, res){
        
        try {
            let { contact } = req.body;
            const email = contact


            if (!email || !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email válido es requerido'
            });
            }

            const code = generateCode();
            const sessionId = `email_${Date.now()}_${Math.random()}`;

            // Guardar código temporalmente
            emailCodes.set(sessionId, {
                code: code,
                email: email,
                timestamp: Date.now(),
                attempts: 0
            });

            // Enviar email
            const emailResult = await sendVerificationEmail(email, code);

            if (!emailResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Error enviando email'
            });
            }

            res.json({
            success: true,
            message: 'Código enviado a tu email',
            sessionId: sessionId
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
            });
        }
    },

    
    
    async verifyCode(req, res){
        try {
            let { contact: email, code } = req.body;

            console.log(req.body, emailCodes)

            // Buscar código válido
            let foundSession = null;
            for (const [sessionId, data] of emailCodes.entries()) {
                if (data.email === email && data.code === code) {
                    // Verificar expiración (10 minutos)
                    const isExpired = (Date.now() - data.timestamp) > 10 * 60 * 1000;
                    
                    if (isExpired) {
                    emailCodes.delete(sessionId);
                    return res.status(400).json({
                        success: false,
                        message: 'El código ha expirado'
                    });
                    }

                    foundSession = { sessionId, data };
                    break;
                }
            }

            if (!foundSession) {
            // Incrementar intentos fallidos
            for (const [sessionId, data] of emailCodes.entries()) {
                if (data.email === email) {
                data.attempts = (data.attempts || 0) + 1;
                if (data.attempts >= 3) {
                    emailCodes.delete(sessionId);
                    return res.status(429).json({
                    success: false,
                    message: 'Demasiados intentos. Solicita un nuevo código.'
                    });
                }
                break;
                }
            }

            return res.status(400).json({
                success: false,
                message: 'Código incorrecto'
            });
            }

            // Generar token de invitado
            const jwt = require('jsonwebtoken');
            const guestToken = jwt.sign(
            { 
                email: email,
                verified: true,
                type: 'guest'
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
            );

            // Limpiar código usado
            emailCodes.delete(foundSession.sessionId);

            res.json({
                success: true,
                message: 'Email verificado exitosamente',
                guestToken: guestToken
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
            });
        }    
    }
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendVerificationEmail(email, code) {
    try {
        const transporter = createGmailTransporter();

        const mailOptions = {
        from: `"Tu Tienda" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Código de verificación - Tu Tienda',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <style>
                .container { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
                }
                .header { 
                background: #4f46e5; 
                color: white; 
                padding: 20px; 
                text-align: center; 
                border-radius: 8px 8px 0 0; 
                }
                .content { 
                background: #f9fafb; 
                padding: 30px; 
                border-radius: 0 0 8px 8px; 
                }
                .code-box { 
                background: white; 
                padding: 20px; 
                text-align: center; 
                border-radius: 8px; 
                margin: 20px 0; 
                border: 2px dashed #d1d5db; 
                }
                .code { 
                font-size: 32px; 
                font-weight: bold; 
                letter-spacing: 8px; 
                color: #1f2937; 
                font-family: 'Courier New', monospace; 
                }
                .footer { 
                color: #6b7280; 
                font-size: 14px; 
                text-align: center; 
                margin-top: 20px; 
                }
            </style>
            </head>
            <body>
            <div class="container">
                <div class="header">
                <h1>Verificación de Pedido</h1>
                </div>
                <div class="content">
                <h2>¡Hola!</h2>
                <p>Gracias por tu pedido. Para completar la verificación, ingresa el siguiente código:</p>
                
                <div class="code-box">
                    <div class="code">${code}</div>
                </div>
                
                <p><strong>Este código expira en 10 minutos.</strong></p>
                <p>Si no solicitaste este código, puedes ignorar este email de forma segura.</p>
                
                <div class="footer">
                    <p>© 2025 Tu Tienda. Todos los derechos reservados.</p>
                    <p>Este email fue enviado automáticamente, por favor no respondas.</p>
                </div>
                </div>
            </div>
            </body>
            </html>
        `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('Error enviando email:', error);
        return { success: false, error: error.message };
    }
}

function createGmailTransporter(){
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // tu-email@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD // Contraseña de aplicación
    }
  });
};


setInterval(() => {
  const now = Date.now();
  for (const [sessionId, data] of emailCodes.entries()) {
    if (now - data.timestamp > 10 * 60 * 1000) { // 10 minutos
      emailCodes.delete(sessionId);
    }
  }
}, 60000); 