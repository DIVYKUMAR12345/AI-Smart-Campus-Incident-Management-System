import API from "../api/axios";

// ==========================================
// Get Logged In User Notifications
// ==========================================

export const getNotifications = async () => {

    const response = await API.get("/notifications");

    return response.data;

};

// ==========================================
// Mark Notification As Read
// ==========================================

export const markNotificationAsRead = async (notificationId) => {

    const response = await API.patch(

        `/notifications/${notificationId}/read`

    );

    return response.data;

};

// ==========================================
// Mark All Notifications As Read
// ==========================================

export const markAllNotificationsAsRead = async () => {

    const response = await API.patch(

        "/notifications/read-all"

    );

    return response.data;

};

// ==========================================
// Delete Notification
// ==========================================

export const deleteNotification = async (notificationId) => {

    const response = await API.delete(

        `/notifications/${notificationId}`

    );

    return response.data;

};