import API from "../api/axios";

// =====================================
// Get Logged In User Profile
// =====================================
export const getProfile = async () => {

    const response = await API.get("/profile");

    return response.data;

};

// =====================================
// Update Logged In User Profile
// =====================================
export const updateProfile = async (formData) => {

    const response = await API.put(

        "/profile",

        formData

    );

    return response.data;

};