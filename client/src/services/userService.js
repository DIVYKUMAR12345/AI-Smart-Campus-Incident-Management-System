import API from "../api/axios";

// =====================================
// Get All Faculty
// =====================================
export const getFacultyUsers = async () => {

    const response = await API.get("/users/faculty-list");

    return response.data;

};