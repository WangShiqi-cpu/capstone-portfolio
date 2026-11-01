// ============================================================
// db.js  —  Mongoose connection (Lab-09, Step 1)
// Connects to MongoDB using Mongoose instead of the native driver.
// ============================================================

const mongoose = require('mongoose');

// Default to a local MongoDB instance; override with MONGO_URI env var
// (e.g. a MongoDB Atlas connection string).
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogDB';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
