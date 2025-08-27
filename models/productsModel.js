const mongoose = require('mongoose')

    

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0
    },
    desc: {
        type: String,
        required: [true, 'description is required']
    },
    category: {
        type: [String],
        required: [true, 'At least one category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock count is required']
    },
    img: {
        type: String,
        required: [true, 'image is required']
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })


module.exports = mongoose.model("Product", productSchema)