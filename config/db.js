const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB DataBase Connected")
    } catch (e) {
        console.error("MongoDB connection failed ❌", error.message);
        process.exit(1);
    }
}

module.exports = connectDB