const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. Get users you’ve chatted with
router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT DISTINCT u.id, u.name AS username
    FROM users u
    JOIN (
      SELECT receiver_id AS id FROM messages WHERE sender_id = ?
      UNION
      SELECT sender_id AS id FROM messages WHERE receiver_id = ?
    ) c ON u.id = c.id
    WHERE u.id != ?
  `;

  db.query(query, [userId, userId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// 2. Get messages between users
router.get('/messages/:userId/:otherUserId', (req, res) => {
  const { userId, otherUserId } = req.params;
  const sql = `
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?)
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;
  db.query(sql, [userId, otherUserId, otherUserId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 3. Send a new message
router.post('/send', (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  const sql = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(sql, [sender_id, receiver_id, message], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, messageId: result.insertId });
  });
});

module.exports = router;
