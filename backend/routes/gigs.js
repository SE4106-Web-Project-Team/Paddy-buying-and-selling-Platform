// backend/routes/gigs.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/gigs"),
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

// GET /api/gigs/my-gigs
router.get("/my-gigs", verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT * FROM gigs WHERE user_id = ? ORDER BY created_at DESC`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching user gigs:", err.message);
      return res.status(500).json({ message: "Failed to fetch gigs" });
    }

    res.status(200).json(results);
  });
});

// DELETE /api/gigs/:id
router.delete("/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const gigId = req.params.id;

  const sql = `DELETE FROM gigs WHERE id = ? AND user_id = ?`;

  db.query(sql, [gigId, userId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting gig:", err.message);
      return res.status(500).json({ message: "Failed to delete gig" });
    }

    res.status(200).json({ message: "Gig deleted successfully" });
  });
});

// GET /api/gigs/:id
router.get("/:id", verifyToken, (req, res) => {
  const gigId = req.params.id;

  const sql = `
    SELECT gigs.*, users.name AS seller_name, user_profiles.province As province
    FROM gigs
    JOIN users ON gigs.user_id = users.id
    LEFT JOIN user_profiles ON users.id = user_profiles.user_id
    WHERE gigs.id = ?
  `;

  db.query(sql, [gigId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(results[0]);
  });
});

// Update a gig
router.put("/:id", verifyToken, upload.single("image"), (req, res) => {
  const gigId = req.params.id;
  const userId = req.user.id;
  const { paddyType, price, description, quantity } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = image
    ? `UPDATE gigs SET paddy_type = ?, price = ?, description = ?, quantity = ?, image = ? WHERE id = ? AND user_id = ?`
    : `UPDATE gigs SET paddy_type = ?, price = ?, description = ?, quantity = ? WHERE id = ? AND user_id = ?`;

  const params = image
    ? [paddyType, price, description, quantity, image, gigId, userId]
    : [paddyType, price, description, quantity, gigId, userId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error updating gig:", err.message);
      return res.status(500).json({ message: "Failed to update gig" });
    }
    res.status(200).json({ message: "Gig updated successfully" });
  });
});

// GET /api/gigs - fetch all gigs
router.get("/", (req, res) => {
  const sql = `
    SELECT gigs.*, users.name AS seller_name, user_profiles.province, user_profiles.phoneNo 
    FROM gigs 
    JOIN users ON gigs.user_id = users.id 
    LEFT JOIN user_profiles ON users.id = user_profiles.user_id
    ORDER BY gigs.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching gigs:", err.message);
      return res.status(500).json({ message: "Failed to fetch gigs" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
