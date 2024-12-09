const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const crypto = require('crypto');




// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  try {
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare the password
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Password does not match
    }
    const username = user.username;
    // Payload for the JWT
    const payload = {
      userId: user._id,
      role: user.role,
      username
    };

    // Sign the JWT with the payload, secret, and expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token, userRole: user.role, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // Handle any server errors
  }
};