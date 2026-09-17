const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const isDuplicateComplaint = async (
    newComplaint,
    existingComplaint
) => {

    const prompt = `
You are an AI duplicate complaint detector.

Compare these two complaints.

Complaint A:
${newComplaint}

Complaint B:
${existingComplaint}

Return ONLY JSON.

Example:

{
    "duplicate": true,
    "similarity": 94,
    "reason": "Both complaints describe the same water leakage issue."
}
`;

    try {

        const response =
            await ai.models.generateContent({

                model: "gemini-3.1-flash-lite",

                contents: prompt

            });

        return JSON.parse(response.text);

    }

    catch (error) {

        console.log("Semantic Duplicate Error");

        console.log(error);

        return {

            duplicate: false,

            similarity: 0,

            reason: "Gemini comparison failed."

        };

    }

};

module.exports = {

    isDuplicateComplaint

};