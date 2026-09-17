import { io } from "socket.io-client";

// =====================================
// Socket Connection
// =====================================

const socket = io("http://localhost:5000", {

    transports: ["websocket"],

    autoConnect: true

});

export default socket;