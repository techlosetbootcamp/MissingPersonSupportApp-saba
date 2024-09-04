import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../redux/slices/authSlice';
import profileReducer from '../redux/slices/profileSlice';
import reportFormReducer from '../redux/slices/reportFormSlice';
import filterReportReducer from '../redux/slices/filterReportSlice';

import newsReducer from '../redux/slices/newsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    reportForm: reportFormReducer,
    filterReport: filterReportReducer,
    news: newsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
