const { MealTime } = require('../models/index')

module.exports = {
    async getMealTimeById (req, res){
        try {
            const result = await MealTime.findByPk(req.params.id)
            res.send(result)
                       
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se hacia el pedido del producto."
            })
        }
    },
    async getMealTimes (req, res){
        try {
            const mealtimes = await MealTime.findAll();

            res.send(mealtimes);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se traian los productos"
            })
        }
    },
    async createMealTime (req, res) {
        try {
            const { name, end_date, days, status } = req.body;

            if (!name) {
                res.status(400).send({
                  message: "El contenido no puede estar vacio!"
                });
                return;
            }

            const data = await MealTime.create({
                name: name,
                start_date: Date.now(),
                end_date: end_date,
                days: days,
                status: status
            });

            res.status(201).json({
                message: "MealTime created!",
                result: data
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se creaba el producto."
            })
        }
    },
    async updateMealTime (req, res){
        try {
            await MealTime.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "MealTime Actualizado"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se actualizaba el producto."
            })
        }
    },
    async deleteMealTime (req, res){
        try {
            await MealTime.destroy(req.body, {
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