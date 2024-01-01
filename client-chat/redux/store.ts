import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth-slice";
import socketReducer from './features/socketSlice'

export const store = configureStore({
  reducer: {
<<<<<<< HEAD
    authReducer
=======
    authReducer,socketReducer
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
