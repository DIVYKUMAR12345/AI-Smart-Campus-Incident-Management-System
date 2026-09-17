import API from "../api/axios";

// =====================================
// Analyze Complaint Using AI
// =====================================

export const analyzeComplaint = async (title, description) => {

    const response = await API.post(

        "/ai/analyze",

        {
            title,
            description
        }

    );

    return response.data;

};