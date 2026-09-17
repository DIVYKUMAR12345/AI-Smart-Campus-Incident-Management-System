function ComplaintTable({

    complaints,

    onView,

    onEdit

}) {

    // ===============================
    // Priority Badge Color
    // ===============================
    const getPriorityColor = (priority) => {

        switch (priority) {

            case "High":
                return "#ef4444";

            case "Medium":
                return "#f59e0b";

            case "Low":
                return "#10b981";

            default:
                return "#6b7280";

        }

    };

    // ===============================
    // Status Badge Color
    // ===============================
    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":
                return "#f59e0b";

            case "Assigned":
                return "#3b82f6";

            case "In Progress":
                return "#8b5cf6";

            case "Resolved":
                return "#10b981";

            case "Closed":
                return "#6b7280";

            default:
                return "#111827";

        }

    };

    return (

        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)"
            }}
        >

            <thead>

                <tr
                    style={{
                        background: "#2563eb",
                        color: "#fff"
                    }}
                >

                    <th style={{ padding: "15px" }}>Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    complaints.length > 0 ? (

                        complaints.map((item) => (

                            <tr
                                key={item._id}
                                style={{
                                    borderBottom: "1px solid #eee"
                                }}
                            >

                                <td style={{ padding: "15px" }}>
                                    {item.title}
                                </td>

                                <td>
                                    {item.category}
                                </td>

                                <td>

                                    <span
                                        style={{
                                            background: getPriorityColor(item.priority),
                                            color: "#fff",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "13px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {item.priority}
                                    </span>

                                </td>

                                <td>

                                    <span
                                        style={{
                                            background: getStatusColor(item.status),
                                            color: "#fff",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "13px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>
                                    {item.student.fullName}
                                </td>

                                <td>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>

                                {/* ===========================
                                    Action Buttons
                                =========================== */}

                                <td>

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        {/* View */}

                                        <button
                                            onClick={() => onView(item)}
                                            style={{
                                                background: "#2563eb",
                                                color: "#fff",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "13px"
                                            }}
                                        >
                                            👁 View
                                        </button>

                                        {/* Edit (Admin Only) */}

                                        {

                                            onEdit && (

                                                <button
                                                    onClick={() => onEdit(item)}
                                                    style={{
                                                        background: "#f59e0b",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "8px 12px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "13px"
                                                    }}
                                                >
                                                    ✏ Edit
                                                </button>

                                            )

                                        }

                                        {/* Delete (Admin Only) */}

                                        {

                                            onEdit && (

                                                <button
                                                    style={{
                                                        background: "#ef4444",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "8px 12px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "13px"
                                                    }}
                                                >
                                                    🗑 Delete
                                                </button>

                                            )

                                        }

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "30px",
                                    color: "#888",
                                    fontSize: "16px"
                                }}
                            >
                                No Complaints Found
                            </td>

                        </tr>

                    )

                }

            </tbody>

        </table>

    );

}

export default ComplaintTable;