// backend/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Register User
const registerUser = (req, res) => {
  const { name, email, password, profileType } = req.body;

  if (!name || !email || !password || !profileType) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        'INSERT INTO users (name, email, password, profile_type) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, profileType],
        (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    } catch (error) {
      console.error('Hashing error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_type: user.profile_type,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

module.exports = { registerUser, loginUser };
