import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import {useCombinedHook} from '../hooks/useReportManager';
import DatePicker from 'react-native-date-picker';
import Header from '../components/header/Header';
import {useAppNavigation} from '../utils/AppNavigation';
import BasicDetailsSection from '../components/basicDetailsForm/BasicDetailsForm';
import PhotoUploadSection from '../components/photoUploadSection/PhotoUploadSection';
import {getPhysicalDescriptionFields} from '../constants/constants';

export default function ReportMissingPerson() {
  const navigation = useAppNavigation();
  const {
    formData,
    showDatePicker,
    setShowDatePicker,
    showPicker,
    setShowPicker,
    date,
    setDate,
    handleInputChange,
    handleDateChange,
    selectPhoto,
    submitReport,
  } = useCombinedHook();
  const physicalDescriptionFields = getPhysicalDescriptionFields(
    formData,
    handleInputChange,
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Missing Person Details"
        onBackPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Basic Details of Missing Person</Text>

      <BasicDetailsSection
        formData={formData}
        handleInputChange={handleInputChange}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        handleDateChange={handleDateChange}
      />

      <Text style={styles.label}>Last Seen Location</Text>
      <TextInput
        value={formData.lastLocation}
        onChangeText={text => handleInputChange('lastLocation', text)}
        placeholder="Last Location"
        style={styles.input}
      />

      <View>
        <Text style={styles.label}>Last Seen</Text>
        <TextInput
          value={formData.lastSeen}
          onFocus={() => setShowPicker(true)}
          placeholder="Last Seen"
          style={styles.input}
        />

        {showPicker && (
          <DatePicker date={date} mode="datetime" onDateChange={setDate} />
        )}

        {showPicker && (
          <View style={styles.buttonContainer}>
            <Button
              title="Confirm"
              onPress={() => {
                handleInputChange('lastSeen', date.toLocaleString());
                setShowPicker(false);
              }}
            />
            <Button
              title="Cancel"
              onPress={() => setShowPicker(false)}
              color="red"
            />
          </View>
        )}
      </View>
      <Text style={styles.title}>Physical Description</Text>

      {physicalDescriptionFields.map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            placeholder={field.placeholder}
            style={styles.input}
          />
        </View>
      ))}

      <PhotoUploadSection photo={formData.photo} selectPhoto={selectPhoto} />

      <View style={styles.horizontalLine} />

      <View style={styles.alignButton}>
        <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  icon: {
    marginLeft: 23,
  },

  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 16,
    // or specify a fixed width, e.g., 200
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Familjen Grotesk',
    marginBottom: 16,
    marginTop: 16,
  },
  label: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },

  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns text and icon
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginLeft: 10, // Optional, to add some space between the text and the icon
  },

  photoUpload: {
    borderWidth: 2,
    borderColor: '#5A5DF6',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 173,
    backgroundColor: '#FFFFFF',
    borderStyle: 'dashed', // Dashed border style
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadIcon: {
    marginBottom: 10, // Space between icon and text
  },
  uploadText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  browseText: {
    color: '#5A5DF6',
    fontSize: 16,
    fontWeight: '400',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  format: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '400',
  },

  submitButton: {
    width: '50%',
    backgroundColor: '#5B59FE',
    paddingHorizontal: 17,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FAFAFC',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },

  alignButton: {
    alignItems: 'center',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#000',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
});
