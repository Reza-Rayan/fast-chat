import { setUsers, setRooms } from "./socketSlice";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";
const socket = io(SOCKET_URL);

export const initializeSocket = () => (dispatch) => {
  socket.emit("new-user");

  socket.on("new-user", (users) => {
    dispatch(setUsers(users));
  });

  socket.on("rooms-list", (rooms) => {
    dispatch(setRooms(rooms));
  });
};

// ... (other thunks remain unchanged)
