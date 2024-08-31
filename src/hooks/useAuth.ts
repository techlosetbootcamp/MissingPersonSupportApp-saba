// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { loginAsync, googleLoginAsync } from '../redux/slices/loginSlice';
// // import { registerAsync } from '../redux/slices/registerSlice';
// // import { forgotPasswordAsync, selectForgotPasswordState } from '../redux/slices/forgotPasswordSlice';
// import { useAppDispatch } from './useDispatch';
// import { RootState } from '../redux/store';
// import {loginAsync, googleLoginAsync,forgotPasswordAsync, selectForgotPasswordState, registerAsync} from "../redux/slices/authSlice";

// export const useAuth = () => {
//   const dispatch = useAppDispatch();

//   // State for login
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // State for registration
//   const [username, setUsername] = useState('');
//   const [isSelected, setSelection] = useState(false);

//   // State for forgot password
//   const { loading: forgotPasswordLoading, error: forgotPasswordError, success: forgotPasswordSuccess } = useSelector(selectForgotPasswordState);

//   // State from register slice
//   const { loading: registerLoading, error: registerError, user } = useSelector((state: RootState) => state.register);

//   // State for login slice
//   const loginState = useSelector((state: RootState) => state.login);

//   // Login function
//   const onLogin = () => {
//     dispatch(loginAsync({ email, password }));
//   };

//   // Google login function
//   const onGoogleButtonPress = async () => {
//     dispatch(googleLoginAsync());
//   };

//   // Register function
//   const register = () => {
//     dispatch(registerAsync({ email, password, username }));
//   };

//   // Forgot password function
//   const sendResetCode = () => {
//     if (email.trim() !== '') {
//       dispatch(forgotPasswordAsync({ email }));
//     }
//   };

//   // Reset error function (this can be further customized based on your needs)
//   const resetError = () => {
//     // Clear error states if needed
//   };

//   return {
//     // Common state
//     email,
//     setEmail,
//     password,
//     setPassword,

//     // Login
//     onLogin,
//     onGoogleButtonPress,
//     loginState,

//     // Registration
//     username,
//     setUsername,
//     isSelected,
//     setSelection,
//     registerLoading,
//     registerError,
//     user,
//     register,

//     // Forgot Password
//     forgotPasswordLoading,
//     forgotPasswordError,
//     forgotPasswordSuccess,
//     sendResetCode,

//     // Utility
//     resetError,
//   };
// };
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useDispatch';
import { RootState } from '../redux/store';
import {
  loginAsync,
  googleLoginAsync,
  forgotPasswordAsync,
  selectForgotPasswordState,
  registerAsync,
} from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // State for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for registration
  const [username, setUsername] = useState('');
  const [isSelected, setSelection] = useState(false);

  // State for forgot password
  const { loading: forgotPasswordLoading, error: forgotPasswordError, success: forgotPasswordSuccess } =
    useSelector(selectForgotPasswordState);

  // State from the combined auth slice
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  // Login function
  const onLogin = () => {
    dispatch(loginAsync({ email, password }));
  };

  // Google login function
  const onGoogleButtonPress = async () => {
    dispatch(googleLoginAsync());
  };

  // Register function
  const onregister = () => {
    dispatch(registerAsync({ email, password, username }));
  };

  // Forgot password function
  const sendResetCode = () => {
    if (email.trim() !== '') {
      dispatch(forgotPasswordAsync({ email }));
    }
  };

  // Reset error function (this can be further customized based on your needs)
  const resetError = () => {
    // Clear error states if needed
  };

  return {
    // Common state
    email,
    setEmail,
    password,
    setPassword,

    // Login
    onLogin,
    onGoogleButtonPress,

    // Registration
    username,
    setUsername,
    isSelected,
    setSelection,
    loading, // Auth loading state (for both login and registration)
    error, // Auth error state (for both login and registration)
    user,
    onregister,

    // Forgot Password
    forgotPasswordLoading,
    forgotPasswordError,
    forgotPasswordSuccess,
    sendResetCode,

    // Utility
    resetError,
  };
};
