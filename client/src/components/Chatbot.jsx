import React, { useState } from "react";
import API from "../api/axios";
import "./Chatbot.css";

const Chatbot = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 I'm your Smart Campus AI Assistant. How can I help you?"
        }
    ]);

    // =====================================
    // Send Question To Backend
    // =====================================

    const handleSend = async () => {

        const userQuestion = question.trim();

        if (!userQuestion || loading) {
            return;
        }

        // Show student message immediately
        setMessages((prev) => [

            ...prev,

            {
                sender: "student",
                text: userQuestion
            }

        ]);

        // Clear input
        setQuestion("");

        // Start loading
        setLoading(true);

        try {

            // =====================================
            // Call Chatbot API
            // =====================================

            const response = await API.post(
                "/ai/chatbot",
                {
                    question: userQuestion
                }
            );

            // =====================================
            // Add AI Response
            // =====================================

            setMessages((prev) => [

                ...prev,

                {
                    sender: "bot",
                    text:
                        response.data?.message ||
                        "Sorry, I could not understand your request."
                }

            ]);

        }

        catch (error) {

            console.error(
                "========== CHATBOT FRONTEND ERROR =========="
            );

            console.error(error);

            setMessages((prev) => [

                ...prev,

                {
                    sender: "bot",
                    text:
                        error.response?.data?.message ||
                        "Sorry, something went wrong. Please try again."
                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            {/* =====================================
                Floating Chatbot Button
            ===================================== */}

            {!isOpen && (

                <button

                    className="chatbot-floating-button"

                    onClick={() => setIsOpen(true)}

                    title="Open Smart Campus AI"

                >

                    🤖

                </button>

            )}


            {/* =====================================
                Chatbot Window
            ===================================== */}

            {isOpen && (

                <div className="chatbot-window">

                    {/* =====================================
                        Header
                    ===================================== */}

                    <div className="chatbot-header">

                        <div>

                            <h3>
                                🤖 Smart Campus AI
                            </h3>

                            <span>
                                AI Complaint Assistant
                            </span>

                        </div>


                        <button

                            className="chatbot-close-button"

                            onClick={() => setIsOpen(false)}

                            title="Close"

                        >

                            ×

                        </button>

                    </div>


                    {/* =====================================
                        Messages
                    ===================================== */}

                    <div className="chatbot-messages">

                        {messages.map((message, index) => (

                            <div

                                key={index}

                                className={
                                    message.sender === "student"
                                        ? "chatbot-message student-message"
                                        : "chatbot-message bot-message"
                                }

                            >

                                {message.text}

                            </div>

                        ))}


                        {/* Loading */}
                        {loading && (

                            <div className="chatbot-message bot-message">

                                <span className="chatbot-typing">
                                    AI is typing...
                                </span>

                            </div>

                        )}

                    </div>


                    {/* =====================================
                        Input
                    ===================================== */}

                    <div className="chatbot-input-area">

                        <input

                            type="text"

                            placeholder="Ask about your complaints..."

                            value={question}

                            onChange={(e) =>
                                setQuestion(e.target.value)
                            }

                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleSend();

                                }

                            }}

                            disabled={loading}

                        />


                        <button

                            onClick={handleSend}

                            disabled={
                                loading ||
                                !question.trim()
                            }

                            className="chatbot-send-button"

                        >

                            ➤

                        </button>

                    </div>

                </div>

            )}

        </>

    );

};

export default Chatbot;