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

// In server.js 
const path = require("path");
// Serve profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//gig
const gigRoutes = require("./routes/gigs");
app.use("/api/gigs", gigRoutes);

//shop
const shopRoutes = require("./routes/shop");
app.use("/api/shop", shopRoutes);

//chat
const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

//socket.io
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
app.use(cors({
  origin: "http://localhost:3000",
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

//chatbot
const chatbotRoute = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoute);

//admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
app.use('/uploads/blogs', express.static(path.join(__dirname, 'uploads/blogs')));


// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

