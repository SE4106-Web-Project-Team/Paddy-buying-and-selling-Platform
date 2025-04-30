const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config(); // load .env variables

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("🔍 Received Token:", token);

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Update or Insert profile info
router.put(
  "/update-profile",
  verifyToken,
  upload.single("profilePicture"),
  (req, res) => {
    const { phoneNo, province, description } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
    const userId = req.user.id;

    const sqlCheck = `SELECT * FROM user_profiles WHERE user_id = ?`;
    db.query(sqlCheck, [userId], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length > 0) {
        // Update existing profile
        const sqlUpdate = `
        UPDATE user_profiles
        SET phoneNo = ?, province = ?, description = ?, profilePicture = ?
        WHERE user_id = ?
      `;
        db.query(
          sqlUpdate,
          [phoneNo, province, description, profilePicture, userId],
          (err) => {
            if (err) return res.status(500).json({ message: "Update error" });
            res.json({ message: "Profile updated successfully" });
          }
        );
      } else {
        // Insert new profile
        const sqlInsert = `
        INSERT INTO user_profiles (user_id, phoneNo, province, description, profilePicture)
        VALUES (?, ?, ?, ?, ?)
      `;
        db.query(
          sqlInsert,
          [userId, phoneNo, province, description, profilePicture],
          (err) => {
            if (err) return res.status(500).json({ message: "Insert error" });
            res.json({ message: "Profile created successfully" });
          }
        );
      }
    });
  }
);

// Get user profile
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = `
  SELECT u.id, u.name, u.profile_type AS profileType,
         up.phoneNo, up.province, up.description, up.profilePicture
  FROM users u
  LEFT JOIN user_profiles up ON u.id = up.user_id
  WHERE u.id = ?
`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(results[0]);
  });
});

module.exports = router;
