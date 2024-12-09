const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./Config/db');

// Load environment variables from .env file
require('dotenv').config();

// Import route handlers
const authRoutes = require('./routes/auth');


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);


// Serve static files
app.use(express.static('public'));


// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
