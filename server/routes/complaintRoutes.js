const express = require("express");

const router = express.Router();

const complaintController = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// =====================================
// Create Complaint
// =====================================
router.post(
    "/create",
    authMiddleware,
    roleMiddleware("student"),
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name: "voice",
            maxCount: 1
        }
    ]),
    complaintController.createComplaint
);

// =====================================
// Get My Complaints
// =====================================
router.get(
    "/my",
    authMiddleware,
    roleMiddleware("student"),
    complaintController.getMyComplaints
);

// =====================================
// Get Dashboard Statistics (Admin)
// =====================================
router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    complaintController.getDashboardStatistics
);

// =====================================
// Get All Complaints (Admin)
// =====================================
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    complaintController.getAllComplaints
);

// =====================================
// Update Complaint Status (Admin)
// =====================================
router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    complaintController.updateComplaintStatus
);

// =====================================
// Assign Complaint To Faculty (Admin)
// =====================================
router.patch(
    "/:id/assign",
    authMiddleware,
    roleMiddleware("admin"),
    complaintController.assignComplaint
);

// =====================================
// Admin Update Complaint
// =====================================
router.put(
    "/:id/admin",
    authMiddleware,
    roleMiddleware("admin"),
    complaintController.adminUpdateComplaint
);

// =====================================
// Get Assigned Complaints (Faculty)
// =====================================
router.get(
    "/assigned",
    authMiddleware,
    roleMiddleware("faculty"),
    complaintController.getAssignedComplaints
);

// =====================================
// Update Complaint Progress (Faculty)
// =====================================
router.patch(
    "/:id/progress",
    authMiddleware,
    roleMiddleware("faculty"),
    complaintController.updateComplaintProgress
);

// =====================================
// Get Complaint History
// =====================================
router.get(
    "/:id/history",
    authMiddleware,
    complaintController.getComplaintHistory
);

// =====================================
// Get Complaint By ID
// =====================================
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("student"),
    complaintController.getComplaintById
);

// =====================================
// Update Complaint
// =====================================
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("student"),
    complaintController.updateComplaint
);

// =====================================
// Delete Complaint
// =====================================
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("student"),
    complaintController.deleteComplaint
);

module.exports = router;