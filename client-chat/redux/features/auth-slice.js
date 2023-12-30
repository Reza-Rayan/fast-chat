import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "@/utils/BaseURL";
import axios from "axios";

// Define an asynchronous thunk for handling login
export const login = createAsyncThunk("auth/login", async (body) => {
  try {
    const response = await axios.post(`${BaseURL}/users/login`, body);
    localStorage.setItem("token", response.data.token);
    // Use response.data directly
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk for handling signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      const response = await axios.post(`${BaseURL}/users`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an asynchronous thunk for handling logout
export const logout = createAsyncThunk("auth/logout", async (body) => {
  try {
    localStorage.removeItem("token");
    const response = await axios.post(`${BaseURL}/users/logout`, body);
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
      })
      // Logout Extra Reducers
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
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
export const selectUser = (state) => state.user;

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
