import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "@/utils/BaseURL";
import axios from "axios";

// Define an asynchronous thunk for handling login
export const login = createAsyncThunk("auth/login", async (body) => {
  try {
    const response = await axios.post(`${BaseURL}/users/login`, body);

    // Use response.data directly
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk for handling signup
export const signup = createAsyncThunk("auth/signup", async (body) => {
  try {
    const response = await axios.post(`${BaseURL}/users`, body);

    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Signup Extra Reducers
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logOut } = authSlice.actions;

// Add selectUser selector
export const selectUser = (state) => state.user;

export default authSlice.reducer;
