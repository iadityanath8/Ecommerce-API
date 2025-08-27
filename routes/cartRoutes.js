const express = require('express')
const {protect,admin} = require('../middleware/authMiddleware')
const {addToCart,clearCart,deleteCartItem,updateCartItem, getCart} = require('../controllers/cartController')

const cartRouter = express.Router()

cartRouter.get('/',protect,getCart)
cartRouter.put('/',protect,updateCartItem)
cartRouter.delete('/',protect, deleteCartItem)
cartRouter.post('/addtocart',protect, addToCart)
cartRouter.delete('/clear',protect,clearCart)


module.exports = cartRouter