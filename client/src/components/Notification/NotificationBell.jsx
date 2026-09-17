import { useEffect, useState } from "react";

import NotificationDropdown from "./NotificationDropdown";

import { useSocket } from "../../context/SocketContext";

import { toast } from "react-toastify";

import {

    getNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    deleteNotification

} from "../../services/notificationService";

function NotificationBell() {

    // =====================================
    // Notification State
    // =====================================

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    // =====================================
    // Dropdown State
    // =====================================

    const [showDropdown, setShowDropdown] = useState(false);

    // =====================================
    // Socket
    // =====================================

    const socket = useSocket();

    // =====================================
    // Load Notifications
    // =====================================

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response = await getNotifications();

            setNotifications(response.data);

        }

        catch (error) {

            console.error(
                "Notification Load Error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };

    // =====================================
    // Toggle Dropdown
    // =====================================

    const toggleDropdown = () => {

        setShowDropdown(prev => !prev);

    };

    // =====================================
    // Mark One Notification Read
    // =====================================

    const handleMarkRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            await loadNotifications();

        }

        catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Mark All Notifications Read
    // =====================================

    const handleMarkAllRead = async () => {

        try {

            await markAllNotificationsAsRead();

            await loadNotifications();

        }

        catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Delete Notification
    // =====================================

    const handleDelete = async (id) => {

        try {

            await deleteNotification(id);

            await loadNotifications();

        }

        catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Load Notifications On Mount
    // =====================================

    useEffect(() => {

        loadNotifications();

        const interval = setInterval(() => {

            loadNotifications();

        }, 10000);

        return () => {

            clearInterval(interval);

        };

    }, []);

    // =====================================
    // Live Socket Notification
    // =====================================

    useEffect(() => {

        if (!socket) return;

        const handleNewNotification = (notification) => {

            console.log("🔔 Live Notification Received");

            console.log(notification);

            toast.info(

                `${notification.title}\n${notification.message}`

            );

            loadNotifications();

        };

        socket.on("newNotification", handleNewNotification);

        return () => {

            socket.off("newNotification", handleNewNotification);

        };

    }, [socket]);

    // =====================================
    // Unread Count
    // =====================================

    const unreadCount = notifications.filter(

        (notification) => !notification.isRead

    ).length;

    return (

        <div

            style={{

                position: "relative",

                cursor: "pointer"

            }}

        >

            {/* Notification Bell */}

            <span

                onClick={toggleDropdown}

                style={{

                    fontSize: "28px"

                }}

            >

                🔔

            </span>

            {/* Notification Badge */}

            {

                unreadCount > 0 && (

                    <span

                        style={{

                            position: "absolute",

                            top: "-6px",

                            right: "-10px",

                            background: "#ef4444",

                            color: "#fff",

                            borderRadius: "50%",

                            width: "22px",

                            height: "22px",

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            fontSize: "12px",

                            fontWeight: "bold"

                        }}

                    >

                        {unreadCount}

                    </span>

                )

            }

            {/* Notification Dropdown */}

            {

                showDropdown && (

                    <NotificationDropdown

                        notifications={notifications}

                        loading={loading}

                        onMarkRead={handleMarkRead}

                        onMarkAllRead={handleMarkAllRead}

                        onDelete={handleDelete}

                    />

                )

            }

        </div>

    );

}

export default NotificationBell;