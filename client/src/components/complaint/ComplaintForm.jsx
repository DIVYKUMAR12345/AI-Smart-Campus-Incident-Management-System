import { useState } from "react";
import { createComplaint } from "../../services/complaintService";
import { analyzeComplaint } from "../../services/aiService";

function ComplaintForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("Medium");

    const [image, setImage] = useState(null);
    const [voice, setVoice] = useState(null);
    const [anonymous, setAnonymous] = useState(false);

    const [loading, setLoading] = useState(false);

    // ======================================
    // AI States
    // ======================================

    const [aiLoading, setAiLoading] = useState(false);

    const [aiResult, setAiResult] = useState(null);

    const [duplicateResult, setDuplicateResult] = useState(null);

    

    // ======================================
    // Analyze Complaint Using AI
    // ======================================

    const handleAnalyze = async () => {

        if (!title || !description) {

            alert("Please enter Title and Description.");

            return;

        }

        try {

            setAiLoading(true);

            const response = await analyzeComplaint(

                title,

                description

            );

            console.log("========== AI RESPONSE ==========");
            console.log(response);

            setAiResult(response.data);

            // Auto-fill form fields
            setCategory(response.data.category || "");
            setPriority(response.data.priority || "Medium");

        }

        catch (error) {

            console.log("========== AI ERROR ==========");
            console.log(error);
            console.log(error.response);

            alert(

                error.response?.data?.message ||

                "AI Analysis Failed"

            );

        }

        finally {

            setAiLoading(false);

        }

    };

    // ======================================
    // Submit Complaint
    // ======================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("==================================");
        console.log("Submit Button Clicked");
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Category:", category);
        console.log("Priority:", priority);
        console.log("Image:", image);
        console.log("Voice:", voice);
        console.log("Anonymous:", anonymous);
        console.log("==================================");

        if (!title || !description) {

            alert("Please fill all required fields.");

            return;
        }

        try {

            setLoading(true);

            console.log("Creating FormData...");

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("priority", priority);
            formData.append("anonymous", anonymous);

            // ======================================
            // AI Fields
            // ======================================

            if (aiResult) {

                formData.append("aiConfidence", aiResult.confidence || 0);

                formData.append("aiEmergency", aiResult.emergency || false);

                formData.append("aiSummary", aiResult.summary || "");

                formData.append("aiReason", aiResult.reason || "");

            }

            if (image) {
                formData.append("image", image);
            }

            if (voice) {
                formData.append("voice", voice);
            }

            console.log("Sending Request To Backend...");

            const response = await createComplaint(formData);

            console.log("Backend Response:", response);

            alert(
                response.message ||
                "Complaint Submitted Successfully"
            );

            // Reset Form
            setTitle("");
            setDescription("");
            setCategory("");
            setPriority("Medium");
            setImage(null);
            setVoice(null);
            setAnonymous(false);
            setDuplicateResult(null);

            if (document.getElementById("imageInput")) {
                document.getElementById("imageInput").value = "";
            }

            if (document.getElementById("voiceInput")) {
                document.getElementById("voiceInput").value = "";
            }

            console.log("Form Reset Successfully");

        }

        catch (error) {

            console.error("Complaint Submit Error");

            console.error(error);

            const response = error?.response?.data;

            // ===============================
            // Duplicate Complaint
            // ===============================

            if (response?.duplicate) {

                setDuplicateResult(response);

                return;

            }

            alert(

                response?.message ||

                "Failed to submit complaint."

            );

        }

        finally {

            setLoading(false);

            console.log("Finished");

        }

    };

    return (

        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                marginBottom: "30px"
            }}
        >

            <h2>Create Complaint</h2>

            <hr />

            <form
                onSubmit={handleSubmit}
                style={{ marginTop: "20px" }}
            >

                <label>Complaint Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter complaint title"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                />

                <label>Description</label>

                <textarea
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your complaint..."
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                />

                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                >
                    <option value="">Select Category</option>

                    <option value="Electricity">Electricity</option>

                    <option value="Water">Water</option>

                    <option value="Network">Network</option>

                    <option value="Security">Security</option>

                    <option value="Cleanliness">Cleanliness</option>

                    <option value="Furniture">Furniture</option>

                    <option value="Maintenance">Maintenance</option>

                    <option value="Other">Other</option>
                </select>

                <label>Priority</label>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                {/* ================= AI Analyze Button ================= */}

                <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={aiLoading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#7c3aed",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginBottom: "20px"
                    }}
                >

                    {
                        aiLoading
                            ? "🤖 Analyzing..."
                            : "🤖 Analyze with AI"
                    }

                </button>

                {/* ================= AI Result ================= */}

                {
                    aiResult && (

                        <div
                            style={{
                                background: "#eef6ff",
                                border: "2px solid #2563eb",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "25px"
                            }}
                        >

                            <h3 style={{ marginBottom: "15px" }}>
                                🤖 AI Analysis Result
                            </h3>

                            <hr />

                            <p>
                                <strong>Category :</strong>{" "}
                                {aiResult.category}
                            </p>

                            <p>
                                <strong>Priority :</strong>{" "}
                                {aiResult.priority}
                            </p>

                            <p>
                                <strong>Confidence :</strong>{" "}
                                {aiResult.confidence}%
                            </p>

                            <p>
                                <strong>Emergency :</strong>{" "}
                                {
                                    aiResult.emergency
                                        ? "🚨 YES"
                                        : "✅ NO"
                                }
                            </p>

                            <p>
                                <strong>Summary :</strong><br />
                                {aiResult.summary}
                            </p>

                            <p>
                                <strong>Reason :</strong><br />
                                {aiResult.reason}
                            </p>

                        </div>

                    )
                }

                <label>Upload Image</label>

                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{
                        marginTop: "10px",
                        marginBottom: "20px",
                        display: "block"
                    }}
                />

                <label>Upload Voice Recording</label>

                <input
                    id="voiceInput"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setVoice(e.target.files[0])}
                    style={{
                        marginTop: "10px",
                        marginBottom: "20px",
                        display: "block"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "20px"
                    }}
                >

                    <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                    />

                    <span>Submit Anonymously</span>

                </div>

                {
                    duplicateResult && (

                        <div
                            style={{
                                background: "#fff3cd",
                                border: "2px solid orange",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "20px"
                            }}
                        >

                            <h3>⚠ Possible Duplicate Complaint</h3>

                            <hr />

                            <p>

                                <strong>Existing Complaint:</strong>

                                {" "}

                                {duplicateResult.existingComplaint?.title}

                            </p>

                            <p>

                                <strong>Similarity:</strong>

                                {" "}

                                {duplicateResult.existingComplaint?.similarity}%

                            </p>

                            <p>

                                <strong>AI Recommendation:</strong>

                                <br />

                                Please review the existing complaint before submitting another complaint.

                            </p>

                        </div>

                    )
                }

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        padding: "12px 25px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    {
                        loading
                            ? "Submitting..."
                            : "Submit Complaint"
                    }
                </button>

            </form>

        </div>

    );

}

export default ComplaintForm;