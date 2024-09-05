import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ReportFormState} from '../../types/types';
import {Alert} from 'react-native';

const initialState: ReportFormState = {
  fullName: '',
  gender: '',
  dateOfBirth: new Date().toISOString(),
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
  async (
    formData: Omit<ReportFormState, 'status' | 'error'>,
    {rejectWithValue},
  ) => {
    try {
      const birthDate = new Date(formData.dateOfBirth);
      const age = calculateAge(birthDate);
      await firestore()
        .collection('Reports')
        .add({
          ...formData,
          dateOfBirth: birthDate,
          age,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      return formData;
    } catch (error) {
      return rejectWithValue(
        'There was an error submitting the report. Please try again.',
      );
    }
  },
);

function calculateAge(birthDate: Date) {
  const today = new Date();
  let age = today?.getFullYear() - birthDate?.getFullYear();
  const monthDifference = today?.getMonth() - birthDate?.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today?.getDate() < birthDate?.getDate())
  ) {
    age--;
  }
  return age;
}

const reportFormSlice = createSlice({
  name: 'reportForm',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const {key, value} = action.payload;
      if (key === 'dateOfBirth') {
        state.dateOfBirth = new Date(value as string).toISOString();
      } else if (key in state) {
        (state as any)[key] = value;
      } else {
        Alert.alert(`Unknown field ${key}`);
      }
    },
    resetForm: state => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(submitReport.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitReport.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {updateFormField, resetForm} = reportFormSlice.actions;

export default reportFormSlice.reducer;

