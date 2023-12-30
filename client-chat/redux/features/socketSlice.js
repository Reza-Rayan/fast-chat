import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  rooms: [], // Track available chat rooms
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { setUsers, setRooms } = socketSlice.actions;
export const selectUsers = (state) => state.socket.users;
export const selectRooms = (state) => state.socket.rooms;

export default socketSlice.reducer;
