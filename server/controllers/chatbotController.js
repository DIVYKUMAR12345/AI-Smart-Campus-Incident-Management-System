const chatbotService = require("../services/chatbotService");

// =====================================
// Ask AI Chatbot
// =====================================

const askChatbot = async (req, res) => {

    try {

        const { question } = req.body;

        // =====================================
        // Get Logged-in Student ID
        // =====================================

        const studentId = req.user._id;

        // =====================================
        // Ask Chatbot Service
        // =====================================

        const result =
            await chatbotService.askChatbot(
                question,
                studentId
            );

        if (!result.success) {

            return res.status(400).json(result);

        }

        res.status(200).json(result);

    }

    catch (error) {

        console.error(
            "========== CHATBOT CONTROLLER ERROR =========="
        );

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Chatbot request failed.",

            error: error.message

        });

    }

};

// =====================================
// Export
// =====================================

module.exports = {

    askChatbot

};