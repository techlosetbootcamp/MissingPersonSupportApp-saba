// import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//   Register: undefined;
//   // Add other screens here if needed
// };

// export type NavigationProps = StackNavigationProp<RootStackParamList>;
export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    MainTabs: undefined;
    ReportForm: undefined;
    FilterReport: undefined;
    Profile: undefined;
  };
 // Interface for individual field properties
export interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  type?: string;
}

// Interface for the basic details section props
export interface BasicDetailsSectionProps {
  formData: FormData;
  handleInputChange: (key: keyof FormData, value: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  handleDateChange: (date: Date) => void;
}

// Interface for form data
export interface FormData {
  fullName: string;
  gender: string;
  nickname: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  hairLength: string;
  lastSeen: string;
  lastLocation: string;
  dateOfBirth: string;
  photo: string | null; 
}

// Interface for PhotoUploadSection component props
export interface PhotoUploadSectionProps {
  photo: string;
  selectPhoto: () => void;
}
// src/types/formDataTypes.ts

// export interface FormData {
//   height: string;
//   weight: string;
//   eyeColor: string;
//   hairColor: string;
//   hairLength: string;
//   photo: string; // Assuming photo is a string representing the URI
// }

export type HandleInputChange = (field: keyof FormData, value: string) => void;
