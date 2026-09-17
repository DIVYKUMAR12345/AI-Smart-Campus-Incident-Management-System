const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const aiController = require("../controllers/aiController");
const chatbotController = require("../controllers/chatbotController");

// =====================================
// Analyze Complaint Using Gemini AI
// =====================================

router.post(
    "/analyze",
    authMiddleware,
    aiController.analyzeComplaint
);

// =====================================
// AI Chatbot
// =====================================

router.post(
    "/chatbot",
    authMiddleware,
    chatbotController.askChatbot
);

module.exports = router;