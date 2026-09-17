const Complaint = require("../models/Complaint");
const { GoogleGenAI } = require("@google/genai");

// ======================================
// Gemini AI Configuration
// ======================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ======================================
// Gemini Settings
// ======================================

const GEMINI_MODEL = "gemini-3.1-flash-lite";

// Only the top few keyword matches will be
// sent to Gemini to reduce API usage.
const MAX_AI_CANDIDATES = 3;

// Gemini duplicate threshold
const GEMINI_DUPLICATE_THRESHOLD = 80;

// Strong keyword duplicate threshold
const KEYWORD_DUPLICATE_THRESHOLD = 70;

// ======================================
// Normalize Text
// ======================================

const normalize = (text = "") => {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .trim();

};

// ======================================
// Keyword Similarity
// ======================================

const calculateSimilarity = (text1, text2) => {

    const normalizedText1 = normalize(text1);
    const normalizedText2 = normalize(text2);

    if (!normalizedText1 || !normalizedText2) {
        return 0;
    }

    const words1 = new Set(
        normalizedText1.split(/\s+/)
    );

    const words2 = new Set(
        normalizedText2.split(/\s+/)
    );

    const intersection = [...words1].filter(word =>
        words2.has(word)
    );

    const union = new Set([
        ...words1,
        ...words2
    ]);

    if (union.size === 0) {
        return 0;
    }

    return (
        intersection.length /
        union.size
    ) * 100;

};

// ======================================
// Gemini Semantic Similarity
// ======================================

const checkSemanticSimilarity = async (
    newComplaint,
    existingComplaint
) => {

    const prompt = `
You are an AI duplicate complaint detector for a college campus incident management system.

Compare these two complaints and determine whether they describe the same underlying problem.

Complaint A:
${newComplaint}

Complaint B:
${existingComplaint}

Consider:

1. Same problem or incident
2. Same location if mentioned
3. Similar issue meaning
4. Different wording with the same meaning
5. Whether the complaints should be treated as duplicates

Return ONLY valid JSON.

{
    "duplicate": true,
    "similarity": 94,
    "reason": "Both complaints describe the same underlying issue."
}

Rules:

- "duplicate" must be true or false.
- "similarity" must be a number between 0 and 100.
- "reason" must briefly explain the decision.
- Do not return Markdown.
- Do not return code fences.
- Return JSON only.
`;

    try {

        console.log(
            "========== GEMINI DUPLICATE CHECK =========="
        );

        const response = await ai.models.generateContent({

            model: GEMINI_MODEL,

            contents: prompt

        });

        let text = response.text;

        console.log(
            "Gemini Raw Response:",
            text
        );

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

        return {

            success: true,

            duplicate:
                result.duplicate === true,

            similarity:
                Math.min(
                    100,
                    Math.max(
                        0,
                        Number(result.similarity) || 0
                    )
                ),

            reason:
                result.reason ||
                "No reason provided."

        };

    }

    catch (error) {

        console.error(
            "========== GEMINI DUPLICATE DETECTION ERROR =========="
        );

        console.error(
            error.message || error
        );

        // ======================================
        // IMPORTANT:
        // AI failure is NOT the same as
        // "not duplicate".
        // ======================================

        return {

            success: false,

            duplicate: false,

            similarity: 0,

            reason:
                "AI comparison failed."

        };

    }

};

// ======================================
// Find Duplicate Complaint
// ======================================

const findDuplicateComplaint = async (
    title,
    description
) => {

    try {

        console.log(
            "========== DUPLICATE COMPLAINT CHECK =========="
        );

        console.log(
            "New Complaint:",
            title,
            description
        );

        // ======================================
        // Get Existing Active Complaints
        // ======================================

        const complaints = await Complaint.find({

            status: {

                $ne: "Closed"

            }

        });

        // ======================================
        // No Existing Complaints
        // ======================================

        if (!complaints.length) {

            console.log(
                "No existing active complaints found."
            );

            return {

                duplicate: false,

                similarity: 0,

                method:
                    "No Existing Complaints"

            };

        }

        // ======================================
        // New Complaint Text
        // ======================================

        const newComplaintText =
            `${title} ${description}`;

        // ======================================
        // Step 1:
        // Calculate Keyword Similarity
        // ======================================

        const scoredComplaints =
            complaints.map(complaint => {

                const complaintText =
                    `${complaint.title} ${complaint.description}`;

                const score =
                    calculateSimilarity(
                        newComplaintText,
                        complaintText
                    );

                console.log(
                    `Keyword Similarity with "${complaint.title}": ${score.toFixed(2)}%`
                );

                return {

                    complaint,

                    keywordScore: score

                };

            });

        // ======================================
        // Sort Highest Similarity First
        // ======================================

        scoredComplaints.sort(
            (a, b) =>
                b.keywordScore -
                a.keywordScore
        );

        // ======================================
        // Best Keyword Match
        // ======================================

        const bestKeywordMatch =
            scoredComplaints[0];

        // ======================================
        // Strong Keyword Match
        // ======================================

        if (
            bestKeywordMatch &&
            bestKeywordMatch.keywordScore >=
                KEYWORD_DUPLICATE_THRESHOLD
        ) {

            console.log(
                "=========================================="
            );

            console.log(
                "Duplicate detected using Keyword Similarity."
            );

            console.log(
                `Similarity: ${bestKeywordMatch.keywordScore.toFixed(2)}%`
            );

            console.log(
                "=========================================="
            );

            return {

                duplicate: true,

                complaint:
                    bestKeywordMatch.complaint,

                similarity:
                    Number(
                        bestKeywordMatch
                            .keywordScore
                            .toFixed(2)
                    ),

                method:
                    "Keyword Similarity"

            };

        }

        // ======================================
        // Step 2:
        // Select Only Top AI Candidates
        // ======================================

        console.log(
            "Keyword match not strong enough."
        );

        console.log(
            "Starting Gemini Semantic AI comparison..."
        );

        const aiCandidates =
            scoredComplaints.slice(
                0,
                MAX_AI_CANDIDATES
            );

        console.log(
            `Gemini candidates selected: ${aiCandidates.length}`
        );

        // ======================================
        // Step 3:
        // Gemini Semantic Comparison
        // ======================================

        let bestAIResult = null;

        for (
            const candidate of aiCandidates
        ) {

            console.log(
                `Checking Gemini candidate: "${candidate.complaint.title}"`
            );

            const aiResult =
                await checkSemanticSimilarity(

                    `${title}\n${description}`,

                    `${candidate.complaint.title}\n${candidate.complaint.description}`

                );

            // ======================================
            // AI Failure
            // ======================================

            if (!aiResult.success) {

                console.warn(
                    `Gemini unavailable for "${candidate.complaint.title}".`
                );

                // Continue checking the remaining
                // candidates instead of treating
                // the failure as "not duplicate".
                continue;

            }

            console.log(
                `Gemini Similarity with "${candidate.complaint.title}": ${aiResult.similarity}%`
            );

            console.log(
                `Gemini Duplicate Decision: ${aiResult.duplicate}`
            );

            console.log(
                `Gemini Reason: ${aiResult.reason}`
            );

            // ======================================
            // Store Best AI Match
            // ======================================

            if (
                aiResult.duplicate &&
                (
                    !bestAIResult ||
                    aiResult.similarity >
                    bestAIResult.similarity
                )
            ) {

                bestAIResult = {

                    complaint:
                        candidate.complaint,

                    similarity:
                        aiResult.similarity,

                    reason:
                        aiResult.reason

                };

            }

        }

        // ======================================
        // Step 4:
        // Gemini Duplicate Threshold
        // ======================================

        if (
            bestAIResult &&
            bestAIResult.similarity >=
                GEMINI_DUPLICATE_THRESHOLD
        ) {

            console.log(
                "=========================================="
            );

            console.log(
                "Duplicate detected using Gemini Semantic AI."
            );

            console.log(
                `Similarity: ${bestAIResult.similarity}%`
            );

            console.log(
                `Reason: ${bestAIResult.reason}`
            );

            console.log(
                "=========================================="
            );

            return {

                duplicate: true,

                complaint:
                    bestAIResult.complaint,

                similarity:
                    Number(
                        bestAIResult
                            .similarity
                            .toFixed(2)
                    ),

                method:
                    "Gemini Semantic AI",

                reason:
                    bestAIResult.reason

            };

        }

        // ======================================
        // Step 5:
        // No Duplicate Found
        // ======================================

        console.log(
            "No duplicate complaint detected."
        );

        return {

            duplicate: false,

            similarity: 0,

            method:
                "Keyword + Gemini Semantic AI"

        };

    }

    catch (error) {

        console.error(
            "========== DUPLICATE DETECTION ERROR =========="
        );

        console.error(
            error.message || error
        );

        return {

            duplicate: false,

            similarity: 0,

            method:
                "Duplicate Detection Error"

        };

    }

};

// ======================================
// Export Service
// ======================================

module.exports = {

    findDuplicateComplaint

};