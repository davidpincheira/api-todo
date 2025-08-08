const { Payment } = require('../models/index')

module.exports = {
    async receivePayment (req, res){
        try {

            console.log(req.body.cardDetails)
            const { cardName, cardNumber, expiryDate, cvv } = req.body.cardDetails;

            if (!cardName || !cardNumber || !expiryDate || !cvv) {
                res.status(400).send({
                  message: "El contenido no puede estar vacio!"
                });
                return;
            }

            const data = await Payment.create({
                cardName,
                cardNumber,
                expiryDate,
                cvv
            });

            res.status(201).json({
                message: "Payment made!",
                result: data
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se creaba el producto."
            })
        }
    },
    /* async getOrderDetails (req, res){
        try {
            const orderdetail = await OrderDetail.findAll();

            res.send(orderdetail);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se traian los productos"
            })
        }
    },
    async createOrderDetail (req, res) {
        try {
            const { quantity, total_ammount, orderId, productId, couponId } = req.body;

            if (!quantity || !total_ammount) {
                res.status(400).send({
                  message: "El contenido no puede estar vacio!"
                });
                return;
            }

            const data = await OrderDetail.create({
                quantity: quantity,
                total_ammount: total_ammount,
                orderId: orderId,
                productId: productId,
                couponId: couponId
            });

            res.status(201).json({
                message: "OrderDetail created!",
                result: data
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se creaba el producto."
            })
        }
    } */

}