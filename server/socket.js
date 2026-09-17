const { Server } = require("socket.io");

let io;

// ======================================
// Initialize Socket.IO
// ======================================

const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: "http://localhost:5173",

            methods: [

                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"

            ]

        }

    });

    io.on("connection", (socket) => {

        console.log("🟢 User Connected :", socket.id);

        socket.on("disconnect", () => {

            console.log("🔴 User Disconnected :", socket.id);

        });

    });

    return io;

};

// ======================================
// Get Socket Instance
// ======================================

const getIO = () => {

    if (!io) {

        throw new Error(

            "Socket.IO has not been initialized."

        );

    }

    return io;

};

module.exports = {

    initializeSocket,

    getIO

};