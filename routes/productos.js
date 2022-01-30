const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');
const {authentication, isAdmin} = require('../middleware/authentication');




router.post('/createproducto',authentication, isAdmin,ProductoController.create)
router.put('/update/:id',authentication, isAdmin, ProductoController.update)
router.get('/getproductos',authentication, isAdmin,ProductoController.getAll)
router.delete('/:id',authentication, isAdmin, ProductoController.delete)


module.exports = router;