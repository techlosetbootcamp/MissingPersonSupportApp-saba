import {FieldProps, FormData, HandleInputChange} from '../types/types';

export const getPhysicalDescriptionFields = (
  formData: FormData,
  handleInputChange: HandleInputChange,
): FieldProps[] => [
  {
    label: 'Height',
    value: formData.height,
    placeholder: 'Height',
    onChange: text => handleInputChange('height', text),
  },
  {
    label: 'Weight',
    value: formData.weight,
    placeholder: 'Weight',
    onChange: text => handleInputChange('weight', text),
  },
  {
    label: 'Eye Color',
    value: formData.eyeColor,
    placeholder: 'Eye Color',
    onChange: text => handleInputChange('eyeColor', text),
  },
  {
    label: 'Hair Color',
    value: formData.hairColor,
    placeholder: 'Hair Color',
    onChange: text => handleInputChange('hairColor', text),
  },
  {
    label: 'Length of the Hair',
    value: formData.hairLength,
    placeholder: 'Length of the Hair',
    onChange: text => handleInputChange('hairLength', text),
  },
];

export const FORGOT_PASSWORD = {
  instructions:
    "Please enter the email address associated with your account. We'll send you a verification code to reset your password.",
};

import {KeyboardTypeOptions} from 'react-native';

interface InputConfig {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  helperText: string | null;
  keyboardType: KeyboardTypeOptions;
}

export const getInputs = (
  username: string,
  setUsername: (text: string) => void,
  email: string,
  setEmail: (text: string) => void,
  password: string,
  setPassword: (text: string) => void,
): InputConfig[] => [
  {
    label: 'Name',
    placeholder: 'Enter your name',
    value: username,
    onChangeText: setUsername,
    secureTextEntry: false,
    helperText: null,
    keyboardType: 'default',
  },
  {
    label: 'Email',
    placeholder: 'Enter your email',
    value: email,
    onChangeText: setEmail,
    secureTextEntry: false,
    helperText: 'Your email address is your username.',
    keyboardType: 'email-address',
  },
  {
    label: 'Password',
    placeholder: 'Enter your password',
    value: password,
    onChangeText: setPassword,
    secureTextEntry: true,
    helperText: 'Your password must be 8 characters.',
    keyboardType: 'default',
  },
];

export type InputField = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  icon?: any;
  infoText?: string;
};

export const getInputConfig = (
  email: string,
  setEmail: (text: string) => void,
  password: string,
  setPassword: (text: string) => void,
): InputField[] => [
  {
    label: 'Email',
    placeholder: 'Email',
    value: email,
    onChangeText: setEmail,
    keyboardType: 'email-address',
    secureTextEntry: false,
    icon: require('../assets/images/Icon.png'),
    infoText: 'Your email address is your username.',
  },
  {
    label: 'Password',
    placeholder: 'Password',
    value: password,
    onChangeText: setPassword,
    keyboardType: 'default',
    secureTextEntry: true,
  },
];

export const IMAGES = {
  back: require('../assets/images/Backspace.png'),
  banner: require('../assets/images/Banner.png'),
  calender: require('../assets/images/Calender.png'),
  down: require('../assets/images/Down.png'),
  forgotPas: require('../assets/images/ForgotPass.png'),
  google: require('../assets/images/GoogleIcon.png'),
  home: require('../assets/images/Home.png'),
  icon: require('../assets/images/Icon.png'),
  kid: require('../assets/images/kid3.png'),
  logout: require('../assets/images/Logout.png'),
  logVector: require('../assets/images/LogVector.png'),
  news: require('../assets/images/News.png'),
  profile: require('../assets/images/Profile.png'),
  regVector: require('../assets/images/RegVector.png'),
  report: require('../assets/images/Report.png'),
  search: require('../assets/images/Search.png'),
  upload: require('../assets/images/Upload.png'),
  uploadIcon: require('../assets/images/UploadIcon.png'),
  user: require('../assets/images/User.png'),
  edit: require('../assets/images/Edit.png'),
};

import Register from '../screens/register/Register';
import Login from '../screens/login/Login';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import Splash from '../screens/splash/Splash';

import ReportForm from '../screens/reportForm/ReportForm';
import FilterReport from '../screens/filterReport/FilterReport';
import ProfileScreen from '../screens/profile/Profile';
import News from '../screens/news/News';

export {
  Register,
  Login,
  ForgotPassword,
  Splash,
  ReportForm,
  FilterReport,
  ProfileScreen,
  News,
};
