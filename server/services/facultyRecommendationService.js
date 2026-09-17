const User = require("../models/User");
const Complaint = require("../models/Complaint");

// ======================================
// All SCIMS Complaint Categories
// ======================================

const complaintCategories = [
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
];

// ======================================
// Recommend Faculty
// ======================================

const recommendFaculty = async (category) => {

    // ======================================
    // Validate Category
    // ======================================

    if (!complaintCategories.includes(category)) {

        return null;

    }

    // ======================================
    // Find Active Faculty Handling Category
    // ======================================

    const faculties = await User.find({

        role: "faculty",

        isActive: true,

        handledCategories: category

    });

    if (!faculties.length) {

        return null;

    }

    // ======================================
    // Find Faculty With Least Workload
    // ======================================

    let bestFaculty = null;

    let minimumComplaints = Number.MAX_SAFE_INTEGER;

    for (const faculty of faculties) {

        const activeComplaints =
            await Complaint.countDocuments({

                assignedTo: faculty._id,

                status: {
                    $in: [
                        "Assigned",
                        "In Progress"
                    ]
                }

            });

        if (activeComplaints < minimumComplaints) {

            minimumComplaints = activeComplaints;

            bestFaculty = faculty;

        }

    }

    // ======================================
    // No Faculty Found
    // ======================================

    if (!bestFaculty) {

        return null;

    }

    // ======================================
    // Recommendation Score
    // ======================================

    const score =
        Math.max(
            100 - (minimumComplaints * 10),
            50
        );

    // ======================================
    // Return Recommendation
    // ======================================

    return {

        faculty: bestFaculty,

        reason:
            `${bestFaculty.fullName} is responsible for ${category} complaints and currently has ${minimumComplaints} active complaints.`,

        score

    };

};


// ======================================
// Export
// ======================================

module.exports = {

    recommendFaculty

};