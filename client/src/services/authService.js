import API from "../api/axios";

// ================================
// Login User
// ================================
export const loginUser = async (userData) => {

    const response = await API.post("/auth/login", userData);

    return response.data;

};

// ================================
// Register User
// ================================
export const registerUser = async (userData) => {

    const response = await API.post("/auth/register", userData);

    return response.data;

};

// ================================
// Get Logged In User
// ================================
export const getProfile = async () => {

    const response = await API.get("/auth/profile");

    return response.data;

};