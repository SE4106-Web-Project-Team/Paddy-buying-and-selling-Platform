// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

// In server.js (or wherever you create your Express app)
const path = require('path');
// Serve profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
