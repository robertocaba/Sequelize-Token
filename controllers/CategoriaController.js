const categoria = require('../models/Categoria.js');
const { Producto, Categoria, Sequelize } = require('../models/index.js');
const {Op}= Sequelize;

const CategoriaController = {
    async create(req, res) {
        try {
            if(!req.body.name){
                return res.status(400).json({msg:'Por favor rellene todos los campos'})
            }
            const {productos, ...data} = req.body
            const categoria = await Categoria.create(data);

            if(productos && productos.length > 0) {
                categoria.setProductos(productos)
            }

            return res.status(200).send({msg: 'Categoria creado con exito', categoria})
        }catch(error) {
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el producto'})
        } 
    },

    getAll(req,res){
        Categoria.findAll({
            include:[{model: Producto, as: 'productos', through: {attributes: []}}]
        })
        .then(categoria=> res.status(200).send({description:"Todos las categorias y sus productos",categoria}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar las categorias y sus productos'})
        })
    },


    async delete(req, res) {
        try {
            await Categoria.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'La categoria ha sido eliminada con éxito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"ha habido un problema al eliminar la categoria"})
        }
    }     
}

module.exports = CategoriaController;