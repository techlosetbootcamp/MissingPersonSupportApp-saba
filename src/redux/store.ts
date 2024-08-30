import { configureStore } from '@reduxjs/toolkit';

import authReducer from "../redux/slices/authSlice"
import profileReducer from '../redux/slices/profileSlice';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    profile: profileReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

