import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
      //...
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

