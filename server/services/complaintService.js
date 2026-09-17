const Complaint = require("../models/Complaint");
const ComplaintHistory = require("../models/ComplaintHistory");
const User = require("../models/User");
const notificationService = require("./notificationService");
const { analyzeComplaint } = require("./aiService");
const facultyRecommendationService = require("./facultyRecommendationService");
const duplicateComplaintService = require("./duplicateComplaintService");
const semanticDuplicateService = require("./semanticDuplicateService");

// =====================================
// Create Complaint
// =====================================
const createComplaint = async (complaintData) => {

    // =====================================
// AI Duplicate Complaint Detection
// =====================================

const duplicateResult =
    await duplicateComplaintService.findDuplicateComplaint(

        complaintData.title,

        complaintData.description

    );

if (duplicateResult.duplicate) {

    return {

        success: false,

        duplicate: true,

        message: "Possible duplicate complaint detected.",

        existingComplaint: {

            id: duplicateResult.complaint._id,

            title: duplicateResult.complaint.title,

            similarity: duplicateResult.similarity

        }

    };

}

    // =====================================
    // AI Complaint Analysis
    // =====================================

    const aiResult = await analyzeComplaint(
        complaintData.description
    );

    console.log("AI Result:", aiResult);

    // Save AI results into complaint
    complaintData.category = aiResult.category;
    complaintData.priority = aiResult.priority;

    complaintData.aiConfidence = aiResult.confidence;
    complaintData.aiEmergency = aiResult.emergency;
    complaintData.aiSummary = aiResult.summary;
    complaintData.aiReason = aiResult.reason;

    // =====================================
// AI Semantic Duplicate Detection
// =====================================

const existingComplaints = await Complaint.find({

    status: {
        $ne: "Closed"
    },

    category: complaintData.category,

    priority: complaintData.priority

});

for (const existing of existingComplaints) {

    const result =
        await semanticDuplicateService.isDuplicateComplaint(

            complaintData.description,

            existing.description

        );

    console.log("Semantic Check:", result);

    if (

        result.duplicate === true &&

        result.similarity >= 85

    ) {

        return {

            success: false,

            duplicate: true,

            message: "AI detected a similar complaint already exists.",

            existingComplaint: {

                id: existing._id,

                title: existing.title,

                similarity: result.similarity,

                reason: result.reason

            }

        };

    }

}

    // =====================================
    // AI Faculty Recommendation
    // =====================================

    const recommendation =
        await facultyRecommendationService.recommendFaculty(
            aiResult.category
        );

    if (recommendation) {

        complaintData.recommendedFaculty =
            recommendation.faculty._id;

        complaintData.recommendationReason =
            recommendation.reason;

        complaintData.recommendationScore =
            recommendation.score;

        complaintData.assignedTo =
            recommendation.faculty._id;

        complaintData.status = "Assigned";

    }

    // =====================================
    // Create Complaint
    // =====================================

    const complaint = await Complaint.create(complaintData);

    // =====================================
    // Get Student Details
    // =====================================

    const student = await User.findById(complaint.student);

    const studentName = student
        ? student.fullName
        : "Student";

    // =====================================
    // Create Complaint History
    // =====================================

    await ComplaintHistory.create({

        complaint: complaint._id,

        action: "Complaint Created",

        performedBy: complaint.student,

        performedRole: "student",

        remarks: "Complaint submitted by student"

    });

    // =====================================
    // AI Auto Assignment History
    // =====================================

    if (recommendation) {

        await ComplaintHistory.create({

            complaint: complaint._id,

            performedBy: recommendation.faculty._id,

            performedRole: "AI System",

            action: "AI Auto Assigned",

            remarks: `Complaint automatically assigned to ${recommendation.faculty.fullName} based on AI recommendation.`

        });

    }



    // =====================================
    // Notify Assigned Faculty
    // =====================================

    if (recommendation) {

        await notificationService.createNotification({

            user: recommendation.faculty._id,

            title: "New Complaint Assigned",

            message: `A new complaint "${complaint.title}" has been automatically assigned to you by the AI system.`,

            type: "complaint"

        });

        // =====================================
        // Real-Time Socket Notification
        // =====================================

        const facultySocketId =
            global.onlineUsers?.[
            recommendation.faculty._id.toString()
            ];

        if (facultySocketId && global.io) {

            global.io.to(facultySocketId).emit(
                "newNotification",
                {

                    title: "New Complaint Assigned",

                    message: `A new complaint "${complaint.title}" has been assigned to you.`

                }
            );

        }

    }

    // =====================================
    // Notify Admins
    // =====================================

    const admins = await User.find({
        role: "admin"
    });

    for (const admin of admins) {

        await notificationService.createNotification({

            user: admin._id,

            title: "New Complaint",

            message: `${studentName} created a new complaint: "${complaint.title}"`,

            type: "complaint"

        });

        const adminSocketId =
            global.onlineUsers?.[admin._id.toString()];

        if (adminSocketId && global.io) {

            global.io.to(adminSocketId).emit(
                "newNotification",
                {
                    title: "New Complaint",
                    message: `${studentName} created a new complaint: "${complaint.title}"`
                }
            );

        }

    }

    return {

        success: true,

        message: "Complaint Submitted Successfully",

        data: complaint

    };

};



// =====================================
// Get My Complaints
// =====================================
const getMyComplaints = async (studentId) => {

    const complaints = await Complaint.find({
        student: studentId
    }).sort({
        createdAt: -1
    });

    return {
        success: true,
        message: "Complaints Retrieved Successfully",
        data: complaints
    };

};

// =====================================
// Get Complaint By ID
// =====================================
const getComplaintById = async (complaintId, studentId) => {

    const complaint = await Complaint.findOne({
        _id: complaintId,
        student: studentId
    });

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    return {
        success: true,
        message: "Complaint Retrieved Successfully",
        data: complaint
    };

};

// =====================================
// Update Complaint
// =====================================
const updateComplaint = async (
    complaintId,
    studentId,
    updateData
) => {

    const complaint = await Complaint.findOne({
        _id: complaintId,
        student: studentId
    });

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    if (complaint.status !== "Pending") {
        throw new Error("Only Pending complaints can be updated");
    }

    Object.assign(complaint, updateData);

    await complaint.save();

    return {
        success: true,
        message: "Complaint Updated Successfully",
        data: complaint
    };

};

// =====================================
// Delete Complaint
// =====================================
const deleteComplaint = async (
    complaintId,
    studentId
) => {

    const complaint = await Complaint.findOne({
        _id: complaintId,
        student: studentId
    });

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    if (complaint.status !== "Pending") {
        throw new Error("Only Pending complaints can be deleted");
    }

    await Complaint.findByIdAndDelete(complaintId);

    return {
        success: true,
        message: "Complaint Deleted Successfully"
    };

};

// =====================================
// Get All Complaints (Admin)
// =====================================
const getAllComplaints = async () => {

    const complaints = await Complaint.find()
        .populate("student", "fullName email department")
        .populate("assignedTo", "fullName email department")
        .populate(
            "recommendedFaculty",
            "fullName department email"
        )
        .sort({
            createdAt: -1
        });

    return {
        success: true,
        message: "All Complaints Retrieved Successfully",
        data: complaints
    };

};

// =====================================
// Update Complaint Status (Admin)
// =====================================
const updateComplaintStatus = async (
    complaintId,
    status
) => {

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    // Update Complaint Status
    complaint.status = status;

    // Save Complaint
    await complaint.save();

    // Create History Record
    await ComplaintHistory.create({
        complaint: complaint._id,
        performedBy: complaint.assignedTo,
        performedRole: "admin",
        action: status,
        remarks: `Complaint status changed to ${status}`
    });

    // =====================================
    // Create Notification For Student
    // =====================================

    await notificationService.createNotification({

        user: complaint.student,

        title: "Complaint Updated",

        message: `Your complaint "${complaint.title}" status has been updated to "${status}".`,

        type: "complaint"

    });

    return {
        success: true,
        message: "Complaint Status Updated Successfully",
        data: complaint
    };

};

// =====================================
// Admin Update Complaint
// =====================================
const adminUpdateComplaint = async (

    complaintId,

    updateData

) => {

    // Find Complaint
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {

        throw new Error("Complaint not found");

    }

    // ================================
    // Update Allowed Fields
    // ================================

    complaint.title =
        updateData.title ?? complaint.title;

    complaint.description =
        updateData.description ?? complaint.description;

    complaint.category =
        updateData.category ?? complaint.category;

    complaint.priority =
        updateData.priority ?? complaint.priority;

    complaint.status =
        updateData.status ?? complaint.status;

    // Save Complaint
    await complaint.save();

    // ================================
    // Create Complaint History
    // ================================

    await ComplaintHistory.create({

        complaint: complaint._id,

        action: "Complaint Updated",

        performedBy: updateData.adminId || null,

        performedRole: "admin",

        remarks: "Complaint updated by administrator"

    });

    return {

        success: true,

        message: "Complaint Updated Successfully",

        data: complaint

    };

};

// =====================================
// Assign Complaint To Faculty (Admin)
// =====================================
const assignComplaint = async (
    complaintId,
    facultyId
) => {

    // Find Complaint
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    // Already Assigned?
    if (complaint.assignedTo) {
        throw new Error("Complaint already assigned");
    }

    // Assign Faculty
    complaint.assignedTo = facultyId;

    // Change Status
    complaint.status = "Assigned";

    // Save Complaint
    await complaint.save();

    // Create History Record
    await ComplaintHistory.create({
        complaint: complaint._id,
        performedBy: facultyId,
        performedRole: "admin",
        action: "Assigned",
        remarks: "Complaint assigned to faculty"
    });

    // Return Updated Complaint
    const updatedComplaint = await Complaint.findById(complaintId)
        .populate("student", "fullName email department")
        .populate("assignedTo", "fullName email email department");

    return {
        success: true,
        message: "Complaint Assigned Successfully",
        data: updatedComplaint
    };

};

// =====================================
// Get Assigned Complaints (Faculty)
// =====================================
const getAssignedComplaints = async (facultyId) => {

    const complaints = await Complaint.find({
        assignedTo: facultyId
    })
        .populate("student", "fullName email phone department")
        .sort({
            createdAt: -1
        });

    return {
        success: true,
        message: "Assigned Complaints Retrieved Successfully",
        data: complaints
    };

};

// =====================================
// Update Complaint Progress (Faculty)
// =====================================
const updateComplaintProgress = async (
    complaintId,
    facultyId,
    status
) => {

    const complaint = await Complaint.findOne({
        _id: complaintId,
        assignedTo: facultyId
    });

    if (!complaint) {
        throw new Error("Complaint not found or not assigned to you");
    }

    const allowedStatus = [
        "Assigned",
        "In Progress",
        "Resolved",
        "Closed"
    ];

    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
    }

    complaint.status = status;

    await complaint.save();

    // Create History Record
    await ComplaintHistory.create({
        complaint: complaint._id,
        action: status,
        performedBy: facultyId,
        performedRole: "faculty",
        remarks: `Complaint status changed to ${status}`
    });

    return {
        success: true,
        message: "Complaint Progress Updated Successfully",
        data: complaint
    };

};

// =====================================
// Get Dashboard Statistics (Admin)
// =====================================
const getDashboardStatistics = async () => {

    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
        status: "Pending"
    });

    const assigned = await Complaint.countDocuments({
        status: "Assigned"
    });

    const inProgress = await Complaint.countDocuments({
        status: "In Progress"
    });

    const resolved = await Complaint.countDocuments({
        status: "Resolved"
    });

    const closed = await Complaint.countDocuments({
        status: "Closed"
    });

    return {
        success: true,
        message: "Dashboard Statistics Retrieved Successfully",
        data: {
            totalComplaints,
            pending,
            assigned,
            inProgress,
            resolved,
            closed
        }
    };

};


// =====================================
// Get Complaint History
// =====================================
const getComplaintHistory = async (complaintId) => {

    // Check complaint exists
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
        throw new Error("Complaint not found");
    }

    // Fetch history records
    const history = await ComplaintHistory.find({
        complaint: complaintId
    })
        .populate("performedBy", "fullName email role")
        .sort({
            createdAt: 1
        });

    return {
        success: true,
        message: "Complaint History Retrieved Successfully",
        data: history
    };

};


module.exports = {

    createComplaint,

    getMyComplaints,

    getComplaintById,

    updateComplaint,

    deleteComplaint,

    getAllComplaints,

    updateComplaintStatus,

    adminUpdateComplaint,

    assignComplaint,

    getAssignedComplaints,

    updateComplaintProgress,

    getDashboardStatistics,

    getComplaintHistory

};