const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");
const upload = require("../middleware/uploadMiddleware"); 

// =====================================
// Get Profile
// =====================================
router.get(
    "/",
    authMiddleware,
    profileController.getProfile
);

// =====================================
// Update Profile
// =====================================
router.put(
    "/",
    authMiddleware,
    upload.single("profileImage"),
    profileController.updateProfile
);

module.exports = router;