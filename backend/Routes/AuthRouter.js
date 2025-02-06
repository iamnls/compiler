const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'secretkey'; // Change this to a secure key!

// **Signup Route**
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// **Login Route**
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // **Check user credentials**
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// **Forgot Password Route**
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Normally, you would send a reset password link via email here.
    res.json({ success: true, message: 'Reset password link sent to your email' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
});

module.exports = router;