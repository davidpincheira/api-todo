const { OrderDetail } = require('../models/index')

module.exports = {
    async getOrderDetailById (req, res){
        try {
            const result = await OrderDetail.findByPk(req.params.id)
            res.send(result)
            
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se hacia el pedido del producto."
            })
        }
    },
    async getOrderDetails (req, res){
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
    },
    async updateOrderDetail (req, res){
        try {
            await OrderDetail.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "OrderDetail Actualizado"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se actualizaba el producto."
            })
        }
    },
    async deleteOrderDetail (req, res){
        try {
            await OrderDetail.destroy(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "OrderDetail Eliminado"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se eliminaba el producto."
            })
        }
    }    

}