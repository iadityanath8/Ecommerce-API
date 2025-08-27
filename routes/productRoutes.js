const express = require('express')
const {protect, admin} = require('../middleware/authMiddleware')
const {addProduct,getAllProduct,getProductById,updateProduct,deleteProduct} = require('../controllers/productController')

const productRouter = express.Router()


productRouter.get('/',getAllProduct)
productRouter.get('/:id',protect,getProductById)
productRouter.post('/', protect,admin, addProduct) // special only for the admin in here
productRouter.put('/:id',protect,admin,updateProduct)
productRouter.delete('/:id',protect, admin,deleteProduct)
module.exports = productRouter

