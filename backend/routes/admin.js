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

// Get a single blog post by ID
router.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id;
  const query = "SELECT * FROM blogs WHERE id = ?";

  db.query(query, [blogId], (err, results) => {
    if (err) {
      console.error("Error fetching blog:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(results[0]);
  });
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

//admin users
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const [countResult] = await dbPromise.query(
      `SELECT COUNT(*) AS total FROM users`
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const [users] = await dbPromise.query(
      `SELECT * FROM users ORDER BY id DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      users,
      totalPages,
      currentPage: page,
    });
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
router.get("/gigs", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const countQuery = `
    SELECT COUNT(*) AS total FROM gigs
  `;
  const dataQuery = `
    SELECT gigs.*, users.name AS seller_name 
    FROM gigs 
    JOIN users ON gigs.user_id = users.id
    ORDER BY gigs.id DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).json({ error: "Failed to count gigs" });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataQuery, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch gigs" });

      res.json({
        gigs: results,
        totalPages,
        currentPage: page,
      });
    });
  });
});

// Delete a gig by ID
router.delete("/gigs/:id", async (req, res) => {
  const gigId = req.params.id;
  db.query("DELETE FROM gigs WHERE id = ?", [gigId], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete gig" });
    res.json({ message: "Gig deleted successfully" });
  });
});

//admin shops
// Get all shop items
router.get("/shop", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM shops`;
  const dataQuery = `
    SELECT shops.*, users.name AS seller_name 
    FROM shops 
    JOIN users ON shops.user_id = users.id
    ORDER BY shops.id DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countQuery, (err, countResult) => {
    if (err)
      return res.status(500).json({ error: "Failed to count shop items" });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataQuery, [limit, offset], (err, results) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch shop items" });

      res.json({
        items: results,
        totalPages,
        currentPage: page,
      });
    });
  });
});

// Delete a shop item by ID
router.delete("/shop/:id", async (req, res) => {
  const itemId = req.params.id;
  db.query("DELETE FROM shops WHERE id = ?", [itemId], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Failed to delete shop item" });
    res.json({ message: "Shop item deleted successfully" });
  });
});

//paddy price
// Get all paddy prices
router.get("/prices", async (req, res) => {
  try {
    const [rows] = await dbPromise.query(
      "SELECT * FROM paddy_prices ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

// Create new price
router.post("/prices", async (req, res) => {
  const { paddy_type, price } = req.body;
  try {
    await dbPromise.query(
      "INSERT INTO paddy_prices (paddy_type, price) VALUES (?, ?)",
      [paddy_type, price]
    );
    res.status(201).json({ message: "Price added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add price" });
  }
});

// Update price
router.put("/prices/:id", async (req, res) => {
  const { id } = req.params;
  const { paddy_type, price } = req.body;
  try {
    await dbPromise.query(
      "UPDATE paddy_prices SET paddy_type = ?, price = ? WHERE id = ?",
      [paddy_type, price, id]
    );
    res.json({ message: "Price updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update price" });
  }
});

// Delete price
router.delete("/prices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbPromise.query("DELETE FROM paddy_prices WHERE id = ?", [id]);
    res.json({ message: "Price deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete price" });
  }
});

module.exports = router;
