const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    paymentInfo: { type: Object }
})

module.exports = mongoose.model('Order',OrderSchema)