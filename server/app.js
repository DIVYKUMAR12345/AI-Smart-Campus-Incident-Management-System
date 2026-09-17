require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const app = express();

// =====================================
// Middlewares
// =====================================
app.use(cors());
app.use(express.json());

// =====================================
// Static Folder for Uploaded Files
// =====================================
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// =====================================
// Health Check Route
// =====================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 AI Smart Campus Incident Management System Backend Running Successfully"
    });
});

// =====================================
// API Routes
// =====================================
app.use("/api", routes);

module.exports = app;