const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Register User
// ===============================
router.post("/register", authController.registerUser);

// ===============================
// Login User
// ===============================
router.post("/login", authController.loginUser);

// ===============================
// Get Logged In User Profile
// ===============================
router.get(
    "/profile",
    authMiddleware,
    authController.getProfile
);

module.exports = router;