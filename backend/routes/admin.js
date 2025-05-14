const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = router;
