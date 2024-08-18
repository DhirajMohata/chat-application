const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

require('dotenv').config();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const find = await User.findOne({ where: { email } });

    if(find){
      return res.status(401).json({ error: 'Email already exists' });
    }

    const user = await User.create({ username, email, password: hashedPassword });
    console.log(username, email, hashedPassword);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User created', token, userId: user.id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      console.log(user.id);
      res.json({ token, username: user.username , userId: user.id });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
