import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "@/utils/BaseURL";
import axios from "axios";
import axiosAgent from "@/services/axiosAgent";
import { setToken, removeToken } from "@/services/jwtService";

// Define an asynchronous thunk for handling login
export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  try {
    const response = await axiosAgent.post(`${BaseURL}/users/login`, body);
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk for handling signup
export const signup = createAsyncThunk("auth/signup", async (body) => {
  try {
    const response = await axiosAgent.post(`${BaseURL}/users`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk for handling logout
export const logout = createAsyncThunk("auth/logout", async (body) => {
  try {
    const response = await axiosAgent.post(`${BaseURL}/users/logout`, body);
    removeToken("token");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  username: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.username = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          username: action.payload.user, // Assuming the username is present in the payload
          status: "idle",
          error: null,
        };
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
      })
      // Logout Extra Reducers
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.username = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Add selectUser selector
export const selectUser = (state) => {
  return state.authReducer.username;
};

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
