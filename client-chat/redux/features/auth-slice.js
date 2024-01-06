import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { BaseURL } from "@/utils/BaseURL";
  import axiosAgent from "@/services/axiosAgent";
  import { setToken, removeToken } from "@/services/jwtService";

// Define an asynchronous thunk for handling login
export const login = createAsyncThunk("auth/login", async (body) => {
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
  newMessages: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addNotifications: (state, { payload }) => {
      console.log("Add Notif", payload);
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, action) => {
      console.log("reset notif", action.payload);
      delete state.newMessages[action.payload];
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
          username: action.payload.user,
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

export const { addNotifications, resetNotifications } = authSlice.actions;

export default authSlice.reducer;
