import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

interface ReportFormState {
  fullName: string;
  gender: string;
  dateOfBirth: string; // Store date as string
  nickname: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  hairLength: string;
  photo: string | null;
  lastSeen: string;
  lastLocation: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReportFormState = {
  fullName: '',
  gender: '',
  dateOfBirth: new Date().toISOString(), // Initialize with string
  nickname: '',
  height: '',
  weight: '',
  eyeColor: '',
  hairColor: '',
  hairLength: '',
  photo: null,
  lastSeen: '',
  lastLocation: '',
  status: 'idle',
  error: null,
};

export const submitReport = createAsyncThunk(
  'reportForm/submitReport',
  async (formData: Omit<ReportFormState, 'status' | 'error'>, { rejectWithValue }) => {
    try {
      const birthDate = new Date(formData.dateOfBirth); // Convert string back to Date
      const age = calculateAge(birthDate);
      await firestore().collection('Reports').add({
        ...formData,
        dateOfBirth: birthDate, // Store as Date or ISO string as per Firestore requirements
        age,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      return formData;
    } catch (error) {
      return rejectWithValue('There was an error submitting the report. Please try again.');
    }
  }
);

function calculateAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const reportFormSlice = createSlice({
  name: 'reportForm',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { key, value } = action.payload;
      if (key === 'dateOfBirth') {
        state.dateOfBirth = new Date(value).toISOString(); // Ensure it's stored as string
      } else {
        (state as any)[key] = value;
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReport.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitReport.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { updateFormField, resetForm } = reportFormSlice.actions;

export default reportFormSlice.reducer;
