import { useEffect, useState } from "react";

function EditComplaintModal({

    complaint,

    isOpen,

    onClose

}) {

    // =====================================
    // Form Data
    // =====================================

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        category: "",

        priority: "",

        status: ""

    });

    // =====================================
    // Load Complaint Data
    // =====================================

    useEffect(() => {

        if (complaint) {

            setFormData({

                title: complaint.title || "",

                description: complaint.description || "",

                category: complaint.category || "",

                priority: complaint.priority || "",

                status: complaint.status || ""

            });

        }

    }, [complaint]);

    // =====================================
    // Input Change
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // =====================================
    // Close Modal
    // =====================================

    if (!isOpen) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.55)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >

            <div
                style={{
                    width: "700px",
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "30px"
                }}
            >

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    ✏ Edit Complaint
                </h2>

                {/* Title */}

                <label>
                    Complaint Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                />

                {/* Description */}

                <label>
                    Description
                </label>

                <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px"
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "20px"
                    }}
                >

                    {/* Category */}

                    <div>

                        <label>
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "8px"
                            }}
                        >

                            <option>Electricity</option>
                            <option>Network</option>
                            <option>Furniture</option>
                            <option>Water</option>
                            <option>Cleaning</option>
                            <option>Other</option>

                        </select>

                    </div>

                    {/* Priority */}

                    <div>

                        <label>
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "8px"
                            }}
                        >

                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>

                        </select>

                    </div>

                    {/* Status */}

                    <div>

                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "8px"
                            }}
                        >

                            <option>Pending</option>
                            <option>Assigned</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>

                        </select>

                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "15px",
                        marginTop: "35px"
                    }}
                >

                    <button
                        onClick={onClose}
                        style={{
                            background: "#6b7280",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        💾 Save Changes
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditComplaintModal;