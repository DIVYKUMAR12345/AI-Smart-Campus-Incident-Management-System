const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

// ======================================
// Gemini AI Configuration
// ======================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ======================================
// Analyze Complaint Voice
// ======================================

const analyzeComplaintVoice = async (voiceFilename) => {

    try {

        if (!voiceFilename) {

            return {
                success: false,
                message: "No voice recording provided."
            };

        }

        // ======================================
        // Voice File Path
        // ======================================

        const voicePath = path.join(
            __dirname,
            "../uploads",
            voiceFilename
        );

        // ======================================
        // Check Voice File Exists
        // ======================================

        if (!fs.existsSync(voicePath)) {

            return {
                success: false,
                message: "Complaint voice recording not found."
            };

        }

        // ======================================
        // Read Audio
        // ======================================

        const audioBuffer = fs.readFileSync(voicePath);

        const base64Audio =
            audioBuffer.toString("base64");

        // ======================================
        // Detect MIME Type
        // ======================================

        const extension =
            path.extname(voiceFilename).toLowerCase();

        let mimeType = "audio/mpeg";

        if (extension === ".wav") {

            mimeType = "audio/wav";

        }

        else if (extension === ".mp3") {

            mimeType = "audio/mpeg";

        }

        else if (extension === ".webm") {

            mimeType = "audio/webm";

        }

        else if (extension === ".ogg") {

            mimeType = "audio/ogg";

        }

        else if (extension === ".m4a") {

            mimeType = "audio/mp4";

        }

        // ======================================
        // Gemini Voice Prompt
        // ======================================

        const prompt = `
You are an AI voice complaint analysis system
for a Smart Campus Incident Management System.

Analyze the student's voice complaint.

Perform the following:

1. Convert the student's speech into text.
2. Identify the complaint category.
3. Determine the priority.
4. Determine whether the complaint is potentially an emergency.
5. Give a confidence percentage.
6. Give a short summary.
7. Give a short reason.

Allowed Categories:

- Electricity
- Water
- Network
- Security
- Cleanliness
- Furniture
- Maintenance
- Other

Allowed Priority:

- Low
- Medium
- High
- Emergency

Return ONLY valid JSON.

Example:

{
    "transcript": "The fan in Room 204 is not working.",
    "category": "Electricity",
    "priority": "Medium",
    "emergency": false,
    "confidence": 96,
    "summary": "Fan not working in Room 204",
    "reason": "The classroom fan is not functioning and requires maintenance."
}

If the audio cannot be understood clearly, return:

{
    "transcript": "",
    "category": "Other",
    "priority": "Low",
    "emergency": false,
    "confidence": 0,
    "summary": "Unable to understand the voice complaint.",
    "reason": "The audio recording does not contain clear or understandable complaint information."
}
`;

        // ======================================
        // Gemini Audio Request
        // ======================================

        const response =
            await ai.models.generateContent({

                model: "gemini-3.1-flash-lite",

                contents: [

                    {

                        role: "user",

                        parts: [

                            {
                                text: prompt
                            },

                            {

                                inlineData: {

                                    mimeType,
                                    data: base64Audio

                                }

                            }

                        ]

                    }

                ]

            });

        // ======================================
        // Extract Gemini Response
        // ======================================

        let text = response.text;

        if (!text) {

            throw new Error(
                "Gemini returned an empty response."
            );

        }

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // ======================================
        // Parse JSON
        // ======================================

        const result = JSON.parse(text);

        // ======================================
        // Console Output
        // ======================================

        console.log(
            "========== VOICE AI RESULT =========="
        );

        console.log(result);

        // ======================================
        // Return Result
        // ======================================

        return {

            success: true,

            data: result

        };

    }

    catch (error) {

        console.error(
            "========== VOICE AI ERROR =========="
        );

        console.error(error);

        return {

            success: false,

            message: "Voice analysis failed.",

            error: error.message

        };

    }

};

// ======================================
// Export
// ======================================

module.exports = {

    analyzeComplaintVoice

};