const { Producto, Categoria, Rela, Sequelize } = require('../models/index.js');
const {Op}= Sequelize;

const ProductoController = {
    async create(req, res) {
        try {
            
            if(!req.body.name || !req.body.categoria || !req.body.price){
                return res.status(400).json({msg:'Rellene todos los campos'})
            }
            const {categorias, ...data} = req.body
            const product = await Producto.create(data);

            if(categorias && categorias.length > 0) {
                product.setCategorias(categorias)
            }

            return res.status(200).send({msg: 'Producto creado con exito', producto})
        }catch(error) {
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el producto'})
        } 
    },

    async update(req,res) {
        try {
            if (categorias && categorias.length > 0) {
                producto.setCategorias(categorias)
            }

            return res.status(200).send({ message: 'Producto actualizado con exito', producto})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "No ha sido posible actualizar el producto"})
        }
    },


    getAll(req,res){
        Product.findAll({
            include:[{model: Categoria, as: 'categorias', through: {attributes: []}}]
        })
        .then(producto=> res.status(200).send({description:"Todos los productos y sus categorias",producto}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los productos y sus categorias'})
        })
    },

      async delete(req, res) {
        try {
            await Producto.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'El producto ha sido eliminado con éxito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"ha habido un problema al eliminar el producto"})
        }
    }      
}

module.exports = ProductoController;