const calculateTotal = async (items) => {
    let total = 0;
    for (const i of items) {
        const product = await Product.findById(i.product);
        if (product) {
            total += product.price * i.quantity;
        }
    }
    return total;
};


module.exports = calculateTotal