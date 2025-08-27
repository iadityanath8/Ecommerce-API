const Product = require('../models/productsModel')



// GET 
// @routes /api/Product/

const getAllProduct = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category) {
            // support multiple categories: ?category=electronics,clothing
            const categories = category.split(",");
            filter.category = { $in: categories };
        }

        const products = await Product.find(filter);

        if (products.length === 0) {
            return res.status(404).json({ message: "No Products Found" });
        }

        res.status(200).json(products);

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error", error: e });
    }
};


// Get Product By Id
// @route /api/product/:id
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product Not found" })
        }

        res.status(200).json(product)
    } catch (e) {

        console.log(e)
        res.status(404).json({
            message: "Internal Server Error", e
        })
    }
}

// GET 
// @route /api/products?category=electronics
// const getProductByCat = async (req,res) => {
//     const {category} = req.query;
//     try {
//         const products = await Product.find({category: {$in: [category]}})
//         if (!products) {
//             return res.status(404).json({
//                 message:`No Products found in category ${category}`
//             })
//         }

//         res.status(200).json(products)
//     } catch (e) {
//         res.status(404).json({
//             message: "Internal Server Error", e
//         })
//     }
// }

// Add Product
// @route /api/Product
const addProduct = async (req, res) => {
    try {
        const { name, price, desc, category, stock, img } = req.body;
        if (!name || !price || !desc || !category || !img) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const product = new Product({
            name,
            price,
            desc,
            category,
            img,
            stock: stock || 0
        })

        const savedProduct = await product.save()
        res.status(201).json({
            message: 'Product added Successfully',
            product: savedProduct
        })
    } catch (e) {
        res.status(404).json({ message: "Internal Server Error", e })
    }
}

// PUT 
// @route /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { name, price, desc, category, stock, img } = req.body;

        if (name) product.name = name;
        if (price) product.price = price;
        if (desc) product.desc = desc;
        if (category) product.category = category;
        if (stock) product.stock = stock;
        if (img) product.img = img;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error", error: e });
    }
};


// DELETE 
// @route api/products/:id
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        res.status(201).json({
            message: "Successfully Deleted the Product"
        })
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error", error: e });
    }
}

module.exports = { addProduct, getAllProduct, getProductById, updateProduct, deleteProduct }