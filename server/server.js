require("dotenv").config();

const http = require("http");

const { Server } = require("socket.io");

const app = require("./app");

const connectDatabase = require("./config/database");

// ======================================
// Connect Database
// ======================================

connectDatabase();

// ======================================
// Create HTTP Server
// ======================================

const server = http.createServer(app);

// ======================================
// Socket.IO Server
// ======================================

const io = new Server(server, {

    cors: {

        origin: "http://localhost:5173",

        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]

    }

});

// ======================================
// Store Connected Users
// ======================================

global.onlineUsers = {};

// ======================================
// Socket Connection
// ======================================

io.on("connection", (socket) => {

    console.log("🟢 User Connected:", socket.id);

    // Student/Admin joins
    socket.on("join", (userId) => {

        global.onlineUsers[userId] = socket.id;

        console.log("User Joined:", userId);

    });

    // Disconnect
    socket.on("disconnect", () => {

        console.log("🔴 User Disconnected:", socket.id);

        for (const userId in global.onlineUsers) {

            if (global.onlineUsers[userId] === socket.id) {

                delete global.onlineUsers[userId];

            }

        }

    });

});

// ======================================
// Make Socket Available Everywhere
// ======================================

global.io = io;

// ======================================
// Start Server
// ======================================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});