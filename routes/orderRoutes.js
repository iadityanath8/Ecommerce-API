const {getOrderById,checkout,getOrders} = require('../controllers/orderController')
const express = require('express')
const {admin,protect} = require('../middleware/authMiddleware')

const orderRouter = express.Router()


orderRouter.get('/',protect,getOrders)
orderRouter.get('/:id',protect,getOrderById)
orderRouter.post('/checkout',protect,checkout)


module.exports = orderRouter