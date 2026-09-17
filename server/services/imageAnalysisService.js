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
// Analyze Complaint Image
// ======================================

const analyzeComplaintImage = async (imageFilename) => {

    try {

        if (!imageFilename) {

            return {

                success: false,

                message: "No image provided."

            };

        }

        // ======================================
        // Image Path
        // ======================================

        const imagePath = path.join(

            __dirname,

            "../uploads",

            imageFilename

        );

        // ======================================
        // Check Image Exists
        // ======================================

        if (!fs.existsSync(imagePath)) {

            return {

                success: false,

                message: "Complaint image not found."

            };

        }

        // ======================================
        // Read Image
        // ======================================

        const imageBuffer =
            fs.readFileSync(imagePath);

        const base64Image =
            imageBuffer.toString("base64");

        // ======================================
        // Detect MIME Type
        // ======================================

        const extension =
            path.extname(imageFilename).toLowerCase();

        let mimeType = "image/jpeg";

        if (extension === ".png") {

            mimeType = "image/png";

        }

        else if (extension === ".webp") {

            mimeType = "image/webp";

        }

        else if (extension === ".gif") {

            mimeType = "image/gif";

        }

        // ======================================
        // Gemini Prompt
        // ======================================

        const prompt = `

You are an AI image analysis system for a
Smart Campus Incident Management System.

Analyze the uploaded campus complaint image.

Identify:

Identify:

1. What problem or object is visible?
2. Generate a short complaint title.
3. Generate a clear complaint description.
4. Which complaint category is most appropriate?
5. What priority should this issue receive?
6. Is this potentially an emergency?
7. Give a confidence percentage.
8. Give a short summary.
9. Give a short reason.

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
    "detected": true,
    "category": "Furniture",
    "issue": "Broken chair",
    "priority": "Medium",
    "emergency": false,
    "confidence": 94,
    "summary": "The image shows a damaged chair.",
    "reason": "Visible physical damage to the chair requires maintenance."
}

If the image does not clearly show a campus-related issue,
return:

{
    "detected": false,
    "category": "Other",
    "issue": "Unable to determine",
    "priority": "Low",
    "emergency": false,
    "confidence": 0,
    "summary": "The image does not clearly show a campus incident.",
    "reason": "The uploaded image does not provide enough visual information."
}

`;

        // ======================================
        // Gemini Vision Request
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

                                    data: base64Image

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

        // ======================================
        // Clean Gemini Response
        // ======================================

        text = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // ======================================
        // Parse JSON
        // ======================================

        const result = JSON.parse(text);

        // ======================================
        // Log Result
        // ======================================

        console.log(
            "========== IMAGE AI RESULT =========="
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
            "========== IMAGE AI ERROR =========="
        );

        console.error(
            error.message || error
        );

        return {

            success: false,

            message: "Image analysis failed.",

            error:
                error.message

        };

    }

};

// ======================================
// Export
// ======================================

module.exports = {

    analyzeComplaintImage

};