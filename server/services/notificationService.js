const Notification = require("../models/Notification");

// ======================================
// Create Notification
// ======================================

const createNotification = async ({

    user,

    title,

    message,

    type = "general"

}) => {

    console.log("Notification Service Called");

    const notification = await Notification.create({

        user,

        title,

        message,

        type

    });

    // ======================================
// Emit Real-Time Notification
// ======================================

const socketId = global.onlineUsers?.[user];

if (socketId) {

    global.io.to(socketId).emit(

        "newNotification",

        notification

    );

    console.log("📢 Notification Sent To:", user);

}

    console.log(notification);

    return {

        success: true,

        message: "Notification Created Successfully",

        data: notification

    };

};

// ======================================
// Get User Notifications
// ======================================

const getUserNotifications = async (userId) => {

    const notifications = await Notification.find({

        user: userId

    }).sort({

        createdAt: -1

    });

    return {

        success: true,

        message: "Notifications Retrieved Successfully",

        data: notifications

    };

};

// ======================================
// Mark Notification As Read
// ======================================

const markNotificationAsRead = async (

    notificationId,

    userId

) => {

    const notification = await Notification.findOne({

        _id: notificationId,

        user: userId

    });

    if (!notification) {

        throw new Error("Notification not found");

    }

    notification.isRead = true;

    await notification.save();

    return {

        success: true,

        message: "Notification Marked As Read",

        data: notification

    };

};

// ======================================
// Mark All Notifications As Read
// ======================================

const markAllNotificationsAsRead = async (

    userId

) => {

    await Notification.updateMany(

        {

            user: userId,

            isRead: false

        },

        {

            isRead: true

        }

    );

    return {

        success: true,

        message: "All Notifications Marked As Read"

    };

};

// ======================================
// Delete Notification
// ======================================

const deleteNotification = async (

    notificationId,

    userId

) => {

    const notification = await Notification.findOne({

        _id: notificationId,

        user: userId

    });

    if (!notification) {

        throw new Error("Notification not found");

    }

    await Notification.findByIdAndDelete(notificationId);

    return {

        success: true,

        message: "Notification Deleted Successfully"

    };

};

module.exports = {

    createNotification,

    getUserNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    deleteNotification

};