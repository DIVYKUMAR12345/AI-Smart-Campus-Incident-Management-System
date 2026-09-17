const express = require("express");

const router = express.Router();

const {

    getUserNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    deleteNotification

} = require("../controllers/notificationController");

const verifyToken = require("../middleware/authMiddleware");

// ======================================
// Notification Routes
// ======================================

// Get Logged In User Notifications
router.get(

    "/",

    verifyToken,

    getUserNotifications

);

// Mark One Notification As Read
router.patch(

    "/:id/read",

    verifyToken,

    markNotificationAsRead

);

// Mark All Notifications As Read
router.patch(

    "/read-all",

    verifyToken,

    markAllNotificationsAsRead

);

// Delete Notification
router.delete(

    "/:id",

    verifyToken,

    deleteNotification

);

module.exports = router;