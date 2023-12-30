import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth-slice";
import socketReducer from './features/socketSlice'

export const store = configureStore({
  reducer: {
    authReducer,socketReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
