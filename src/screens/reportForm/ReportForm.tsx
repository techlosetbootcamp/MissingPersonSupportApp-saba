



import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useCombinedHook} from '../../hooks/useReportManager';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

export default function ReportMissingPerson() {
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
  const dateOfBirthDate = new Date(formData.dateOfBirth);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Missing Person Details</Text>

      <Text style={styles.label}>Missing Person's Full Name</Text>
      <TextInput
        value={formData.fullName}
        onChangeText={(text) => handleInputChange('fullName', text)}
        placeholder="Missing Person's Full Name"
        style={styles.input}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        value={formData.gender}
        onChangeText={(text) => handleInputChange('gender', text)}
        placeholder="Gender"
        style={styles.input}
      />

<Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{dateOfBirthDate.toLocaleDateString() || 'Select Date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirthDate} // Pass Date object
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Nickname or Known Aliases</Text>
      <TextInput
        value={formData.nickname}
        onChangeText={(text) => handleInputChange('nickname', text)}
        placeholder="Nickname or Known Aliases"
        style={styles.input}
      />

      <Text style={styles.label}>Last Seen Location</Text>
      <TextInput
        value={formData.lastLocation}
        onChangeText={(text) => handleInputChange('lastLocation', text)}
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
          <DatePicker
            date={date}
            mode="datetime"
            onDateChange={setDate}
          />
        )}

        {showPicker && (
          <>
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
            />
          </>
        )}
      </View>

      <Text style={styles.label}>Height</Text>
      <TextInput
        value={formData.height}
        onChangeText={(text) => handleInputChange('height', text)}
        placeholder="Height"
        style={styles.input}
      />

      <Text style={styles.label}>Weight</Text>
      <TextInput
        value={formData.weight}
        onChangeText={(text) => handleInputChange('weight', text)}
        placeholder="Weight"
        style={styles.input}
      />

      <Text style={styles.label}>Eye Color</Text>
      <TextInput
        value={formData.eyeColor}
        onChangeText={(text) => handleInputChange('eyeColor', text)}
        placeholder="Eye Color"
        style={styles.input}
      />

      <Text style={styles.label}>Hair Color</Text>
      <TextInput
        value={formData.hairColor}
        onChangeText={(text) => handleInputChange('hairColor', text)}
        placeholder="Hair Color"
        style={styles.input}
      />

      <Text style={styles.label}>Length of the Hair</Text>
      <TextInput
        value={formData.hairLength}
        onChangeText={(text) => handleInputChange('hairLength', text)}
        placeholder="Length of the Hair"
        style={styles.input}
      />

      <Text style={styles.label}>Upload Photographs</Text>
      <TouchableOpacity style={styles.photoUpload} onPress={selectPhoto}>
        {formData.photo ? (
          <Image source={{ uri: formData.photo }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Drag & drop files or Browse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({




  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },


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
  label: {
    fontSize: 16,
    marginBottom: 5,
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  photoUpload: {
    borderWidth: 2,
    borderColor: '#5A5DF6',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 150,
    backgroundColor: '#F7F7F7',
  },
  uploadText: {
    color: '#5A5DF6',
    fontSize: 16,
    textAlign: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#5A5DF6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
