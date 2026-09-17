const User = require("../models/User");

// =====================================
// Get Logged-in User Profile
// =====================================

const getProfile = async (userId) => {

    const user = await User.findById(userId).select("-password");

    if (!user) {

        throw new Error("User not found");

    }

    return {

        success: true,

        message: "Profile Retrieved Successfully",

        data: user

    };

};

// =====================================
// Update Logged-in User Profile
// =====================================

const updateProfile = async (

    userId,

    data,

    file

) => {

    const user = await User.findById(userId);

    if (!user) {

        throw new Error("User not found");

    }

    user.fullName = data.fullName || user.fullName;

    user.phone = data.phone || user.phone;

    user.department = data.department || user.department;

    user.enrollmentNo = data.enrollmentNo || user.enrollmentNo;

    if (file) {

        user.profileImage = file.filename;

    }

    await user.save();

    return {

        success: true,

        message: "Profile Updated Successfully",

        data: user

    };

};

module.exports = {

    getProfile,

    updateProfile

};