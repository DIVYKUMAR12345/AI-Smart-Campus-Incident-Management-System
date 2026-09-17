const { GoogleGenAI } = require("@google/genai");

const complaintPrompt = require("../prompts/complaintPrompt");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// =====================================
// Analyze Complaint
// =====================================

const analyzeComplaint = async (complaintText) => {

    const prompt = complaintPrompt(complaintText);

    console.log("========== AI PROMPT ==========");
    console.log(prompt);

    let response;

    try {

        // =====================================
        // Primary Model
        // =====================================

        response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });

    }

    catch (error) {

        console.log("======================================");
        console.log("Primary model failed.");
        console.log(error.message);
        console.log("Trying backup model...");
        console.log("======================================");

        try {

            // =====================================
            // Backup Model
            // =====================================

            response = await ai.models.generateContent({

                model: "gemini-3.5-flash-lite",

                contents: prompt

            });

        }

        catch (backupError) {

            console.log("======================================");
            console.log("Backup model also failed.");
            console.log(backupError.message);
            console.log("Returning default AI response.");
            console.log("======================================");

            return {

                category: "Other",

                priority: "Medium",

                emergency: false,

                confidence: 0,

                summary: "AI analysis unavailable.",

                reason:
                    "Google Gemini service is temporarily unavailable."

            };

        }

    }

    console.log("========== GEMINI RESPONSE ==========");
    console.log(response.text);

    try {

        // Remove markdown if Gemini returns ```json ... ```
        const cleanText = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanText);

    }

    catch (parseError) {

        console.log("======================================");
        console.log("JSON Parse Error");
        console.log(parseError.message);
        console.log("======================================");

        return {

            category: "Other",

            priority: "Medium",

            emergency: false,

            confidence: 0,

            summary: "Unable to parse AI response.",

            reason: "Gemini returned an invalid JSON format."

        };

    }

};

module.exports = {
    analyzeComplaint
};