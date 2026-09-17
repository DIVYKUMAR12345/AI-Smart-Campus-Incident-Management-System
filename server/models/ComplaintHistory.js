const mongoose = require("mongoose");

const complaintHistorySchema = new mongoose.Schema(
    {
        // Complaint Reference
        complaint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true
        },

        // Action Performed
        action: {
            type: String,
            required: true
        },

        // Who Performed This Action
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Role of User
        performedRole: {
            type: String,
            enum: [
                "student",
                "faculty",
                "admin",
                "AI System"
            ],
            required: true
        },

        // Optional Remarks
        remarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ComplaintHistory",
    complaintHistorySchema
);