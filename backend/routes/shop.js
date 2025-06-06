const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");

const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/shop"); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 1. Create a new shop item
router.post("/create", verifyToken, upload.single("image"), (req, res) => {
  const { title, description, price } = req.body;
  const image = req.file?.filename;
  const user_id = req.user.id;

  if (!title || !price || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO shops (user_id, title, description, price, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, description, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Shop item created", shopId: result.insertId });
  });
});

// 2. Get all shop items (including user name)
router.get("/", (req, res) => {
  const sql = `
    SELECT shops.*, users.name 
    FROM shops 
    JOIN users ON shops.user_id = users.id 
    ORDER BY shops.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json(results);
  });
});

// 3.1 Get all items by a specific user
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM shops WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    }
  );
});

// 3.2 GET all shop items created by the logged-in user
router.get("/my-items", verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT * FROM shops WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching user items:", err.message);
      return res.status(500).json({ message: "Failed to fetch items" });
    }
    res.status(200).json(results);
  });
});

// 4. Update a shop item
router.put("/update/:id", verifyToken, upload.single("image"), (req, res) => {
  const shopId = req.params.id;
  const { title, description, price } = req.body;
  const user_id = req.user.id;

  // Handle optional image upload
  const image = req.file ? req.file.filename : req.body.existingImage;

  const sql = `
    UPDATE shops
    SET title = ?, description = ?, price = ?, image = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [title, description, price, image, shopId, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Shop item updated" });
    }
  );
});

// 5. Delete a shop item
router.delete("/delete/:id", verifyToken, (req, res) => {
  const shopId = req.params.id;
  const user_id = req.user.id;

  const sql = `DELETE FROM shops WHERE id = ? AND user_id = ?`;

  db.query(sql, [shopId, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Shop item deleted" });
  });
});

// 6. Get a single shop item by ID with seller details
router.get("/item/:id", (req, res) => {
  const shopId = req.params.id;
  const sql = `
    SELECT shops.*, users.name AS seller_name, user_profiles.phoneNo, user_profiles.province
    FROM shops
    JOIN users ON shops.user_id = users.id
    LEFT JOIN user_profiles ON users.id = user_profiles.user_id
    WHERE shops.id = ?
  `;
  db.query(sql, [shopId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0)
      return res.status(404).json({ error: "Shop item not found" });
    res.json(results[0]);
  });
});

module.exports = router;
