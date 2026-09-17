const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const userController = require("../controllers/userController");

// =====================================
// Logged In User Profile
// =====================================
router.get(
    "/profile",
    authenticateUser,
    userController.getProfile
);

// =====================================
// Student Only
// =====================================
router.get(
    "/student",
    authenticateUser,
    authorizeRoles("student"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Student",
            user: req.user
        });

    }
);

// =====================================
// Faculty Only
// =====================================
router.get(
    "/faculty",
    authenticateUser,
    authorizeRoles("faculty"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Faculty",
            user: req.user
        });

    }
);

// =====================================
// Admin Only
// =====================================
router.get(
    "/admin",
    authenticateUser,
    authorizeRoles("admin"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user
        });

    }
);

// =====================================
// Get All Faculty Users (Admin)
// =====================================
router.get(
    "/faculty-list",
    authenticateUser,
    authorizeRoles("admin"),
    userController.getFacultyUsers
);

module.exports = router;