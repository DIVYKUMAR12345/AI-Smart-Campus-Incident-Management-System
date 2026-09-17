const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================
// Register User
// =====================================
const register = async (userData) => {

    // Check Existing Email
    const existingUser = await User.findOne({
        email: userData.email
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    userData.password = hashedPassword;

    // Create User
    const user = await User.create(userData);

    // Generate JWT Token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

    // Remove Password
    const userResponse = user.toObject();
    delete userResponse.password;

    return {
        success: true,
        message: "Registration Successful",
        token,
        user: userResponse
    };

};

// =====================================
// Login User
// =====================================
const login = async (email, password) => {

    console.log("====================================");
    console.log("Login Email:", email);

    // Check Email
    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
        throw new Error("User not found");
    }

    console.log("Stored Password:", user.password);

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

    // Remove Password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    return {
        success: true,
        message: "Login Successful",
        token,
        user: userResponse
    };
};

module.exports = {
    register,
    login
};