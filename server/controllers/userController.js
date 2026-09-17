const User = require("../models/User");

// =====================================
// Get Logged In User Profile
// =====================================
const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Profile Fetched Successfully",
        data: req.user
    });

};

// =====================================
// Get All Faculty Users (Admin)
// =====================================
const getFacultyUsers = async (req, res) => {

    try {

        const faculty = await User.find(
            {
                role: "faculty"
            },
            {
                password: 0
            }
        );

        res.status(200).json({
            success: true,
            message: "Faculty Retrieved Successfully",
            data: faculty
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    getProfile,
    getFacultyUsers

};