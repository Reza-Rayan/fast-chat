import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "@/utils/BaseURL";
import axios from "axios";
import axiosAgent from "@/services/axiosAgent";
import { setToken, removeToken } from "@/services/jwtService";

// Define an asynchronous thunk for handling login
export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  try {
<<<<<<< HEAD
    const response = await axiosAgent.post(`${BaseURL}/users/login`, body);
    const token = response.data.token;
    setToken(token);
=======
    const response = await axios.post(`${BaseURL}/users/login`, body);
    localStorage.setItem("token", response.data.token);
    // Use response.data directly
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk for handling signup
<<<<<<< HEAD
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
=======
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
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
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
<<<<<<< HEAD
        state.username = null;
=======
        state.user = null;
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
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
<<<<<<< HEAD
export const selectUser = (state) => {
  return state.authReducer.username;
};
=======
export const selectUser = (state) => state.user;
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
