const notificationService = require("../services/notificationService");

// ======================================
// Get Logged In User Notifications
// ======================================

const getUserNotifications = async (req, res) => {

    try {

        const result = await notificationService.getUserNotifications(
            req.user.id
        );

        res.status(200).json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Mark Notification As Read
// ======================================

const markNotificationAsRead = async (req, res) => {

    try {

        const result =
            await notificationService.markNotificationAsRead(

                req.params.id,

                req.user.id

            );

        res.status(200).json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Mark All Notifications As Read
// ======================================

const markAllNotificationsAsRead = async (req, res) => {

    try {

        const result =
            await notificationService.markAllNotificationsAsRead(

                req.user.id

            );

        res.status(200).json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Delete Notification
// ======================================

const deleteNotification = async (req, res) => {

    try {

        const result =
            await notificationService.deleteNotification(

                req.params.id,

                req.user.id

            );

        res.status(200).json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getUserNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    deleteNotification

};