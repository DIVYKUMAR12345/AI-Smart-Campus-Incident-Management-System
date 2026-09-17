const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        // =====================================
        // AI Predicted Category
        // =====================================
        category: {
            type: String,
            enum: [
                "Ragging",
                "Bullying",
                "Girls Safety",
                "Harassment",
                "Lost Item",
                "Water",
                "Security",
                "Electricity",
                "Parking",
                "Furniture",
                "Cleanliness",
                "Network",
                "Maintenance",
                "Other"
            ],
            default: "Other"
        },

        // =====================================
        // AI Predicted Priority
        // =====================================
        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Emergency"
            ],
            default: "Medium"
        },

        // =====================================
        // AI Analysis
        // =====================================

        aiConfidence: {
            type: Number,
            default: 0
        },

        aiEmergency: {
            type: Boolean,
            default: false
        },

        aiSummary: {
            type: String,
            default: ""
        },

        aiReason: {
            type: String,
            default: ""
        },

        // =====================================
        // Complaint Status
        // =====================================

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "In Progress",
                "Resolved",
                "Closed"
            ],
            default: "Pending"
        },

        // =====================================
        // Uploaded Files
        // =====================================

        image: {
            type: String,
            default: ""
        },

        // ======================================
// AI Image Analysis
// ======================================

imageAI: {

    detected: {
        type: Boolean,
        default: false
    },

    category: {
        type: String,
        default: ""
    },

    issue: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: ""
    },

    emergency: {
        type: Boolean,
        default: false
    },

    confidence: {
        type: Number,
        default: 0
    },

    summary: {
        type: String,
        default: ""
    },

    reason: {
        type: String,
        default: ""
    }

},

        voice: {
            type: String,
            default: ""
        },

        // ======================================
// AI Voice Analysis
// ======================================

voiceAI: {

    transcript: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: ""
    },

    emergency: {
        type: Boolean,
        default: false
    },

    confidence: {
        type: Number,
        default: 0
    },

    summary: {
        type: String,
        default: ""
    },

    reason: {
        type: String,
        default: ""
    }

},

        // =====================================
        // Location
        // =====================================

        latitude: {
            type: Number,
            default: null
        },

        longitude: {
            type: Number,
            default: null
        },

        // =====================================
        // Anonymous Complaint
        // =====================================

        anonymous: {
            type: Boolean,
            default: false
        },

        // =====================================
        // Student
        // =====================================

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // =====================================
        // Assigned Faculty
        // =====================================

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        recommendedFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},

recommendationReason: {
    type: String,
    default: ""
},

recommendationScore: {
    type: Number,
    default: 0
},

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);