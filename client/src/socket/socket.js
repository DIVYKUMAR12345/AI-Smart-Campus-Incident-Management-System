import { io } from "socket.io-client";

// =====================================
// Socket Connection
// =====================================

const socket = io(import.meta.env.VITE_API_URL, {

    transports: ["websocket"],

    autoConnect: true

});

export default socket;