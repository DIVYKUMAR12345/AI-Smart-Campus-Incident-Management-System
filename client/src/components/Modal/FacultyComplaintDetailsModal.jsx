import { useState, useEffect } from "react";
import { updateComplaintProgress } from "../../services/complaintService";

function FacultyComplaintDetailsModal({

    complaint,
    isOpen,
    onClose,
    history,
    onStatusUpdated

}) {

    // ===========================
    // Status State
    // ===========================

    const [status, setStatus] = useState(
        complaint?.status || "Assigned"
    );

    const [loading, setLoading] = useState(false);

    // ===========================
    // Update Status when complaint changes
    // ===========================

    useEffect(() => {

        if (complaint) {

            setStatus(
                complaint.status || "Assigned"
            );

        }

    }, [complaint]);

    // ===========================
    // Update Complaint Status
    // ===========================

    const handleUpdateStatus = async () => {

        try {

            setLoading(true);

            const response = await updateComplaintProgress(

                complaint._id,

                status

            );

            alert(

                response.message ||

                "Complaint Status Updated Successfully"

            );

            onStatusUpdated?.();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Status Update Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // Don't Render if Closed
    // ===========================

    if (!isOpen) return null;

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

                <h2 style={{ marginBottom: "25px" }}>
                    Complaint Details
                </h2>

                <p>
                    <strong>Title:</strong> {complaint.title}
                </p>

                <p>
                    <strong>Description:</strong> {complaint.description}
                </p>

                <p>
                    <strong>Student:</strong> {complaint.student.fullName}
                </p>

                <p>
                    <strong>Email:</strong> {complaint.student.email}
                </p>

                <p>
                    <strong>Department:</strong> {complaint.student.department}
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
                    {
                        complaint.assignedTo?.fullName ||
                        complaint.assignedTo ||
                        "Not Assigned"
                    }
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
                    Image
                =========================== */}

                <div style={{ marginTop: "20px" }}>

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

                <div style={{ marginTop: "20px" }}>

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

                {/* ================================================= */}
                {/* Faculty Update Status */}
                {/* ================================================= */}

                <div
                    style={{
                        marginTop: "30px",
                        borderTop: "1px solid #ddd",
                        paddingTop: "20px"
                    }}
                >

                    <h3>
                        Update Complaint Status
                    </h3>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "15px",
                            marginBottom: "15px"
                        }}
                    >

                        <option value="Assigned">
                            Assigned
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>

                    </select>

                    <button
                        onClick={handleUpdateStatus}
                        disabled={loading}
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >

                        {

                            loading

                                ? "Updating..."

                                : "Update Status"

                        }

                    </button>

                </div>

                {/* ===========================
                    Complaint History
                =========================== */}

                <div
                    style={{
                        marginTop: "35px",
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "20px"
                    }}
                >

                    <h3 style={{ marginBottom: "20px" }}>
                        Complaint History
                    </h3>

                    {

                        history?.length > 0 ?

                            history.map((item) => (

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

                            :

                            <p>No Complaint History Found</p>

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

export default FacultyComplaintDetailsModal;