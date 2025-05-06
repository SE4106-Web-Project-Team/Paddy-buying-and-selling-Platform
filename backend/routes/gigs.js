// backend/routes/gigs.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create a new gig
router.post("/create", verifyToken, upload.single("image"), (req, res) => {
  const { paddyType, price, description, quantity } = req.body;
  const image = req.file ? req.file.filename : null;
  const userId = req.user.id;

  const sql = `
    INSERT INTO gigs (user_id, paddy_type, price, description, quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [userId, paddyType, price, description, quantity, image],
    (err, result) => {
      if (err) {
        console.error("Gig insert error:", err);
        return res.status(500).json({ message: "Failed to create gig" });
      }
      res.json({ message: "Gig created successfully" });
    }
  );
});

// Get all gigs created by the logged-in user
router.get("/my-gigs", verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = `
      SELECT * FROM gigs WHERE user_id = ?
    `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

module.exports = router;
