function ComplaintDetailsModal({
    complaint,
    isOpen,
    onClose,
    facultyList,
    selectedFaculty,
    setSelectedFaculty,
    onAssign,
    assignLoading,
    history
}) {

    // ===========================
    // Don't Render if Closed
    // ===========================
    if (!isOpen || !complaint) return null;

    return (

        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999
            }}
        >

            <div
                style={{
                    width: "700px",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "30px"
                }}
            >

                {/* ===========================
                    Heading
                =========================== */}

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    Complaint Details
                </h2>

                {/* ===========================
                    Complaint Information
                =========================== */}

                <p>
                    <strong>Title:</strong> {complaint.title}
                </p>

                <p>
                    <strong>Description:</strong> {complaint.description}
                </p>

                <p>
                    <strong>Student:</strong> {complaint.student?.fullName || "N/A"}
                </p>

                <p>
                    <strong>Email:</strong> {complaint.student?.email || "N/A"}
                </p>

                <p>
                    <strong>Department:</strong> {complaint.student?.department || "N/A"}
                </p>

                <p>
                    <strong>Category:</strong> {complaint.category}
                </p>

                <p>
                    <strong>Priority:</strong> {complaint.priority}
                </p>

                <p>
                    <strong>Status:</strong> {complaint.status}
                </p>

                <p>
                    <strong>Assigned Faculty:</strong>{" "}
                    {complaint.assignedTo?.fullName || "Not Assigned"}
                </p>

                <p>
                    <strong>Latitude:</strong>{" "}
                    {complaint.latitude || "--"}
                </p>

                <p>
                    <strong>Longitude:</strong>{" "}
                    {complaint.longitude || "--"}
                </p>

                <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleString()}
                </p>

                {/* ===========================
    AI Analysis
=========================== */}

                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "2px solid #2563eb",
                        borderRadius: "10px",
                        background: "#f8fbff"
                    }}
                >

                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#2563eb"
                        }}
                    >
                        🤖 AI Analysis
                    </h3>

                    <p>
                        <strong>AI Category:</strong>{" "}
                        {complaint.category || "N/A"}
                    </p>

                    <p>
                        <strong>AI Priority:</strong>{" "}
                        {complaint.priority || "N/A"}
                    </p>

                    <p>
                        <strong>Confidence:</strong>{" "}
                        {complaint.aiConfidence
                            ? `${complaint.aiConfidence}%`
                            : "N/A"}
                    </p>

                    <p>
                        <strong>Emergency:</strong>{" "}
                        {complaint.aiEmergency ? "🚨 YES" : "✅ NO"}
                    </p>

                    <p>
                        <strong>Summary:</strong>
                        <br />
                        {complaint.aiSummary || "N/A"}
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        <br />
                        {complaint.aiReason || "N/A"}
                    </p>

                </div>

                {/* ===========================
    AI Faculty Recommendation
=========================== */}

                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "2px solid #16a34a",
                        borderRadius: "10px",
                        background: "#f0fdf4"
                    }}
                >

                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#16a34a"
                        }}
                    >
                        🤖 AI Faculty Recommendation
                    </h3>

                    <p>
                        <strong>Recommended Faculty:</strong>{" "}
                        {
                            complaint.recommendedFaculty?.fullName ||
                            "No Recommendation"
                        }
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {
                            complaint.recommendedFaculty?.department ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Recommendation Score:</strong>{" "}
                        <span
                            style={{
                                background:
                                    complaint.recommendationScore >= 90
                                        ? "#16a34a"
                                        : complaint.recommendationScore >= 70
                                            ? "#f59e0b"
                                            : "#ef4444",
                                color: "#fff",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                fontSize: "13px"
                            }}
                        >
                            {complaint.recommendationScore}%
                        </span>
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        <br />
                        {
                            complaint.recommendationReason ||
                            "No recommendation available."
                        }
                    </p>

                </div>

                {/* ===========================
                    Image
                =========================== */}

                <div
                    style={{
                        marginTop: "20px"
                    }}
                >

                    <strong>Image</strong>

                    <br />

                    {

                        complaint.image ?

                            <img
                                src={complaint.image}
                                alt="Complaint"
                                style={{
                                    width: "250px",
                                    marginTop: "10px",
                                    borderRadius: "8px"
                                }}
                            />

                            :

                            <p>No Image Uploaded</p>

                    }

                </div>

                {/* ===========================
                    Voice Recording
                =========================== */}

                <div
                    style={{
                        marginTop: "20px"
                    }}
                >

                    <strong>Voice Recording</strong>

                    <br />

                    {

                        complaint.voice ?

                            <audio
                                controls
                                src={complaint.voice}
                                style={{
                                    marginTop: "10px",
                                    width: "100%"
                                }}
                            />

                            :

                            <p>No Voice Recording</p>

                    }

                </div>

                {/* ==========================
                    Assign Faculty
                ========================== */}

                <div
                    style={{
                        marginTop: "30px",
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "20px"
                    }}
                >

                    <h3
                        style={{
                            marginBottom: "15px"
                        }}
                    >
                        👨‍🏫 Assign Faculty
                    </h3>

                    <select
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            marginBottom: "15px",
                            fontSize: "15px"
                        }}
                    >

                        <option value="">
                            Select Faculty
                        </option>

                        {facultyList?.map((faculty) => (

                            <option
                                key={faculty._id}
                                value={faculty._id}
                            >
                                {faculty.fullName}
                            </option>

                        ))}

                    </select>

                    <button
                        onClick={onAssign}
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "14px"
                        }}
                    >
                        Assign Faculty
                    </button>

                </div>

                {/* ==========================
Complaint History
========================== */}

                <div
                    style={{
                        marginTop: "35px"
                    }}
                >

                    <h3
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Complaint History
                    </h3>

                    {

                        history?.length > 0 ? (

                            history?.map((item) => (

                                <div
                                    key={item._id}
                                    style={{
                                        borderLeft: "4px solid #2563eb",
                                        paddingLeft: "15px",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <h4
                                        style={{
                                            marginBottom: "5px",
                                            color: "#2563eb"
                                        }}
                                    >
                                        {item.action}
                                    </h4>

                                    <p>

                                        <strong>Performed By:</strong>{" "}

                                        {

                                            item.performedBy?.fullName ||

                                            "System"

                                        }

                                    </p>

                                    <p>

                                        <strong>Role:</strong>{" "}

                                        {item.performedRole}

                                    </p>

                                    <p>

                                        <strong>Remarks:</strong>{" "}

                                        {item.remarks}

                                    </p>

                                    <p
                                        style={{
                                            color: "#777",
                                            fontSize: "13px"
                                        }}
                                    >

                                        {

                                            new Date(
                                                item.createdAt
                                            ).toLocaleString()

                                        }

                                    </p>

                                </div>

                            ))

                        )

                            :

                            (

                                <p>

                                    No Complaint History Found

                                </p>

                            )

                    }

                </div>

                {/* ===========================
                    Close Button
                =========================== */}

                <div
                    style={{
                        marginTop: "30px",
                        textAlign: "right"
                    }}
                >

                    <button
                        onClick={onClose}
                        style={{
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            padding: "10px 25px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ComplaintDetailsModal;