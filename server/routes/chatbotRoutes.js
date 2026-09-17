const express = require("express");

const router = express.Router();

const {
    askChatbot
} = require("../controllers/chatbotController");

// =====================================
// AI Chatbot
// =====================================

router.post(
    "/ask",
    askChatbot
);

module.exports = router;