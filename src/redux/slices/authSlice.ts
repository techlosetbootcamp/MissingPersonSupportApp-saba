import { ToastAndroid } from 'react-native';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createSelector } from 'reselect';

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    phoneNumber?: string | null;
  } | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

GoogleSignin.configure({
  webClientId: '305312098206-lo6d29tjpa69c5d0deecr69fab489il7.apps.googleusercontent.com',
});

// Thunks for login
export const loginAsync = createAsyncThunk<AuthState['user'], { email: string; password: string }, { rejectValue: string }>(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const { uid, email: userEmail, displayName, photoURL } = response.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (error: any) {
      // Show a toast if the user is not registered or login fails
      ToastAndroid.show('Login failed. Please check your credentials or register.', ToastAndroid.LONG);
      return rejectWithValue(error.message);
    }
  }
);

// Thunks for Google login
export const googleLoginAsync = createAsyncThunk<AuthState['user'], void, { rejectValue: string }>(
  'auth/googleLoginAsync',
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      const { uid, email, displayName, photoURL } = response.user;
      return { uid, email, displayName, photoURL };
    } catch (error: any) {
      // Show a toast if Google login fails
      ToastAndroid.show('Google login failed. Please try again.', ToastAndroid.LONG);
      return rejectWithValue(error.message);
    }
  }
);

// Thunks for registration
export const registerAsync = createAsyncThunk<AuthState['user'], { email: string; password: string; username: string }, { rejectValue: string }>(
  'auth/registerAsync',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;

      await user.updateProfile({
        displayName: username,
      });

      await firestore().collection('User').doc(user.uid).set({
        username: username,
        email: email.toLowerCase(),
      });

      const serializableUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      return serializableUser;
    } catch (error: any) {
      // Show a toast if registration fails
      ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.LONG);
      return rejectWithValue(error.message);
    }
  }
);

// Thunks for forgot password
export const forgotPasswordAsync = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
  'auth/forgotPasswordAsync',
  async ({ email }, { rejectWithValue }) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Combined auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // Google login cases
      .addCase(googleLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginAsync.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google login failed';
      })

      // Register cases
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })

      // Forgot password cases
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send reset email';
      });
  },
});

export const { logout, clearError, clearState } = authSlice.actions;
export default authSlice.reducer;

// Selector for forgot password state with minimal transformation
export const selectForgotPasswordState = createSelector(
  (state: any) => state.forgotPassword,
  (forgotPassword) => ({
    ...forgotPassword, // Spread the state to create a new object reference
  })
);
