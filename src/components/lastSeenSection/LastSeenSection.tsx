import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {styles} from "./LastSeenSectionStyles"
interface LastSeenSectionProps {
  lastLocation: string;
  lastSeen: string;
  showPicker: boolean;
  date: Date;
  handleInputChange: (field: "fullName" | "gender" | "nickname" | "height" | "weight" | "eyeColor" | "hairColor" | "hairLength" | "lastSeen" | "lastLocation" | "dateOfBirth" | "photo", value: string) => void;
 
  setShowPicker: (value: boolean) => void;
  setDate: (date: Date) => void;
}

const LastSeenSection: React.FC<LastSeenSectionProps> = ({
  lastLocation,
  lastSeen,
  showPicker,
  date,
  handleInputChange,
  setShowPicker,
  setDate,
}) => {
  return (
    <View>
      <Text style={styles.label}>Last Seen Location</Text>
      <TextInput
        value={lastLocation}
        onChangeText={text => handleInputChange('lastLocation', text)}
        placeholder="Last Location"
        style={styles.input}
      />

      <View>
        <Text style={styles.label}>Last Seen</Text>
        <TextInput
          value={lastSeen}
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
    </View>
  );
};



export default LastSeenSection;
