const express = require("express");

const router = express.Router();

// ===============================
// Import Routes
// ===============================
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const complaintRoutes = require("./complaintRoutes");
const notificationRoutes = require("./notificationRoutes");
const profileRoutes = require("./profileRoutes");
const aiRoutes = require("./aiRoutes");

// ===============================
// Authentication Routes
// ===============================
router.use("/auth", authRoutes);

// ===============================
// User Routes
// ===============================
router.use("/users", userRoutes);

// ===============================
// Complaint Routes
// ===============================
router.use("/complaints", complaintRoutes);

// ===============================
// Notification Routes
// ===============================
router.use("/notifications", notificationRoutes);

// ===============================
// Profile Routes
// ===============================
router.use("/profile", profileRoutes);

// ===============================
// AI Routes
// ===============================
router.use("/ai", aiRoutes);

module.exports = router;