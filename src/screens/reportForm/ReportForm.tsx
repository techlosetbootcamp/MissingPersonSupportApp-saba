import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useCombinedHook} from '../../hooks/useReportManager';
import Header from '../../components/header/Header';
import {useAppNavigation} from '../../utils/AppNavigation';
import BasicDetailsSection from '../../components/basicDetailsForm/BasicDetailsForm';
import PhotoUploadSection from '../../components/photoUploadSection/PhotoUploadSection';
import {getPhysicalDescriptionFields} from '../../constants/constants';
import LastSeenSection from '../../components/lastSeenSection/LastSeenSection';
import {styles} from './ReportFormStyle';
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

      <LastSeenSection
        lastLocation={formData?.lastLocation}
        lastSeen={formData?.lastSeen}
        showPicker={showPicker}
        date={date}
        handleInputChange={handleInputChange}
        setShowPicker={setShowPicker}
        setDate={setDate}
      />

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

      <PhotoUploadSection photo={formData?.photo} selectPhoto={selectPhoto} />

      <View style={styles.horizontalLine} />

      <View style={styles.alignButton}>
        <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
