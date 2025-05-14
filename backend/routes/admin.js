const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(404).json({ message: 'Admin not found' });

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  });
});

// Setup image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create blog post
router.post('/create-blog', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !content || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    db.query(
          'INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)',
          [title, content, image]
      );
    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (err) {
    console.error('Blog error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs - public route
router.get('/blogs', (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Fetch blog error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});


module.exports = router;
