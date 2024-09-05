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

export type FieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  type?: string;
};

import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

export type BasicDetailsSectionProps = {
  formData: any;
  handleInputChange: (
    field:
      | 'fullName'
      | 'gender'
      | 'nickname'
      | 'height'
      | 'weight'
      | 'eyeColor'
      | 'hairColor'
      | 'hairLength'
      | 'lastSeen'
      | 'lastLocation'
      | 'dateOfBirth'
      | 'photo',
    value: string,
  ) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  handleDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
};

export type FormData = {
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
};

export type fireError = {
  response?: {
    data: string;
  };
  message: string;
};

export type PhotoUploadSectionProps = {
  photo: string;
  selectPhoto: () => void;
};

export type HandleInputChange = (field: keyof FormData, value: string) => void;

export type MissingPerson = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  lastSeen: string;
  lastLocation: string;
  photo: string;
};

export type RootStackParams = {
  Profile: undefined;
  MainTabs: undefined;
  ReportForm: undefined;
  FilterReport: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  News: undefined;
  Home: undefined;
};

export type Profile = {
  dateOfBirth: Date;
  eyeColor: string;
  fullName: string;
  gender: string;
  hairColor: string;
  hairLength: string;
  height: string;
  lastLocation: string;
  lastSeen: string;
  nickname: string;
  photo: string;
  timestamp: Date;
  weight: string;
  id: string;

  age: number;
};
export type AuthState = {
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
};

export type Profiles = {
  fullName: string;
  gender: string;
  lastLocation: string;
};
export type NewsState = {
  loading: boolean;
  error: string | null;
};
export type ProfileState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type ReportFormState = {
  fullName: string;
  gender: string;
  dateOfBirth: string;
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
};

export type LastSeenSectionProps = {
  lastLocation: string;
  lastSeen: string;
  showPicker: boolean;
  date: Date;
  handleInputChange: (
    field:
      | 'fullName'
      | 'gender'
      | 'nickname'
      | 'height'
      | 'weight'
      | 'eyeColor'
      | 'hairColor'
      | 'hairLength'
      | 'lastSeen'
      | 'lastLocation'
      | 'dateOfBirth'
      | 'photo',
    value: string | Date,
  ) => void;

  setShowPicker: (value: boolean) => void;
  setDate: (date: Date) => void;
};

export type LogoProps = {
  color?: string;
  size?: string;
};
export type PhotoUploadSectionProp = {
  photo: string | null;
  selectPhoto: () => void;
};

export type ProfileCardProps = {
  profile: {
    id: string;
    fullName: string;
    age: number;
    gender: string;
    lastSeen: string;
    lastLocation: string;
    photo: string;
  };
  onPress: () => void;
};

export type MissingPersonModalProps = {
  visible: boolean;
  onClose: () => void;
  profile: MissingPerson | null;
};
export type Report = {
  id: string;
  name: string;
  reporter: string;
  location: string;
  description?: string;
  photoUrl: string;
};

export type ReportItemProps = {
  item: Report;
};
export type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};
export type error = {
  error: undefined;
};
