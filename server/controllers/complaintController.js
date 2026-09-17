const Complaint = require("../models/Complaint");
const complaintService = require("../services/complaintService");

const {
    analyzeComplaintImage
} = require("../services/imageAnalysisService");
const {
    analyzeComplaintVoice
} = require("../services/voiceAnalysisService");

// =====================================
// Create Complaint
// =====================================
const createComplaint = async (req, res) => {

    try {

        const complaintData = {

    ...req.body,

    student: req.user._id,

    aiConfidence: Number(req.body.aiConfidence || 0),

    aiEmergency: req.body.aiEmergency === "true",

    aiSummary: req.body.aiSummary || "",

    aiReason: req.body.aiReason || "",

    image: req.files?.image?.length
        ? req.files.image[0].filename
        : "",

    voice: req.files?.voice?.length
        ? req.files.voice[0].filename
        : ""

};

    // ======================================
// AI Image Analysis
// ======================================

let imageAIResult = null;

if (complaintData.image) {

    console.log(
        "========== STARTING IMAGE AI ANALYSIS =========="
    );

    imageAIResult =
        await analyzeComplaintImage(
            complaintData.image
        );

    console.log(
        "========== IMAGE AI RESPONSE =========="
    );

    console.log(imageAIResult);

}

    // ======================================
// AI Voice Analysis
// ======================================

let voiceAIResult = null;

if (complaintData.voice) {

    console.log(
        "========== STARTING VOICE AI ANALYSIS =========="
    );

    voiceAIResult =
        await analyzeComplaintVoice(
            complaintData.voice
        );

    console.log(
        "========== VOICE AI RESPONSE =========="
    );

    console.log(voiceAIResult);

}

    // ======================================
// Add Image AI Result To Complaint Data
// ======================================

if (
    imageAIResult &&
    imageAIResult.success &&
    imageAIResult.data
) {

    complaintData.imageAI =
        imageAIResult.data;

}

    // ======================================
// Add Voice AI Result To Complaint Data
// ======================================

if (
    voiceAIResult &&
    voiceAIResult.success &&
    voiceAIResult.data
) {

    complaintData.voiceAI =
        voiceAIResult.data;

}

        const result = await complaintService.createComplaint(
            complaintData
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get My Complaints
// =====================================
const getMyComplaints = async (req, res) => {

    try {

        const result = await complaintService.getMyComplaints(req.user._id);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get Complaint By ID
// =====================================
const getComplaintById = async (req, res) => {

    try {

        const result = await complaintService.getComplaintById(
            req.params.id,
            req.user._id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Update Complaint
// =====================================
const updateComplaint = async (req, res) => {

    try {

        const result = await complaintService.updateComplaint(
            req.params.id,
            req.user._id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Delete Complaint
// =====================================
const deleteComplaint = async (req, res) => {

    try {

        const result = await complaintService.deleteComplaint(
            req.params.id,
            req.user._id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get All Complaints (Admin)
// =====================================
const getAllComplaints = async (req, res) => {

    try {

        const result = await complaintService.getAllComplaints();

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Update Complaint Status (Admin)
// =====================================
const updateComplaintStatus = async (req, res) => {

    try {

        const result = await complaintService.updateComplaintStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Admin Update Complaint
// =====================================
const adminUpdateComplaint = async (req, res) => {

    try {

        const result = await complaintService.adminUpdateComplaint(

            req.params.id,

            req.body

        );

        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================
// Assign Complaint To Faculty (Admin)
// =====================================
const assignComplaint = async (req, res) => {

    try {

        const result = await complaintService.assignComplaint(
            req.params.id,
            req.body.facultyId
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get Assigned Complaints (Faculty)
// =====================================
const getAssignedComplaints = async (req, res) => {

    try {

        const result = await complaintService.getAssignedComplaints(
            req.user._id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Update Complaint Progress (Faculty)
// =====================================
const updateComplaintProgress = async (req, res) => {

    try {

        const result = await complaintService.updateComplaintProgress(
            req.params.id,
            req.user._id,
            req.body.status
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get Dashboard Statistics (Admin)
// =====================================
const getDashboardStatistics = async (req, res) => {

    try {

        const result = await complaintService.getDashboardStatistics();

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// Get Complaint History
// =====================================
const getComplaintHistory = async (req, res) => {

    try {

        const result = await complaintService.getComplaintHistory(
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

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