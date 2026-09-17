function NotificationDropdown({

    notifications,
    loading,
    onMarkRead,
    onMarkAllRead,
    onDelete

}) {

    return (

        <div
            style={{
                position: "absolute",
                top: "45px",
                right: 0,
                width: "360px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,.18)",
                overflow: "hidden",
                zIndex: 999,
                border: "1px solid #e5e7eb"
            }}
        >

            {/* ============================= */}
            {/* Header */}
            {/* ============================= */}

            <div
                style={{
                    padding: "15px 18px",
                    borderBottom: "1px solid #eee",
                    fontWeight: "bold",
                    fontSize: "18px",
                    background: "#fff",
                    position: "relative",
                    zIndex: 2
                }}
            >
                Notifications
            </div>


            {/* ============================= */}
            {/* Scrollable Notification Area */}
            {/* ============================= */}

            <div
                style={{
                    maxHeight: "420px",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}
            >

                {/* ============================= */}
                {/* Loading */}
                {/* ============================= */}

                {

                    loading ?

                        (

                            <div
                                style={{
                                    padding: "25px",
                                    textAlign: "center",
                                    color: "#666"
                                }}
                            >
                                Loading...
                            </div>

                        )

                        :

                        notifications.length === 0 ?

                            (

                                <div
                                    style={{
                                        padding: "25px",
                                        textAlign: "center",
                                        color: "#777"
                                    }}
                                >
                                    No Notifications
                                </div>

                            )

                            :

                            (

                                notifications.map((notification) => (

                                    <div
                                        key={notification._id}
                                        style={{
                                            padding: "15px 18px",
                                            borderBottom: "1px solid #eee",
                                            background:
                                                notification.isRead
                                                    ? "#fff"
                                                    : "#eef6ff",
                                            transition: "background 0.2s ease"
                                        }}
                                    >

                                        {/* Title + Unread Dot */}

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                gap: "10px"
                                            }}
                                        >

                                            <strong
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#1f2937"
                                                }}
                                            >
                                                {notification.title}
                                            </strong>

                                            {

                                                !notification.isRead &&

                                                <span
                                                    style={{
                                                        color: "#ef4444",
                                                        fontSize: "12px",
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    ●
                                                </span>

                                            }

                                        </div>


                                        {/* Message */}

                                        <p
                                            style={{
                                                marginTop: "8px",
                                                marginBottom: "7px",
                                                color: "#555",
                                                fontSize: "13px",
                                                lineHeight: "1.5"
                                            }}
                                        >
                                            {notification.message}
                                        </p>


                                        {/* Date */}

                                        <small
                                            style={{
                                                color: "#888",
                                                fontSize: "11px"
                                            }}
                                        >
                                            {
                                                new Date(
                                                    notification.createdAt
                                                ).toLocaleString()
                                            }
                                        </small>


                                        {/* Actions */}

                                        <div
                                            style={{
                                                marginTop: "10px",
                                                display: "flex",
                                                gap: "8px"
                                            }}
                                        >

                                            {

                                                !notification.isRead &&

                                                <button
                                                    onClick={() =>
                                                        onMarkRead(
                                                            notification._id
                                                        )
                                                    }
                                                    style={{
                                                        border: "none",
                                                        background: "#2563eb",
                                                        color: "#fff",
                                                        padding: "6px 10px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    ✓ Read
                                                </button>

                                            }


                                            <button
                                                onClick={() =>
                                                    onDelete(
                                                        notification._id
                                                    )
                                                }
                                                style={{
                                                    border: "none",
                                                    background: "#ef4444",
                                                    color: "#fff",
                                                    padding: "6px 10px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )

                }

            </div>


            {/* ============================= */}
            {/* Footer */}
            {/* ============================= */}

            {

                notifications.length > 0 &&

                <div
                    style={{
                        padding: "12px 15px",
                        textAlign: "center",
                        borderTop: "1px solid #eee",
                        background: "#fff",
                        position: "relative",
                        zIndex: 2
                    }}
                >

                    <button
                        onClick={onMarkAllRead}
                        style={{
                            border: "none",
                            background: "#f3f4f6",
                            color: "#2563eb",
                            padding: "8px 14px",
                            borderRadius: "7px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        ✓ Mark All As Read
                    </button>

                </div>

            }

        </div>

    );

}

export default NotificationDropdown;