const express = require("express");
const router = express.Router();
const { db, dbPromise } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (results.length === 0)
        return res.status(404).json({ message: "Admin not found" });

      const admin = results[0];
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { adminId: admin.id, email: admin.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({ token });
    }
  );
});

// Setup image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create blog post
router.post("/create-blog", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !content || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    db.query("INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)", [
      title,
      content,
      image,
    ]);
    res.status(201).json({ message: "Blog post created successfully" });
  } catch (err) {
    console.error("Blog error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/blogs - public route
router.get("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Fetch blog error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});

//admin panel
//Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const [blogs] = await db.query("SELECT * FROM blogs ORDER BY id DESC");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

//Delete blog
router.delete("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    await dbPromise.query("DELETE FROM blogs WHERE id = ?", [blogId]);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

//Update blog
router.put("/blogs/:id", upload.single("image"), async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updateQuery = image
      ? "UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?"
      : "UPDATE blogs SET title = ?, content = ? WHERE id = ?";

    const params = image
      ? [title, content, image, blogId]
      : [title, content, blogId];

    db.query(updateQuery, params);
    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

//admin user
// Get all users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await dbPromise.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await dbPromise.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

//admin gigs
// Get all gigs
router.get("/gigs", async (req, res) => {
  const query = `
    SELECT gigs.*, users.name AS seller_name 
    FROM gigs 
    JOIN users ON gigs.user_id = users.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch gigs' });
    res.json(results);
  });
});

// Delete a gig by ID
router.delete('/gigs/:id',  async (req, res) => {
  const gigId = req.params.id;
  db.query('DELETE FROM gigs WHERE id = ?', [gigId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete gig' });
    res.json({ message: 'Gig deleted successfully' });
  });
});

//admin shops
// Get all shop items
router.get('/shop', async (req, res) => {
  const query = `
    SELECT shops.*, users.name AS seller_name 
    FROM shops
    JOIN users ON shops.user_id = users.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch shop items' });
    res.json(results);
  });
});

// Delete a shop item by ID
router.delete('/shop/:id',  async (req, res) => {
  const itemId = req.params.id;
  db.query('DELETE FROM shops WHERE id = ?', [itemId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete shop item' });
    res.json({ message: 'Shop item deleted successfully' });
  });
});


module.exports = router;
