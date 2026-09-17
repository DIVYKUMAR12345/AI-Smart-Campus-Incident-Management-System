const profileService = require("../services/profileService");

// =====================================
// Get Logged-in User Profile
// =====================================

const getProfile = async (req, res) => {

    try {

        const result = await profileService.getProfile(req.user._id);

        res.status(200).json(result);

    }

    catch (error) {

    console.log("========== PROFILE UPDATE ERROR ==========");
    console.error(error);

    res.status(400).json({
        success: false,
        message: error.message,
        stack: error.stack
    });

}

};

// =====================================
// Update Logged-in User Profile
// =====================================

const updateProfile = async (req, res) => {

    try {

        const result = await profileService.updateProfile(

            req.user._id,

            req.body,

            req.file

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

module.exports = {

    getProfile,

    updateProfile

};