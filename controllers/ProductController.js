const { Product } = require('../models/index')

module.exports = {
    async getOneProduct (req, res){
        try {
            const result = await Product.findByPk(req.params.id)
            let imagesArray;
            try {
                imagesArray = JSON.parse(result.images);
            } catch (error) {
                // Si no se puede parsear como JSON, asumir que es una sola URL y convertirlo en un array
                imagesArray = [result.images];
            }
            const formattedResult = {
                ...result.toJSON(),
                images: imagesArray
            };
            
            res.send(formattedResult);
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

            // Formatear el campo images de cada producto
            const productsFormatted = product.map(prod => {
                // Verificar si product.images es una cadena JSON válida
                let imagesArray;
                try {
                    imagesArray = JSON.parse(prod.images);
                } catch (error) {
                    // Si no se puede parsear como JSON, asumir que es una sola URL y convertirlo en un array
                    imagesArray = [prod.images];
                }                
                // Retornar el producto con el campo images formateado
                return {
                    ...prod.toJSON(),
                    images: imagesArray
                };
            });               

            res.send(productsFormatted);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se traian los productos"
            })
        }
    },
    //get products filtered by categoryId   
    async getProductsByCategoryId(req, res){
        try {
            const id = req.params.id;

            const productsByCat =await Product.findAll({where:{categoryId:id}}); 
            
            // Formatear el campo images de cada producto
            const productsFormatted = productsByCat.map(prod => {
                // Verificar si product.images es una cadena JSON válida
                let imagesArray;
                try {
                    imagesArray = JSON.parse(prod.images);
                } catch (error) {
                    // Si no se puede parsear como JSON, asumir que es una sola URL y convertirlo en un array
                    imagesArray = [prod.images];
                }                
                // Retornar el producto con el campo images formateado
                return {
                    ...prod.toJSON(),
                    images: imagesArray
                };
            }); 
            if(!productsFormatted){
              return res.status(404).send({message:"No hay productos relacionados a esa categoria."})
            }           
            res.send(productsFormatted);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Un error ocurrio mientra se hacia el pedido del producto."
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