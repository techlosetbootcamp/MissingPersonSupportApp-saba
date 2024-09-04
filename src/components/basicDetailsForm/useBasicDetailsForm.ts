import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {FormData} from '../../types/types';
export const useBasicDetails = (initialFormData: FormData) => {
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    initialFormData[field] = value;
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate.toISOString());
    }
  };

  return {
    genderDropdownVisible,
    setGenderDropdownVisible,
    showDatePicker,
    setShowDatePicker,
    handleInputChange,
    handleDateChange,
  };
};
