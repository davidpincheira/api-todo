const { Category } = require('../models/index')

module.exports = {    
    async getCategories (req, res){
        try {
            const category = await Category.findAll();

            res.send(category);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se traian las categorias"
            })
        }
    },
    async createCategory (req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                res.status(400).send({
                  message: "El contenido no puede estar vacio!"
                });
                return;
            }

            const data = await Category.create({
                name: name
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
    async updateCategory (req, res){
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
    async deleteCategory (req, res){
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