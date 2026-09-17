const authService = require("../services/authService");

// =====================================
// Register User
// =====================================
const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Login User
// =====================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Get Logged In User Profile
// =====================================
const getProfile = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message: "Profile Retrieved Successfully",
            data: req.user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};