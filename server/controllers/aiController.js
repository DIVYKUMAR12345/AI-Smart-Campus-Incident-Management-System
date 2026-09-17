const aiService = require("../services/aiService");

// =====================================
// Analyze Complaint Using Gemini
// =====================================

const analyzeComplaint = async (req, res) => {

    try {

        const { title, description } = req.body;

        if (!title || !description) {

            return res.status(400).json({
                success: false,
                message: "Title and Description are required."
            });

        }

        const complaintText = `${title}\n${description}`;

        const result = await aiService.analyzeComplaint(complaintText);

        res.status(200).json({

            success: true,

            message: "AI Analysis Completed",

            data: result

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "AI Analysis Failed"

        });

    }

};

module.exports = {

    analyzeComplaint

};