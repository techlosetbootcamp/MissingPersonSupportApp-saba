import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert , Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

export default function ReportMissingPerson() {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date());
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [hairLength, setHairLength] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lastSeen, setLastSeen] = useState('');
  const [lastLocation, setLastLocation] = useState('');


 
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);



  

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
    setShowDatePicker(false);
  };

  const selectPhoto = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (response.assets && response.assets.length > 0) {
      setPhoto(response.assets[0].uri || null);
    }
  };

  // Function to calculate age based on the date of birth
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const submitReport = async () => {
    if (!fullName || !gender || !dateOfBirth || !lastSeen || !lastLocation || !height || !weight || !eyeColor || !hairColor || !hairLength) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      const age = calculateAge(dateOfBirth!); // Calculate age from date of birth

      await firestore().collection('Reports').add({
        fullName,
        gender,
        age, // Store the calculated age instead of dateOfBirth
        nickname,
        lastLocation,
        lastSeen,
        height,
        weight,
        eyeColor,
        hairColor,
        hairLength,
        photo,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Missing person report has been submitted.');
      
      // Clear the fields after submission
      setFullName('');
      setGender('');
      setDateOfBirth(new Date());
      setNickname('');
      setLastLocation('');
      setLastSeen('');
      setHeight('');
      setWeight('');
      setEyeColor('');
      setHairColor('');
      setHairLength('');
      setPhoto(null);
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting the report. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Missing Person Details</Text>
      
      <Text style={styles.label}>Missing Person's Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Missing Person's Full Name"
        style={styles.input}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        placeholder="Gender"
        style={styles.input}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{dateOfBirth?.toLocaleDateString() || "Select Date"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Nickname or Known Aliases</Text>
      <TextInput
        value={nickname}
        onChangeText={setNickname}
        placeholder="Nickname or Known Aliases"
        style={styles.input}
      />

      <Text style={styles.label}>Last Seen Location</Text>
      <TextInput
        value={lastLocation}
        onChangeText={setLastLocation}
        placeholder="Last Location"
        style={styles.input}
      />




      

<View>
      <Text style={styles.label}>Last Seen</Text>
      <TextInput
        value={lastSeen}
        onFocus={() => setShowPicker(true)}
        placeholder="Last Location"
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
              setLastSeen(date.toLocaleString());
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
        value={height}
        onChangeText={setHeight}
        placeholder="Height"
        style={styles.input}
      />

      <Text style={styles.label}>Weight</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        style={styles.input}
      />

      <Text style={styles.label}>Eye Color</Text>
      <TextInput
        value={eyeColor}
        onChangeText={setEyeColor}
        placeholder="Eye Color"
        style={styles.input}
      />

      <Text style={styles.label}>Hair Color</Text>
      <TextInput
        value={hairColor}
        onChangeText={setHairColor}
        placeholder="Hair Color"
        style={styles.input}
      />

      <Text style={styles.label}>Length of the Hair</Text>
      <TextInput
        value={hairLength}
        onChangeText={setHairLength}
        placeholder="Length of the Hair"
        style={styles.input}
      />

      <Text style={styles.label}>Upload Photographs</Text>
      <TouchableOpacity style={styles.photoUpload} onPress={selectPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.uploadedImage} />
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
