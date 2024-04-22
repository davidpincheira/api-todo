const { Product } = require('../models/index')

module.exports = {
    async getProductById (req, res){
        try {
            const result = await Product.findByPk(req.params.id)
            res.send(result)
            
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se hacia el pedido del producto."
            })
        }
    },
    async getProducts (req, res){
        try {
            //paginacion
            const offset = req.query.offset==null ? 0 : parseInt(req.query.offset, 10);
            const limit = req.query.limit==null ? 10 : parseInt(req.query.limit, 10);

            const product = await Product.findAll({offset, limit});            

            res.send(product);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se traian los productos"
            })
        }
    },
    async createProduct (req, res) {
        try {
            const { name, description, price, mealtime, price_mealtime, start_date, end_date, active_days, categoryId } = req.body;

            if (!name || !price) {
                res.status(400).send({
                  message: "El contenido no puede estar vacio!"
                });
                return;
            }

            const data = await Product.create({
                name: name,
                description: description ? description : null,
                price: price,
                mealtime: mealtime,
                price_mealtime: price_mealtime,
                start_date: start_date,
                end_date: end_date,
                active_days: active_days,
                categoryId: categoryId
            });

            res.status(201).json({
                message: "Product created!",
                result: data
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se creaba el producto."
            })
        }
    },
    async updateProduct (req, res){
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Producto Actualizado"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se actualizaba el producto."
            })
        }
    },
    async deleteProduct (req, res){
        try {
            await Product.destroy(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Producto Eliminado"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se eliminaba el producto."
            })
        }
    }    

}