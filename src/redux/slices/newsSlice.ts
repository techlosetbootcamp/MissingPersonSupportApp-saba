// store/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

interface NewsState {
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  loading: false,
  error: null,
};

export const addNewsReport = createAsyncThunk(
  'news/addNewsReport',
  async (
    {
      fullName,
      photo,
      currentLocation,
      description,
      reportedBy,
    }: {
      fullName: string;
      photo: string;
      currentLocation: string;
      description: string;
      reportedBy: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      await firestore().collection('News').add({
        fullName,
        photo,
        currentLocation,
        description,
        reportedBy,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewsReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewsReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewsReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
