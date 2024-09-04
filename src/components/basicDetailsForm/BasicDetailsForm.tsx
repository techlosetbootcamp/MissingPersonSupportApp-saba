import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IMAGES} from '../../constants/constants';
import {styles} from './BasicDetailsFormStyles';
import {useBasicDetails} from './useBasicDetailsForm';
import {BasicDetailsSectionProps} from '../../types/types';

const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({
  formData,
}) => {
  const {
    genderDropdownVisible,
    setGenderDropdownVisible,
    showDatePicker,
    setShowDatePicker,
    handleInputChange,
    handleDateChange,
  } = useBasicDetails(formData);

  const dateOfBirthDate = new Date(formData.dateOfBirth);

  return (
    <View>
      <Text style={styles.label}>Missing Person's Full Name</Text>
      <TextInput
        value={formData.fullName}
        onChangeText={text => handleInputChange('fullName', text)}
        placeholder="Missing Person's Full Name"
        style={styles.input}
      />

      <Text style={styles.label}>Gender</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setGenderDropdownVisible(!genderDropdownVisible)}>
        <Text style={styles.dropdownText}>
          {formData.gender || 'Select Gender'}
        </Text>
        <Image source={IMAGES.down} style={styles.dropdownIcon} />
      </TouchableOpacity>
      {genderDropdownVisible && (
        <View style={styles.dropdownOptions}>
          {['Male', 'Female', 'Trans'].map(gender => (
            <TouchableOpacity
              key={gender}
              style={styles.dropdownOption}
              onPress={() => {
                handleInputChange('gender', gender);
                setGenderDropdownVisible(false);
              }}>
              <Text style={styles.dropdownOptionText}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}>
        <Text>{dateOfBirthDate.toLocaleDateString() || 'Select Date'}</Text>
        <Image style={styles.icon} source={IMAGES.calender} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirthDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Nickname or Known Aliases</Text>
      <TextInput
        value={formData.nickname}
        onChangeText={text => handleInputChange('nickname', text)}
        placeholder="Nickname or Known Aliases"
        style={styles.input}
      />
    </View>
  );
};

export default BasicDetailsSection;
