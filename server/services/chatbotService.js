const { GoogleGenAI } = require("@google/genai");

const Complaint = require("../models/Complaint");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// =====================================
// AI Chatbot
// =====================================

const askChatbot = async (question, studentId) => {

    try {

        if (!question || !question.trim()) {

            return {
                success: false,
                message: "Please enter a question."
            };

        }

        // =====================================
        // Get Student Complaints
        // =====================================

        const complaints = await Complaint.find({
            student: studentId
        })
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .limit(10);

        if (complaints.length === 0) {

    return {
        success: true,
        message: "You currently have no complaints recorded in the system."
    };

}

        // =====================================
        // Prepare Complaint Data
        // =====================================

        const complaintData = complaints.map((complaint) => ({

            id: complaint._id,

            title: complaint.title,

            description: complaint.description,

            category: complaint.category,

            priority: complaint.priority,

            status: complaint.status,

            assignedFaculty: complaint.assignedTo
                ? complaint.assignedTo.name
                : "Not assigned",

            createdAt: complaint.createdAt

        }));

        // =====================================
        // Gemini Prompt
        // =====================================

        const prompt = `
You are an AI assistant for a Smart Campus Incident Management System.

You are helping the currently logged-in student.

Answer the student's question using ONLY the complaint information provided below.

Student Question:
${question}

Student Complaint Data:
${JSON.stringify(complaintData, null, 2)}

Rules:

1. Do not invent complaint information.
2. Use only the provided complaint data.
3. If the student asks about their latest complaint, use the most recent complaint.
4. If the student asks about complaint status, provide the actual status.
5. If the student asks about assigned faculty, provide the actual assigned faculty.
6. If no faculty is assigned, say "No faculty has been assigned yet."
7. If no complaints exist, tell the student that no complaints are recorded.
8. Keep the response short, clear and professional.
9. Never expose another student's information.
`;

        // =====================================
        // Gemini AI
        // =====================================

        const response =
            await ai.models.generateContent({

                model: "gemini-3.1-flash-lite",

                contents: prompt

            });

        const text = response.text?.trim();

        if (!text) {

            throw new Error(
                "Gemini returned an empty response."
            );

        }

        return {

            success: true,

            message: text

        };

    }

    catch (error) {

        console.error(
            "========== CHATBOT AI ERROR =========="
        );

        console.error(error);

        return {

            success: false,

            message: "Chatbot response failed.",

            error: error.message

        };

    }

};

// =====================================
// Export
// =====================================

module.exports = {

    askChatbot

};