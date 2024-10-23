const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(400).json({ error: 'User already exists.' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ where: { username } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
