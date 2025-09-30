import { io } from "socket.io-client";

// Conexão com o backend
const socket = io("http://localhost:5000");

export default socket;
