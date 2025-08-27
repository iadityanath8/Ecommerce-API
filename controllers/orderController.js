const Order = require('../models/orderSchema')
const Cart = require('../models/cartModel')
const Product = require('../models/productsModel')
const calculateTotal = require('../utils/utility')

const checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalPrize = cart.totalPrice
        const order = await Order.create({
            user: req.user._id,
            items: cart.items.map(i => ({
                product: i.product._id,
                quantity: i.quantity,
                price: i.product.price
            })),
            totalPrice: totalPrize,
            status: 'Pending'
        })

        for (let item of cart.items) {
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        cart.items = []
        cart.totalPrice = 0
        await cart.save()
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("items.product");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ orders });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findOne({ _id: id, user: req.user._id }).populate("items.product");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ order });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {getOrderById,checkout,getOrders}