const Cart = require('../models/cartModel')
const Product = require('../models/productsModel')
const calculateTotal =  require('../utils/utility')

// GET 
// @route /api/cart

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
        if (!cart) return res.status(404).json({ message: "Cart Not found" });
        res.status(200).json(cart)
    } catch (err) {
        console.log("Hey i am here in here woow", req)
        res.status(500).json({ message: "Internal server error", err });
    }
}

// POST 
// @route /api/cart/addToCart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not Found" });

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 })
        }

        const itemIndex = cart.items.findIndex(i => i.product.toString() === productId)
        if (itemIndex > -1) {
            const newQty = cart.items[itemIndex].quantity + quantity
            if (newQty > product.stock) {
                return res.status(400).json({ message: `Stock limit exceeded. Only ${product.stock} available.` });
            }
            cart.items[itemIndex].quantity = newQty;
        } else {
            cart.items.push({ product: productId, quantity })
        }

        cart.totalPrice = await calculateTotal(cart.items)
        await cart.save();
        res.status(201).json(cart);
    } catch (e) {
        res.status(404).json({
            message: "Internal Server Error", e
        })
    }
}

// Update 
// @route /api/cart/
const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body; // send productId from frontend

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        // Find item in cart by productId
        const item = cart.items.find(i => i.product.toString() === productId);
        if (!item) return res.status(404).json({ message: "Item Not found in the Cart" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not found" });

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} items available` });
        }

        item.quantity = quantity;
        cart.totalPrice = await calculateTotal(cart.items);
        await cart.save();

        res.status(200).json(cart);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// DELETE 
// @route /api/cart/:id

const deleteCartItem = async (req, res) => {
    const { productId } = req.body; 

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart Not found" });

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(i => i.product.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: "Item not found in the cart" });
        }

        cart.totalPrice = await calculateTotal(cart.items);
        await cart.save();

        res.status(200).json({ message: "Successfully removed the cart item", cart });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE entire cart 
// @route /api/cart/clear

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        cart.items = []
        cart.totalPrice = 0
        await cart.save()
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (e) {
        res.status(500).json({ message: "Internal server error", err });
    }
}

module.exports = {clearCart,addToCart,deleteCartItem,updateCartItem,getCart}