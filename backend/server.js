// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/auth");

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

// In server.js (or wherever you create your Express app)
const path = require("path");
// Serve profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//gig
const gigRoutes = require("./routes/gigs");
app.use("/api/gigs", gigRoutes);

//chat
const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

//socket.io
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    io.to(data.receiver_id).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// ✅ Correct - this starts the HTTP server that Socket.IO is attached to
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

