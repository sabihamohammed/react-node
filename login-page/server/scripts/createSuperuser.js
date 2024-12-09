// Load environment variables from .env file
require('dotenv').config();

// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Import the User model from the specified path
const User = require('../models/User'); 

// Import the bcrypt library for password hashing
const bcrypt = require('bcryptjs');

// Import yargs for parsing command-line arguments
const yargs = require('yargs/yargs');

// Import hideBin function to clean up command-line arguments
const { hideBin } = require('yargs/helpers');

// Parse command-line arguments using yargs
const argv = yargs(hideBin(process.argv)).argv;

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Function to create a superuser with provided username, email, and password
async function createSuperUser(username, email, password) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password using bcrypt with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the provided details
    const user = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'admin' // Assign the role as admin for superuser
    });

    // Save the user to the database
    await user.save();

    // Log success message with the created user details
    console.log('Superuser created successfully:', user);
  } catch (error) {
    // Log error message if any error occurs during user creation
    console.error('Error creating superuser:', error.message);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the createSuperUser function with command-line arguments for username, email, and password
createSuperUser(argv.username, argv.email, argv.password);
