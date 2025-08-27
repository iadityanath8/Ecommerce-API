const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const connectDB = require('./config/db');

// Routers 
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())


app.get('/api', (req, res) => {
    res.status(201).json({
        message: "Sent it properly"
    })
});

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))