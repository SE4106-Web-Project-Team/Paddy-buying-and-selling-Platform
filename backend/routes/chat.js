const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");

// 1. Get users you’ve chatted with
router.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT DISTINCT u.id, u.name
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
router.get("/messages/:userId/:otherUserId", (req, res) => {
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
router.post("/send", (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  const sql =
    "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
  db.query(sql, [sender_id, receiver_id, message], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, messageId: result.insertId });
  });
});

// 4. Delete a chat
router.delete("/delete-chat/:receiverId", verifyToken, (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Missing sender or receiver ID" });
  }

  const sql = `
        DELETE FROM messages 
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?)
    `;

  db.query(sql, [senderId, receiverId, receiverId, senderId], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json({ message: "Chat deleted successfully" });
  });
});

// 5. Delete a specific message
// 5. Delete a specific message
router.delete("/messages/:messageId", verifyToken, (req, res) => {
  const messageId = req.params.messageId;
  const userId = req.user.id;

  const checkQuery = "SELECT * FROM messages WHERE id = ? AND sender_id = ?";
  db.query(checkQuery, [messageId, userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this message" });
    }

    const deleteQuery = "DELETE FROM messages WHERE id = ?";
    db.query(deleteQuery, [messageId], (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.status(200).json({ message: "Message deleted successfully" });
    });
  });
});

module.exports = router;
