const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from .env file
const uri = process.env.MONGODB_URI;

// MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Initialize MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to Database");
  } catch (error) {
    console.error("Could not connect to database:", error);
    process.exit(1); // Exit the process with an error code if DB connection fails
  }
}

module.exports = { connectDB, client };
